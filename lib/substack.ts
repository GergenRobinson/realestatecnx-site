import { site } from "./site";

export type Post = { title: string; link: string; date: string; excerpt: string; image?: string };

function pick(xml: string, tag: string) {
  const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  if (!m) return "";
  return m[1].replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "").trim();
}

function strip(html: string) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&#x27;|&rsquo;/g, "'")
    .replace(/&quot;|&ldquo;|&rdquo;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

// Pulls the latest posts from Substack's RSS feed. Re-checks every hour; returns [] if Substack is unreachable.
export async function getLatestPosts(limit = 6): Promise<Post[]> {
  try {
    const res = await fetch(`${site.substack}/feed`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const xml = await res.text();
    const items = xml.split("<item>").slice(1).map((s) => s.split("</item>")[0]);
    return items.slice(0, limit).map((item) => {
      const desc = strip(pick(item, "description"));
      const enclosure = item.match(/<enclosure[^>]*url="([^"]+)"/);
      return {
        title: strip(pick(item, "title")),
        link: pick(item, "link"),
        date: pick(item, "pubDate"),
        excerpt: desc.length > 180 ? desc.slice(0, 177) + "..." : desc,
        image: enclosure?.[1],
      };
    });
  } catch {
    return [];
  }
}
