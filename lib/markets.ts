export type Market = {
  slug: string;
  name: string;
  abbr: string;
  intro: string;
  areas: string[];
  highlights: { title: string; body: string }[];
  updateName: string;
};

export const markets: Market[] = [
  {
    slug: "arizona",
    name: "Arizona",
    abbr: "AZ",
    intro:
      "From the Valley to Tucson and the high country, Arizona keeps drawing movers, retirees and investors. Here is where to start, and who to talk to.",
    areas: ["Phoenix", "Scottsdale", "Mesa", "Chandler", "Gilbert", "Tucson", "Flagstaff", "Prescott"],
    highlights: [
      {
        title: "AZ Snap Market Update",
        body: "Quick, plain-language reads on prices, inventory and days on market across Arizona, published on our Substack and YouTube.",
      },
      {
        title: "Moving to Arizona",
        body: "Heat, HOAs, pools, solar and water: the questions newcomers ask most, answered before you start touring.",
      },
      {
        title: "Investing in Arizona",
        body: "Short-term rental rules vary by city. Get connected with someone who knows the local ordinances before you buy.",
      },
    ],
    updateName: "AZ Snap Market Update",
  },
  {
    slug: "washington",
    name: "Washington",
    abbr: "WA",
    intro:
      "Seattle, Tacoma and the South Sound, Spokane and beyond. Washington markets move differently from one county to the next, so local knowledge matters.",
    areas: ["Seattle", "Tacoma", "Puyallup", "Olympia", "Bellevue", "Everett", "Vancouver", "Spokane"],
    highlights: [
      {
        title: "WA Market Update",
        body: "Regular check-ins on what is happening in the Puget Sound and across the state, in plain language.",
      },
      {
        title: "Buying in the Puget Sound",
        body: "Commutes, school boundaries, inspections in a wet climate and how competitive offers work right now.",
      },
      {
        title: "Selling in Washington",
        body: "Disclosure requirements, prep that pays off and timing your list date around the local season.",
      },
    ],
    updateName: "WA Market Update",
  },
];

export function getMarket(slug: string) {
  return markets.find((m) => m.slug === slug);
}
