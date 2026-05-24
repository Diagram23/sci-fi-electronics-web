import { siteConfig } from '@/app/config/siteConfig';

export default function ComingSoon() {
  const waitlistHref = `mailto:${siteConfig.generalEmail}?subject=${encodeURIComponent('Membrana waitlist')}`;

  return (
    <section className="relative overflow-hidden border-y border-[#B8936D]/14 bg-[#17130f]">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_28%,rgba(184,147,109,0.08),transparent_32%),radial-gradient(circle_at_70%_22%,rgba(184,147,109,0.045),transparent_34%)]" />
      <div className="relative mx-auto grid max-w-[1720px] gap-12 px-6 py-20 md:grid-cols-[1fr_0.9fr] md:px-16 md:py-28">
        <div className="max-w-[640px]">
          <div className="mb-9 flex items-center gap-4">
            <span className="h-px w-10 bg-[#B8936D]/40" />
            <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-[#8B7355]">
              In Development · MMXXVI
            </p>
          </div>

          <h2 className="font-display text-[clamp(4rem,10vw,7.8rem)] font-light uppercase leading-[0.86] tracking-[0.04em] text-[#B8936D]">
            Membrana
          </h2>
          <p className="mt-7 font-display text-[1.45rem] italic leading-relaxed text-[#AFA69A]">
            Physical modelling at the frontier of synthesis.
          </p>
          <div className="mt-7 h-px w-12 bg-[#B8936D]/30" />
          <p className="mt-7 max-w-[500px] text-[0.98rem] leading-8 text-[#8F8980]">
            The fifth instrument. A membrane resonance engine that models the physics of stretched materials - drum skins,
            speaker cones, vocal folds - at sample-accurate precision.
          </p>

          <div className="mt-10 flex flex-wrap gap-10">
            {[
              ['∞', 'Modal nodes'],
              ['6D', 'Parameter space'],
              ['2026', 'Est. release'],
            ].map(([value, label]) => (
              <div key={label}>
                <div className="font-display text-[1.5rem] italic text-[#B8936D]">{value}</div>
                <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.24em] text-[#6F675D]">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="self-center border border-[#B8936D]/18 bg-black/10 p-8 md:p-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#8B7355]">
            Join the waitlist
          </p>
          <p className="mt-7 text-sm leading-7 text-[#8F8980]">
            Be first to know when Membrana ships. Early access members receive launch-day pricing.
          </p>
          <form
            className="mt-8 grid gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              window.location.href = waitlistHref;
            }}
          >
            <label className="sr-only" htmlFor="membrana-email">Email</label>
            <input
              id="membrana-email"
              type="email"
              placeholder="your@email.com"
              className="min-h-[52px] border border-white/10 bg-[#211d18] px-5 text-sm text-[#E8E1D4] outline-none transition focus:border-[#B8936D]/55"
            />
            <button
              type="submit"
              className="min-h-[52px] border border-[#B8936D]/35 bg-[linear-gradient(100deg,rgba(184,147,109,0.62),rgba(72,43,14,0.7))] px-6 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#F4F1EA] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#B8936D]/45"
            >
              Notify Me -&gt;
            </button>
          </form>
          <p className="mt-5 font-mono text-[8px] uppercase tracking-[0.22em] text-[#5F564D]">
            No spam. Unsubscribe at any time.
          </p>
          <p className="mt-8 font-mono text-[8px] uppercase tracking-[0.22em] text-[#5F564D]">
            Data stored locally. Connect email service before launch.
          </p>
        </div>
      </div>

      <div className="relative border-t border-white/[0.05]">
        <div className="mx-auto grid max-w-[1720px] gap-8 px-6 py-12 md:grid-cols-[1fr_0.52fr] md:px-16">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-[#B8936D]">Boletin</p>
            <p className="mt-5 font-display text-[1.35rem] italic text-[#E8E1D4]">
              Lanzamientos, tutoriales y acceso anticipado a nuevas herramientas.
            </p>
          </div>
          <form
            className="grid grid-cols-1 md:grid-cols-[1fr_auto]"
            onSubmit={(event) => {
              event.preventDefault();
              window.location.href = `mailto:${siteConfig.generalEmail}?subject=${encodeURIComponent('Newsletter subscription')}`;
            }}
          >
            <label className="sr-only" htmlFor="footer-email">Email</label>
            <input
              id="footer-email"
              type="email"
              placeholder="tu@email.com"
              className="min-h-[52px] border border-white/10 bg-white/[0.025] px-5 text-sm text-[#E8E1D4] outline-none transition focus:border-[#B8936D]/55"
            />
            <button
              type="submit"
              className="min-h-[52px] border border-[#B8936D]/30 px-8 font-mono text-[10px] uppercase tracking-[0.28em] text-[#C7A276] transition hover:bg-[#B8936D]/10 focus:outline-none focus:ring-2 focus:ring-[#B8936D]/45"
            >
              Suscribirse -&gt;
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
