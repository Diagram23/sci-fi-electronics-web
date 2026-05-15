export default function FeaturesSection() {
  return (
    <section className="mx-auto grid w-full max-w-6xl gap-4 px-5 py-12 md:grid-cols-[1.2fr_1fr] md:px-8 md:py-16">
      <article className="rounded-2xl border border-white/12 bg-white/[0.03] p-6 md:p-7">
        <p className="text-xs uppercase tracking-[0.24em] text-[#2DD4BF]">Built for future-facing producers.</p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#F4F1EA] md:text-lg">
          SCI-FI ELECTRONICS creates sound packs, plugins and production systems for underground electronic music. The focus is
          simple: tools with character, interfaces with intention, and sounds designed for movement, depth and atmosphere.
        </p>
      </article>

      <article className="rounded-2xl border border-white/12 bg-white/[0.03] p-6 md:p-7">
        <p className="text-xs uppercase tracking-[0.24em] text-[#B8936D]">Future Tools</p>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[#9A9994]">
          <li>Modulation systems for rhythmic pressure and movement.</li>
          <li>Focused packs for halftime, bass and atmospheric club production.</li>
          <li>Minimal interfaces designed for speed inside real sessions.</li>
        </ul>
      </article>
    </section>
  );
}
