import { site } from "@/lib/site";

export default function Newsletter({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`rounded-2xl p-6 md:p-8 ${dark ? "bg-white/5 ring-1 ring-white/10" : "bg-paper ring-1 ring-black/5"}`}>
      <p className={`eyebrow ${dark ? "!text-gold" : ""}`}>Newsletter</p>
      <h3 className={`mt-2 text-xl font-extrabold ${dark ? "text-white" : ""}`}>Get the CNX briefing</h3>
      <p className={`mt-1 text-sm ${dark ? "text-white/70" : "text-black/60"}`}>
        Market updates, guides and new episodes, straight to your inbox. Free, delivered through Substack.
      </p>
      <iframe
        src={`${site.substack}/embed`}
        title="Subscribe to the Real Estate CNX newsletter"
        className="mt-4 h-[150px] w-full rounded-lg bg-white"
        loading="lazy"
      />
    </div>
  );
}
