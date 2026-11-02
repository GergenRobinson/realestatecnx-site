import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import PromptBuilder from "@/components/PromptBuilder";
import { getPromptTool, promptTools } from "@/lib/promptTools";

export function generateStaticParams() {
  return promptTools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const tool = getPromptTool((await params).slug);
  return tool ? { title: tool.name, description: tool.short } : {};
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const tool = getPromptTool((await params).slug);
  if (!tool) notFound();
  return (
    <>
      <PageHero eyebrow="Free agent tool" title={tool.name} intro={tool.intro} />
      <section className="py-12 md:py-20">
        <div className="container-x">
          <PromptBuilder slug={tool.slug} />
          <p className="mt-10 text-sm text-black/60">
            <Link href="/tools" className="font-bold text-crimson hover:underline">&larr; All tools</Link>
          </p>
        </div>
      </section>
    </>
  );
}
