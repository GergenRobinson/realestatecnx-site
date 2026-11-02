import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { getGuide, guides } from "@/lib/guides";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const g = getGuide((await params).slug);
  if (!g) return {};
  return { title: g.title, description: g.summary };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const g = getGuide((await params).slug);
  if (!g) notFound();
  const isAgent = g.audience === "Agents";
  return (
    <>
      <PageHero eyebrow={`Guide for ${g.audience.toLowerCase()}`} title={g.title} intro={g.summary} />
      <article className="py-16 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-8">
            {g.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="text-2xl font-black">{s.heading}</h2>
                <p className="mt-3 text-lg leading-relaxed text-black/75">{s.body}</p>
                {s.checklist && (
                  <ul className="mt-4 space-y-2">
                    {s.checklist.map((c) => (
                      <li key={c} className="flex items-start gap-3 rounded-xl bg-paper px-4 py-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-crimson text-xs font-bold text-white">&#10003;</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <p className="text-sm text-black/40">This guide is general information, not legal, tax or financial advice. Rules vary by state.</p>
          </div>
          <aside className="lg:col-span-4">
            <div className="sticky top-28 rounded-2xl bg-ink p-7 text-white">
              <p className="font-display text-xl font-extrabold">{isAgent ? "Grow your referral network" : "Want a trusted agent?"}</p>
              <p className="mt-2 text-sm text-white/70">{isAgent ? "Join Real Estate CNX and meet agents in other markets." : "We'll connect you with someone we know, at no cost to you."}</p>
              <Link href={isAgent ? "/agents#join" : "/connect"} className="btn btn-gold mt-5 w-full">{isAgent ? "Join the network" : "Get connected"}</Link>
              <Link href="/learn" className="mt-4 block text-center text-sm text-white/60 hover:text-white">&larr; All guides</Link>
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
