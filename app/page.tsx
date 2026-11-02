import Link from "next/link";
import PostList from "@/components/PostList";
import SectionHeading from "@/components/SectionHeading";
import { markets } from "@/lib/markets";
import { guides } from "@/lib/guides";
import { site } from "@/lib/site";

export const revalidate = 3600;

const steps = [
  { n: "01", title: "Learn", body: "Free guides, market updates, articles and episodes that explain real estate in plain language." },
  { n: "02", title: "Ask", body: "Tell us what you're trying to do, whether you're buying, selling, investing or growing an agent business." },
  { n: "03", title: "Connect", body: "We introduce you to people we know and trust: agents, lenders and pros in the market you need." },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-crimson/35 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-48 -left-24 h-[28rem] w-[28rem] rounded-full bg-gold/20 blur-3xl" />
        <div className="container-x relative grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow !text-gold">Insights + Resources + Community</p>
            <h1 className="mt-4 text-5xl font-black leading-[1.02] md:text-7xl">
              Where real estate{" "}
              <span className="font-serif font-bold italic text-gold">connects.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/75 md:text-xl">{site.mission}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/connect" className="btn btn-primary">Get connected</Link>
              <Link href="/learn" className="btn btn-outline text-white">Start learning</Link>
            </div>
          </div>
          <div className="grid gap-4 lg:col-span-5">
            <Link href="/connect" className="group rounded-2xl bg-white p-6 text-ink shadow-2xl transition hover:-translate-y-1">
              <p className="eyebrow">For buyers and sellers</p>
              <p className="mt-2 text-2xl font-black">I'm buying or selling</p>
              <p className="mt-2 text-sm text-black/60">Get answers and a trusted local agent, at no cost to you.</p>
              <p className="font-display mt-4 text-sm font-bold text-crimson group-hover:underline">Find my connection &rarr;</p>
            </Link>
            <Link href="/agents" className="group rounded-2xl bg-gold p-6 text-ink shadow-2xl transition hover:-translate-y-1">
              <p className="eyebrow !text-ink/70">For agents and pros</p>
              <p className="mt-2 text-2xl font-black">I'm in real estate</p>
              <p className="mt-2 text-sm text-ink/70">Referrals, growth tools, coaching and a network that sends business both ways.</p>
              <p className="font-display mt-4 text-sm font-bold group-hover:underline">Join the network &rarr;</p>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="How CNX works" title="Information first. Connections when you're ready." intro="Real Estate CNX is not a brokerage. We're a media and community hub that helps you understand your options and find the right people." />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="rounded-2xl bg-paper p-7 ring-1 ring-black/5">
                <p className="font-display text-4xl font-black text-crimson/90">{s.n}</p>
                <h3 className="mt-3 text-xl font-extrabold">{s.title}</h3>
                <p className="mt-2 text-black/60">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Markets */}
      <section className="bg-paper py-20 md:py-28">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Markets" title="Starting in Arizona and Washington" intro="Local updates, guides and connections in the markets we know best, with more states joining as the network grows." />
            <Link href="/markets" className="font-display text-sm font-bold text-crimson hover:underline">All markets &rarr;</Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {markets.map((m) => (
              <Link key={m.slug} href={`/markets/${m.slug}`} className="group relative overflow-hidden rounded-3xl bg-ink p-8 text-white transition hover:-translate-y-1 md:p-10">
                <span className="font-display pointer-events-none absolute -right-4 -top-10 text-[10rem] font-black leading-none text-white/5">{m.abbr}</span>
                <p className="eyebrow !text-gold">{m.updateName}</p>
                <h3 className="mt-3 text-3xl font-black">{m.name}</h3>
                <p className="mt-3 max-w-md text-white/70">{m.intro}</p>
                <p className="mt-5 text-sm text-white/50">{m.areas.slice(0, 5).join(" · ")}</p>
                <p className="font-display mt-6 text-sm font-bold text-gold group-hover:underline">Explore {m.name} &rarr;</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Latest from CNX" title="Fresh insights" intro="Articles, news and market updates from the Real Estate CNX newsletter." />
            <a href={site.substack} target="_blank" rel="noopener noreferrer" className="font-display text-sm font-bold text-crimson hover:underline">All posts &rarr;</a>
          </div>
          <div className="mt-12"><PostList limit={3} /></div>
        </div>
      </section>

      {/* Guides */}
      <section className="bg-paper py-20 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Guides" title="Start with the basics" />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {guides.map((g) => (
              <Link key={g.slug} href={`/learn/${g.slug}`} className="group flex flex-col rounded-2xl bg-white p-6 ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl">
                <span className="w-fit rounded-full bg-gold-light px-3 py-1 text-xs font-bold text-ink">{g.audience}</span>
                <h3 className="mt-4 text-lg font-extrabold leading-snug group-hover:text-crimson">{g.title}</h3>
                <p className="mt-2 flex-1 text-sm text-black/60">{g.summary}</p>
                <p className="font-display mt-4 text-sm font-bold text-crimson">Read guide &rarr;</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Agents band */}
      <section className="bg-ink py-20 text-white md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading dark eyebrow="For agents" title="Build a network that sends business both ways." intro="Meet agents in other markets, get featured on CNX media, and grow with tools built for working agents." />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/agents" className="btn btn-gold">Join the network</Link>
              <Link href="/agents#ascend" className="btn btn-outline text-white">Agent Ascend</Link>
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {[
              ["Referral connections", "Know a trusted agent in every market your clients ask about."],
              ["Get featured", "Be a guest on the podcast, YouTube or a market update."],
              ["Agent Ascend", "Business planning and coaching to grow on purpose."],
              ["Tools", "Prompt builders for your online presence, brand and portraits."],
            ].map(([t, b]) => (
              <li key={t} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <p className="font-display font-extrabold text-gold">{t}</p>
                <p className="mt-2 text-sm text-white/70">{b}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Watch */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <div className="grid gap-8 overflow-hidden rounded-3xl bg-crimson p-8 text-white md:grid-cols-3 md:items-center md:p-12">
            <div className="md:col-span-2">
              <p className="eyebrow !text-gold-light">Watch and listen</p>
              <h2 className="mt-3 text-3xl font-black md:text-4xl">Real estate conversations, on video and in your inbox.</h2>
              <p className="mt-3 max-w-xl text-white/80">Interviews, market breakdowns and live Q&amp;A with agents, lenders and the people who make deals happen.</p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <a href="https://www.youtube.com/@RealEstateCNX" target="_blank" rel="noopener noreferrer" className="btn bg-white text-crimson hover:bg-white/90">YouTube</a>
              <a href={site.substack} target="_blank" rel="noopener noreferrer" className="btn btn-outline text-white">Substack</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
