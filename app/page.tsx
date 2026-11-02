import Link from "next/link";
import PostList from "@/components/PostList";
import SectionHeading from "@/components/SectionHeading";
import { markets } from "@/lib/markets";
import { guides } from "@/lib/guides";
import { site } from "@/lib/site";

export const revalidate = 3600;

// The four content pillars from the brand guide.
const pillars = [
  { title: "Tools and AI for agents", body: "Prompts, setups and workflows you can use the same day.", cta: "Try the prompt", href: "/tools" },
  { title: "Market insight", body: "What changed, why it matters and what to do about it, starting in Arizona and Washington.", cta: "Get the market update", href: "/markets" },
  { title: "Real estate education", body: "How buying, selling and investing actually work, in plain language.", cta: "Read the guides", href: "/learn" },
  { title: "Connection and community", body: "The agents, partners and local pros behind every deal, and introductions when you need one.", cta: "Join the conversation", href: "/agents" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-ink text-white">
        <div className="container-x grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow !text-gold">Media + tools + connections</p>
            <h1 className="mt-4 text-5xl font-black leading-[1.02] md:text-7xl">
              Where real estate <span className="text-gold">connects.</span>
            </h1>
            <div className="connector mt-8 text-red-bright" aria-hidden />
            <p className="mt-8 max-w-xl text-lg text-white/80 md:text-xl">{site.mission}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/agents" className="btn btn-primary-dark">I&apos;m an agent</Link>
              <Link href="/connect" className="btn btn-outline text-white">I&apos;m buying or selling</Link>
            </div>
          </div>
          <div className="grid gap-4 lg:col-span-5">
            <Link href="/agents" className="group rounded-2xl bg-gold p-6 text-ink transition hover:-translate-y-1">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.18em]">For agents</p>
              <p className="mt-2 text-2xl font-black">Keep up. Get ahead.</p>
              <p className="mt-2 text-sm text-ink/80">Same-day tools, market updates, Agent Ascend coaching and a network that sends referrals both ways.</p>
              <p className="font-display mt-4 text-sm font-bold group-hover:underline">Join the network &rarr;</p>
            </Link>
            <Link href="/connect" className="group rounded-2xl bg-white p-6 text-ink transition hover:-translate-y-1">
              <p className="eyebrow">For buyers, sellers and investors</p>
              <p className="mt-2 text-2xl font-black">Find the right agent</p>
              <p className="mt-2 text-sm text-black/60">{site.consumerLine}</p>
              <p className="font-display mt-4 text-sm font-bold text-crimson group-hover:underline">Get connected &rarr;</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="What CNX covers" title="Useful today, not someday." intro="Every piece should leave you able to do something you couldn't do before. That's the bar." />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <Link key={p.title} href={p.href} className="group flex flex-col rounded-2xl bg-paper p-7 transition hover:-translate-y-1">
                <span className="h-4 w-4 rounded-full bg-crimson" aria-hidden />
                <h3 className="mt-5 text-xl font-extrabold">{p.title}</h3>
                <p className="mt-2 flex-1 text-black/65">{p.body}</p>
                <p className="font-display mt-5 text-sm font-bold text-crimson group-hover:underline">{p.cta} &rarr;</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Markets */}
      <section className="bg-paper py-20 md:py-28">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Market insight" title="Starting in Arizona and Washington" intro="Local updates, guides and connections where we know the ground best. More states join as the network grows." />
            <Link href="/markets" className="font-display text-sm font-bold text-crimson hover:underline">All markets &rarr;</Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {markets.map((m) => (
              <Link key={m.slug} href={`/markets/${m.slug}`} className="group relative overflow-hidden rounded-3xl bg-ink p-8 text-white transition hover:-translate-y-1 md:p-10">
                <span className="font-display pointer-events-none absolute -right-4 -top-10 text-[10rem] font-black leading-none text-white/5">{m.abbr}</span>
                <p className="eyebrow !text-gold">{m.updateName}</p>
                <h3 className="mt-3 text-3xl font-black">{m.name}</h3>
                <p className="mt-3 max-w-md text-white/75">{m.intro}</p>
                <p className="mt-5 text-sm text-white/55">{m.areas.slice(0, 5).join(" · ")}</p>
                <p className="font-display mt-6 text-sm font-bold text-gold group-hover:underline">Get the {m.abbr} update &rarr;</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Latest from CNX" title="New this week" intro="Articles, news and market updates from the Real Estate CNX newsletter." />
            <a href={site.substack} target="_blank" rel="noopener noreferrer" className="font-display text-sm font-bold text-crimson hover:underline">All posts &rarr;</a>
          </div>
          <div className="mt-12"><PostList limit={3} /></div>
        </div>
      </section>

      {/* Agents band */}
      <section className="bg-ink py-20 text-white md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading dark eyebrow="For agents" title="Build a network that sends business both ways." intro="Meet agents in other markets, get featured on CNX media and grow with Agent Ascend." />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/agents#join" className="btn btn-gold">Join the network</Link>
              <Link href="/agents#ascend" className="btn btn-outline text-white">Agent Ascend</Link>
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {[
              ["Referral connections", "Know a trusted agent in every market your clients ask about."],
              ["Get featured", "Be a guest on the podcast, YouTube or a market update."],
              ["Agent Ascend", "Business planning and coaching to grow on purpose."],
              ["Same-day tools", "Prompt engines for your online presence, brand and portraits."],
            ].map(([t, b]) => (
              <li key={t} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <p className="font-display font-extrabold text-gold">{t}</p>
                <p className="mt-2 text-sm text-white/75">{b}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Guides */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Real estate education" title="Start with the basics" />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {guides.map((g) => (
              <Link key={g.slug} href={`/learn/${g.slug}`} className="group flex flex-col rounded-2xl bg-white p-6 ring-1 ring-black/10 transition hover:-translate-y-1">
                <span className="w-fit rounded-full bg-gold px-3 py-1 text-xs font-bold text-ink">{g.audience}</span>
                <h3 className="mt-4 text-lg font-extrabold leading-snug group-hover:text-crimson">{g.title}</h3>
                <p className="mt-2 flex-1 text-sm text-black/65">{g.summary}</p>
                <p className="font-display mt-4 text-sm font-bold text-crimson">Read the guide &rarr;</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Watch */}
      <section className="pb-20 md:pb-28">
        <div className="container-x">
          <div className="grid gap-8 rounded-3xl bg-crimson p-8 text-white md:grid-cols-3 md:items-center md:p-12">
            <div className="md:col-span-2">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-white/80">Watch and listen</p>
              <h2 className="mt-3 text-3xl font-black md:text-4xl">Real estate conversations, on video and in your inbox.</h2>
              <p className="mt-3 max-w-xl text-white/85">Breakdowns, interviews and live Q&amp;A with the agents, lenders and pros who make deals happen.</p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <a href="https://www.youtube.com/@RealEstateCNX" target="_blank" rel="noopener noreferrer" className="btn bg-white text-crimson hover:bg-white/90">Watch the breakdown</a>
              <a href={site.substack} target="_blank" rel="noopener noreferrer" className="btn btn-outline text-white">Subscribe</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
