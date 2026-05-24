import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, UserRound, X } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';

const links = [
  { label: 'Inicio', href: '/' },
  { label: 'Plugins', href: '/plugins' },
  { label: 'Archivo', href: '/archive' },
];

interface NavbarAdvancedProps {
  minimal?: boolean;
}

export default function NavbarAdvanced({ minimal = false }: NavbarAdvancedProps) {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<'ES' | 'EN'>('ES');
  const location = useLocation();
  const { items, openCart } = useCart();

  const renderLink = (item: (typeof links)[number], mobile = false) => {
    const isHome = item.href === '/';
    const isHash = item.href.includes('#');
    const active = isHome ? location.pathname === '/' : isHash ? location.hash === item.href.replace('/', '') : location.pathname === item.href;
    const className = mobile
      ? 'font-mono text-[11px] uppercase tracking-[0.28em] text-[#C7A276] transition hover:text-[#F4F1EA]'
      : `font-mono text-[11px] uppercase tracking-[0.28em] transition ${
          active ? 'text-[#C7A276]' : 'text-[#9A9994] hover:text-[#E8E1D4]'
        }`;

    if (isHome || !isHash) {
      return (
        <Link key={item.href} to={item.href} className={className} onClick={() => setOpen(false)}>
          {item.label}
        </Link>
      );
    }

    return (
      <a key={item.href} href={item.href} className={className} onClick={() => setOpen(false)}>
        {item.label}
      </a>
    );
  };

  return (
    <header className="fixed inset-x-0 z-[120] bg-[#030403]/92 backdrop-blur-xl" style={{ top: 'var(--promo-h, 0px)' }}>
      <nav className="border-b border-white/[0.07]">
        <div className="mx-auto grid h-[78px] w-full max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-5 md:px-8">
          <div className="hidden items-center gap-8 md:flex">
            {links.map((item) => renderLink(item))}
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center border border-white/10 text-[#E8E1D4] md:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-label="Toggle navigation"
          >
            {open ? <X className="h-4 w-4" /> : <span className="font-mono text-lg leading-none">+</span>}
          </button>

          <Link to="/" className="justify-self-center text-center" aria-label="SCI-FI ELECTRONICS home">
            <span className="block font-display text-[2rem] font-semibold leading-none tracking-[0.025em] text-[#F4F1EA]">SFE</span>
            <span className="mt-1 hidden font-mono text-[7px] uppercase tracking-[0.3em] text-[#8B7355] sm:block">SCI-FI ELECTRONICS</span>
          </Link>

          {minimal ? (
            <div aria-hidden="true" className="hidden md:block" />
          ) : (
            <div className="hidden items-center justify-end gap-2.5 md:flex">
              <div className="flex h-8 items-center border border-[#B8936D]/16 bg-[#0A0B09]/80 p-0.5">
                {(['ES', 'EN'] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`h-7 px-2.5 font-mono text-[9px] uppercase tracking-[0.18em] transition ${
                      lang === item ? 'bg-[#B8936D]/12 text-[#C7A276]' : 'text-[#7F7A72] hover:text-[#E8E1D4]'
                    }`}
                    onClick={() => setLang(item)}
                    aria-pressed={lang === item}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <button
                type="button"
                disabled
                aria-disabled="true"
                title="Account portal pending"
                className="inline-flex h-9 cursor-not-allowed items-center gap-2 border border-[#B8936D]/16 bg-[#0A0B09]/80 px-3.5 font-mono text-[9px] uppercase tracking-[0.17em] text-[#8B7355] opacity-70"
              >
                <UserRound className="h-3.5 w-3.5" strokeWidth={1.5} />
                Iniciar Sesion
              </button>

              <button
                type="button"
                onClick={openCart}
                title="Open cart"
                className="relative inline-flex h-9 w-9 items-center justify-center border border-[#B8936D]/20 bg-[#0A0B09]/80 text-[#C7A276] transition hover:border-[#C7A276]/40 hover:bg-[#B8936D]/10 focus:outline-none focus:ring-2 focus:ring-[#C7A276]/35"
                aria-label={`Open cart, ${items.length} item${items.length === 1 ? '' : 's'}`}
              >
                <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
                {items.length > 0 && (
                  <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[#C7A276] px-1 font-mono text-[8px] font-bold text-[#060706]">
                    {items.length}
                  </span>
                )}
              </button>
            </div>
          )}
        </div>

        {open && (
          <div className="border-t border-white/[0.07] bg-[#030403] px-5 py-5 md:hidden">
            <div className="flex flex-col gap-5">
              {links.map((item) => renderLink(item, true))}
              {!minimal && (
                <button
                  type="button"
                  className="mt-2 inline-flex min-h-11 items-center justify-center border border-[#B8936D]/35 bg-[#B8936D]/10 font-mono text-[10px] uppercase tracking-[0.22em] text-[#C7A276]"
                  onClick={() => {
                    setOpen(false);
                    openCart();
                  }}
                >
                  Cart {items.length > 0 ? `(${items.length})` : ''}
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
