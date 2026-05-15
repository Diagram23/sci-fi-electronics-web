import { CTRL4FILTER } from '@/app/data/productsData';
import MagneticButton from '@/app/components/advanced/MagneticButton';

export default function ComingSoon() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-12 md:px-8 md:py-16">
      <article className="rounded-3xl border border-white/12 bg-white/[0.03] p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.24em] text-[#2DD4BF]">Plugin Roadmap</p>
        <h3 className="mt-3 text-3xl font-semibold text-[#F4F1EA] md:text-4xl">Upcoming: {CTRL4FILTER.name}</h3>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#9A9994] md:text-base">
          A sober development cycle focused on sound quality, modulation depth and stable performance.
        </p>

        <ol className="mt-6 space-y-3">
          {CTRL4FILTER.roadmap.map((item, index) => (
            <li key={item} className="flex items-start gap-3 text-sm text-[#9A9994]">
              <span className="mt-[2px] inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#B8936D]/45 text-[10px] text-[#B8936D]">
                {index + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-wrap gap-3">
          <MagneticButton as="a" href={CTRL4FILTER.waitlistUrl || '/contact'} className="rounded-full border border-[#2DD4BF]/45 bg-[#2DD4BF]/10 px-5 py-2 text-xs uppercase tracking-[0.16em] text-[#F4F1EA] transition-colors hover:border-[#2DD4BF]/70">
            Join Waitlist
          </MagneticButton>
          <MagneticButton as="a" href={CTRL4FILTER.contactUrl || '/contact'} className="rounded-full border border-white/20 bg-white/5 px-5 py-2 text-xs uppercase tracking-[0.16em] text-[#F4F1EA] transition-colors hover:border-[#B8936D]/55">
            Contact
          </MagneticButton>
        </div>
      </article>
    </section>
  );
}
