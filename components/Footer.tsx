import Image from "next/image";
import Link from "next/link";
import Newsletter from "./Newsletter";
import { nav, site } from "@/lib/site";
import { markets } from "@/lib/markets";

const brokerages = [
  { name: "West USA Realty", caption: "Arizona", logo: "/brokerages/west-usa-realty.png", w: 640, h: 163, size: "h-10 md:h-12" },
  { name: "John L. Scott Talent Group", caption: "Washington", logo: "/brokerages/john-l-scott-talent-group.png", w: 640, h: 308, size: "h-14 md:h-16" },
  { name: "The Cicero Group", caption: "Team", logo: "/brokerages/the-cicero-group.png", w: 640, h: 117, size: "h-8 md:h-9" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-x grid gap-10 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Image src="/cnx-compact-reversed.svg" alt="Real Estate CNX" width={686} height={368} className="h-auto w-[170px]" />
          <p className="font-display mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">{site.tagline}</p>
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
      {/* Brokerage affiliations: logos are made for light backgrounds, so they sit on a white band. */}
      <div className="bg-white text-ink">
        <div className="container-x flex flex-col items-center gap-6 py-8 md:flex-row md:justify-between">
          <p className="eyebrow shrink-0">Brokerage affiliations</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {brokerages.map((b) => (
              <li key={b.name} className="flex flex-col items-center justify-end gap-2 self-stretch">
                <Image src={b.logo} alt={b.name} width={b.w} height={b.h} className={`${b.size} w-auto`} />
                <span className="text-xs font-semibold text-black/55">{b.caption}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x space-y-2 py-6 text-xs text-white/50">
          <p>
            Real Estate CNX is a media and community resource, not a real estate brokerage. Introductions to agents are made by{" "}
            {site.owner}, licensed in Arizona and Washington.{" "}
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
