import HeroSectionAdvanced from '@/app/components/HeroSectionAdvanced';
import FeaturesSection from '@/app/components/FeaturesSection';
import ProductsShowcase from '@/app/components/ProductsShowcase';
import PluginShowcase from '@/app/components/PluginShowcase';
import ComingSoon from '@/app/components/ComingSoon';
import TrustMarquee from '@/app/components/TrustMarquee';
import ArchiveTeaser from '@/app/components/ArchiveTeaser';
import BrandStatement from '@/app/components/BrandStatement';
import Footer from '@/app/components/Footer';
import brandEmblem from 'figma:asset/6a48319d71f3339b74104ffc5d20862e540ee731.png';

function ReconstructionNote() {
  return (
    <section className="px-5 pb-10 pt-36 md:px-8">
      <div className="mx-auto max-w-[1440px] border border-[#B8936D]/16 bg-[#0A0B09]/78 p-6 md:p-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#14B8A6]">
          Internal route - local Figma reconstruction
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold uppercase leading-none md:text-6xl">
          Original Local Export Reconstruction
        </h1>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-[#9A9994] md:text-base">
          This route prioritizes the older local Figma/legacy direction: SCI-FI ELECTRONICS brand hero, CHROMA sample-pack
          material, ctrl4filter roadmap, archive teaser and brand statement. It is not the public commercial Home; it exists
          so the active site can be compared against the local export candidates.
        </p>
        <div className="mt-6 flex items-center gap-4 border-t border-white/[0.06] pt-5">
          <img src={brandEmblem} alt="SCI-FI ELECTRONICS local Figma emblem" className="h-12 w-12 object-contain opacity-80" />
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8B7355]">
            BrandIntro asset retained, blocking splash disabled
          </p>
        </div>
      </div>
    </section>
  );
}

export default function FigmaOriginalReconstructionPage() {
  return (
    <div className="bg-[#030403] text-[#F4F1EA]">
      <ReconstructionNote />
      <HeroSectionAdvanced />
      <FeaturesSection />
      <ProductsShowcase />
      <PluginShowcase />
      <ComingSoon />
      <TrustMarquee />
      <ArchiveTeaser />
      <BrandStatement />
      <Footer />
    </div>
  );
}
