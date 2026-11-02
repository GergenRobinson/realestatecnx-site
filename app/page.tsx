import Image from "next/image";
import Link from "next/link";
import CountUp from "@/components/CountUp";
import NetworkGraphic from "@/components/NetworkGraphic";
import { photos } from "@/lib/photos";
import PostList from "@/components/PostList";
import SectionHeading from "@/components/SectionHeading";
import { markets } from "@/lib/markets";
import { guides } from "@/lib/guides";
import { site } from "@/lib/site";

export const revalidate = 3600;

const areaCount = markets.reduce((sum, m) => sum + m.areas.length, 0);

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
      <section className="relative overflow-hidden bg-ink text-white">
        <Image src={photos.phoenix.src} alt="" fill priority sizes="100vw" className="kenburns object-cover opacity-30" />
        <div className="absolute inset-0 bg-ink/60" aria-hidden />
        <div className="container-x relative grid gap-10 pb-36 pt-20 md:pb-44 md:pt-28 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <p className="eyebrow !text-gold">Media + tools + connections</p>
            <h1 className="rise mt-4 text-5xl font-black leading-[1.02] md:text-7xl">
              {["Where", "real", "estate"].map((w, i) => <span key={w} style={{ ["--i" as string]: i }}>{w}&nbsp;</span>)}
              <span className="text-gold" style={{ ["--i" as string]: 3 }}>connects.</span>
            </h1>
            <div className="connector mt-8 text-red-bright" aria-hidden />
            <p className="mt-8 max-w-xl text-lg text-white/85 md:text-xl">{site.mission}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/agents" className="btn btn-primary-dark">I&apos;m an agent</Link>
              <Link href="/connect" className="btn btn-outline text-white">I&apos;m buying or selling</Link>
            </div>
          </div>
          <div className="lg:col-span-6">
            <NetworkGraphic className="mx-auto w-full max-w-xl" />
          </div>
        </div>
      </section>

      {/* Two doors */}
      <section className="relative z-10 -mt-24 md:-mt-28">
        <div className="container-x grid gap-5 md:grid-cols-2">
          <Link href="/agents" data-reveal className="group rounded-3xl bg-gold p-8 text-ink shadow-xl transition hover:-translate-y-1 md:p-10">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.18em]">For agents</p>
            <p className="mt-2 text-3xl font-black">Keep up. Get ahead.</p>
            <p className="mt-3 text-ink/80">Same-day tools, market updates, Agent Ascend coaching and a network that sends referrals both ways.</p>
            <p className="font-display mt-5 text-sm font-bold group-hover:underline">Join the network &rarr;</p>
          </Link>
          <Link href="/connect" data-reveal style={{ ["--d" as string]: "120ms" }} className="group rounded-3xl bg-white p-8 text-ink shadow-xl ring-1 ring-black/5 transition hover:-translate-y-1 md:p-10">
            <p className="eyebrow">For buyers, sellers and investors</p>
            <p className="mt-2 text-3xl font-black">Find the right agent</p>
            <p className="mt-3 text-black/65">{site.consumerLine}</p>
            <p className="font-display mt-5 text-sm font-bold text-crimson group-hover:underline">Get connected &rarr;</p>
          </Link>
        </div>
      </section>

      {/* Ticker */}
      <section className="ticker-wrap mt-16 overflow-hidden bg-crimson py-4 text-white" aria-label="What Real Estate CNX covers">
        <div className="ticker">
          {[0, 1].map((k) => (
            <ul key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
              {["Tools and AI for agents", "AZ Snap Market Update", "Real estate education", "Agent referrals", "WA Market Update", "Connection and community", "Agent Ascend"].map((t) => (
                <li key={t} className="font-display flex items-center whitespace-nowrap px-6 text-sm font-extrabold uppercase tracking-[0.14em]">
                  <span className="mr-6 h-2.5 w-2.5 rounded-full bg-gold" aria-hidden />{t}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      {/* Numbers */}
      <section className="py-16 md:py-20">
        <div className="container-x grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {[
            { n: 2, label: "States where Gergen is licensed" },
            { n: areaCount, label: "Cities and areas covered" },
            { n: guides.length, label: "Free plain-language guides" },
            { n: 0, prefix: "$", label: "Cost to buyers and sellers" },
          ].map((s, i) => (
            <div key={s.label} data-reveal style={{ ["--d" as string]: `${i * 100}ms` }}>
              <p className="font-display text-5xl font-black text-crimson md:text-6xl"><CountUp to={s.n} prefix={s.prefix} /></p>
              <p className="mt-2 text-sm font-semibold text-black/60">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section className="pb-20 md:pb-28">
        <div className="container-x">
          <SectionHeading eyebrow="What CNX covers" title="Useful today, not someday." intro="Every piece should leave you able to do something you couldn't do before. That's the bar." />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <Link key={p.title} href={p.href} data-reveal style={{ ["--d" as string]: `${i * 100}ms` }} className="group flex flex-col rounded-2xl bg-paper p-7 transition hover:-translate-y-1">
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
            {markets.map((m, i) => (
              <Link key={m.slug} href={`/markets/${m.slug}`} data-reveal style={{ ["--d" as string]: `${i * 120}ms` }} className="zoom-on-hover group relative flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-3xl bg-ink p-8 text-white transition hover:-translate-y-1 md:p-10">
                <Image src={photos[m.photo].src} alt={photos[m.photo].alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                <div className="absolute inset-0 bg-ink/55" aria-hidden />
                <span className="font-display pointer-events-none absolute -right-4 -top-10 text-[10rem] font-black leading-none text-white/10">{m.abbr}</span>
                <div className="relative">
                  <p className="eyebrow !text-gold">{m.updateName}</p>
                  <h3 className="mt-3 text-4xl font-black">{m.name}</h3>
                  <p className="mt-3 max-w-md text-white/85">{m.intro}</p>
                  <p className="mt-5 text-sm text-white/70">{m.areas.slice(0, 5).join(" · ")}</p>
                  <p className="font-display mt-6 text-sm font-bold text-gold group-hover:underline">Get the {m.abbr} update &rarr;</p>
                </div>
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
          <div className="grid gap-4">
          <div data-reveal className="zoom-on-hover relative h-64 overflow-hidden rounded-3xl md:h-72">
            <Image src={photos.agentSign.src} alt={photos.agentSign.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-top" />
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {[
              ["Referral connections", "Know a trusted agent in every market your clients ask about."],
              ["Get featured", "Be a guest on the podcast, YouTube or a market update."],
              ["Agent Ascend", "Business planning and coaching to grow on purpose."],
              ["Same-day tools", "Prompt engines for your online presence, brand and portraits."],
            ].map(([t, b]) => (
              <li key={t} data-reveal className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <p className="font-display font-extrabold text-gold">{t}</p>
                <p className="mt-2 text-sm text-white/75">{b}</p>
              </li>
            ))}
          </ul>
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Real estate education" title="Start with the basics" />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {guides.map((g, i) => (
              <Link key={g.slug} href={`/learn/${g.slug}`} data-reveal style={{ ["--d" as string]: `${i * 100}ms` }} className="group flex flex-col rounded-2xl bg-white p-6 ring-1 ring-black/10 transition hover:-translate-y-1">
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
          <div data-reveal className="grid gap-8 rounded-3xl bg-crimson p-8 text-white md:grid-cols-3 md:items-center md:p-12">
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
