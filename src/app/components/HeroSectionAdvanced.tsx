import MagneticButton from '@/app/components/advanced/MagneticButton';
import TextScramble from '@/app/components/advanced/TextScramble';

export default function HeroSectionAdvanced() {
  return (
    <section id="home" className="relative mx-auto w-full max-w-6xl px-5 pb-14 pt-34 md:px-8 md:pb-20 md:pt-42">
      <div className="absolute inset-0 -z-10 rounded-3xl bg-[radial-gradient(circle_at_18%_20%,rgba(45,212,191,0.1),transparent_50%),radial-gradient(circle_at_84%_12%,rgba(184,147,109,0.12),transparent_52%)]" />

      <p className="inline-flex rounded-full border border-[#B8936D]/40 bg-[#B8936D]/10 px-4 py-1 text-[11px] uppercase tracking-[0.24em] text-[#B8936D]">
        SCI-FI ELECTRONICS
      </p>

      <h1 className="mt-6 max-w-5xl text-balance text-4xl font-semibold leading-[1.02] text-[#F4F1EA] md:text-7xl">
        SCI-FI ELECTRONICS
      </h1>
      <p className="mt-4 text-lg uppercase tracking-[0.26em] text-[#2DD4BF] md:text-xl">
        <TextScramble text="Future Sound Tools" speed={24} delay={120} />
      </p>

      <p className="mt-8 max-w-2xl text-base leading-relaxed text-[#9A9994] md:text-lg">
        Premium audio plugins, sound systems and future-facing tools for underground electronic music producers.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <MagneticButton
          as="a"
          href="/#sound-packs"
          className="rounded-full border border-[#2DD4BF]/45 bg-[linear-gradient(120deg,rgba(45,212,191,0.24),rgba(26,77,77,0.34))] px-6 py-3 text-xs uppercase tracking-[0.16em] text-[#F4F1EA] transition-colors hover:border-[#2DD4BF]/70"
        >
          Explore Sound Packs
        </MagneticButton>
        <MagneticButton
          as="a"
          href="/plugins"
          className="rounded-full border border-[#B8936D]/45 bg-[#0C100F] px-6 py-3 text-xs uppercase tracking-[0.16em] text-[#F4F1EA] transition-colors hover:border-[#B8936D]/70 hover:bg-[#171412]"
        >
          View Upcoming Plugins
        </MagneticButton>
      </div>
    </section>
  );
}
