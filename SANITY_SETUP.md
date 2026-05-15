# 🎨 SANITY CMS - GUÍA DE CONFIGURACIÓN

## 📋 PASO 1: CREAR PROYECTO EN SANITY

1. **Crear cuenta gratuita:**
   ```
   https://www.sanity.io/
   ```

2. **Crear nuevo proyecto:**
   - Nombre: `SCI-FI ELECTRONICS`
   - Dataset: `production`
   - Plan: `Free` (100k requests/mes)

3. **Copiar Project ID:**
   - Lo encontrarás en: Dashboard → Project Settings
   - Ejemplo: `abc123de`

---

## 🔧 PASO 2: CONFIGURAR PROJECT ID

Reemplaza `YOUR_PROJECT_ID` en estos archivos:

### `/sanity.config.ts`:
```typescript
projectId: 'abc123de', // ← Tu Project ID aquí
```

### `/src/lib/sanity.ts`:
```typescript
projectId: 'abc123de', // ← Tu Project ID aquí
```

---

## 🚀 PASO 3: INSTALAR SANITY CLI

```bash
npm install -g @sanity/cli
```

---

## 📦 PASO 4: AUTENTICARSE

```bash
sanity login
```

Esto abrirá el navegador para autenticarte.

---

## 🎨 PASO 5: INICIALIZAR SANITY STUDIO

Desde la raíz del proyecto:

```bash
sanity init
```

**Selecciona:**
- ✅ Use existing project: `SCI-FI ELECTRONICS`
- ✅ Use existing dataset: `production`
- ✅ Output path: Presiona Enter (usa la raíz)

---

## 🖥️ PASO 6: LEVANTAR EL PANEL ADMIN LOCALMENTE

```bash
sanity dev
```

Esto abrirá: `http://localhost:3333`

**¡Ya tienes tu panel de administración funcionando!**

---

## 🌐 PASO 7: PUBLICAR EL PANEL ADMIN (OPCIONAL)

Para acceder desde cualquier lugar:

```bash
sanity deploy
```

Elige un nombre:
```
sci-fi-electronics
```

Resultado: `https://sci-fi-electronics.sanity.studio`

---

## ✏️ PASO 8: CREAR CONTENIDO INICIAL

Desde el panel admin, crea:

### **1. Settings (Configuración General):**
- Bundle Price: `349`
- Support Email: `support@sci-fi-electronics.com`
- Hero Headline: `Audio Beyond Reality.`

### **2. Plugins:**

Crea 4 plugins:

#### **Plugin 1: QUANTUM REVERB**
- ID: `quantum-reverb`
- Name: `QUANTUM REVERB`
- Serial: `01`
- Category: `REVERB`
- Price: `149`
- Badge: `MOST POPULAR`
- Tagline: `Infinite Space Generator`
- Description: `Neural convolution engine that models acoustics beyond physical reality.`
- Visual: `reverb`
- Accent Color: `#C49A6C`
- Accent RGB: `196,154,108`
- Key Features:
  - `AI Space Morphing`
  - `∞ Reverb Tail`
  - `0ms Latency`
  - `Neural Convolution`
- Specs:
  - LATENCY: `0 ms`
  - SR: `192kHz`
  - BANDS: `∞`
- Formats: `VST3`, `AU`, `AAX`

#### **Plugin 2: FRACTAL DELAY**
- ID: `fractal-delay`
- Serial: `02`
- Category: `DELAY`
- Price: `129`
- Tagline: `Time Manipulation Engine`
- Visual: `delay`
- Accent Color: `#1B6B5A`
- Accent RGB: `27,107,90`

*(Repite para SPECTRAL GATE y PLASMA DISTORTION)*

---

## 🔄 PASO 9: ACTUALIZAR TU APP REACT

Los componentes ya están configurados para consumir desde Sanity.

Para hacer que un componente use Sanity:

### **Antes (datos hardcoded):**
```tsx
const products = [
  { id: 'quantum-reverb', name: 'QUANTUM REVERB', price: 149 }
]
```

