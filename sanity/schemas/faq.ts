/**
 * Schema: FAQ
 * Preguntas frecuentes organizadas por categorías
 */

import { defineType, defineField } from 'sanity'
import { HelpCircle } from 'lucide-react'

export default defineType({
  name: 'faq',
  title: 'FAQs',
  type: 'document',
  icon: HelpCircle,
  fields: [
    defineField({
      name: 'question',
      title: 'Pregunta',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    
    defineField({
      name: 'answer',
      title: 'Respuesta',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required(),
    }),
    
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Producto y Licencias', value: 'product' },
          { title: 'Soporte Técnico', value: 'technical' },
          { title: 'Compra y Pagos', value: 'purchase' },
          { title: 'Garantías', value: 'warranty' },
          { title: 'Compatibilidad', value: 'compatibility' },
        ]
      },
      validation: Rule => Rule.required(),
    }),
    
    defineField({
      name: 'order',
      title: 'Orden dentro de categoría',
      type: 'number',
      validation: Rule => Rule.integer().min(0),
    }),
  ],
  
  preview: {
    select: {
      title: 'question',
      subtitle: 'category',
    }
  }
})
