import { Link } from 'react-router-dom';
import HeroSection from '@/app/components/HeroSection';
import HeroSectionAdvanced from '@/app/components/HeroSectionAdvanced';
import ProductHeroPremium from '@/app/components/ProductHeroPremium';
import ProductHeroFigmaHybrid from '@/app/components/ProductHeroFigmaHybrid';
import ProductGrid from '@/app/components/ProductGrid';
import AudioDemoSection from '@/app/components/AudioDemoSection';
import ArchiveTeaser from '@/app/components/ArchiveTeaser';
import BrandStatement from '@/app/components/BrandStatement';
import HowItWorksSection from '@/app/components/HowItWorksSection';
import PluginComparisonTable from '@/app/components/PluginComparisonTable';
import BundleManifesto from '@/app/components/BundleManifesto';
import TestimonialsSection from '@/app/components/TestimonialsSection';
import DawCompatibilityStrip from '@/app/components/DawCompatibilityStrip';
import TrustMarquee from '@/app/components/TrustMarquee';
import Footer from '@/app/components/Footer';
import FinalSignalCTA from '@/app/components/FinalSignalCTA';
import PluginWindowMockup from '@/app/components/PluginWindowMockup';
import ProductsShowcase from '@/app/components/ProductsShowcase';
import PluginShowcase from '@/app/components/PluginShowcase';
import ComingSoon from '@/app/components/ComingSoon';
import FeaturesSection from '@/app/components/FeaturesSection';
import PremiumLandingSections from '@/app/components/PremiumLandingSections';
import OscilloscopeCanvas from '@/app/components/visuals/OscilloscopeCanvas';
import CursorToggle from '@/app/components/advanced/CursorToggle';
import Navbar from '@/app/components/Navbar';
import brandEmblem from 'figma:asset/6a48319d71f3339b74104ffc5d20862e540ee731.png';

function GalleryLabel({ title, origin, status }: { title: string; origin: string; status: string }) {
  return (
    <div className="border-y border-[#B8936D]/16 bg-[#050604] px-5 py-4 md:px-8">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#8B7355]">{origin}</p>
          <h2 className="mt-1 font-display text-2xl font-semibold uppercase text-[#F4F1EA] md:text-4xl">{title}</h2>
        </div>
        <span className="border border-white/[0.08] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-[#9A9994]">
          {status}
        </span>
      </div>
    </div>
  );
}

function StaticPreviewCard({ title, body }: { title: string; body: string }) {
  return (
    <section className="px-5 py-8 md:px-8">
      <div className="mx-auto max-w-[1440px] border border-white/[0.08] bg-[#0A0B09]/80 p-5 text-[#9A9994]">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#C7A276]">{title}</p>
        <p className="mt-3 max-w-3xl text-sm leading-7">{body}</p>
      </div>
    </section>
  );
}

function PagePreview({ title, path }: { title: string; path: string }) {
  return (
    <div className="border border-white/[0.08] bg-[#060706]">
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C7A276]">{title}</p>
        <Link to={path} className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#14B8A6]">
          Open route
        </Link>
      </div>
      <iframe title={title} src={path} className="h-[460px] w-full border-0 bg-[#030403]" />
    </div>
  );
}

