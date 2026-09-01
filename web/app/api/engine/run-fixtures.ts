import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { computeEngine } from "./rules";
import { parseEngineRequest } from "./validate";
import type { EngineResponse } from "./types";

/**
 * Runs the engine against the fixtures in `__fixtures__/`.
 *
 * The fixtures are the acceptance bar: derived from the rules and the real
 * 2024 season by a separate chat that never saw this implementation. This
 * runner was written before they landed, so it accepts either layout a
 * request/expected-response pair naturally takes:
 *
 * - one file holding both, under `request` and `expected` (or `response` /
 *   `output` / `expect`) keys;
 * - two files sharing a stem: `<name>.request.json` + `<name>.expected.json`
 *   (also `input`/`output`).
 *
 * What is compared, and how hard:
 *
 * - **`rows` must match exactly.** Status, days, dates, attempts — this is
 *   the contract, and a mismatch fails the run.
 * - **`found` must agree on who and when** (email, case-insensitive, and
 *   `first_seen`). The `name` and `context` strings are engine-authored prose
 *   the fixture author cannot be expected to word identically; differences
 *   are printed but do not fail.
 * - **`warnings` are printed, never failed.** Same reason.
 *
 * A disagreement is a finding, not an obstacle: the fixture, the code, or
 * the rules document is wrong, and the job is to say which — never to edit
 * the fixture until it goes green.
 *
 * Run with: `npx tsx web/app/api/engine/run-fixtures.ts`
 */

const FIXTURES_DIR = join(import.meta.dirname, "__fixtures__");

interface Fixture {
  name: string;
  request: unknown;
  expected: Record<string, unknown>;
}

function readJson(path: string): unknown {
  return JSON.parse(readFileSync(path, "utf8"));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Every .json under the fixtures tree, as paths relative to it. */
function walkJson(dir: string, prefix = ""): string[] {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const files: string[] = [];
  for (const entry of entries) {
    const rel = prefix.length > 0 ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) files.push(...walkJson(join(dir, entry.name), rel));
    else if (entry.name.endsWith(".json")) files.push(rel);
  }
  return files.sort();
}

function collectFixtures(): { fixtures: Fixture[]; unrecognised: string[] } {
  const files = walkJson(FIXTURES_DIR);
  if (files.length === 0) {
    console.log(`No fixtures found under ${FIXTURES_DIR}.`);
    return { fixtures: [], unrecognised: [] };
  }

  const fixtures: Fixture[] = [];
  const used = new Set<string>();

  const EXPECTED_KEYS = ["expected", "response", "output", "expect"];

  for (const file of files) {
    if (used.has(file)) continue;
    const data = readJson(join(FIXTURES_DIR, file));
    if (isRecord(data) && "request" in data) {
      const expectedKey = EXPECTED_KEYS.find((k) => k in data);
      if (expectedKey !== undefined) {
        fixtures.push({
          name: file,
          request: data.request,
          expected: data[expectedKey] as Record<string, unknown>,
        });
        used.add(file);
        continue;
      }
    }
    const pairMatch = /^(.*)\.(request|input)\.json$/.exec(file);
    if (pairMatch !== null) {
      const partner = files.find((f) =>
        [`${pairMatch[1]}.expected.json`, `${pairMatch[1]}.output.json`, `${pairMatch[1]}.response.json`].includes(f),
      );
      if (partner !== undefined) {
        fixtures.push({
          name: pairMatch[1],
          request: data,
          expected: readJson(join(FIXTURES_DIR, partner)) as Record<string, unknown>,
        });
        used.add(file);
        used.add(partner);
      }
    }
  }

  const unrecognised = files.filter((f) => !used.has(f));
  return { fixtures, unrecognised };
}

