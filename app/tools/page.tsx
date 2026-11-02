import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = { title: "Tools", description: "Free tools for real estate agents: online presence, brand guide and portrait prompt builders." };

// TODO: rebuild these three tools natively (they lived on the old Hostinger site).
const tools = [
  { name: "Online Presence Prompt Generator", body: "Build AI prompts that help you write a stronger bio, profile and social presence.", status: "Coming back soon" },
  { name: "Brand Guide Prompt Engine", body: "Create a starter brand guide for your real estate business: voice, colors and style.", status: "Coming back soon" },
  { name: "Portrait Prompt Builder", body: "Generate prompts for professional, on-brand headshots and portraits.", status: "Coming back soon" },
  { name: "Agent Ascend Business Planner", body: "Set goals, map your numbers and track your business plan. For Agent Ascend members.", status: "Members", href: "/agents#ascend" },
];

export default function ToolsPage() {
  return (
    <>
      <PageHero eyebrow="Tools" title="Free tools for agents." intro="Practical builders to sharpen your brand and grow your business. More are on the way." />
      <section className="py-16 md:py-24">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {tools.map((t) => (
            <div key={t.name} className="flex flex-col rounded-2xl bg-paper p-7 ring-1 ring-black/5">
              <span className="w-fit rounded-full bg-gold px-3 py-1 text-xs font-bold">{t.status}</span>
              <h2 className="mt-4 text-xl font-extrabold">{t.name}</h2>
              <p className="mt-2 flex-1 text-black/60">{t.body}</p>
              {t.href && <Link href={t.href} className="font-display mt-5 text-sm font-bold text-crimson hover:underline">Learn more &rarr;</Link>}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
