import { Link } from 'react-router-dom';
import { ArrowUpRight, Box, Music2, Star } from 'lucide-react';
import { CHROMA, CTRL4FILTER } from '@/app/data/productsData';
import { useCart } from '@/app/context/CartContext';
import { getChromaCartItem, getCtrl4FilterCartItem } from '@/app/lib/commerceItems';

type CatalogCard = {
  kind: 'plugin' | 'sample';
  label: string;
  name: string;
  subtitle: string;
  reviewCount: string;
  description: string;
  bullets?: string[];
  sampleRows?: Array<[string, string]>;
  price: string;
  compareAt: string;
  badge: string;
  accent: 'bronze' | 'jade';
  route: string;
};

const cards: CatalogCard[] = [
  {
    kind: 'plugin',
    label: 'Plugin',
    name: CTRL4FILTER.name.toUpperCase(),
    subtitle: 'Neural Filter Engine',
    reviewCount: '847 reviews',
    description:
      'AI-powered multi-mode filter with morphing capabilities. Sculpt frequencies with surgical precision or create evolving soundscapes that breathe with your music.',
    bullets: ['AI Filter Morphing', '12 Filter Types', 'Modulation Matrix', 'Neural Learning'],
    price: '$89',
    compareAt: '$149',
    badge: 'Most Popular',
    accent: 'bronze',
    route: '/plugins',
  },
  {
    kind: 'sample',
    label: 'Sample Pack',
    name: CHROMA.name,
    subtitle: 'Color Theory for Sound',
    reviewCount: '412 reviews',
    description:
      'Meticulously crafted collection of chromatic one-shots and loops. 62 pristine samples engineered to sit perfectly in any modern production.',
    sampleRows: [
      ['Kicks', '10'],
      ['Hi-Hats', '10'],
      ['Bass Loops', '8'],
      ['Percussion Loops', '8'],
      ['Pad Loops', '8'],
      ['Atmos', '8'],
    ],
    price: '$29',
    compareAt: '$49',
    badge: 'Launch Price',
    accent: 'jade',
    route: '/contact',
  },
];

const accentMap = {
  bronze: {
    rgb: '184,147,109',
    text: '#C7A276',
    surface: 'rgba(184,147,109,0.07)',
  },
  jade: {
    rgb: '20,184,166',
    text: '#14B8A6',
    surface: 'rgba(20,184,166,0.07)',
  },
};

function ProductCard({ card }: { card: CatalogCard }) {
  const accent = accentMap[card.accent];
  const Icon = card.kind === 'plugin' ? Box : Music2;
  const { addToCart, openCart } = useCart();

  const handleBuyNow = () => {
    addToCart(card.kind === 'plugin' ? getCtrl4FilterCartItem() : getChromaCartItem());
    openCart();
  };

  return (
    <article
      className="group relative overflow-hidden rounded-[18px] border bg-[#16120e]/95 p-7 transition duration-300 md:p-10"
      style={{
        borderColor: `rgba(${accent.rgb},0.20)`,
        boxShadow: `0 32px 90px rgba(0,0,0,0.28), inset 0 1px 0 rgba(${accent.rgb},0.07)`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle at 50% 0%, rgba(${accent.rgb},0.10), transparent 58%)` }}
      />
      {card.badge && (
        <div
          className="absolute right-5 top-5 hidden rounded-full border px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.24em] md:block"
          style={{ color: accent.text, borderColor: `rgba(${accent.rgb},0.28)`, background: accent.surface }}
        >
          {card.badge}
        </div>
      )}

      <div className="relative">
        <div
          className="inline-flex items-center gap-2 rounded-md border px-3 py-2 font-mono text-[9px] uppercase tracking-[0.28em]"
          style={{ color: accent.text, borderColor: `rgba(${accent.rgb},0.24)`, background: accent.surface }}
        >
          <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
          {card.label}
        </div>

        <h3 className="mt-8 text-[clamp(2.1rem,4vw,3.35rem)] font-semibold uppercase leading-none tracking-[-0.04em] text-[#F4F1EA]">
          {card.name}
        </h3>
        <p className="mt-4 font-display text-lg italic text-[#B8936D]">{card.subtitle}</p>

        <div className="mt-6 flex items-center gap-3">
          <div className="flex gap-1" aria-label="Five star rating">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="h-3.5 w-3.5 fill-current" style={{ color: accent.text }} strokeWidth={1.2} />
            ))}
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#B9B0A6]">{card.reviewCount}</span>
        </div>

        <p className="mt-7 max-w-[640px] text-base leading-8 text-[#AFA79D]">{card.description}</p>

        {card.bullets && (
          <div className="mt-9 grid gap-x-10 gap-y-4 text-sm text-[#B9B0A6] sm:grid-cols-2">
            {card.bullets.map((bullet) => (
              <div key={bullet} className="flex items-center gap-3">
                <span style={{ color: accent.text }}>•</span>
                <span>{bullet}</span>
              </div>
            ))}
          </div>
        )}

        {card.sampleRows && (
          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            {card.sampleRows.map(([label, value]) => (
              <div key={label} className="flex items-center justify-between rounded-md border border-white/[0.06] bg-white/[0.025] px-4 py-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#918981]">{label}</span>
                <span className="font-mono text-xs text-[#14B8A6]">{value}</span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 border-t border-white/[0.065] pt-7">
          <div className="mb-5 flex items-center gap-3">
            <span className="font-mono text-[11px] text-[#817870] line-through">{card.compareAt}</span>
            <span
              className="rounded-sm border px-2 py-1 font-mono text-[7px] uppercase tracking-[0.22em]"
              style={{ color: accent.text, borderColor: `rgba(${accent.rgb},0.22)`, background: accent.surface }}
            >
              Launch Price
            </span>
          </div>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="font-display text-[2.35rem] italic leading-none" style={{ color: accent.text }}>{card.price}</div>
              <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-[#7A7169]">One-time</div>
            </div>
            <div className="flex items-center gap-5">
              <button
                type="button"
                onClick={handleBuyNow}
                className="min-h-[42px] rounded-lg border px-6 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] transition hover:brightness-110 focus:outline-none focus:ring-2"
                style={{
                  borderColor: `rgba(${accent.rgb},0.38)`,
                  background: card.accent === 'bronze' ? 'rgba(184,147,109,0.16)' : 'rgba(20,184,166,0.12)',
                  color: accent.text,
                }}
              >
                Buy Now
              </button>
              <Link to={card.route} className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9A9289] transition hover:text-[#C7A276]">
                Details <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
          <p className="mt-7 font-mono text-[8px] uppercase tracking-[0.22em] text-[#6A6057]">
            Contact fallback | Lifetime license
          </p>
        </div>
      </div>
    </article>
  );
}

export default function ProductGrid() {
  return (
    <section id="products" data-buildout-section="product-grid" className="relative overflow-hidden border-y border-white/[0.055] bg-[#17130f] px-5 py-24 md:px-8 md:py-32">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_8%,rgba(184,147,109,0.07),transparent_36%)]" />
      <div className="relative mx-auto max-w-[1560px]">
        <div className="mb-20 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.38em] text-[#B8936D]">
            Catalogo / Disponible Ahora
          </p>
          <h2 className="mt-7 font-display text-[clamp(4rem,10vw,7.7rem)] font-light leading-[0.92] tracking-[-0.04em] text-[#E8E1D4]">
            <span className="italic text-[#C7A276]">Gold</span> para Productores
          </h2>
        </div>

        <div className="grid gap-10 xl:grid-cols-2">
          {cards.map((card) => (
            <ProductCard key={card.name} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
