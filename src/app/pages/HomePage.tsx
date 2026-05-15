import Footer from '@/app/components/Footer';
import ProductHeroFigmaHybrid from '@/app/components/ProductHeroFigmaHybrid';
import TrustMarquee from '@/app/components/TrustMarquee';
import PremiumLandingSections from '@/app/components/PremiumLandingSections';
import DawCompatibilityStrip from '@/app/components/DawCompatibilityStrip';
import ArchiveTeaser from '@/app/components/ArchiveTeaser';
import BrandStatement from '@/app/components/BrandStatement';
import { HOME_ENTRY_SOURCE, HOME_HERO_COMPONENT } from '@/app/config/siteConfig';
import { useSEO } from '@/app/hooks/useSEO';

export default function HomePage() {
  useSEO({
    description:
      'Premium audio plugins, sound systems and future-facing tools for underground electronic music producers.'
  });

  return (
    <>
      <div
        data-home-section="hero"
        data-component={HOME_HERO_COMPONENT}
        data-entry-source={HOME_ENTRY_SOURCE}
        data-origin="codex-enhancement"
        data-public-decision="keep"
      >
        <ProductHeroFigmaHybrid />
      </div>
      <div data-home-section="fractal-signal-system" data-component="PremiumLandingSections" data-origin="codex-enhancement" data-public-decision="keep">
        <PremiumLandingSections />
      </div>
      <div data-home-section="trust-marquee" data-component="TrustMarquee" data-origin="figma-local" data-public-decision="keep">
        <TrustMarquee />
      </div>
      <div data-home-section="compatibility" data-component="DawCompatibilityStrip" data-origin="figma-local" data-public-decision="keep">
        <DawCompatibilityStrip />
      </div>
      <div data-home-section="archive-teaser" data-component="ArchiveTeaser" data-origin="figma-local" data-public-decision="keep">
        <ArchiveTeaser />
      </div>
      <div data-home-section="brand-statement" data-component="BrandStatement" data-origin="figma-local" data-public-decision="keep">
        <BrandStatement />
      </div>
      <div data-home-section="footer" data-component="Footer" data-origin="codex-required" data-public-decision="keep">
        <Footer />
      </div>
    </>
  );
}
