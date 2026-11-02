import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { promptTools } from "@/lib/promptTools";

export const metadata: Metadata = { title: "Tools", description: "Free tools for real estate agents: online presence, brand guide and portrait prompt builders." };

const tools = [
  ...promptTools.map((t) => ({ name: t.name, body: t.short, status: "Free", href: `/tools/${t.slug}`, cta: "Open tool" })),
  { name: "Agent Ascend Business Planner", body: "Set goals, map your numbers and track your business plan. For Agent Ascend members.", status: "Members", href: "/agents#ascend", cta: "Learn more" },
];

export default function ToolsPage() {
  return (
    <>
      <PageHero eyebrow="Tools" title="Free tools for agents." intro="Practical builders to sharpen your brand and grow your business. Free, no sign-up, and nothing you type leaves your browser." />
      <section className="py-16 md:py-24">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {tools.map((t) => (
            <div key={t.name} className="flex flex-col rounded-2xl bg-paper p-7 ring-1 ring-black/5">
              <span className="w-fit rounded-full bg-gold px-3 py-1 text-xs font-bold">{t.status}</span>
              <h2 className="mt-4 text-xl font-extrabold">{t.name}</h2>
              <p className="mt-2 flex-1 text-black/60">{t.body}</p>
              <Link href={t.href} className="font-display mt-5 text-sm font-bold text-crimson hover:underline">{t.cta} &rarr;</Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
