/**
 * Schema: Testimonial
 * Testimonios de usuarios
 */

import { defineType, defineField } from 'sanity'
import { MessageSquare } from 'lucide-react'

export default defineType({
  name: 'testimonial',
  title: 'Testimonios',
  type: 'document',
  icon: MessageSquare,
  fields: [
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    
    defineField({
      name: 'role',
      title: 'Rol/Título',
      type: 'string',
      description: 'Sound Designer, Producer, etc.',
      validation: Rule => Rule.required(),
    }),
    
    defineField({
      name: 'credential',
      title: 'Credencial',
      type: 'string',
      description: 'Early Access Beta, Cliente desde 2024, etc.',
    }),
    
    defineField({
      name: 'plugin',
      title: 'Plugin relacionado',
      type: 'string',
      description: 'QUANTUM REVERB, FRACTAL DELAY, etc.',
    }),
    
    defineField({
      name: 'pluginColor',
      title: 'Color del plugin (HEX)',
      type: 'string',
      description: '#C49A6C',
    }),
    
    defineField({
      name: 'pluginRGB',
      title: 'Color RGB',
      type: 'string',
      description: '196,154,108',
    }),
    
    defineField({
      name: 'quote',
      title: 'Testimonio',
      type: 'text',
      rows: 5,
      validation: Rule => Rule.required(),
    }),
    
    defineField({
      name: 'avatar',
      title: 'Avatar/Foto',
      type: 'image',
      options: {
        hotspot: true,
      }
    }),
    
    defineField({
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(5),
    }),
    
    defineField({
      name: 'featured',
      title: 'Destacado',
      type: 'boolean',
      initialValue: false,
    }),
    
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      validation: Rule => Rule.integer().min(0),
    }),
  ],
  
  preview: {
    select: {
      title: 'author',
      subtitle: 'role',
      media: 'avatar',
    }
  }
})
