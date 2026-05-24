import { ArrowUpRight, Mail } from 'lucide-react';
import Footer from '@/app/components/Footer';
import { siteConfig } from '@/app/config/siteConfig';
import { useSEO } from '@/app/hooks/useSEO';
import { seoPages } from '@/app/config/seoConfig';

const contactBlocks = [
  {
    label: 'General',
    heading: 'Studio and brand inquiries',
    description: 'Use this channel for general SCI-FI ELECTRONICS questions and non-urgent messages.',
    email: siteConfig.generalEmail,
    accent: '184,147,109',
  },
  {
    label: 'Support',
    heading: 'Product support',
    description: 'Send product access, install, license and compatibility requests here.',
    email: siteConfig.supportEmail,
    accent: '45,212,191',
  },
  {
    label: 'Sales / Licensing',
    heading: 'Commercial purchase flow',
    description: 'Use this for bundle purchases, institutional licensing and manual checkout while store integration is pending.',
    email: siteConfig.salesEmail,
    accent: '199,162,118',
  },
  {
    label: 'Collaborations',
    heading: 'Artists and technical partners',
    description: 'For beta testing, sound design collaborations, music tech partnerships and label-adjacent projects.',
    email: siteConfig.collaborationsEmail,
    accent: '20,184,166',
  },
  {
    label: 'Press / Archive',
    heading: 'Editorial and signal archive',
    description: 'Use this for press notes, archive material, release context and brand documentation requests.',
    email: siteConfig.generalEmail,
    accent: '139,115,85',
  },
];

export default function ContactPage() {
  useSEO(seoPages.contact);

  return (
    <>
      <section id="contact" className="relative overflow-hidden border-b border-white/[0.06] bg-[#030403] px-5 pb-16 pt-36 md:px-8 md:pb-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,rgba(184,147,109,0.1),transparent_34%),radial-gradient(circle_at_86%_18%,rgba(45,212,191,0.045),transparent_32%)]" />
        <div className="absolute inset-0 -z-10 opacity-[0.026] [background-image:linear-gradient(rgba(255,255,255,0.38)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.38)_1px,transparent_1px)] [background-size:76px_76px]" />

        <div className="mx-auto max-w-[1440px]">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4">
              <span className="h-px w-9 bg-[#B8936D]/45" />
              <p className="font-mono text-[10px] uppercase tracking-[0.36em] text-[#C7A276]">
                Signal inquiries
              </p>
            </div>

            <h1 className="mt-6 max-w-[10ch] break-words font-display text-[clamp(2.15rem,9.6vw,7.5rem)] font-semibold uppercase leading-[0.92] tracking-[-0.01em] text-[#F4F1EA] [overflow-wrap:anywhere] sm:max-w-full">
              Contact SCI-FI ELECTRONICS
            </h1>
            <p className="mt-6 max-w-[34ch] text-base leading-8 text-[#B7B0A6] [overflow-wrap:anywhere] sm:max-w-2xl md:text-lg">
              Support, licensing, collaborations and signal inquiries. No fake forms, no automated checkout claims:
              messages route to the right inbox while production integrations remain pending.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {contactBlocks.map((block) => (
              <a
                key={`${block.label}-${block.email}`}
                href={`mailto:${block.email}`}
                className="group relative overflow-hidden border border-white/[0.075] bg-[#0A0B09]/82 p-5 transition duration-300 hover:border-[#B8936D]/32 hover:bg-[#10110E]"
              >
                <div
                  className="absolute inset-x-0 top-0 h-px opacity-80"
                  style={{ background: `linear-gradient(90deg, transparent, rgba(${block.accent},0.85), transparent)` }}
                />
                <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#8B7355]">{block.label}</p>
                <h2 className="mt-5 min-h-[3rem] text-lg font-semibold leading-6 text-[#F4F1EA]">{block.heading}</h2>
                <p className="mt-4 min-h-[5.25rem] max-w-[30ch] text-sm leading-6 text-[#9A9994] [overflow-wrap:anywhere] sm:max-w-none">{block.description}</p>
                <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/[0.06] pt-4">
                  <span className="break-all text-sm text-[#C7A276]">{block.email}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-[#14B8A6] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
                </div>
              </a>
            ))}
          </div>

          <div className="mt-10 border border-[#B8936D]/14 bg-[#B8936D]/[0.035] p-5 md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#B8936D]">
                  Current purchase mode
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-[#9A9994]">
                  Checkout is intentionally disabled until the production payment flow is connected.
                  Manual sales and licensing requests go through email.
                </p>
              </div>
              <a
                href={`mailto:${siteConfig.salesEmail}`}
                className="inline-flex min-h-11 items-center justify-center gap-2 border border-[#C7A276]/40 bg-[#C7A276]/12 px-5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#C7A276] transition hover:bg-[#C7A276]/18"
              >
                <Mail className="h-4 w-4" strokeWidth={1.5} />
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
