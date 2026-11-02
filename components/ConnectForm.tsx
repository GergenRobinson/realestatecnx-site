"use client";

import { useState } from "react";

type Variant = "consumer" | "agent";

const consumerNeeds = ["Buying a home", "Selling a home", "Buying and selling", "Investing", "Renting", "Just have questions"];
const agentInterests = ["Send referrals", "Receive referrals", "Be a podcast or video guest", "Events and meetups", "Agent Ascend coaching", "Partnering on content"];
const states = ["Arizona", "Washington", "Another state"];

export default function ConnectForm({ variant = "consumer", defaultState }: { variant?: Variant; defaultState?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = new FormData(e.currentTarget);
    const data: Record<string, unknown> = { variant };
    for (const [k, v] of form.entries()) {
      if (k === "interests") data.interests = [...((data.interests as string[]) || []), v];
      else data[k] = v;
    }
    try {
      const res = await fetch("/api/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl bg-paper p-8 text-center ring-1 ring-black/5">
        <p className="font-display text-2xl font-extrabold">Thanks, you're connected.</p>
        <p className="mt-2 text-black/60">
          {variant === "agent"
            ? "We'll reach out about the network and next steps."
            : "We'll be in touch within one business day to learn more and make the right introduction."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-2xl bg-white p-6 shadow-xl shadow-black/5 ring-1 ring-black/5 md:grid-cols-2 md:p-8">
      {/* Honeypot: hidden from people, bots fill it in. */}
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div>
        <label className="label" htmlFor="name">Full name</label>
        <input className="field" id="name" name="name" required autoComplete="name" />
      </div>
      <div>
        <label className="label" htmlFor="email">Email</label>
        <input className="field" id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div>
        <label className="label" htmlFor="phone">Phone <span className="font-normal text-black/40">(optional)</span></label>
        <input className="field" id="phone" name="phone" type="tel" autoComplete="tel" />
      </div>

      {variant === "consumer" ? (
        <div>
          <label className="label" htmlFor="need">What are you looking for?</label>
          <select className="field" id="need" name="need" required defaultValue="">
            <option value="" disabled>Choose one</option>
            {consumerNeeds.map((n) => <option key={n}>{n}</option>)}
          </select>
        </div>
      ) : (
        <div>
          <label className="label" htmlFor="brokerage">Brokerage</label>
          <input className="field" id="brokerage" name="brokerage" required />
        </div>
      )}

      <div>
        <label className="label" htmlFor="state">{variant === "agent" ? "State you're licensed in" : "State"}</label>
        <select className="field" id="state" name="state" required defaultValue={defaultState || ""}>
          <option value="" disabled>Choose one</option>
          {states.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <label className="label" htmlFor="city">{variant === "agent" ? "Cities or areas you serve" : "City or area"}</label>
        <input className="field" id="city" name="city" placeholder={variant === "agent" ? "e.g. Tacoma, Puyallup" : "e.g. Scottsdale"} />
      </div>

      {variant === "consumer" ? (
        <div className="md:col-span-2">
          <label className="label" htmlFor="timeline">Timeline</label>
          <select className="field" id="timeline" name="timeline" defaultValue="">
            <option value="">Not sure yet</option>
            <option>Within 3 months</option>
            <option>3 to 6 months</option>
            <option>6 to 12 months</option>
            <option>More than a year</option>
          </select>
        </div>
      ) : (
        <fieldset className="md:col-span-2">
          <legend className="label">I'm interested in</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {agentInterests.map((i) => (
              <label key={i} className="flex items-center gap-2 rounded-lg border border-black/10 px-3 py-2 text-sm">
                <input type="checkbox" name="interests" value={i} className="accent-crimson" /> {i}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className="md:col-span-2">
        <label className="label" htmlFor="message">{variant === "agent" ? "Tell us about your business" : "Anything else we should know?"}</label>
        <textarea className="field min-h-28" id="message" name="message" />
      </div>

      <label className="flex items-start gap-2 text-xs text-black/60 md:col-span-2">
        <input type="checkbox" name="consent" required className="mt-0.5 accent-crimson" />
        <span>I agree that Real Estate CNX may contact me by email, phone or text about my request. Real Estate CNX is not a brokerage; I may be introduced to an independent licensed agent.</span>
      </label>

      {status === "error" && <p className="text-sm font-semibold text-crimson md:col-span-2">{error}</p>}

      <div className="md:col-span-2">
        <button type="submit" className="btn btn-primary w-full md:w-auto" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : variant === "agent" ? "Join the network" : "Get connected"}
        </button>
      </div>
    </form>
  );
}