function diffRows(actual: EngineResponse, expected: Record<string, unknown>): string[] {
  const problems: string[] = [];
  const expectedRows = Array.isArray(expected.rows) ? expected.rows : [];
  if (expectedRows.length !== actual.rows.length) {
    problems.push(`rows: expected ${expectedRows.length}, got ${actual.rows.length}`);
    return problems;
  }
  expectedRows.forEach((expRowRaw, i) => {
    const expRow = isRecord(expRowRaw) ? expRowRaw : {};
    const actRow = actual.rows[i] as unknown as Record<string, unknown>;
    for (const key of Object.keys(expRow)) {
      const e = JSON.stringify(expRow[key]);
      const a = JSON.stringify(actRow[key]);
      if (e !== a) problems.push(`rows[${i}] (sheet row ${expRow.row}).${key}: expected ${e}, got ${a}`);
    }
  });
  return problems;
}

function diffFound(actual: EngineResponse, expected: Record<string, unknown>): { hard: string[]; soft: string[] } {
  const hard: string[] = [];
  const soft: string[] = [];
  const expectedFound = Array.isArray(expected.found) ? expected.found : [];
  const byEmail = new Map(actual.found.map((f) => [f.email.toLowerCase(), f]));
  for (const raw of expectedFound) {
    if (!isRecord(raw) || typeof raw.email !== "string") continue;
    const match = byEmail.get(raw.email.toLowerCase());
    if (match === undefined) {
      hard.push(`found: expected ${raw.email}, engine did not offer it`);
      continue;
    }
    byEmail.delete(raw.email.toLowerCase());
    if (typeof raw.first_seen === "string" && raw.first_seen !== match.first_seen) {
      hard.push(`found ${raw.email}: first_seen expected ${raw.first_seen}, got ${match.first_seen}`);
    }
    if (typeof raw.name === "string" && raw.name !== match.name) {
      soft.push(`found ${raw.email}: name wording differs ("${raw.name}" vs "${match.name}")`);
    }
    if (typeof raw.context === "string" && raw.context !== match.context) {
      soft.push(`found ${raw.email}: context wording differs ("${raw.context}" vs "${match.context}")`);
    }
  }
  for (const extra of byEmail.keys()) {
    hard.push(`found: engine offered ${extra}, fixture does not expect it`);
  }
  return { hard, soft };
}

const { fixtures, unrecognised } = collectFixtures();

if (unrecognised.length > 0) {
  console.log(`Unrecognised fixture files (no request/expected shape found): ${unrecognised.join(", ")}`);
}

if (fixtures.length === 0) {
  console.log("No fixtures to run yet. Build against the rules; run again when they land.");
  process.exit(0);
}

let failed = 0;
for (const fixture of fixtures) {
  let problems: string[];
  let soft: string[] = [];
  try {
    const response = computeEngine(parseEngineRequest(fixture.request));
    problems = diffRows(response, fixture.expected);
    const found = diffFound(response, fixture.expected);
    problems = problems.concat(found.hard);
    soft = found.soft;
    if (Array.isArray(fixture.expected.warnings)) {
      const actualWarnings = new Set(response.warnings);
      for (const w of fixture.expected.warnings) {
        if (typeof w === "string" && !actualWarnings.has(w)) {
          soft.push(`warning wording differs or missing: "${w}"`);
        }
      }
    }
  } catch (error) {
    problems = [`engine threw: ${error instanceof Error ? error.message : String(error)}`];
  }

  if (problems.length === 0) {
    console.log(`PASS ${fixture.name}${soft.length > 0 ? ` (${soft.length} wording differences)` : ""}`);
  } else {
    failed += 1;
    console.error(`FAIL ${fixture.name}`);
    for (const p of problems) console.error(`  ${p}`);
  }
  for (const s of soft) console.log(`  note: ${s}`);
}

console.log(`\n${fixtures.length - failed} of ${fixtures.length} fixtures passed.`);
if (failed > 0) {
  console.error(
    "A disagreement is a finding: the implementation, the fixture, or the rules document is wrong. Say which. Do not edit the fixture.",
  );
  process.exit(1);
}
