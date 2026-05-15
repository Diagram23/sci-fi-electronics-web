import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AudioLines, Clock3, GitBranch, Waves, Gauge, SlidersHorizontal } from 'lucide-react';

const features = [
  { title: 'Recursive Delay Network', copy: 'Layered repeats fold back into evolving rhythmic structures.', Icon: GitBranch },
  { title: 'Tempo-Locked Movement', copy: 'Musical timing that stays locked while the texture keeps shifting.', Icon: Clock3 },
  { title: 'Feedback Geometry', copy: 'Controlled feedback paths designed for depth without unstable clutter.', Icon: AudioLines },
  { title: 'Stereo Field Expansion', copy: 'Wide spatial motion that preserves center weight and mix focus.', Icon: Waves },
  { title: 'Low-Latency Engine', copy: 'Performance-ready response for production, resampling and live chains.', Icon: Gauge },
  { title: 'Performance-Ready Controls', copy: 'Direct parameters, readable states and fast creative decisions.', Icon: SlidersHorizontal },
];

export default function PremiumLandingSections() {
  return (
    <>
      <section className="border-b border-white/[0.065] bg-[#060706] px-5 py-[4.5rem] md:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.82fr_1.18fr] md:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.36em] text-[#B8936D]">Product Philosophy</p>
            <h2 className="mt-5 max-w-xl font-display text-[clamp(3rem,6vw,5.8rem)] font-medium leading-[0.96] text-[#F4F1EA]">
              Self-Similar Time Design
            </h2>
          </div>
          <div className="max-w-2xl">
            <p className="text-[1.05rem] leading-8 text-[#B7B0A6] md:text-lg md:leading-9">
              Fractal Delay is built around recursive delay behavior, evolving rhythmic structures and controlled feedback paths designed for deep electronic production.
            </p>
            <div className="mt-8 h-px w-full bg-gradient-to-r from-[#B8936D]/35 via-white/[0.08] to-transparent" />
          </div>
        </div>
      </section>

      <section id="plugins" className="relative overflow-hidden bg-[#030403] px-5 py-[4.5rem] md:px-8 md:py-24">
        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:100%_96px]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col justify-between gap-5 border-b border-white/[0.065] pb-8 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.36em] text-[#14B8A6]">Signal Features</p>
              <h2 className="mt-4 font-display text-[clamp(3rem,5vw,5.5rem)] font-medium leading-none text-[#E8E1D4]">
                Engineered for movement.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-[#7F7A72]">
              Technical depth without visual noise. Every control surface supports fast decisions and repeatable sound design.
            </p>
          </div>

          <div className="grid gap-x-8 gap-y-0 md:grid-cols-2 lg:grid-cols-3">
            {features.map(({ title, copy, Icon }, index) => (
              <motion.article
                key={title}
                className="group border-b border-white/[0.065] py-7 transition duration-300 hover:border-[#B8936D]/28"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: index * 0.045, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#8B7355]">
                    0{index + 1}
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center border border-[#B8936D]/16 text-[#C7A276] transition duration-300 group-hover:border-[#C7A276]/35">
                    <Icon className="h-3.5 w-3.5" strokeWidth={1.45} />
                  </div>
                </div>
                <h3 className="font-ui text-base font-semibold text-[#F4F1EA]">{title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-7 text-[#8F8981]">{copy}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="archive" className="border-y border-[#B8936D]/10 bg-[linear-gradient(180deg,#080806,#030403)] px-5 py-14 md:px-8 md:py-[4.5rem]">
        <div className="mx-auto grid max-w-6xl gap-8 border border-white/[0.075] bg-[#0A0B09]/72 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-9">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.36em] text-[#B8936D]">Bundle CTA</p>
            <h2 className="mt-4 font-display text-[clamp(3rem,5vw,5.2rem)] font-medium leading-none text-[#F4F1EA]">
              Complete Signal Collection
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#9A9994]">
              Get the full SCI-FI ELECTRONICS plugin system with intro pricing.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:min-w-[300px]">
            <Link
              to="/contact"
              className="inline-flex min-h-14 items-center justify-center border border-[#C7A276]/45 bg-[#B8936D] px-7 py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#030403] transition duration-300 hover:bg-[#C7A276] focus:outline-none focus:ring-2 focus:ring-[#C7A276]/50"
            >
              Complete Bundle - $349
            </Link>
            <p className="text-center font-mono text-[10px] uppercase tracking-[0.22em] text-[#7F7A72]">
              Save $107 - One-time license
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
