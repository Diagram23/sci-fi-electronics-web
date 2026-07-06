import { Suspense, lazy } from 'react';
import { BrowserRouter, HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import NavbarAdvanced from '@/app/components/NavbarAdvanced';
import PromoBar from '@/app/components/PromoBar';
import HomePage from '@/app/pages/HomePage';
import AboutPage from '@/app/pages/AboutPage';
import CookieConsent from '@/app/components/CookieConsent';
import CartDrawer from '@/app/components/CartDrawer';
import CheckoutModal from '@/app/components/CheckoutModal';
import { CartProvider, useCart } from '@/app/context/CartContext';
import { LanguageProvider } from '@/app/context/LanguageContext';
import { siteConfig } from '@/app/config/siteConfig';
import { isCompleteBundle } from '@/app/lib/commerceItems';

const AllPluginsPage = lazy(() => import('@/app/pages/AllPluginsPage'));
const ArchivePage = lazy(() => import('@/app/pages/ArchivePage'));
const ContactPage = lazy(() => import('@/app/pages/ContactPage'));
const FAQPage = lazy(() => import('@/app/pages/FAQPage'));
const LegalPage = lazy(() => import('@/app/pages/LegalPage'));
const PluginDetailPage = lazy(() => import('@/app/pages/PluginDetailPage'));
const SuccessPage = lazy(() => import('@/app/pages/SuccessPage'));
const DevFigmaReferencePage = lazy(() => import('@/app/pages/DevFigmaReferencePage'));
const ComponentGalleryPage = lazy(() => import('@/app/pages/ComponentGalleryPage'));
const FigmaOriginalReconstructionPage = lazy(() => import('@/app/pages/FigmaOriginalReconstructionPage'));
const MembranaOSPage = lazy(() => import('@/app/pages/MembranaOSPage'));

function CommerceOverlays() {
  const { isCheckoutOpen, closeCheckout, items } = useCart();
  const checkoutIsBundle = isCompleteBundle(items);

  return (
    <>
      <CartDrawer />
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={closeCheckout}
        items={items}
        isBundle={checkoutIsBundle}
      />
    </>
  );
}

function RouteFallback() {
  return (
    <div className="min-h-[70vh] bg-[#030403] px-6 pt-[calc(var(--promo-h,0px)+8rem)] text-[#F4F1EA]">
      <div className="mx-auto max-w-6xl border-l border-[#B8936D]/25 pl-5">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-[#B8936D]/70">
          Loading signal view
        </p>
        <p className="mt-3 max-w-md text-sm leading-7 text-[#9A9994]">
          Preparing the SCI-FI ELECTRONICS interface.
        </p>
      </div>
    </div>
  );
}

function AppShell() {
  const location = useLocation();
  const isImmersiveRoute = location.pathname.startsWith('/membrana-os');

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      {!isImmersiveRoute && <PromoBar />}
      {!isImmersiveRoute && <NavbarAdvanced />}

      <main className="relative z-10">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/plugins" element={<AllPluginsPage />} />
            <Route path="/plugins/:pluginId" element={<PluginDetailPage />} />
            <Route path="/archive" element={<ArchivePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/membrana-os" element={<MembranaOSPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/legal/:section" element={<LegalPage />} />
            {siteConfig.enableDevFigmaReference && (
              <Route path="/dev/figma-reference" element={<DevFigmaReferencePage />} />
            )}
            {siteConfig.enableDevComponentGallery && (
              <Route path="/dev/component-gallery" element={<ComponentGalleryPage />} />
            )}
            {siteConfig.enableDevFigmaOriginalReconstruction && (
              <Route path="/dev/figma-original-reconstruction" element={<FigmaOriginalReconstructionPage />} />
            )}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>

      {!isImmersiveRoute && <CommerceOverlays />}
      {!isImmersiveRoute && <CookieConsent />}
    </div>
  );
}

export default function App() {
  const Router = window.location.protocol === 'file:' ? HashRouter : BrowserRouter;

  return (
    <LanguageProvider>
      <CartProvider>
        <Router>
          <AppShell />
        </Router>
      </CartProvider>
    </LanguageProvider>
  );
}
