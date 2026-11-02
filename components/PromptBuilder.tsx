"use client";

import { useMemo, useState } from "react";
import { getPromptTool } from "@/lib/promptTools";

export default function PromptBuilder({ slug }: { slug: string }) {
  const tool = getPromptTool(slug)!;
  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const prompt = useMemo(() => tool.build(values), [tool, values]);

  const set = (id: string, value: string) => {
    setValues((v) => ({ ...v, [id]: value }));
    setCopied(false);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
    } catch {
      const ta = document.getElementById("prompt-output") as HTMLTextAreaElement | null;
      ta?.select();
      document.execCommand("copy");
    }
    setCopied(true);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form onSubmit={(e) => e.preventDefault()} className="grid content-start gap-5 rounded-2xl bg-white p-6 shadow-xl shadow-black/5 ring-1 ring-black/5 md:grid-cols-2 md:p-8">
        {tool.fields.map((f) => (
          <div key={f.id} className={f.half ? "" : "md:col-span-2"}>
            <label className="label" htmlFor={f.id}>
              {f.label} {f.optional && <span className="font-normal text-black/40">(optional)</span>}
            </label>
            {f.type === "select" ? (
              <select className="field" id={f.id} value={values[f.id] ?? ""} onChange={(e) => set(f.id, e.target.value)}>
                <option value="">Choose one</option>
                {f.options!.map((o) => <option key={o}>{o}</option>)}
              </select>
            ) : f.type === "textarea" ? (
              <textarea className="field min-h-24" id={f.id} placeholder={f.placeholder} value={values[f.id] ?? ""} onChange={(e) => set(f.id, e.target.value)} />
            ) : (
              <input className="field" id={f.id} placeholder={f.placeholder} value={values[f.id] ?? ""} onChange={(e) => set(f.id, e.target.value)} />
            )}
          </div>
        ))}
      </form>

      <div className="flex flex-col rounded-2xl bg-ink p-6 text-white md:p-8 lg:sticky lg:top-24 lg:self-start">
        <div className="flex items-center justify-between gap-4">
          <p className="font-display font-extrabold">Your prompt</p>
          <button type="button" onClick={copy} className="rounded-full bg-crimson px-5 py-2 text-sm font-bold text-white transition hover:bg-red-bright">
            {copied ? "Copied" : "Copy prompt"}
          </button>
        </div>
        <p className="mt-1 text-xs text-white/60">Updates as you type. Paste it into {tool.useWith}</p>
        <textarea id="prompt-output" readOnly value={prompt} className="mt-4 h-[28rem] w-full resize-y rounded-xl bg-white/5 p-4 font-mono text-[13px] leading-relaxed text-white/90 ring-1 ring-white/10 focus:outline-none" />
        <p className="mt-3 text-xs text-white/50">Nothing you type leaves your browser. Always review AI output before you publish it.</p>
      </div>
    </div>
  );
}
