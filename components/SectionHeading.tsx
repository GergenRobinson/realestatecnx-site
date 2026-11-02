export default function SectionHeading({ eyebrow, title, intro, center = false, dark = false }: { eyebrow: string; title: string; intro?: string; center?: boolean; dark?: boolean }) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p className={`eyebrow ${dark ? "!text-gold" : ""}`}>{eyebrow}</p>
      <h2 className={`mt-3 text-3xl font-black md:text-4xl ${dark ? "text-white" : ""}`}>{title}</h2>
      {intro && <p className={`mt-4 text-lg ${dark ? "text-white/70" : "text-black/60"}`}>{intro}</p>}
    </div>
  );
}
