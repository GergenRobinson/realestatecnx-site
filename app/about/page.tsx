import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { photos } from "@/lib/photos";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "About", description: "Real Estate CNX is a media and community hub connecting buyers, sellers and agents with information and trusted people." };

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title="Your connection to everything real estate." intro={site.mission} image={photos.seattleNight} />
      <section className="py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="prose-cnx text-lg text-black/75 lg:col-span-7">
            <h2 className="mb-4 text-3xl font-black text-ink">Why we exist</h2>
            <p>Real estate is full of information gaps. Buyers and sellers don't know who to trust, and agents lose good clients because they don't know anyone in the market their client is moving to.</p>
            <p>Real Estate CNX (said &ldquo;Connects&rdquo;) closes those gaps. We're not a brokerage. We're a media and community hub: articles, market updates, podcasts and videos that explain what's happening, plus a growing network of agents and pros who know and trust each other.</p>
            <p>When you're ready, we make the connection, whether that's a buyer finding a great local agent or an agent finding the right partner three states away.</p>
            <h2 className="mb-4 mt-10 text-3xl font-black text-ink">Who we serve</h2>
            <ul className="dot-list mb-6 space-y-2">
              <li><strong>Real estate agents</strong> who want to stay current without the hype, and build referral relationships across markets.</li>
              <li><strong>Buyers and sellers</strong> who want straight answers before they commit.</li>
              <li><strong>Investors</strong> looking for local knowledge in new markets.</li>
            </ul>
            <h2 className="mb-4 mt-10 text-3xl font-black text-ink">Founded by {site.owner}</h2>
            <p>{site.owner} is a real estate agent licensed in Arizona and Washington and the founder of Real Estate CNX and the Agent Ascend program.</p>
          </div>
          <aside className="lg:col-span-5">
            <div className="rounded-3xl bg-white p-6 ring-1 ring-black/5">
              <Image src="/cnx-compact-color.svg" alt="Real Estate CNX" width={686} height={368} className="mx-auto w-full max-w-sm p-6" />
            </div>
            <div className="mt-6 rounded-2xl bg-ink p-7 text-white">
              <p className="font-display text-lg font-extrabold">Contact</p>
              <p className="mt-3 text-white/80">{site.owner}</p>
              <p className="text-white/80"><a href={`tel:${site.phone.replace(/[^0-9]/g, "")}`} className="hover:text-gold">{site.phone}</a></p>
              <p className="text-white/80"><a href={`mailto:${site.email}`} className="hover:text-gold">{site.email}</a></p>
              <Link href="/connect" className="btn btn-gold mt-5">Get connected</Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
