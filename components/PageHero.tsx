export default function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro?: string; children?: React.ReactNode }) {
  return (
    <section className="bg-ink text-white">
      <div className="container-x py-16 md:py-24">
        <p className="eyebrow !text-gold">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight md:text-6xl">{title}</h1>
        <div className="connector mt-6 text-red-bright" aria-hidden />
        {intro && <p className="mt-6 max-w-2xl text-lg text-white/75">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
