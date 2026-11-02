// The three free agent tools. Each is a self-contained single-file app in
// public/tools/<slug>.html (originally built for the Hostinger site), shown
// inside the site at /tools/<slug>. Everything runs in the visitor's browser.

export type PromptTool = { slug: string; name: string; short: string; intro: string };

export const promptTools: PromptTool[] = [
  {
    slug: "online-presence",
    name: "Online Presence Prompt Generator",
    short: "A free AI-powered audit of your online presence: one prompt delivers a scorecard, a straight-talk recap and a coaching plan.",
    intro: "See yourself the way today's buyers and today's AI see you. Enter your info once, then run the audit prompt in ChatGPT, Claude, Perplexity or Gemini.",
  },
  {
    slug: "brand-guide",
    name: "Brand Guide Prompt Engine",
    short: "Fill in your brand details once and get ready-to-paste prompts that build a complete brand guide in any AI assistant.",
    intro: "Colors, typography, voice, logo usage, visual style and applications. Build a guide from scratch or refresh the one you have.",
  },
  {
    slug: "portrait",
    name: "Portrait Prompt Builder",
    short: "Ready-to-paste prompts for professional headshots, environmental portraits, lifestyle shots and creative images in any AI tool.",
    intro: "Tell us about yourself, pick your scenarios and get prompts for ChatGPT, Gemini, Midjourney or any image tool.",
  },
];

export const getPromptTool = (slug: string) => promptTools.find((t) => t.slug === slug);
