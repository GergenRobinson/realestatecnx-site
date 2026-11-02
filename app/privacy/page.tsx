import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-x prose-cnx max-w-3xl text-black/75">
        <h1 className="mb-6 text-4xl font-black text-ink">Privacy</h1>
        <p>When you submit a form on this site, we collect the details you provide (such as your name, email, phone, location and message) so we can respond and, if you ask, introduce you to a licensed real estate professional.</p>
        <p>We share your details only with the professional we introduce you to, and only for your request. We do not sell your information.</p>
        <p>Newsletter sign-ups are handled by Substack under its own privacy policy.</p>
        <p>To update or delete your information, email <a className="text-crimson" href={`mailto:${site.email}`}>{site.email}</a>.</p>
      </div>
    </section>
  );
}
