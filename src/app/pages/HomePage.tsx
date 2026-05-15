import Footer from '@/app/components/Footer';
import HeroSectionAdvanced from '@/app/components/HeroSectionAdvanced';
import TrustMarquee from '@/app/components/TrustMarquee';
import FeaturesSection from '@/app/components/FeaturesSection';
import ProductsShowcase from '@/app/components/ProductsShowcase';
import PluginShowcase from '@/app/components/PluginShowcase';
import ComingSoon from '@/app/components/ComingSoon';
import DawCompatibilityStrip from '@/app/components/DawCompatibilityStrip';
import ArchiveTeaser from '@/app/components/ArchiveTeaser';
import BrandStatement from '@/app/components/BrandStatement';
import BundleManifesto from '@/app/components/BundleManifesto';
import TestimonialsSection from '@/app/components/TestimonialsSection';
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
        data-origin="figma-local"
        data-public-decision="keep"
      >
        <HeroSectionAdvanced />
      </div>
      <div data-home-section="figma-features" data-component="FeaturesSection" data-origin="figma-local" data-public-decision="keep">
        <FeaturesSection />
      </div>
      <div data-home-section="figma-products-showcase" data-component="ProductsShowcase" data-origin="figma-local" data-public-decision="keep">
        <ProductsShowcase />
      </div>
      <div data-home-section="figma-plugin-showcase" data-component="PluginShowcase" data-origin="figma-local" data-public-decision="keep">
        <PluginShowcase />
      </div>
      <div data-home-section="figma-coming-soon" data-component="ComingSoon" data-origin="figma-local" data-public-decision="keep">
        <ComingSoon />
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
      <div data-home-section="bundle" data-component="BundleManifesto" data-origin="figma-local" data-public-decision="keep">
        <BundleManifesto />
      </div>
      <div data-home-section="testimonials" data-component="TestimonialsSection" data-origin="figma-local" data-public-decision="keep">
        <TestimonialsSection />
      </div>
      <div data-home-section="footer" data-component="Footer" data-origin="codex-required" data-public-decision="keep">
        <Footer />
      </div>
    </>
  );
}
