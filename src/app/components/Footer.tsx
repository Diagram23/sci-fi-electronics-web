import { Link } from 'react-router-dom';
import { Mail, ShieldCheck } from 'lucide-react';
import { siteConfig } from '@/app/config/siteConfig';
import brandEmblem from 'figma:asset/6a48319d71f3339b74104ffc5d20862e540ee731.png';

const productLinks = [
  { label: 'Fractal Delay', to: '/plugins/fractal-delay' },
  { label: 'All Plugins', to: '/plugins' },
  { label: 'Signal Archive', to: '/archive' },
  { label: 'Complete Collection', to: '/contact' },
];

const companyLinks = [
  { label: 'Contact', to: '/contact' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Archive', to: '/archive' },
  { label: 'Support', to: '/contact' },
];

const legalLinks = [
  { label: 'Cookies', to: '/legal/cookies' },
  { label: 'Privacy', to: '/legal/privacy' },
  { label: 'Terms', to: '/legal/terms' },
  { label: 'License', to: '/legal/license' },
];

function FooterColumn({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#B8936D]">{title}</p>
      <div className="mt-5 flex flex-col gap-3 text-sm text-[#9A9994]">
        {links.map((link) => (
          <Link key={link.to + link.label} to={link.to} className="transition-colors hover:text-[#F4F1EA]">
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer id="site-footer" className="relative overflow-hidden border-t border-[#B8936D]/16 bg-[#050604]">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_18%_0%,rgba(184,147,109,0.09),transparent_34%),radial-gradient(circle_at_85%_12%,rgba(45,212,191,0.035),transparent_30%)]" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="relative mx-auto w-full max-w-[1440px] px-5 py-12 md:px-8 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_2fr]">
          <div className="max-w-md">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center border border-[#B8936D]/18 bg-[#0A0B09]">
                <img
                  src={brandEmblem}
                  alt="SCI-FI ELECTRONICS emblem"
                  className="h-8 w-8 object-contain opacity-85"
                />
              </div>
              <div>
                <p className="font-display text-2xl font-semibold uppercase leading-none tracking-[0.04em] text-[#F4F1EA]">
                  {siteConfig.siteName}
                </p>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.32em] text-[#8B7355]">
                  {siteConfig.tagline}
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm leading-7 text-[#9A9994]">{siteConfig.description}</p>

            <div className="mt-7 grid gap-3 text-sm text-[#9A9994]">
              <a href={`mailto:${siteConfig.supportEmail}`} className="inline-flex items-center gap-3 transition-colors hover:text-[#F4F1EA]">
                <Mail className="h-4 w-4 text-[#B8936D]" strokeWidth={1.5} />
                {siteConfig.supportEmail}
              </a>
              <a href={`mailto:${siteConfig.salesEmail}`} className="inline-flex items-center gap-3 transition-colors hover:text-[#F4F1EA]">
                <ShieldCheck className="h-4 w-4 text-[#14B8A6]" strokeWidth={1.5} />
                {siteConfig.salesEmail}
              </a>
            </div>
          </div>

          <div className="grid gap-9 sm:grid-cols-3">
            <FooterColumn title="Products" links={productLinks} />
            <FooterColumn title="Company" links={companyLinks} />
            <FooterColumn title="Legal" links={legalLinks} />
          </div>
        </div>

        <div className="mt-12 border-t border-white/[0.06] pt-6">
          <div className="flex flex-col gap-4 text-[10px] uppercase tracking-[0.22em] text-[#7F7A72] md:flex-row md:items-center md:justify-between">
            <p>(c) {new Date().getFullYear()} {siteConfig.siteName}. All rights reserved.</p>
            <p>Checkout mode: contact fallback - production integrations pending.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
