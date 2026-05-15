import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail } from 'lucide-react';
import { siteConfig } from '@/app/config/siteConfig';

const benefits = ['Contact fallback active', 'VST3 / AU / AAX target', 'Lifetime updates planned', 'No subscription'];

export default function FinalSignalCTA() {
  return (
    <section className="buildout-final-cta px-5 py-16 md:px-8 md:py-24">
      <div className="relative z-10 mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-[#B8936D]/45" />
            <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-[#C7A276]">
              Complete Signal Collection
            </p>
          </div>
          <h2 className="mt-6 max-w-4xl font-display text-[clamp(2.6rem,6.5vw,6.5rem)] font-semibold uppercase leading-[0.88] tracking-[-0.02em] text-[#F4F1EA]">
            Build the full signal system.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#9A9994] md:text-lg">
            Fractal Delay leads the current release direction. The full SCI-FI ELECTRONICS collection is prepared for
            commercial access through contact while checkout and audio delivery are connected.
          </p>
        </div>

        <div className="border border-[#B8936D]/18 bg-[#0A0B09]/82 p-5 md:p-6">
          <div className="flex items-end justify-between gap-4 border-b border-white/[0.06] pb-5">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#8B7355]">Intro collection</p>
              <p className="mt-2 font-display text-4xl italic leading-none text-[#C7A276]">$349</p>
            </div>
            <p className="max-w-[14rem] text-right text-sm leading-6 text-[#9A9994]">
              Save $107 against individual pricing.
            </p>
          </div>

          <div className="mt-5 grid gap-3">
            {benefits.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#14B8A6]/70" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#B7B0A6]">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a
              href={`mailto:${siteConfig.salesEmail}?subject=${encodeURIComponent('Complete Signal Collection access request')}`}
              className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#C7A276] px-5 text-center font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#050604] transition hover:bg-[#D8B88A]"
            >
              <Mail className="h-4 w-4" strokeWidth={1.7} />
              Contact Sales
            </a>
            <Link
              to="/plugins/fractal-delay"
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#B8936D]/24 bg-white/[0.025] px-5 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-[#C7A276] transition hover:border-[#B8936D]/45 hover:bg-[#B8936D]/[0.06]"
            >
              View Fractal Delay
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.6} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
