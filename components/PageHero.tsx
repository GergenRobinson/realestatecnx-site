export default function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro?: string; children?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-crimson/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-gold/20 blur-3xl" />
      <div className="container-x relative py-16 md:py-24">
        <p className="eyebrow !text-gold">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight md:text-6xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg text-white/75">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
