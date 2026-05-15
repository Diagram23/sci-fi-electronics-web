import { CHROMA } from '@/app/data/productsData';
import MagneticButton from '@/app/components/advanced/MagneticButton';

export default function ProductsShowcase() {
  return (
    <section id="sound-packs" className="mx-auto w-full max-w-6xl px-5 py-12 md:px-8 md:py-16">
      <article className="grid gap-7 rounded-3xl border border-white/12 bg-white/[0.03] p-6 md:grid-cols-[1.35fr_1fr] md:gap-10 md:p-9">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#2DD4BF]">Sound Packs / Sample Packs</p>
          <h2 className="mt-4 text-3xl font-semibold text-[#F4F1EA] md:text-5xl">{CHROMA.name}</h2>

          <div className="mt-5 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.16em]">
            <span className="rounded-full border border-[#2DD4BF]/40 bg-[#2DD4BF]/10 px-3 py-2 text-[#F4F1EA]">Available Now</span>
            <span className="rounded-full border border-[#B8936D]/40 bg-[#B8936D]/10 px-3 py-2 text-[#B8936D]">BPM {CHROMA.bpm}</span>
            <span className="rounded-full border border-white/20 bg-white/5 px-3 py-2 text-[#9A9994]">{CHROMA.format}</span>
          </div>

          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#F4F1EA]">{CHROMA.shortCopy}</p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#9A9994] md:text-base">{CHROMA.description}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <MagneticButton
              as="a"
              href={CHROMA.listenUrl || '/contact'}
              className="rounded-full border border-white/20 bg-white/5 px-5 py-2 text-xs uppercase tracking-[0.16em] text-[#F4F1EA] transition-colors hover:border-[#B8936D]/55 hover:text-white"
            >
              Listen
            </MagneticButton>
            <MagneticButton
              as="a"
              href={CHROMA.buyUrl || '/contact'}
              className="rounded-full border border-[#B8936D]/50 bg-[linear-gradient(120deg,rgba(184,147,109,0.2),rgba(139,115,85,0.28))] px-5 py-2 text-xs uppercase tracking-[0.16em] text-[#F4F1EA] transition-colors hover:border-[#B8936D]/70"
            >
              Request Access
            </MagneticButton>
          </div>
        </div>

        <div className="space-y-4">
          <div className="h-40 rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_20%_25%,rgba(45,212,191,0.2),transparent_55%),radial-gradient(circle_at_78%_78%,rgba(184,147,109,0.24),transparent_58%),linear-gradient(140deg,#090d0c,#11100d)] md:h-52" />
          <ul className="grid gap-2.5">
            {CHROMA.features.map((feature) => (
              <li key={feature} className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-[#9A9994]">
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </section>
  );
}
