import { CTRL4FILTER } from '@/app/data/productsData';
import MagneticButton from '@/app/components/advanced/MagneticButton';

export default function PluginShowcase() {
  return (
    <section id="plugins" className="mx-auto w-full max-w-6xl px-5 py-12 md:px-8 md:py-16">
      <article className="grid gap-7 rounded-3xl border border-white/12 bg-white/[0.03] p-6 md:grid-cols-[1.25fr_1fr] md:gap-10 md:p-9">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#2DD4BF]">Plugins</p>
          <h2 className="mt-4 text-3xl font-semibold text-[#F4F1EA] md:text-5xl">{CTRL4FILTER.name}</h2>

          <div className="mt-5 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.16em]">
            <span className="rounded-full border border-[#B8936D]/40 bg-[#B8936D]/10 px-3 py-2 text-[#B8936D]">In Development</span>
            <span className="rounded-full border border-white/20 bg-white/5 px-3 py-2 text-[#9A9994]">{CTRL4FILTER.format}</span>
          </div>

          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#F4F1EA]">{CTRL4FILTER.shortCopy}</p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#9A9994] md:text-base">{CTRL4FILTER.description}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <MagneticButton
              as="a"
              href={CTRL4FILTER.waitlistUrl || '/contact'}
              className="rounded-full border border-[#2DD4BF]/45 bg-[linear-gradient(120deg,rgba(45,212,191,0.2),rgba(26,77,77,0.34))] px-5 py-2 text-xs uppercase tracking-[0.16em] text-[#F4F1EA] transition-colors hover:border-[#2DD4BF]/70"
            >
              Join Waitlist
            </MagneticButton>
            <MagneticButton
              as="a"
              href={CTRL4FILTER.contactUrl || '/contact'}
              className="rounded-full border border-white/20 bg-white/5 px-5 py-2 text-xs uppercase tracking-[0.16em] text-[#F4F1EA] transition-colors hover:border-[#B8936D]/50"
            >
              Contact
            </MagneticButton>
          </div>
        </div>

        <div className="space-y-4">
          <div className="h-40 rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_25%_20%,rgba(45,212,191,0.18),transparent_52%),radial-gradient(circle_at_70%_80%,rgba(184,147,109,0.18),transparent_55%),linear-gradient(145deg,#090c0b,#0f1110)] md:h-52" />
          <div className="grid gap-2.5">
            {CTRL4FILTER.features.map((feature) => (
              <div key={feature} className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-[#9A9994]">
                {feature}
              </div>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
}
