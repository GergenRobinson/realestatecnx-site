export type Guide = {
  slug: string;
  title: string;
  audience: "Buyers" | "Sellers" | "Agents" | "Everyone";
  summary: string;
  sections: { heading: string; body: string; checklist?: string[] }[];
};

export const guides: Guide[] = [
  {
    slug: "home-buyer-roadmap",
    title: "The home buyer roadmap",
    audience: "Buyers",
    summary: "The steps from \"thinking about it\" to keys in hand, in the order they actually happen.",
    sections: [
      {
        heading: "1. Know your numbers",
        body: "Before you look at homes, look at your monthly budget. Talk to a lender to get pre-approved, and ask for an estimate of the full monthly payment: principal, interest, taxes, insurance and any HOA dues.",
        checklist: ["Check your credit report", "Gather two years of income documents", "Get pre-approved, not just pre-qualified", "Set aside cash for closing costs and moving"],
      },
      {
        heading: "2. Pick your team",
        body: "A buyer's agent, a lender, a home inspector and, in some states, an attorney. Interview at least two agents and ask how they get paid. In most markets you now sign a written agreement with your agent before touring, so read it carefully.",
      },
      {
        heading: "3. Tour, compare and offer",
        body: "Focus on location and layout first; finishes can change. When you find the one, your agent will help you set price, earnest money, contingencies and timing.",
      },
      {
        heading: "4. Inspection to closing",
        body: "Schedule the inspection right away, review the appraisal, lock your rate and do a final walk-through before you sign. Never wire money based on an emailed instruction without calling your title company at a number you already know.",
        checklist: ["Home inspection", "Appraisal", "Final loan approval", "Homeowners insurance bound", "Final walk-through"],
      },
    ],
  },
  {
    slug: "home-seller-roadmap",
    title: "The home seller roadmap",
    audience: "Sellers",
    summary: "How to prepare, price and sell your home without leaving money on the table.",
    sections: [
      {
        heading: "1. Decide your timing",
        body: "Know where you are going next and whether you need to buy before you sell. Your agent can show you how prices and days on market shift through the year in your area.",
      },
      {
        heading: "2. Price it right",
        body: "Price comes from recent comparable sales, not from what you need or what a website estimate says. Overpricing usually means a longer time on the market and a lower final price.",
      },
      {
        heading: "3. Prepare the home",
        body: "Declutter, fix the small things buyers notice, and invest in good photos. A pre-listing inspection can help you avoid surprises.",
        checklist: ["Declutter and deep clean", "Touch-up paint and repairs", "Professional photos", "Gather disclosures, warranties and HOA documents"],
      },
      {
        heading: "4. Offers and closing",
        body: "Compare offers on more than price: financing strength, contingencies and closing date all matter. Stay responsive through inspection and appraisal to keep the deal on track.",
      },
    ],
  },
  {
    slug: "choosing-an-agent",
    title: "How to choose the right agent",
    audience: "Everyone",
    summary: "Questions to ask, red flags to watch for, and why a good referral beats a random search.",
    sections: [
      {
        heading: "Look for local, recent experience",
        body: "Ask how many clients the agent helped in your area and price range in the last year. A great agent in one city may not know the next county over.",
      },
      {
        heading: "Questions to ask",
        body: "A short interview tells you a lot.",
        checklist: ["How do you communicate, and how often?", "How are you paid, and what will I sign?", "What is your plan for my situation?", "Can I speak with two recent clients?"],
      },
      {
        heading: "Why a referral helps",
        body: "A referral comes from someone who has seen the agent work. That is why Real Estate CNX connects you with agents we know, at no cost to you.",
      },
    ],
  },
  {
    slug: "agent-referrals-explained",
    title: "Agent-to-agent referrals, explained",
    audience: "Agents",
    summary: "How referrals between agents work, what a fair agreement covers, and how to build a referral habit.",
    sections: [
      {
        heading: "How it works",
        body: "When your client is moving to a market you don't serve, you introduce them to a trusted agent there. When the deal closes, the receiving agent's brokerage pays your brokerage a referral fee, often 25 to 35 percent of the receiving side's commission.",
      },
      {
        heading: "Put it in writing",
        body: "Use a signed referral agreement before the introduction: names, the fee, when it is paid and how long it lasts. Fees are paid broker to broker, never directly to an individual, and only to licensees.",
        checklist: ["Client name and contact", "Referral fee percentage", "Expiration period", "Both brokerages' signatures"],
      },
      {
        heading: "Build the habit",
        body: "Know at least one trusted agent in every market your clients ask about. That is exactly the network Real Estate CNX is building, starting in Arizona and Washington.",
      },
    ],
  },
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}
