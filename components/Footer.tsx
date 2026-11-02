import Link from "next/link";
import Newsletter from "./Newsletter";
import { nav, site } from "@/lib/site";
import { markets } from "@/lib/markets";

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-x grid gap-10 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display text-2xl font-black">
            Real Estate <span className="text-gold">CNX</span>
          </p>
          <p className="font-serif mt-2 text-lg italic text-white/80">{site.tagline}</p>
          <p className="mt-4 max-w-sm text-sm text-white/60">{site.mission}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {site.socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-white/80 transition hover:border-gold hover:text-gold"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 md:col-span-3">
          <div>
            <p className="font-display text-sm font-bold text-gold">Explore</p>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              {nav.map((n) => (
                <li key={n.href}><Link href={n.href} className="hover:text-white">{n.label}</Link></li>
              ))}
              <li><Link href="/connect" className="hover:text-white">Get connected</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-display text-sm font-bold text-gold">Markets</p>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              {markets.map((m) => (
                <li key={m.slug}><Link href={`/markets/${m.slug}`} className="hover:text-white">{m.name}</Link></li>
              ))}
              <li className="text-white/40">More coming</li>
            </ul>
          </div>
        </div>
        <div className="md:col-span-4">
          <Newsletter dark />
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x space-y-2 py-6 text-xs text-white/50">
          <p>
            Real Estate CNX is a media and community resource, not a real estate brokerage. Introductions to agents are made by{" "}
            {site.owner}, a licensed real estate agent.{" "}
            {site.licensing.map((l) => l.detail).join(" ")}
          </p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <span>&copy; {new Date().getFullYear()} Real Estate CNX</span>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <span>Equal Housing Opportunity</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
