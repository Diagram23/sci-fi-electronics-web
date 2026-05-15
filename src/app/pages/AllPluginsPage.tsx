import ProductGrid from '@/app/components/ProductGrid';
import PluginComparisonTable from '@/app/components/PluginComparisonTable';
import BundleManifesto from '@/app/components/BundleManifesto';
import DawCompatibilityStrip from '@/app/components/DawCompatibilityStrip';
import AudioDemoSection from '@/app/components/AudioDemoSection';
import Footer from '@/app/components/Footer';
import StickyBundleCTA from '@/app/components/StickyBundleCTA';
import FinalSignalCTA from '@/app/components/FinalSignalCTA';
import { useSEO } from '@/app/hooks/useSEO';

export default function AllPluginsPage() {
  useSEO({
    title: 'Plugins',
    description: 'Premium audio plugins and the complete SCI-FI ELECTRONICS signal collection.'
  });

  return (
    <>
      <div className="relative overflow-hidden border-b border-[#B8936D]/12 bg-[#050604] px-5 pb-14 pt-36 md:px-8 md:pb-20 md:pt-44">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(45,212,191,0.06),transparent_30%),radial-gradient(circle_at_84%_0%,rgba(184,147,109,0.13),transparent_34%)]" />
        <div className="absolute inset-0 opacity-[0.028] [background-image:linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="relative mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-[#B8936D]/45" />
              <p className="font-mono text-[10px] uppercase tracking-[0.36em] text-[#B8936D]">Signal Instruments</p>
            </div>
            <h1 className="mt-6 max-w-4xl font-display text-[clamp(3.4rem,8vw,8rem)] font-semibold uppercase leading-[0.86] tracking-[-0.02em] text-[#F4F1EA]">
              Plugin System
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#9A9994] [overflow-wrap:anywhere] md:text-lg">
              A boutique signal system for spatial processing, recursive time design, spectral control and harmonic pressure.
              Fractal Delay is the active product focus; the complete collection remains prepared for contact-based commercial access.
            </p>
          </div>
          <div className="border border-[#B8936D]/14 bg-[#0A0B09]/78 p-5 md:p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#8B7355]">Catalogue state</p>
            <div className="mt-5 grid grid-cols-2 gap-4">
              {[
                ['04', 'Signal modules'],
                ['$349', 'Collection intro'],
                ['VST3', 'Primary format'],
                ['Contact', 'Access mode'],
              ].map(([value, label]) => (
                <div key={label} className="border-t border-white/[0.06] pt-4">
                  <p className="font-display text-3xl italic leading-none text-[#C7A276]">{value}</p>
                  <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-[#7F7A72]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ProductGrid />
      <AudioDemoSection />
      <DawCompatibilityStrip />
      <PluginComparisonTable />
      <BundleManifesto />
      <FinalSignalCTA />
      <Footer />
      <StickyBundleCTA />
    </>
  );
}
