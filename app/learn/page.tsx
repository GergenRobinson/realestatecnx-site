import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import PostList from "@/components/PostList";
import SectionHeading from "@/components/SectionHeading";
import Newsletter from "@/components/Newsletter";
import { guides } from "@/lib/guides";
import { site } from "@/lib/site";

export const revalidate = 3600;
export const metadata: Metadata = { title: "Learn", description: "Real estate guides, articles, market updates and episodes for buyers, sellers, investors and agents." };

export default function LearnPage() {
  return (
    <>
      <PageHero eyebrow="Learn" title="Real estate, in plain language." intro="Guides, articles, market updates and conversations for buyers, sellers, investors and agents." />
      <section className="py-20 md:py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Guides" title="Step-by-step guides" />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {guides.map((g) => (
              <Link key={g.slug} href={`/learn/${g.slug}`} className="group rounded-2xl bg-paper p-7 ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl">
                <span className="rounded-full bg-gold px-3 py-1 text-xs font-bold">{g.audience}</span>
                <h3 className="mt-4 text-xl font-extrabold group-hover:text-crimson">{g.title}</h3>
                <p className="mt-2 text-black/60">{g.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-paper py-20 md:py-24">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Articles and news" title="From the newsletter" />
            <a href={site.substack} target="_blank" rel="noopener noreferrer" className="font-display text-sm font-bold text-crimson hover:underline">All posts on Substack &rarr;</a>
          </div>
          <div className="mt-10"><PostList limit={6} /></div>
        </div>
      </section>
      <section className="py-20 md:py-24">
        <div className="container-x grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl bg-ink p-8 text-white">
            <p className="eyebrow !text-gold">Watch</p>
            <h3 className="mt-2 text-2xl font-black">Real Estate CNX on YouTube</h3>
            <p className="mt-2 text-white/70">Episodes, market breakdowns and live conversations.</p>
            <a href="https://www.youtube.com/@RealEstateCNX" target="_blank" rel="noopener noreferrer" className="btn btn-gold mt-6">Watch now</a>
          </div>
          <Newsletter />
        </div>
      </section>
    </>
  );
}
