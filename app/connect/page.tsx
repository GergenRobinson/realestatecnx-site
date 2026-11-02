import type { Metadata } from "next";
import ConnectForm from "@/components/ConnectForm";
import PageHero from "@/components/PageHero";
import { photos } from "@/lib/photos";
import { markets } from "@/lib/markets";

export const metadata: Metadata = {
  title: "Get connected",
  description: "Tell us what you're looking for and we'll connect you with a trusted, licensed local agent. Free for buyers and sellers.",
};

export default async function ConnectPage({ searchParams }: { searchParams: Promise<{ state?: string }> }) {
  const { state } = await searchParams;
  const defaultState = state === "other" ? "Another state" : markets.find((m) => m.slug === state)?.name;
  return (
    <>
      <PageHero eyebrow="Get connected" title="Tell us where you're headed." intro="Buying, selling, investing or just have questions? Share a few details and we'll make a personal introduction to someone we trust. It's free, and there's no obligation." image={photos.agentSold} />
      <section className="py-16 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8"><ConnectForm defaultState={defaultState} /></div>
          <aside className="space-y-6 lg:col-span-4">
            <div className="rounded-2xl bg-paper p-6 ring-1 ring-black/5">
              <p className="font-display font-extrabold">What happens next</p>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-black/70">
                <li>We read your request personally.</li>
                <li>We reach out to learn more, usually within one business day.</li>
                <li>We introduce you to an agent or pro who fits your situation.</li>
              </ol>
            </div>
            <div className="rounded-2xl bg-paper p-6 text-sm text-black/60 ring-1 ring-black/5">
              Are you an agent? <a href="/agents#join" className="font-bold text-crimson hover:underline">Join the network instead.</a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
