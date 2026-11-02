import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { markets } from "@/lib/markets";
import { guides } from "@/lib/guides";
import { promptTools } from "@/lib/promptTools";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/learn", "/markets", "/agents", "/tools", "/about", "/connect", "/privacy", "/terms",
    ...markets.map((m) => `/markets/${m.slug}`), ...guides.map((g) => `/learn/${g.slug}`), ...promptTools.map((t) => `/tools/${t.slug}`)];
  return paths.map((p) => ({ url: `${site.url}${p}`, lastModified: new Date() }));
}
