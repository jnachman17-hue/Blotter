/**
 * Does the design the server sends agree with the one the courier falls back to?
 *
 * **Why this exists.** The server's payload overrides the courier's own tables,
 * so the two can disagree for days while every test passes and every live sheet
 * quietly wears the wrong colours. That is not a hypothetical: it happened, and
 * `32-JON-NOTES-3-SEP.md` §15.2 records the fix and §15.3 records that nothing
 * stops it happening again. This is that check.
 *
 * The courier is Apps Script and cannot be imported, so its tables are read out
 * of `courier/Code.gs` as text. That is deliberately crude and deliberately
 * brittle in the safe direction: if the parse stops finding a table, the check
 * fails loudly rather than passing on an empty comparison.
 *
 * Run: cd web && npx tsx app/api/design/selftest.ts
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { GET } from "./route";

const CODE_GS = join(__dirname, "..", "..", "..", "..", "courier", "Code.gs");
const source = readFileSync(CODE_GS, "utf8");

let failures = 0;
let checks = 0;

function check(label: string, served: unknown, courier: unknown): void {
  checks += 1;
  const a = JSON.stringify(served);
  const b = JSON.stringify(courier);
  if (a === b) return;
  failures += 1;
  console.log(`FAIL ${label}`);
  console.log(`     served by /api/design : ${a}`);
  console.log(`     courier's own fallback: ${b}`);
}

/** Pull `var NAME = { ... };` out of the courier and evaluate the literal. */
function courierObject(name: string): Record<string, unknown> {
  const start = source.indexOf(`var ${name} = {`);
  if (start === -1) throw new Error(`Could not find "var ${name} = {" in Code.gs`);
  const open = source.indexOf("{", start);
  let depth = 0;
  let end = -1;
  for (let i = open; i < source.length; i += 1) {
    if (source[i] === "{") depth += 1;
    else if (source[i] === "}") {
      depth -= 1;
      if (depth === 0) { end = i + 1; break; }
    }
  }
  if (end === -1) throw new Error(`Unbalanced braces reading ${name} from Code.gs`);
  const literal = source.slice(open, end);
  const value = new Function(`return (${literal});`)() as Record<string, unknown>;
  if (Object.keys(value).length === 0) throw new Error(`${name} parsed as empty`);
  return value;
}

/** Resolve the `INK_*` constants the STATUS_STYLE literal refers to. */
function courierInk(): Record<string, string> {
  const ink: Record<string, string> = {};
  for (const m of source.matchAll(/^var (INK[A-Z_]*) = '(#[0-9a-fA-F]{6})';/gm)) {
    ink[m[1]] = m[2];
  }
  return ink;
}

/** The fallback order inside `stateRank_`, which is a literal in a function. */
function courierStateRank(): Record<string, number> {
  const start = source.indexOf("function stateRank_(");
  if (start === -1) throw new Error("Could not find stateRank_ in Code.gs");
  const open = source.indexOf("var order = {", start);
  if (open === -1) throw new Error("Could not find stateRank_'s order table");
  const brace = source.indexOf("{", open);
  const end = source.indexOf("};", brace);
  const literal = source.slice(brace, end + 1).replace(/\/\/[^\n]*/g, "");
  return new Function(`return (${literal});`)() as Record<string, number>;
}

/** The `numberFormat_(heading, fallback)` calls, which carry the built-in formats. */
function courierNumberFormats(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const m of source.matchAll(/numberFormat_\(\s*'([^']+)'\s*,\s*('(?:[^'\\]|\\.)*')\s*\)/g)) {
    out[m[1]] = new Function(`return (${m[2]});`)() as string;
  }
  /* `setNumberFormat(numberFormat_(h, 'm/d/yy'))` covers the two date columns
     through a loop variable, so they cannot be read from the call site. They
     are named here from the same line's `col[h]` lookup. */
  const looped = /setNumberFormat\(numberFormat_\(h, '([^']+)'\)\)/.exec(source);
  if (looped) {
    out["Last contact"] = looped[1];
    out["Last call"] = looped[1];
  }
  return out;
}

async function main(): Promise<void> {
  const served = await (await GET()).json();
  const ink = courierInk();

  /* STATUS_STYLE's values are `{ bg: '#…', fg: INK_FAINT }`, so the identifiers
     have to be substituted before the literal will evaluate. */
  const statusLiteralStart = source.indexOf("var STATUS_STYLE = {");
  if (statusLiteralStart === -1) throw new Error("Could not find STATUS_STYLE");
  const withInk = source.replace(/\bINK(_[A-Z]+)?\b(?=\s*[,}])/g, (m) =>
    ink[m] === undefined ? m : `'${ink[m]}'`);
  const statusStyle = (() => {
    const start = withInk.indexOf("var STATUS_STYLE = {");
    const open = withInk.indexOf("{", start);
    let depth = 0, end = -1;
    for (let i = open; i < withInk.length; i += 1) {
      if (withInk[i] === "{") depth += 1;
      else if (withInk[i] === "}") { depth -= 1; if (depth === 0) { end = i + 1; break; } }
    }
    const literal = withInk.slice(open, end).replace(/\/\/[^\n]*/g, "");
    return new Function(`return (${literal});`)() as Record<string, { bg: string; fg: string }>;
  })();

  console.log("status colours");
  for (const status of Object.keys(statusStyle)) {
    check(`  ${status}`, served.status_style[status], statusStyle[status]);
  }
  check("  the same eight statuses",
    Object.keys(served.status_style).sort(), Object.keys(statusStyle).sort());

  console.log("column widths");
  check("  contacts", served.widths.contacts, courierObject("CONTACTS_WIDTHS"));
  check("  found", served.widths.found, courierObject("FOUND_WIDTHS"));

  console.log("number formats");
  const formats = courierNumberFormats();
  for (const heading of Object.keys(served.number_formats)) {
    check(`  ${heading}`, served.number_formats[heading], formats[heading]);
  }

  console.log("sort order");
  const rank = courierStateRank();
  const order = (t: Record<string, number>) =>
    Object.keys(t).sort((a, b) => t[a] - t[b]);
  check("  the order Sort by state produces", order(served.state_rank), order(rank));

  console.log(`\n${checks - failures} of ${checks} design checks passed.`);
  if (failures > 0) {
    console.log(
      "\nThe served design wins over the courier's own values, so a live sheet\n" +
      "wears the first line of each pair above.",
    );
    process.exit(1);
  }
}

main();
