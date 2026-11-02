import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { markets } from "@/lib/markets";
import { guides } from "@/lib/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/learn", "/markets", "/agents", "/tools", "/about", "/connect", "/privacy", "/terms",
    ...markets.map((m) => `/markets/${m.slug}`), ...guides.map((g) => `/learn/${g.slug}`)];
  return paths.map((p) => ({ url: `${site.url}${p}`, lastModified: new Date() }));
}
