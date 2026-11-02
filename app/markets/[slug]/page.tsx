import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { getMarket, markets } from "@/lib/markets";
import { guides } from "@/lib/guides";
import { site } from "@/lib/site";
import { photos } from "@/lib/photos";

export function generateStaticParams() {
  return markets.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const m = getMarket((await params).slug);
  if (!m) return {};
  return { title: `${m.name} real estate`, description: m.intro };
}

export default async function MarketPage({ params }: { params: Promise<{ slug: string }> }) {
  const m = getMarket((await params).slug);
  if (!m) notFound();
  return (
    <>
      <PageHero eyebrow={`${m.name} hub`} title={`${m.name} real estate, connected.`} intro={m.intro} image={photos[m.photo]}>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={`/connect?state=${m.slug}`} className="btn btn-primary">Get connected in {m.name}</Link>
          <a href={site.substack} target="_blank" rel="noopener noreferrer" className="btn btn-outline text-white">Read the {m.updateName}</a>
        </div>
      </PageHero>
      <section className="py-20 md:py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Start here" title={`What to know about ${m.name}`} />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {m.highlights.map((h) => (
              <div key={h.title} data-reveal className="rounded-2xl bg-paper p-6 ring-1 ring-black/5">
                <h3 className="text-lg font-extrabold">{h.title}</h3>
                <p className="mt-2 text-sm text-black/60">{h.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-paper py-20 md:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Areas" title="Where we help" intro="Don't see your city? Ask anyway. Our network keeps growing." />
            <div className="mt-6 flex flex-wrap gap-2">
              {m.areas.map((a) => (
                <span key={a} className="rounded-full bg-white px-4 py-2 text-sm font-semibold ring-1 ring-black/10">{a}</span>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Guides" title="Helpful reads" />
            <ul className="mt-6 space-y-3">
              {guides.map((g) => (
                <li key={g.slug}>
                  <Link href={`/learn/${g.slug}`} className="flex items-center justify-between rounded-xl bg-white px-5 py-4 font-semibold ring-1 ring-black/5 hover:text-crimson">
                    {g.title} <span aria-hidden>&rarr;</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
