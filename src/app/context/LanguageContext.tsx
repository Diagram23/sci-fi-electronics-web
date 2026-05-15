import React, { createContext, useContext, useState } from 'react';

export type Lang = 'ES' | 'EN';

export interface Translations {
  nav: {
    home: string;
    plugins: string;
    archive: string;
    signIn: string;
  };
  products: {
    catalog: string;
    headingGold: string;
    headingFor: string;
    plugin: string;
    samplePack: string;
    acquire: string;
  };
  footer: {
    newsletter: string;
    newsletterTagline: string;
    emailPlaceholder: string;
    subscribe: string;
    onList: string;
    colProducts: string;
    colCompany: string;
    colSupport: string;
  };
  testimonials: {
    sectionLabel: string;
    heading: string;
    subHeading: string;
  };
}

const dict: Record<Lang, Translations> = {
  ES: {
    nav: {
      home:    'Inicio',
      plugins: 'Plugins',
      archive: 'Archivo',
      signIn:  'Iniciar sesion',
    },
    products: {
      catalog:    'CATALOGO / DISPONIBLE AHORA',
      headingGold: 'Gold',
      headingFor:  'para Productores',
      plugin:      'Plugin',
      samplePack:  'Sample Pack',
      acquire:     'Adquirir',
    },
    footer: {
      newsletter:       'Boletin',
      newsletterTagline: 'Lanzamientos, tutoriales y acceso anticipado a nuevas herramientas.',
      emailPlaceholder: 'tu@email.com',
      subscribe:        'Suscribirse',
      onList:           'Ya estas en la lista.',
      colProducts:      'Productos',
      colCompany:       'Empresa',
      colSupport:       'Soporte',
    },
    testimonials: {
      sectionLabel: 'EARLY SIGNAL NOTES',
      heading:      'Producer feedback in progress',
      subHeading:   'Launch reviews and public testimonials are pending.',
    },
  },
  EN: {
    nav: {
      home:    'Home',
      plugins: 'Plugins',
      archive: 'Archive',
      signIn:  'Sign In',
    },
    products: {
      catalog:    'CATALOG / AVAILABLE NOW',
      headingGold: 'Gold',
      headingFor:  'for Producers',
      plugin:      'Plugin',
      samplePack:  'Sample Pack',
      acquire:     'Acquire',
    },
    footer: {
      newsletter:       'Newsletter',
      newsletterTagline: 'Releases, tutorials, and early access to new tools.',
      emailPlaceholder: 'your@email.com',
      subscribe:        'Subscribe',
      onList:           "You're on the list.",
      colProducts:      'Products',
      colCompany:       'Company',
      colSupport:       'Support',
    },
    testimonials: {
      sectionLabel: 'ARTISTS / REAL PRODUCTION',
      heading:      'From those who already have it',
      subHeading:   'Professional production. Unfiltered opinions.',
    },
  },
};

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'EN',
  setLang: () => {},
  t: dict.EN,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('EN');
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dict[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
