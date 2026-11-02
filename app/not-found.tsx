import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-28 text-center">
      <div className="container-x">
        <p className="eyebrow">404</p>
        <h1 className="mt-3 text-4xl font-black">We couldn't find that page.</h1>
        <p className="mt-3 text-black/60">It may have moved when we rebuilt the site.</p>
        <Link href="/" className="btn btn-primary mt-8">Back to home</Link>
      </div>
    </section>
  );
}
