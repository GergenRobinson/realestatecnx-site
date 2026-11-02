import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-x prose-cnx max-w-3xl text-black/75">
        <h1 className="mb-6 text-4xl font-black text-ink">Terms of use</h1>
        <p>Content on Real Estate CNX is general information and education. It is not legal, tax, financial or lending advice. Real estate rules differ by state; talk to a qualified professional about your situation.</p>
        <p>Real Estate CNX is a media and community resource and is not a real estate brokerage. Agents and professionals you are introduced to are independent and responsible for their own services.</p>
        <p>By using this site you agree not to misuse it, submit false information or attempt to disrupt it.</p>
      </div>
    </section>
  );
}
