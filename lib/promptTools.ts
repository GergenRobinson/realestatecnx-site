// Free, client-side prompt builders for agents. Nothing is sent anywhere:
// the agent fills in a form, we assemble a prompt, they copy it into the AI tool they use.

export type Field = {
  id: string;
  label: string;
  type: "text" | "textarea" | "select";
  options?: string[];
  placeholder?: string;
  optional?: boolean;
  half?: boolean;
};

export type PromptTool = {
  slug: string;
  name: string;
  short: string;
  intro: string;
  useWith: string;
  fields: Field[];
  build: (v: Record<string, string>) => string;
};

const val = (v: Record<string, string>, k: string, fallback = "") => (v[k] ?? "").trim() || fallback;
const line = (label: string, value: string) => (value ? `- ${label}: ${value}\n` : "");

export const promptTools: PromptTool[] = [
  {
    slug: "online-presence",
    name: "Online Presence Prompt Generator",
    short: "Build AI prompts that help you write a stronger bio, profile and social presence.",
    intro: "Answer a few questions about you and your business. You'll get a ready-to-paste prompt that writes your bio, profile copy and social posts in your voice.",
    useWith: "ChatGPT, Claude, Gemini or any AI writing assistant",
    fields: [
      { id: "name", label: "Your name", type: "text", placeholder: "Jordan Lee", half: true },
      { id: "brokerage", label: "Brokerage or team", type: "text", placeholder: "Desert Ridge Realty", half: true },
      { id: "market", label: "Market you serve", type: "text", placeholder: "East Valley, Arizona", half: true },
      { id: "years", label: "Years in real estate", type: "select", options: ["Brand new", "1 to 3 years", "4 to 9 years", "10 to 19 years", "20+ years"], half: true },
      { id: "niche", label: "Who you serve best", type: "text", placeholder: "First-time buyers, military families, investors, luxury, relocation...", },
      { id: "story", label: "What makes you different", type: "textarea", placeholder: "Your background, why you got into real estate, results you're proud of, the way you work." },
      { id: "voice", label: "Tone of voice", type: "select", options: ["Warm and approachable", "Confident and polished", "Straight-talking and practical", "Energetic and fun", "Calm and trusted advisor"], half: true },
      { id: "output", label: "What do you need written?", type: "select", options: ["Everything below", "Short bio (social profiles)", "Long bio (website / About page)", "Google Business Profile description", "A week of social posts"], half: true },
      { id: "extra", label: "Anything else to include?", type: "textarea", optional: true, placeholder: "Designations, languages, community involvement, a call to action..." },
    ],
    build: (v) => {
      const out = val(v, "output", "Everything below");
      const all = out === "Everything below";
      const asks = [
        (all || out.startsWith("Short")) && "A short bio for social profiles (under 150 characters, plus a 2 to 3 sentence version).",
        (all || out.startsWith("Long")) && "A long bio for my website About page (250 to 350 words, written in first person, with a clear call to action at the end).",
        (all || out.startsWith("Google")) && "A Google Business Profile description (under 750 characters, includes my market and specialty naturally for local search).",
        (all || out.startsWith("A week")) && "Seven social media post ideas with a ready-to-post caption for each, mixing market insight, personal story, client value and community.",
      ].filter(Boolean) as string[];
      return `You are an expert real estate marketing copywriter. Help me build a stronger online presence.

About me:
${line("Name", val(v, "name", "[your name]"))}${line("Brokerage / team", val(v, "brokerage"))}${line("Market", val(v, "market", "[your market]"))}${line("Experience", val(v, "years"))}${line("Who I serve best", val(v, "niche"))}${line("What makes me different", val(v, "story"))}${line("Also include", val(v, "extra"))}
Tone of voice: ${val(v, "voice", "Warm and approachable")}.

Please write:
${asks.map((a, i) => `${i + 1}. ${a}`).join("\n")}

Guidelines:
- Sound like a real person, not a template. Avoid clichés like "dream home", "passionate about real estate" and "your trusted partner".
- Lead with the value I bring to clients, not a list of credentials.
- Keep it honest. Do not invent awards, sales numbers or reviews I didn't give you.
- Follow fair housing rules: describe properties and services, never the kind of people who should live somewhere.
- After the drafts, ask me two or three questions that would make the copy even more specific to me.`;
    },
  },
  {
    slug: "brand-guide",
    name: "Brand Guide Prompt Engine",
    short: "Create a starter brand guide for your real estate business: voice, colors and style.",
    intro: "Describe your business and the feel you're going for. You'll get a prompt that produces a complete starter brand guide: positioning, voice, colors, fonts and visual style.",
    useWith: "ChatGPT, Claude, Gemini or any AI assistant",
    fields: [
      { id: "business", label: "Business or team name", type: "text", placeholder: "The Lee Group", half: true },
      { id: "type", label: "What are you branding?", type: "select", options: ["Solo agent", "Team", "Brokerage", "Property management company", "Real estate side project or content brand"], half: true },
      { id: "market", label: "Market", type: "text", placeholder: "Tacoma and the South Sound", half: true },
      { id: "audience", label: "Ideal client", type: "text", placeholder: "Move-up buyers, downsizers, investors...", half: true },
      { id: "personality", label: "Three words for your brand's personality", type: "text", placeholder: "Grounded, modern, generous" },
      { id: "feel", label: "Visual feel", type: "select", options: ["Clean and modern", "Classic and timeless", "Bold and high-contrast", "Warm and natural", "Luxury and refined", "Coastal and relaxed", "Desert and earthy"], half: true },
      { id: "colors", label: "Colors you already use or love", type: "text", optional: true, placeholder: "Navy and brass, or 'none yet'", half: true },
      { id: "avoid", label: "Anything to avoid?", type: "text", optional: true, placeholder: "Script fonts, the color red, looking like my brokerage..." },
      { id: "brokerageRules", label: "Brokerage branding rules to respect", type: "textarea", optional: true, placeholder: "Logo placement, required disclaimers, colors you must or can't use." },
    ],
    build: (v) => `You are a brand strategist who specializes in real estate businesses. Create a practical starter brand guide for me.

About the business:
${line("Name", val(v, "business", "[business name]"))}${line("Type", val(v, "type"))}${line("Market", val(v, "market"))}${line("Ideal client", val(v, "audience"))}${line("Brand personality", val(v, "personality"))}${line("Visual feel", val(v, "feel"))}${line("Existing or favorite colors", val(v, "colors"))}${line("Avoid", val(v, "avoid"))}${line("Brokerage branding rules", val(v, "brokerageRules"))}
Please include these sections:
1. Positioning: a one-sentence positioning statement, a short tagline (offer 5 options) and the three core promises the brand makes to clients.
2. Voice and tone: how the brand sounds, with "we say / we don't say" examples for social posts, emails and listing descriptions.
3. Color palette: a primary, secondary, accent and two neutrals, each with a HEX code, what it's for and a note on readable text contrast.
4. Typography: a headline font and a body font (free Google Fonts preferred), with sizes for web and print.
5. Visual style: photography direction, graphic elements and what to avoid so the brand stays consistent.
6. Logo direction: three logo concepts described in words that I could hand to a designer or an AI image tool.
7. Quick-start checklist: the first ten places to apply the brand (email signature, social profiles, signs, business cards and so on).

Keep it practical for a busy agent. Make sure it works alongside my brokerage's required branding and real estate advertising rules, and flag anything I should check with my broker.`,
  },
  {
    slug: "portrait",
    name: "Portrait Prompt Builder",
    short: "Generate prompts for professional, on-brand headshots and portraits.",
    intro: "Pick a look for your headshot or brand portrait. You'll get a detailed prompt for an AI image tool, plus a shot list you can hand to a photographer.",
    useWith: "Midjourney, ChatGPT, Gemini, Higgsfield or another image tool. Most work best when you upload a few clear photos of yourself as a reference.",
    fields: [
      { id: "shot", label: "Type of shot", type: "select", options: ["Classic headshot (shoulders up)", "Half-body brand portrait", "Full-body lifestyle portrait", "Team or partner portrait"], half: true },
      { id: "setting", label: "Setting", type: "select", options: ["Clean studio backdrop", "Modern home interior", "In front of a listing", "Downtown city street", "Desert landscape at golden hour", "Pacific Northwest greenery", "Waterfront", "Office or coffee shop"], half: true },
      { id: "wardrobe", label: "Wardrobe", type: "text", placeholder: "Navy blazer, white open-collar shirt", half: true },
      { id: "mood", label: "Mood", type: "select", options: ["Friendly and approachable", "Confident and professional", "Relaxed and lifestyle", "Bold and editorial"], half: true },
      { id: "colors", label: "Brand colors to echo", type: "text", optional: true, placeholder: "Deep red and gold accents", half: true },
      { id: "format", label: "Format", type: "select", options: ["Square 1:1 (profile photos)", "Portrait 4:5 (Instagram, website)", "Vertical 9:16 (stories, reels covers)", "Wide 16:9 (website banner)"], half: true },
      { id: "details", label: "Anything else?", type: "textarea", optional: true, placeholder: "Glasses, hairstyle, holding keys, a dog, specific props..." },
    ],
    build: (v) => {
      const ratio = (val(v, "format", "Square 1:1").match(/(\d+:\d+)/) ?? ["1:1"])[0];
      return `AI IMAGE PROMPT
Professional real estate agent ${val(v, "shot", "classic headshot").toLowerCase()}, ${val(v, "setting", "clean studio backdrop").toLowerCase()}, wearing ${val(v, "wardrobe", "polished business casual")}, ${val(v, "mood", "friendly and approachable").toLowerCase()} expression, natural genuine smile, soft directional key light with gentle fill, shallow depth of field, shot on an 85mm lens, true-to-life skin texture, realistic proportions${val(v, "colors") ? `, subtle ${val(v, "colors")} in the styling or background` : ""}${val(v, "details") ? `, ${val(v, "details")}` : ""}. Photorealistic, high-end commercial portrait photography, clean and uncluttered composition. Aspect ratio ${ratio}.

Avoid: plastic or over-smoothed skin, distorted hands, extra fingers, warped text, logos, heavy filters, cartoon styles.

TIP: Upload 3 to 5 clear, well-lit photos of yourself as a reference so the result actually looks like you. Real estate advertising should represent you honestly, so keep edits realistic.

PHOTOGRAPHER SHOT LIST
1. ${val(v, "shot", "Classic headshot")}: ${val(v, "mood", "friendly").toLowerCase()}, eyes to camera.
2. Same look, a candid laugh or mid-conversation moment.
3. A wider frame with room for text (for flyers and website banners).
4. Setting: ${val(v, "setting", "studio")}. Wardrobe: ${val(v, "wardrobe", "business casual")}.
5. Deliver in ${val(v, "format", "square and portrait formats")}, plus one high-resolution print version.`;
    },
  },
];

export const getPromptTool = (slug: string) => promptTools.find((t) => t.slug === slug);
