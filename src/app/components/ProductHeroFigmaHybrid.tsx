import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BadgeCheck, Mail, Repeat, Shield, Star } from 'lucide-react';
import PluginWindowMockup from '@/app/components/PluginWindowMockup';
import { getPluginById } from '@/app/data/pluginsData';
import { siteConfig } from '@/app/config/siteConfig';

const specs = ['192kHz', '32-bit depth', '0ms latency', 'VST3 / AU / AAX'];
const microBenefits = [
  { label: 'Checkout Pending', Icon: Shield },
  { label: 'Contact Sales', Icon: Mail },
  { label: 'Lifetime Updates', Icon: Repeat },
  { label: '30-Day Guarantee', Icon: BadgeCheck },
];

export default function ProductHeroFigmaHybrid() {
  const plugin = getPluginById(siteConfig.activeProduct.id);
  const price = plugin?.price ?? siteConfig.activeProduct.price;

  return (
    <section id="home" className="relative isolate overflow-hidden border-b border-white/[0.065] bg-[#030403] pt-32 md:pt-[9.5rem]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,rgba(45,212,191,0.055),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(184,147,109,0.105),transparent_38%),linear-gradient(180deg,#030403_0%,#070806_58%,#030403_100%)]" />
      <div className="absolute inset-0 -z-10 opacity-[0.028] [background-image:linear-gradient(rgba(255,255,255,0.38)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.38)_1px,transparent_1px)] [background-size:76px_76px]" />
      <div className="absolute left-0 right-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-[#B8936D]/22 to-transparent" />

      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 px-5 pb-10 md:px-8 lg:min-h-[calc(100vh-120px)] lg:grid-cols-12 lg:items-center lg:gap-14 lg:pb-16">
        <motion.div
          className="lg:col-span-5 lg:max-w-[535px]"
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

          <h1 className="font-display text-[clamp(3.4rem,13.5vw,5rem)] font-semibold uppercase leading-[0.93] tracking-[-0.01em] text-[#F4F1EA] sm:text-[clamp(4rem,9.2vw,6.2rem)] lg:text-[clamp(4.35rem,6.1vw,7.3rem)] lg:leading-[0.9]">
            Fractal
            <span className="block">Delay</span>
          </h1>

          <p className="mt-6 font-display text-[1.45rem] italic leading-tight text-[#C7A276] md:text-[1.85rem]">
            {siteConfig.activeProduct.tagline}
          </p>

          <p className="mt-6 max-w-[520px] text-[1rem] leading-8 text-[#B7B0A6] md:text-[1.05rem]">
            Self-similar delay topologies inspired by Mandelbrot geometry. Rhythms that evolve like living structures.
          </p>

          <div className="mt-7 flex max-w-[530px] flex-wrap items-center gap-x-3 gap-y-2 border-y border-white/[0.065] py-3">
            {specs.map((spec) => (
              <span
                key={spec}
                className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#9A9994] before:mr-2 before:text-[#14B8A6] before:content-['+']"
              >
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
              Request Fractal Delay - ${price}
            </Link>
            <Link
              to="/contact"
              className="inline-flex min-h-[52px] w-full items-center justify-center border border-white/[0.095] bg-white/[0.018] px-5 py-3.5 text-center font-mono text-[9px] uppercase leading-4 tracking-[0.16em] text-[#C7A276] transition duration-300 hover:border-[#B8936D]/35 hover:bg-[#B8936D]/[0.055] focus:outline-none focus:ring-2 focus:ring-[#C7A276]/35 sm:w-auto sm:px-6 sm:text-[10px] sm:tracking-[0.2em]"
            >
              Complete Collection - ${siteConfig.activeBundle.price}
            </Link>
          </div>

          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#7F7A72]">
            Contact fallback active | checkout integration pending
          </p>
        </motion.div>

        <motion.div
          className="relative lg:col-span-7"
          initial={{ opacity: 0, y: 26, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-3 flex items-center justify-between gap-4 border-b border-[#B8936D]/18 pb-3 font-mono text-[9px] uppercase tracking-[0.18em] text-[#8B7355] sm:text-[10px]">
            <span>
              SR <strong className="text-[#C7A276]">192kHz</strong> | Depth{' '}
              <strong className="text-[#C7A276]">32-bit</strong> | Lat{' '}
              <strong className="text-[#C7A276]">0ms</strong>
            </span>
            <span>VST3 - AU - AAX</span>
          </div>

          <div className="relative mx-auto w-full max-w-[850px]">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_50%_58%,rgba(184,147,109,0.085),transparent_60%)] blur-2xl" />
            <PluginWindowMockup
              variant="delay"
              pluginName={siteConfig.activeProduct.name}
              accentColor="#B8936D"
              accentRGB="184,147,109"
            />
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
          <span key={item} className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7F7A72]">
            <span className="mr-2 text-[#14B8A6]">+</span>
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
