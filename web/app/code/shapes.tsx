import type { ReactNode } from "react";

import { DESIGN, REQUEST, REQUEST_NEVER, RESPONSE, TELEMETRY, type Field, type Shape } from "@/lib/contract-shapes";

/**
 * What the server receives and what it returns, printed field by field from
 * `lib/contract-shapes.ts`. That file is a transcription of the engine's own
 * types and is self-tested against them, so nothing here is retyped.
 *
 * Ruled rows, not a table and not cards: the field name in mono on the left,
 * the plain label beside it. On a phone the label drops under the name.
 */

function Fields({ fields }: { fields: Field[] }) {
  return (
    <dl className="mt-3 divide-y divide-rule border-y border-rule">
      {fields.map((f) => (
        <div key={f.name} className="grid gap-x-6 gap-y-0.5 py-2.5 sm:grid-cols-[11rem_1fr]">
          <dt className="font-mono text-[12px] leading-[1.6] break-all text-ink">{f.name}</dt>
          <dd className="text-small leading-[1.55] text-ink-muted">{f.means}</dd>
        </div>
      ))}
    </dl>
  );
}

function Block({ shape }: { shape: Shape }) {
  return (
    <div className="mt-8">
      <p className="text-body font-semibold text-ink">{shape.name}</p>
      <p className="mt-1 text-small leading-[1.55] text-ink-muted">{shape.purpose}</p>
      <Fields fields={shape.fields} />
    </div>
  );
}

function Sub({ children }: { children: ReactNode }) {
  return <h3 className="mt-12 text-lede leading-[1.4] font-semibold text-ink">{children}</h3>;
}

function Path({ children }: { children: ReactNode }) {
  return <span className="font-mono text-small font-normal text-ink-muted">{children}</span>;
}

export function Shapes() {
  return (
    <div className="max-w-[64ch]">
      <Sub>
        Sent, every run <Path>POST /api/engine</Path>
      </Sub>
      {REQUEST.map((shape) => (
        <Block key={shape.name} shape={shape} />
      ))}

      <Sub>Never sent</Sub>
      <ul className="mt-3 divide-y divide-rule border-y border-rule">
        {REQUEST_NEVER.map((line) => (
          <li key={line} className="py-2.5 text-small leading-[1.55] text-ink-muted">
            {line}
          </li>
        ))}
      </ul>

      <Sub>What comes back</Sub>
      {RESPONSE.map((shape) => (
        <Block key={shape.name} shape={shape} />
      ))}

      <Sub>
        The counting ping <Path>POST /api/telemetry</Path>
      </Sub>
      <p className="mt-1 text-small leading-[1.55] text-ink-muted">
        Sent after every run, to count how many sheets are running. Clearing the Settings cell{" "}
        <em>Usage counting endpoint</em> switches it off.
      </p>
      <Fields fields={TELEMETRY.fields} />

      <Sub>
        The design fetch <Path>GET /api/design</Path>
      </Sub>
      <p className="mt-1 text-small leading-[1.55] text-ink-muted">
        Fetched when the server&rsquo;s answer carries a new design label. Nothing about you goes
        out on this request. It can change how the sheet looks and what the Start here tab says.
      </p>
      <Fields fields={DESIGN.fields} />
    </div>
  );
}
