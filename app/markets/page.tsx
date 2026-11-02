import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { markets } from "@/lib/markets";

export const metadata: Metadata = { title: "Markets", description: "Local real estate updates, guides and connections in Arizona and Washington, with more states coming." };

export default function MarketsPage() {
  return (
    <>
      <PageHero eyebrow="Markets" title="Local knowledge, national network." intro="We're starting where we know the ground best. Each market hub has local updates, guides and a direct line to trusted agents." />
      <section className="py-16 md:py-24">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {markets.map((m) => (
            <Link key={m.slug} href={`/markets/${m.slug}`} className="group rounded-3xl bg-ink p-8 text-white transition hover:-translate-y-1">
              <p className="font-display text-6xl font-black text-gold">{m.abbr}</p>
              <h2 className="mt-4 text-2xl font-black">{m.name}</h2>
              <p className="mt-2 text-sm text-white/70">{m.areas.join(" · ")}</p>
              <p className="font-display mt-6 text-sm font-bold text-gold group-hover:underline">Explore &rarr;</p>
            </Link>
          ))}
          <div className="rounded-3xl border-2 border-dashed border-black/15 p-8">
            <p className="font-display text-6xl font-black text-black/15">+</p>
            <h2 className="mt-4 text-2xl font-black">Your market</h2>
            <p className="mt-2 text-sm text-black/60">Need a connection somewhere else? We can still help through our agent network.</p>
            <Link href="/connect?state=other" className="font-display mt-6 inline-block text-sm font-bold text-crimson hover:underline">Ask us &rarr;</Link>
          </div>
        </div>
      </section>
    </>
  );
}
