/**
 * Schema: Settings
 * Configuración global del sitio (singleton)
 */

import { defineType, defineField } from 'sanity'
import { Settings } from 'lucide-react'

export default defineType({
  name: 'settings',
  title: 'Configuración General',
  type: 'document',
  icon: Settings,
  fields: [
    // ─── BUNDLE ───────────────────────────────────────
    defineField({
      name: 'bundlePrice',
      title: 'Precio del Bundle (USD)',
      type: 'number',
      validation: Rule => Rule.required().min(0),
    }),
    
    defineField({
      name: 'bundleLemonsqueezyUrl',
      title: 'URL de Lemon Squeezy para Bundle',
      type: 'url',
    }),
    
    // ─── PROMO BAR ───────────────────────────────────
    defineField({
      name: 'promoBarEnabled',
      title: 'Activar barra de promoción',
      type: 'boolean',
      initialValue: true,
    }),
    
    defineField({
      name: 'promoBarText',
      title: 'Texto de promoción',
      type: 'string',
      description: 'Ejemplo: Limited Time — 20% Off All Plugins',
    }),
    
    // ─── HOMEPAGE ───────────────────────────────────
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      description: 'Audio Beyond Reality.',
    }),
    
    defineField({
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'text',
      rows: 2,
    }),
    
    // ─── CONTACT ───────────────────────────────────
    defineField({
      name: 'supportEmail',
      title: 'Email de soporte',
      type: 'string',
      validation: Rule => Rule.email(),
    }),
    
    defineField({
      name: 'salesEmail',
      title: 'Email de ventas',
      type: 'string',
      validation: Rule => Rule.email(),
    }),
    
    // ─── SOCIAL ───────────────────────────────────
    defineField({
      name: 'socialLinks',
      title: 'Redes sociales',
      type: 'object',
      fields: [
        { name: 'instagram', type: 'url', title: 'Instagram' },
        { name: 'twitter', type: 'url', title: 'Twitter/X' },
        { name: 'youtube', type: 'url', title: 'YouTube' },
        { name: 'discord', type: 'url', title: 'Discord' },
      ]
    }),
    
    // ─── SEO ───────────────────────────────────────
    defineField({
      name: 'siteTitle',
      title: 'Título del sitio (SEO)',
      type: 'string',
    }),
    
    defineField({
      name: 'siteDescription',
      title: 'Descripción del sitio (SEO)',
      type: 'text',
      rows: 3,
    }),
    
    defineField({
      name: 'ogImage',
      title: 'Imagen Open Graph',
      type: 'image',
      description: 'Imagen para compartir en redes sociales (1200x630px)',
    }),
  ],
  
  preview: {
    prepare() {
      return {
        title: 'Configuración General',
      }
    }
  }
})
