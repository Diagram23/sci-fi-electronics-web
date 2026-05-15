/**
 * Schema: Plugin
 * Define la estructura de cada plugin de audio
 */

import { defineType, defineField } from 'sanity'
import { Layers } from 'lucide-react'

export default defineType({
  name: 'plugin',
  title: 'Plugins',
  type: 'document',
  icon: Layers,
  fields: [
    // ─── BÁSICO ───────────────────────────────────────
    defineField({
      name: 'id',
      title: 'ID (slug técnico)',
      type: 'slug',
      description: 'quantum-reverb, fractal-delay, etc.',
      validation: Rule => Rule.required(),
      options: {
        source: 'name',
        maxLength: 50,
      }
    }),
    
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      description: 'QUANTUM REVERB',
      validation: Rule => Rule.required(),
    }),
    
    defineField({
      name: 'serial',
      title: 'Serial (01, 02, etc.)',
      type: 'string',
      validation: Rule => Rule.required().max(2),
    }),
    
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'REVERB', value: 'REVERB' },
          { title: 'DELAY', value: 'DELAY' },
          { title: 'GATE', value: 'GATE' },
          { title: 'DIST.', value: 'DIST.' },
        ]
      },
      validation: Rule => Rule.required(),
    }),
    
    // ─── PRECIOS ───────────────────────────────────────
    defineField({
      name: 'price',
      title: 'Precio (USD)',
      type: 'number',
      validation: Rule => Rule.required().min(0),
    }),
    
    defineField({
      name: 'badge',
      title: 'Badge (opcional)',
      type: 'string',
      description: 'MOST POPULAR, BEST ENTRY, etc.',
      options: {
        list: [
          { title: 'Sin badge', value: '' },
          { title: 'MOST POPULAR', value: 'MOST POPULAR' },
          { title: 'BEST ENTRY', value: 'BEST ENTRY' },
          { title: 'NEW', value: 'NEW' },
        ]
      }
    }),
    
    // ─── TEXTOS ───────────────────────────────────────
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Infinite Space Generator',
      validation: Rule => Rule.required(),
    }),
    
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required(),
    }),
    
    // ─── VISUAL ───────────────────────────────────────
    defineField({
      name: 'visual',
      title: 'Tipo de visualización',
      type: 'string',
      description: 'Canvas animation type',
      options: {
        list: [
          { title: 'Reverb', value: 'reverb' },
          { title: 'Delay', value: 'delay' },
          { title: 'Gate', value: 'gate' },
          { title: 'Distortion', value: 'distortion' },
        ]
      },
      validation: Rule => Rule.required(),
    }),
    
    defineField({
      name: 'accentColor',
      title: 'Color de acento (HEX)',
      type: 'string',
      description: '#C49A6C',
      validation: Rule => Rule.regex(/^#[0-9A-Fa-f]{6}$/),
    }),
    
    defineField({
      name: 'accentRGB',
      title: 'Color RGB (solo números)',
      type: 'string',
      description: '196,154,108',
      validation: Rule => Rule.regex(/^\d{1,3},\d{1,3},\d{1,3}$/),
    }),
    
    // ─── CARACTERÍSTICAS ───────────────────────────────
    defineField({
      name: 'keyFeatures',
      title: 'Características clave',
      type: 'array',
      of: [{ type: 'string' }],
      validation: Rule => Rule.required().min(3).max(6),
    }),
    
    defineField({
      name: 'specs',
      title: 'Specs técnicas',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'value', type: 'string', title: 'Valor' },
          ]
        }
      ],
      validation: Rule => Rule.required().length(3),
    }),
    
    defineField({
      name: 'formats',
      title: 'Formatos',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'VST3', value: 'VST3' },
          { title: 'AU', value: 'AU' },
          { title: 'AAX', value: 'AAX' },
        ]
      },
      validation: Rule => Rule.required(),
    }),
    
    // ─── IMÁGENES Y MEDIA ───────────────────────────────
    defineField({
      name: 'heroImage',
      title: 'Imagen principal',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto alternativo',
        }
      ]
    }),
    
    defineField({
      name: 'gallery',
      title: 'Galería de imágenes',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt text',
            }
          ]
        }
      ]
    }),
    
    // ─── AUDIO DEMOS ───────────────────────────────────
    defineField({
      name: 'demoAudioDry',
      title: 'Demo Audio - Dry (URL)',
      type: 'url',
      description: 'URL del archivo de audio sin procesar',
    }),
    
    defineField({
      name: 'demoAudioWet',
      title: 'Demo Audio - Wet (URL)',
      type: 'url',
      description: 'URL del archivo de audio procesado',
    }),
    
    defineField({
      name: 'demoVideoUrl',
      title: 'Video Demo (YouTube, Vimeo)',
      type: 'url',
    }),
    
    // ─── DESCARGAS ───────────────────────────────────
    defineField({
      name: 'downloadLinks',
      title: 'Enlaces de descarga',
      type: 'object',
      fields: [
        {
          name: 'macOS',
          type: 'url',
          title: 'macOS (ZIP)',
        },
        {
          name: 'windows',
          type: 'url',
          title: 'Windows (ZIP)',
        }
      ]
    }),
    
    // ─── LEMON SQUEEZY ───────────────────────────────
    defineField({
      name: 'lemonsqueezyUrl',
      title: 'Lemon Squeezy Checkout URL',
      type: 'url',
      description: 'URL de checkout de Lemon Squeezy',
    }),
    
    // ─── METADATA ───────────────────────────────────
    defineField({
      name: 'featured',
      title: 'Destacado en homepage',
      type: 'boolean',
      initialValue: false,
    }),
    
    defineField({
      name: 'order',
      title: 'Orden de visualización',
      type: 'number',
      validation: Rule => Rule.integer().min(0),
    }),
  ],
  
  preview: {
    select: {
      title: 'name',
      subtitle: 'tagline',
      media: 'heroImage',
      price: 'price',
    },
    prepare({ title, subtitle, media, price }) {
      return {
        title,
        subtitle: `$${price} — ${subtitle}`,
        media,
      }
    }
  }
})
