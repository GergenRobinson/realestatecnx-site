import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ToolFrame from "@/components/ToolFrame";
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
    <section className="bg-ink">
      <h1 className="sr-only">{tool.name}</h1>
      <ToolFrame src={`/tools/${tool.slug}.html`} title={tool.name} />
    </section>
  );
}
