"use client";

import { useMemo, useState } from "react";

type FieldKey =
  | "audience"
  | "tone"
  | "deliverables"
  | "timeline"
  | "budget"
  | "revisions"
  | "success";

type Field = {
  key: FieldKey;
  step: string;
  label: string;
  prompt: string;
  placeholder: string;
  gapTheme: string;
};

const FIELDS: Field[] = [
  {
    key: "audience",
    step: "01",
    label: "Target audience",
    prompt: "Who is this actually for?",
    placeholder: "e.g. Diaspora Nigerians aged 28–45 shipping cars home",
    gapTheme: "Ambiguous initial brief",
  },
  {
    key: "tone",
    step: "02",
    label: "Tone & style",
    prompt: "What should it feel like — with a real example?",
    placeholder: "e.g. Confident, warm, like [reference brand]",
    gapTheme: "Ambiguous initial brief",
  },
  {
    key: "deliverables",
    step: "03",
    label: "Deliverables",
    prompt: "What exactly gets handed over, in what formats?",
    placeholder: "e.g. 3 static posts, 1 reel, source files in .psd",
    gapTheme: "Misaligned expectations on deliverables",
  },
  {
    key: "timeline",
    step: "04",
    label: "Timeline",
    prompt: "What are the real dates — draft, feedback, final?",
    placeholder: "e.g. Draft Aug 5, feedback by Aug 8, final Aug 12",
    gapTheme: "Absence of a validation checkpoint",
  },
  {
    key: "budget",
    step: "05",
    label: "Budget",
    prompt: "What's the number, and what does it not cover?",
    placeholder: "e.g. ₦350,000 — excludes paid ad spend",
    gapTheme: "Undocumented scope changes",
  },
  {
    key: "revisions",
    step: "06",
    label: "Revision limit",
    prompt: "How many rounds are included before extra charges apply?",
    placeholder: "e.g. 2 rounds included, ₦15,000 per extra round",
    gapTheme: "Undocumented scope changes",
  },
  {
    key: "success",
    step: "07",
    label: "Success metric",
    prompt: "How will both sides know this worked?",
    placeholder: "e.g. 500 profile visits in first week",
    gapTheme: "Informal communication channel failure",
  },
];

export default function Page() {
  const [values, setValues] = useState<Record<FieldKey, string>>({
    audience: "",
    tone: "",
    deliverables: "",
    timeline: "",
    budget: "",
    revisions: "",
    success: "",
  });
  const [copied, setCopied] = useState(false);

  const filledCount = useMemo(
    () => FIELDS.filter((f) => values[f.key].trim().length > 2).length,
    [values]
  );
  const clarity = Math.round((filledCount / FIELDS.length) * 100);

  const clarityLabel =
    clarity === 100
      ? "Brief is scope-creep resistant"
      : clarity >= 60
      ? "Getting solid — a few gaps remain"
      : clarity > 0
      ? "High risk of scope creep"
      : "Not started";

  function update(key: FieldKey, v: string) {
    setValues((prev) => ({ ...prev, [key]: v }));
  }

  function handleCopy() {
    const summary = FIELDS.map(
      (f) => `${f.step} ${f.label}: ${values[f.key] || "— not specified —"}`
    ).join("\n");
    navigator.clipboard?.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="min-h-screen bg-paper px-6 py-14 md:px-10">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-10">
          <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.18em] text-ochreDark">
            Hadegold Media · Brief Check
          </p>
          <h1 className="font-display text-4xl font-medium leading-tight text-ink md:text-5xl">
            Say it now,<br />not in week three.
          </h1>
          <p className="mt-4 max-w-md font-body text-[15px] leading-relaxed text-ink/70">
            Seven questions that catch the gaps before they become unpaid
            revisions. Fill this in with your client before the work starts —
            not after.
          </p>
        </div>

        {/* Clarity meter — signature element */}
        <div className="mb-10 rounded-lg border border-line bg-white/60 p-5">
          <div className="mb-2 flex items-baseline justify-between">
            <span className="font-body text-sm font-medium text-ink">
              Scope clarity
            </span>
            <span className="font-display text-2xl text-tealDark">
              {clarity}%
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-line">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${clarity}%`,
                backgroundColor: clarity >= 60 ? "#1F5F52" : "#B9852B",
              }}
            />
          </div>
          <p className="mt-2 font-body text-xs text-muted">{clarityLabel}</p>
        </div>

        {/* Fields */}
        <div className="space-y-5">
          {FIELDS.map((f) => {
            const isFilled = values[f.key].trim().length > 2;
            return (
              <div
                key={f.key}
                className="rounded-lg border border-line bg-white/40 p-5 transition-colors"
              >
                <div className="mb-2 flex items-start gap-3">
                  <span
                    className={`mt-0.5 font-display text-sm ${
                      isFilled ? "text-tealDark" : "text-ochre"
                    }`}
                  >
                    {f.step}
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h2 className="font-display text-lg text-ink">
                        {f.label}
                      </h2>
                      <span className="font-body text-[11px] uppercase tracking-wide text-muted">
                        {f.gapTheme}
                      </span>
                    </div>
                    <p className="mt-0.5 font-body text-sm text-ink/60">
                      {f.prompt}
                    </p>
                  </div>
                </div>
                <textarea
                  value={values[f.key]}
                  onChange={(e) => update(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  rows={2}
                  className="w-full resize-none rounded-md border border-line bg-white px-3 py-2 font-body text-sm text-ink placeholder:text-muted/70 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
                />
              </div>
            );
          })}
        </div>

        {/* Export */}
        <div className="mt-10 flex flex-col items-start gap-3 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-sm text-ink/60">
            Copy this and paste it into the project agreement or client
            email.
          </p>
          <button
            onClick={handleCopy}
            className="rounded-md bg-tealDark px-5 py-2.5 font-body text-sm font-medium text-paper transition-colors hover:bg-teal"
          >
            {copied ? "Copied" : "Copy brief summary"}
          </button>
        </div>
      </div>
    </main>
  );
}
