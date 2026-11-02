import { NextResponse } from "next/server";

const MAX = 2000;
const clean = (v: unknown) => (typeof v === "string" ? v.trim().slice(0, MAX) : "");

// Basic in-memory throttle per server instance: max 5 submissions per IP per 10 minutes.
const hits = new Map<string, number[]>();
function throttled(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (throttled(ip)) return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot filled in: pretend success, drop it.
  if (clean(body.company_website)) return NextResponse.json({ ok: true });

  const entry = {
    variant: body.variant === "agent" ? "agent" : "consumer",
    name: clean(body.name),
    email: clean(body.email),
    phone: clean(body.phone),
    need: clean(body.need),
    brokerage: clean(body.brokerage),
    state: clean(body.state),
    city: clean(body.city),
    timeline: clean(body.timeline),
    interests: Array.isArray(body.interests) ? body.interests.map(clean).filter(Boolean).slice(0, 10) : [],
    message: clean(body.message),
    consent: Boolean(body.consent),
    submittedAt: new Date().toISOString(),
  };

  if (!entry.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(entry.email)) {
    return NextResponse.json({ error: "Please enter your name and a valid email." }, { status: 400 });
  }
  if (!entry.consent) return NextResponse.json({ error: "Please check the consent box." }, { status: 400 });

  const subject =
    entry.variant === "agent"
      ? `New agent network request: ${entry.name} (${entry.state || "no state"})`
      : `New connection request: ${entry.name}, ${entry.need || "general"} (${entry.state || "no state"})`;

  const lines = Object.entries(entry)
    .filter(([, v]) => (Array.isArray(v) ? v.length : v !== "" && v !== false))
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`);

  const tasks: Promise<unknown>[] = [];

  if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) {
    tasks.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || "Real Estate CNX <onboarding@resend.dev>",
          to: process.env.CONTACT_TO_EMAIL.split(",").map((s) => s.trim()),
          reply_to: entry.email,
          subject,
          text: lines.join("\n"),
        }),
      }).then(async (r) => {
        if (!r.ok) throw new Error(`Resend ${r.status}: ${await r.text()}`);
      }),
    );
  }

  if (process.env.FORM_WEBHOOK_URL) {
    tasks.push(
      fetch(process.env.FORM_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      }).then((r) => {
        if (!r.ok) throw new Error(`Webhook ${r.status}`);
      }),
    );
  }

  // Always log so nothing is lost even before email is configured (visible in Vercel > Logs).
  console.log("[connect]", JSON.stringify(entry));

  const results = await Promise.allSettled(tasks);
  const failed = results.filter((r) => r.status === "rejected") as PromiseRejectedResult[];
  failed.forEach((f) => console.error("[connect] delivery failed:", f.reason));
  if (tasks.length > 0 && failed.length === tasks.length) {
    return NextResponse.json({ error: "We couldn't send that right now. Please email us directly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
