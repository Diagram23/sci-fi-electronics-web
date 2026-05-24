import Footer from '@/app/components/Footer';
import ProductHeroPremium from '@/app/components/ProductHeroPremium';
import DawCompatibilityStrip from '@/app/components/DawCompatibilityStrip';
import ProductGrid from '@/app/components/ProductGrid';
import TrustMarquee from '@/app/components/TrustMarquee';
import ArchiveTeaser from '@/app/components/ArchiveTeaser';
import AudioDemoSection from '@/app/components/AudioDemoSection';
import TestimonialsSection from '@/app/components/TestimonialsSection';
import ComingSoon from '@/app/components/ComingSoon';
import StickyBundleCTA from '@/app/components/StickyBundleCTA';
import { HOME_ENTRY_SOURCE, HOME_HERO_COMPONENT } from '@/app/config/siteConfig';
import { useSEO } from '@/app/hooks/useSEO';
import { bundleProductSchema, fractalDelayProductSchema, seoPages } from '@/app/config/seoConfig';

export default function HomePage() {
  useSEO({
    ...seoPages.home,
    type: 'product',
    structuredData: [fractalDelayProductSchema(), bundleProductSchema()],
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
        <ProductHeroPremium />
      </div>
      <div data-home-section="compatibility" data-component="DawCompatibilityStrip" data-origin="figma-local" data-public-decision="keep">
        <DawCompatibilityStrip />
      </div>
      <div data-home-section="product-grid" data-component="ProductGrid" data-origin="figma-local" data-public-decision="keep">
        <ProductGrid />
      </div>
      <div data-home-section="trust-marquee" data-component="TrustMarquee" data-origin="figma-local" data-public-decision="keep">
        <TrustMarquee />
      </div>
      <div data-home-section="archive-teaser" data-component="ArchiveTeaser" data-origin="figma-local" data-public-decision="keep">
        <ArchiveTeaser />
      </div>
      <div data-home-section="audio-demo" data-component="AudioDemoSection" data-origin="figma-local" data-public-decision="keep">
        <AudioDemoSection />
      </div>
      <div data-home-section="testimonials" data-component="TestimonialsSection" data-origin="figma-local" data-public-decision="keep">
        <TestimonialsSection />
      </div>
      <div data-home-section="coming-soon" data-component="ComingSoon" data-origin="figma-local" data-public-decision="keep">
        <ComingSoon />
      </div>
      <div data-home-section="footer" data-component="Footer" data-origin="codex-required" data-public-decision="keep">
        <Footer />
      </div>
      <StickyBundleCTA />
    </>
  );
}