export default function ComponentGalleryPage() {
  return (
    <div className="bg-[#030403] text-[#F4F1EA]">
      <section className="px-5 pb-10 pt-36 md:px-8">
        <div className="mx-auto max-w-[1440px] border border-[#B8936D]/16 bg-[#0A0B09]/78 p-6 md:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#14B8A6]">
            Internal coverage route
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold uppercase leading-none md:text-6xl">
            Component Gallery
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-[#9A9994] md:text-base">
            This route displays the major local Figma/legacy/Codex visual components so integration decisions can be made
            against the actual repo surface instead of memory.
          </p>
        </div>
      </section>

      <GalleryLabel title="BrandIntro asset" origin="figma asset" status="splash kept disabled" />
      <section className="px-5 py-10 md:px-8">
        <div className="mx-auto grid max-w-[1440px] gap-6 md:grid-cols-[280px_1fr] md:items-center">
          <div className="border border-[#B8936D]/16 bg-[#0A0B09] p-8">
            <img src={brandEmblem} alt="SCI-FI ELECTRONICS Figma emblem" className="mx-auto h-40 w-40 object-contain opacity-85" />
          </div>
          <StaticPreviewCard
            title="BrandIntro component"
            body="BrandIntro is a fixed full-screen splash. The gallery previews its real Figma asset and keeps the blocking splash disabled."
          />
        </div>
      </section>

      <GalleryLabel title="HeroSection" origin="figma/local probable" status="dev only candidate" />
      <HeroSection />

      <GalleryLabel title="HeroSectionAdvanced" origin="figma/local probable" status="dev only candidate" />
      <HeroSectionAdvanced />

      <GalleryLabel title="ProductHeroPremium" origin="codex replacement" status="dev reference" />
      <ProductHeroPremium />

      <GalleryLabel title="ProductHeroFigmaHybrid" origin="codex hybrid" status="public active" />
      <ProductHeroFigmaHybrid />

      <GalleryLabel title="PluginWindowMockup" origin="figma/local probable" status="public support component" />
      <section className="px-5 py-12 md:px-8">
        <div className="mx-auto max-w-[900px]">
          <PluginWindowMockup variant="delay" pluginName="FRACTAL DELAY" accentColor="#B8936D" accentRGB="184,147,109" />
        </div>
      </section>

      <GalleryLabel title="Legacy Figma Product Direction" origin="figma/local probable" status="not public home" />
      <FeaturesSection />
      <ProductsShowcase />
      <PluginShowcase />
      <ComingSoon />
      <PremiumLandingSections />

      <GalleryLabel title="Visual Support Components" origin="figma/local probable" status="support previews" />
      <section className="px-5 py-10 md:px-8">
        <div className="mx-auto grid max-w-[1440px] gap-6 md:grid-cols-2">
          <div className="border border-white/[0.08] bg-[#0A0B09] p-6">
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.28em] text-[#C7A276]">OscilloscopeCanvas</p>
            <OscilloscopeCanvas size={260} />
          </div>
          <div className="border border-white/[0.08] bg-[#0A0B09] p-6">
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.28em] text-[#C7A276]">CursorToggle</p>
            <CursorToggle />
          </div>
        </div>
      </section>

      <GalleryLabel title="Public Figma-style Section Set" origin="figma/local probable" status="public active" />
      <TrustMarquee />
      <ProductGrid />
      <AudioDemoSection />
      <DawCompatibilityStrip />
      <ArchiveTeaser />
      <BrandStatement />
      <HowItWorksSection />
      <PluginComparisonTable />
      <BundleManifesto />
      <TestimonialsSection />
      <FinalSignalCTA />

      <GalleryLabel title="Chrome Components" origin="mixed" status="fixed components listed, not duplicated inline" />
      <StaticPreviewCard
        title="Navbar / NavbarAdvanced / PromoBar / StickyBundleCTA / CookieConsent"
        body="These are fixed or global shell components. The public shell mounts NavbarAdvanced, PromoBar, StickyBundleCTA and CookieConsent. The original Navbar is listed in coverage but not rendered inline because it is fixed-position and would obscure this audit route."
      />
      <StaticPreviewCard
        title="Original Navbar component"
        body={`Detected component: ${Navbar.name}. It is intentionally not mounted publicly because NavbarAdvanced is the current shell and the original Navbar uses a fixed cyber/cyan style that conflicts with the current Figma-premium direction.`}
      />

      <GalleryLabel title="Page Previews" origin="public routes" status="iframe previews" />
      <section className="px-5 py-10 md:px-8">
        <div className="mx-auto grid max-w-[1440px] gap-5 lg:grid-cols-2">
          <PagePreview title="ArchivePage preview" path="/archive" />
          <PagePreview title="ContactPage preview" path="/contact" />
          <PagePreview title="FAQPage preview" path="/faq" />
          <PagePreview title="SuccessPage preview" path="/success" />
          <PagePreview title="LegalPage preview" path="/legal/license" />
          <PagePreview title="PluginDetailPage preview" path="/plugins/fractal-delay" />
        </div>
      </section>

      <GalleryLabel title="Footer" origin="active footer" status="public active" />
      <Footer />
    </div>
  );
}
