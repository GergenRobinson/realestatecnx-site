import Image from "next/image";

export default function PageHero({ eyebrow, title, intro, image, children }: { eyebrow: string; title: string; intro?: string; image?: { src: string; alt: string }; children?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      {image && (
        <>
          <Image src={image.src} alt="" fill priority sizes="100vw" className="kenburns object-cover opacity-40" />
          <div className="absolute inset-0 bg-ink/55" aria-hidden />
        </>
      )}
      <div className={`container-x relative ${image ? "py-20 md:py-32" : "py-16 md:py-24"}`}>
        <p className="eyebrow !text-gold">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight md:text-6xl">{title}</h1>
        <div className="connector mt-6 text-red-bright" aria-hidden />
        {intro && <p className="mt-6 max-w-2xl text-lg text-white/85">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
