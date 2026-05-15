import HeroSection from '@/app/components/HeroSection';
import HeroSectionAdvanced from '@/app/components/HeroSectionAdvanced';
import ProductHeroPremium from '@/app/components/ProductHeroPremium';
import ProductHeroFigmaHybrid from '@/app/components/ProductHeroFigmaHybrid';
import Footer from '@/app/components/Footer';
import ProductGrid from '@/app/components/ProductGrid';
import AudioDemoSection from '@/app/components/AudioDemoSection';
import ArchiveTeaser from '@/app/components/ArchiveTeaser';
import BrandStatement from '@/app/components/BrandStatement';
import BrandIntro, { ENABLE_BRAND_INTRO } from '@/app/components/BrandIntro';
import { siteConfig } from '@/app/config/siteConfig';
import brandEmblem from 'figma:asset/6a48319d71f3339b74104ffc5d20862e540ee731.png';

function ReferenceHeader({ title, status }: { title: string; status: string }) {
  return (
    <div className="border-y border-[#B8936D]/18 bg-[#060706] px-5 py-5 md:px-8">
      <div className="mx-auto max-w-[1440px]">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#B8936D]/70">
          Figma reference comparison
        </p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-semibold uppercase leading-none text-[#F4F1EA] md:text-5xl">
            {title}
          </h2>
          <span className="border border-white/[0.08] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-[#9A9994]">
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function DevFigmaReferencePage() {
  return (
    <div className="bg-[#030403] text-[#F4F1EA]">
      <section className="px-5 pb-10 pt-36 md:px-8">
        <div className="mx-auto max-w-[1440px] border border-[#B8936D]/16 bg-[#0A0B09]/70 p-6 md:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#14B8A6]">
            Internal route - not public navigation
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold uppercase leading-none md:text-6xl">
            Figma Fidelity Reference
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-[#9A9994] md:text-base">
            Local comparison surface for the exported Figma/V1 candidates, current Codex-created sections,
            and the active hybrid reconstruction. Disable with <code>enableDevFigmaReference</code> before
            production if this route should not be available.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Dev route enabled', String(siteConfig.enableDevFigmaReference)],
              ['Brand intro enabled', String(ENABLE_BRAND_INTRO)],
              ['Active product', siteConfig.activeProduct.name],
              ['Legacy local V1', siteConfig.legacyFigmaProducts.join(' / ')],
            ].map(([label, value]) => (
              <div key={label} className="border border-white/[0.07] bg-white/[0.025] p-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#8B7355]">{label}</p>
                <p className="mt-2 text-sm text-[#E8E1D4]">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReferenceHeader title="BrandIntro asset" status="Figma local asset, splash disabled" />
      <section className="px-5 py-12 md:px-8">
        <div className="mx-auto grid max-w-[1440px] gap-6 md:grid-cols-[280px_1fr] md:items-center">
          <div className="border border-[#B8936D]/16 bg-[#0A0B09] p-8">
            <img src={brandEmblem} alt="SCI-FI ELECTRONICS local Figma emblem" className="mx-auto h-40 w-40 object-contain opacity-80" />
          </div>
          <div className="max-w-3xl text-sm leading-7 text-[#9A9994]">
            <p>
              `BrandIntro` remains available as a disabled optional component. It is not mounted here because
              its implementation is a fixed full-screen splash. The local Figma emblem is reused in the footer
              and previewed here without blocking the site.
            </p>
          </div>
        </div>
      </section>

      <ReferenceHeader title="HeroSection" status="Legacy candidate - not active" />
      <HeroSection />

      <ReferenceHeader title="HeroSectionAdvanced" status="Figma/V1 candidate - not active" />
      <HeroSectionAdvanced />

      <ReferenceHeader title="ProductHeroPremium" status="Codex replacement - retained as reference" />
      <ProductHeroPremium />

      <ReferenceHeader title="ProductHeroFigmaHybrid" status="Active home hero" />
      <ProductHeroFigmaHybrid />

      <ReferenceHeader title="Mounted Figma-style sections" status="Active section set" />
      <ProductGrid />
      <AudioDemoSection />
      <ArchiveTeaser />
      <BrandStatement />

      <ReferenceHeader title="Footer" status="Active footer" />
      <Footer />
    </div>
  );
}

export { BrandIntro };
