import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Shield, Download, Repeat, BadgeCheck, Star } from 'lucide-react';
import PluginWindowMockup from '@/app/components/PluginWindowMockup';
import { getPluginById } from '@/app/data/pluginsData';

const specs = ['192kHz', '32-bit depth', '0ms latency', 'VST3 / AU / AAX'];
const microBenefits = [
  { label: 'Secure Checkout', Icon: Shield },
  { label: 'Instant Download', Icon: Download },
  { label: 'Lifetime Updates', Icon: Repeat },
  { label: '30-Day Guarantee', Icon: BadgeCheck },
];

export default function ProductHeroPremium() {
  const plugin = getPluginById('fractal-delay');

  return (
    <section id="home" className="relative isolate overflow-hidden border-b border-white/[0.065] pt-32 md:pt-[9.75rem]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_76%_28%,rgba(184,147,109,0.085),transparent_32%),radial-gradient(circle_at_20%_12%,rgba(45,212,191,0.038),transparent_30%),linear-gradient(180deg,#030403_0%,#060706_56%,#030403_100%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-[#B8936D]/20 to-transparent" />
      <div className="absolute inset-0 -z-10 opacity-[0.032] [background-image:linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:84px_84px]" />

      <div className="mx-auto grid min-h-[calc(100vh-118px)] w-full max-w-[1440px] grid-cols-1 gap-10 overflow-hidden px-5 pb-14 md:px-8 lg:grid-cols-12 lg:items-center lg:gap-16 lg:overflow-visible lg:pb-[4.5rem]">
        <motion.div
          className="lg:col-span-5 lg:max-w-[540px]"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-6 flex items-center gap-4">
            <span className="h-px w-9 bg-[#B8936D]/45" />
            <p className="font-mono text-[9px] uppercase tracking-[0.36em] text-[#C7A276] sm:text-[10px]">
              Reference Signal Architecture
            </p>
          </div>

          <h1 className="pb-1 font-display text-[clamp(3.25rem,14vw,5rem)] font-semibold uppercase leading-[0.93] tracking-[-0.015em] text-[#F4F1EA] sm:text-[clamp(4rem,10vw,6.4rem)] lg:text-[clamp(4.5rem,6.4vw,7.4rem)] lg:leading-[0.9] xl:text-[clamp(5rem,6.6vw,8rem)]">
            Fractal
            <span className="block">Delay</span>
          </h1>

          <p className="mt-6 font-display text-[1.55rem] italic leading-tight text-[#C7A276] md:text-[1.9rem]">
            Time Manipulation Engine
          </p>

          <p className="mt-6 max-w-[520px] text-[1rem] leading-8 text-[#B7B0A6] [overflow-wrap:anywhere] md:text-[1.05rem]">
            Self-similar delay topologies inspired by Mandelbrot geometry. Rhythms that evolve like living structures.
          </p>

          <div className="mt-7 flex max-w-[530px] flex-wrap items-center gap-x-3 gap-y-2 border-y border-white/[0.07] py-3">
            {specs.map((spec) => (
              <span key={spec} className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#9A9994] before:mr-2 before:text-[#14B8A6] before:content-['+']">
                {spec}
              </span>
            ))}
          </div>

          <div className="mt-7 flex items-center justify-between gap-5">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#C7A276]">3,200+ producers</p>
              <p className="mt-1 text-sm text-[#7F7A72]">Trusted by underground electronic creators.</p>
            </div>
            <div className="hidden items-center gap-1 text-[#C7A276] sm:flex" aria-label="Rated five stars">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-3.5 w-3.5 fill-current" strokeWidth={1.4} />
              ))}
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="group inline-flex min-h-[52px] w-full items-center justify-center border border-[#C7A276]/45 bg-[linear-gradient(135deg,rgba(199,162,118,0.92),rgba(139,115,85,0.78))] px-5 py-3.5 text-center font-mono text-[9px] font-semibold uppercase leading-4 tracking-[0.16em] text-[#060706] shadow-[0_16px_44px_rgba(0,0,0,0.42)] transition duration-300 hover:border-[#E8E1D4]/50 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#C7A276]/55 sm:w-auto sm:px-6 sm:text-[10px] sm:tracking-[0.2em]"
            >
              Acquire Fractal Delay - ${plugin?.price ?? 129}
            </Link>
            <Link
              to="/contact"
              className="inline-flex min-h-[52px] w-full items-center justify-center border border-white/[0.095] bg-white/[0.018] px-5 py-3.5 text-center font-mono text-[9px] uppercase leading-4 tracking-[0.16em] text-[#C7A276] transition duration-300 hover:border-[#B8936D]/35 hover:bg-[#B8936D]/[0.055] focus:outline-none focus:ring-2 focus:ring-[#C7A276]/35 sm:w-auto sm:px-6 sm:text-[10px] sm:tracking-[0.2em]"
            >
              Complete Collection - $349
            </Link>
          </div>

          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#7F7A72]">
            Secure Checkout | Instant Download
          </p>
        </motion.div>

        <motion.div
          className="relative lg:col-span-7"
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-3 flex items-center justify-between gap-4 border-b border-[#B8936D]/18 pb-3 font-mono text-[9px] uppercase tracking-[0.18em] text-[#8B7355] sm:text-[10px]">
            <span>SR <strong className="text-[#C7A276]">192kHz</strong> | Depth <strong className="text-[#C7A276]">32-bit</strong> | Lat <strong className="text-[#C7A276]">0ms</strong></span>
            <span>VST3 - AU - AAX</span>
          </div>
          <div className="relative mx-auto w-full max-w-[860px]">
            <div className="absolute -inset-6 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(184,147,109,0.095),transparent_58%)] blur-2xl" />
            <div className="origin-center">
              <PluginWindowMockup
                variant="delay"
                pluginName="FRACTAL DELAY"
                accentColor="#B8936D"
                accentRGB="184,147,109"
              />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-white/[0.06] pt-4 md:grid-cols-4">
            {microBenefits.map(({ label, Icon }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="h-3.5 w-3.5 text-[#14B8A6]" strokeWidth={1.6} />
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#9A9994]">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/[0.045] px-5 pb-8 pt-5 md:px-8">
        {['Recursive Delay Network', 'Tempo-Locked Movement', 'Feedback Geometry'].map((item) => (
          <span key={item} className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#7F7A72]">
            <Check className="h-3 w-3 text-[#14B8A6]" strokeWidth={1.8} />
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
