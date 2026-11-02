import type { Metadata } from "next";
import Link from "next/link";
import ConnectForm from "@/components/ConnectForm";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "For agents",
  description: "Join the Real Estate CNX network: referral connections across markets, media features, Agent Ascend coaching and tools for agents.",
};

const pillars = [
  { title: "Referral connections", body: "Clients moving out of your market? Need someone you trust in Phoenix or Tacoma? The network puts a known agent on the other end of every referral." },
  { title: "Media features", body: "Share your expertise as a guest on the Real Estate CNX podcast, YouTube channel or a local market update." },
  { title: "Community", body: "Events, conversations and meetups with agents who share what's working, starting in Arizona and Washington." },
  { title: "Tools", body: "Free prompt builders for your online presence, brand guide and professional portraits, with more on the way." },
];

export default function AgentsPage() {
  return (
    <>
      <PageHero eyebrow="For agents and pros" title="Your network is your net worth." intro="Real Estate CNX connects agents across markets, so referrals flow both ways and nobody has to send a client to a stranger.">
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#join" className="btn btn-gold">Join the network</a>
          <a href="#ascend" className="btn btn-outline text-white">Agent Ascend</a>
        </div>
      </PageHero>

      <section className="py-20 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="What you get" title="Built for working agents" />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <div key={p.title} className="rounded-2xl bg-paper p-6 ring-1 ring-black/5">
                <h3 className="text-lg font-extrabold">{p.title}</h3>
                <p className="mt-2 text-sm text-black/60">{p.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-black/50">
            New to referrals? Read <Link href="/learn/agent-referrals-explained" className="font-bold text-crimson hover:underline">Agent-to-agent referrals, explained</Link>.
          </p>
        </div>
      </section>

      <section id="ascend" className="scroll-mt-24 bg-ink py-20 text-white md:py-28">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
          <SectionHeading dark eyebrow="Agent Ascend" title="Plan your business. Then work the plan." intro="Agent Ascend is our coaching and business planning program for agents who want to grow on purpose: goals, numbers, habits and accountability." />
          <div className="rounded-3xl bg-white/5 p-8 ring-1 ring-white/10">
            <p className="font-display text-xl font-extrabold text-gold">Business Planner</p>
            <p className="mt-2 text-white/70">Members sign in to the Agent Ascend business planner to set goals and track progress.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={site.plannerUrl} className="btn btn-gold">Open the planner</a>
              <a href="#join" className="btn btn-outline text-white">Ask about Agent Ascend</a>
            </div>
          </div>
        </div>
      </section>

      <section id="join" className="scroll-mt-24 py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Join the network" title="Let's connect." intro="Joining is free while we build the network. Tell us about your business and how you'd like to be involved." />
          </div>
          <div className="lg:col-span-8"><ConnectForm variant="agent" /></div>
        </div>
      </section>
    </>
  );
}