### **Después (desde Sanity):**
```tsx
import { useEffect, useState } from 'react'
import { getPlugins } from '@/lib/sanity'

export default function ProductGrid() {
  const [products, setProducts] = useState([])
  
  useEffect(() => {
    getPlugins().then(setProducts)
  }, [])
  
  return (
    <div className="grid">
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )
}
```

---

## 🖼️ PASO 10: IMÁGENES CON SANITY

### **Subir imagen en Sanity Studio:**
1. Edita un plugin
2. En "Hero Image" → Upload
3. Sube tu imagen

### **Usar imagen en React:**
```tsx
import { urlFor } from '@/lib/sanity'

<img 
  src={urlFor(plugin.heroImage)
    .width(800)
    .quality(90)
    .url()
  } 
  alt={plugin.name}
/>
```

**Sanity optimiza automáticamente:**
- ✅ Genera WebP
- ✅ Responsive images
- ✅ CDN global
- ✅ Lazy loading

---

## 📊 ESTRUCTURA DE CONTENIDO CREADA

```
Sanity Studio
├── Plugins (4)
│   ├── QUANTUM REVERB
│   ├── FRACTAL DELAY
│   ├── SPECTRAL GATE
│   └── PLASMA DISTORTION
├── Testimonios
│   └── (Agrega testimonios de clientes)
├── FAQs
│   └── (Agrega preguntas frecuentes)
└── Settings (Singleton)
    ├── Bundle Price
    ├── Promo Bar
    ├── Hero Text
    └── Emails
```

---

## 🔐 PASO 11: PERMISOS (SEGURIDAD)

Por defecto, **Sanity es privado**. Solo usuarios autenticados pueden editar.

Para agregar colaboradores:
1. Dashboard → Project Settings → Members
2. Invitar por email
3. Asignar rol: `Editor` o `Administrator`

---

## 💾 BACKUP AUTOMÁTICO

Sanity hace backups automáticos cada hora.

Para exportar tu contenido:
```bash
sanity dataset export production backup.tar.gz
```

Para importar:
```bash
sanity dataset import backup.tar.gz production
```

---

## 📈 MONITOREO

Ver uso de API:
```
https://www.sanity.io/manage/project/YOUR_PROJECT_ID/usage
```

**Free tier incluye:**
- ✅ 100,000 requests/mes
- ✅ 5GB assets storage
- ✅ Backups ilimitados

---

## 🆘 TROUBLESHOOTING

### Error: "Project ID not found"
→ Verifica que reemplazaste `YOUR_PROJECT_ID` en ambos archivos

### Error: "Authentication failed"
→ Ejecuta: `sanity login` y reintenta

### Panel admin no carga
→ Verifica que corriste: `sanity dev` desde la raíz del proyecto

---

## 📚 RECURSOS

- Docs oficiales: https://www.sanity.io/docs
- GROQ (queries): https://www.sanity.io/docs/groq
- Schema types: https://www.sanity.io/docs/schema-types
- Comunidad: https://slack.sanity.io/

---

## ✅ CHECKLIST DE CONFIGURACIÓN

- [ ] Crear cuenta en Sanity.io
- [ ] Crear proyecto y copiar Project ID
- [ ] Reemplazar `YOUR_PROJECT_ID` en archivos
- [ ] Ejecutar `sanity login`
- [ ] Ejecutar `sanity init`
- [ ] Ejecutar `sanity dev`
- [ ] Crear contenido inicial (Settings + 4 Plugins)
- [ ] Ejecutar `sanity deploy` (opcional)
- [ ] Actualizar componentes React para consumir Sanity
- [ ] Subir imágenes de plugins
- [ ] Agregar testimonios
- [ ] Agregar FAQs

---

## 🎉 SIGUIENTE PASO

Una vez completado el setup, ejecuta:

```bash
# En una terminal:
sanity dev

# En otra terminal:
npm run dev
```

Tu app React ahora consume contenido desde Sanity. Cada cambio que hagas en el panel admin se reflejará automáticamente en tu web.

---

**¿Necesitas ayuda?** Pregúntame lo que necesites para configurar Sanity.
