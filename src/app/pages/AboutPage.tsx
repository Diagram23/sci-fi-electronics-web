import Footer from '@/app/components/Footer';
import FeaturesSection from '@/app/components/FeaturesSection';
import ProductsShowcase from '@/app/components/ProductsShowcase';
import PluginShowcase from '@/app/components/PluginShowcase';
import ComingSoon from '@/app/components/ComingSoon';
import { useSEO } from '@/app/hooks/useSEO';

export default function AboutPage() {
  useSEO({
    title: 'About',
    description: 'SCI-FI ELECTRONICS is a laboratory for functional and futuristic sound tools.'
  });

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-5 pb-16 pt-36 md:px-8">
        <p className="text-xs uppercase tracking-[0.25em] text-[#2DD4BF]">About</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-[#F4F1EA] md:text-6xl">
          Built for future-facing producers.
        </h1>
        <p className="mt-7 max-w-3xl text-base leading-relaxed text-[#9A9994] md:text-lg">
          SCI-FI ELECTRONICS creates sound packs, plugins and production systems for underground electronic music. The focus is
          simple: tools with character, interfaces with intention, and sounds designed for movement, depth and atmosphere.
        </p>
      </section>
      <FeaturesSection />
      <ProductsShowcase />
      <PluginShowcase />
      <ComingSoon />
      <Footer />
    </>
  );
}
