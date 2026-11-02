import { getLatestPosts } from "@/lib/substack";
import { site } from "@/lib/site";

export default async function PostList({ limit = 3 }: { limit?: number }) {
  const posts = await getLatestPosts(limit);
  if (posts.length === 0) {
    return (
      <div className="rounded-2xl bg-paper p-8 ring-1 ring-black/5">
        <p className="font-display text-lg font-bold">Read the latest on Substack</p>
        <p className="mt-1 text-black/60">Articles, market updates and news from Real Estate CNX.</p>
        <a href={site.substack} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-5">Open Substack</a>
      </div>
    );
  }
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {posts.map((p) => (
        <a
          key={p.link}
          href={p.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl"
        >
          {p.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.image} alt="" className="aspect-[16/9] w-full object-cover" loading="lazy" />
          ) : (
            <div className="aspect-[16/9] w-full bg-gradient-to-br from-ink to-crimson-dark" />
          )}
          <div className="flex flex-1 flex-col p-5">
            {p.date && <p className="text-xs font-semibold uppercase tracking-wider text-black/40">{new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>}
            <h3 className="mt-2 text-lg font-extrabold leading-snug group-hover:text-crimson">{p.title}</h3>
            <p className="mt-2 text-sm text-black/60">{p.excerpt}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
