# 📧 PLANTILLAS DE EMAIL PROFESIONALES

Estas son las plantillas de email que debes enviar automáticamente después de cada compra.

---

## 📨 EMAIL 1: CONFIRMACIÓN DE COMPRA + LINKS DE DESCARGA

**Asunto:** ✅ Tu compra en SCI-FI ELECTRONICS - Orden #{{ORDER_ID}}

**Cuerpo del email:**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
    .header { background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); padding: 40px 20px; text-align: center; }
    .content { padding: 40px 30px; color: #333; }
    .download-box { background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 24px 0; }
    .btn { display: inline-block; background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 8px 0; }
    .footer { background: #f8fafc; padding: 30px; text-align: center; color: #64748b; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1 style="color: white; margin: 0; font-size: 32px; letter-spacing: 0.2em;">SCI-FI ELECTRONICS</h1>
      <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Premium Audio Plugins</p>
    </div>

    <!-- Content -->
    <div class="content">
      <h2 style="color: #0f172a; margin-bottom: 16px;">¡Gracias por tu compra! 🎉</h2>
      
      <p>Hola,</p>
      
      <p>Tu pago ha sido procesado exitosamente. A continuación encontrarás toda la información para descargar y activar tus plugins.</p>

      <!-- Order Details -->
      <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 24px 0;">
        <h3 style="margin-top: 0; color: #0f172a;">Detalles de la orden</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #64748b;">Orden #</td>
            <td style="padding: 8px 0; text-align: right; font-weight: 600;">{{ORDER_ID}}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b;">Fecha</td>
            <td style="padding: 8px 0; text-align: right;">{{ORDER_DATE}}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b;">Email</td>
            <td style="padding: 8px 0; text-align: right;">{{CUSTOMER_EMAIL}}</td>
          </tr>
        </table>
      </div>

      <!-- Products Purchased -->
      <h3 style="color: #0f172a;">Productos adquiridos:</h3>
      
      {{#each PRODUCTS}}
      <div class="download-box">
        <h4 style="margin-top: 0; color: #06b6d4; font-size: 18px;">{{name}}</h4>
        <p style="color: #64748b; margin: 8px 0;">{{description}}</p>
        
        <div style="margin: 20px 0;">
          <strong>Descargar:</strong><br>
          <a href="{{downloadLink_VST3}}" class="btn" style="margin-right: 8px; font-size: 14px; padding: 12px 20px;">VST3</a>
          <a href="{{downloadLink_AU}}" class="btn" style="margin-right: 8px; font-size: 14px; padding: 12px 20px;">AU</a>
          <a href="{{downloadLink_AAX}}" class="btn" style="font-size: 14px; padding: 12px 20px;">AAX</a>
        </div>
        
        <div style="background: #fff; padding: 16px; border-radius: 6px; border: 1px solid #e2e8f0;">
          <strong>🔑 Clave de licencia:</strong><br>
          <code style="background: #f1f5f9; padding: 8px 12px; border-radius: 4px; display: inline-block; margin-top: 8px; font-family: monospace; color: #0f172a;">{{licenseKey}}</code>
        </div>
      </div>
      {{/each}}

      <!-- Installation Instructions -->
      <div style="background: #ecfeff; border-left: 4px solid #06b6d4; padding: 20px; margin: 24px 0;">
        <h3 style="margin-top: 0; color: #0e7490;">📋 Instrucciones de instalación</h3>
        <ol style="color: #0e7490; line-height: 1.8;">
          <li>Descarga el formato correspondiente a tu DAW (VST3, AU o AAX)</li>
          <li>Ejecuta el instalador y sigue las instrucciones</li>
          <li>Abre tu DAW y busca el plugin en tu lista de plugins</li>
          <li>Introduce la clave de licencia cuando te lo solicite</li>
          <li>¡Listo! Comienza a crear</li>
        </ol>
      </div>

      <!-- Support -->
      <p>Si tienes algún problema con la descarga o activación, nuestro equipo está aquí para ayudarte:</p>
      
      <p style="text-align: center; margin: 32px 0;">
        <a href="mailto:support@scifi-electronics.com" style="color: #06b6d4; text-decoration: none; font-weight: 600;">📧 support@scifi-electronics.com</a>
      </p>

      <!-- Guarantee -->
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; text-align: center; margin: 32px 0;">
        <p style="margin: 0; color: #64748b;">
          <strong style="color: #0f172a;">Garantía de 30 días</strong><br>
          Si no estás 100% satisfecho, te devolvemos tu dinero sin preguntas.
        </p>
      </div>

      <p style="margin-top: 40px;">
        Gracias por confiar en SCI-FI ELECTRONICS.<br>
        Esperamos que disfrutes creando con tus nuevos plugins.
      </p>

      <p style="color: #64748b; font-style: italic;">
        — El equipo de SCI-FI ELECTRONICS
      </p>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p><strong>SCI-FI ELECTRONICS</strong></p>
      <p>Premium Audio Plugins for the Future of Sound</p>
      
      <p style="margin-top: 20px;">
        <a href="https://scifi-electronics.com" style="color: #06b6d4; text-decoration: none; margin: 0 10px;">Website</a> |
        <a href="https://scifi-electronics.com/support" style="color: #06b6d4; text-decoration: none; margin: 0 10px;">Support</a> |
        <a href="https://scifi-electronics.com/account" style="color: #06b6d4; text-decoration: none; margin: 0 10px;">My Account</a>
      </p>
      
      <p style="margin-top: 20px; font-size: 12px; color: #94a3b8;">
        Este email fue enviado a {{CUSTOMER_EMAIL}}<br>
        Orden #{{ORDER_ID}} procesada el {{ORDER_DATE}}
      </p>
    </div>
  </div>
</body>
</html>
```

---

## 📨 EMAIL 2: FACTURA (PDF adjunto)

**Asunto:** 🧾 Factura de tu compra - Orden #{{ORDER_ID}}

**Cuerpo:**

```html
<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <h2 style="color: #0f172a;">Factura adjunta</h2>
    
    <p>Hola,</p>
    
    <p>Adjunto encontrarás la factura de tu compra en SCI-FI ELECTRONICS.</p>
    
    <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 24px 0;">
      <strong>Orden #{{ORDER_ID}}</strong><br>
      Fecha: {{ORDER_DATE}}<br>
      Total: ${{TOTAL_AMOUNT}}
    </div>
    
    <p>Guarda este email para tus registros.</p>
    
    <p style="margin-top: 40px; color: #64748b;">
      Gracias por tu compra,<br>
      El equipo de SCI-FI ELECTRONICS
    </p>
  </div>
</body>
</html>
```

**Adjunto:** `invoice-{{ORDER_ID}}.pdf`

---

## 📨 EMAIL 3: BIENVENIDA (24 horas después)

**Asunto:** 🎵 Bienvenido a la familia SCI-FI - Tips para empezar

**Cuerpo:**

```html
<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="text-align: center; padding: 40px 20px; background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); border-radius: 12px; margin-bottom: 32px;">
      <h1 style="color: white; margin: 0;">¡Bienvenido! 🎉</h1>
    </div>
    
    <p>Hola,</p>
    
    <p>Esperamos que estés disfrutando tus nuevos plugins. Aquí te dejamos algunos recursos para sacarles el máximo provecho:</p>
    
    <div style="margin: 32px 0;">
      <h3 style="color: #0f172a;">📚 Recursos útiles</h3>
      
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 16px 0;">
        <strong>Video Tutoriales</strong><br>
        <a href="https://youtube.com/scifi-electronics" style="color: #06b6d4;">Ver en YouTube →</a>
      </div>
      
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 16px 0;">
        <strong>Presets Gratuitos</strong><br>
        <a href="https://scifi-electronics.com/presets" style="color: #06b6d4;">Descargar pack de presets →</a>
      </div>
      
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 16px 0;">
        <strong>Comunidad Discord</strong><br>
        <a href="https://discord.gg/scifi" style="color: #06b6d4;">Únete a la comunidad →</a>
      </div>
    </div>
    
    <div style="background: #ecfeff; padding: 24px; border-radius: 8px; margin: 32px 0; text-align: center;">
      <h3 style="margin-top: 0; color: #0e7490;">💡 ¿Sabías que...?</h3>
      <p style="color: #0e7490; margin-bottom: 0;">Puedes usar tus plugins en proyectos ilimitados, tanto personales como comerciales. La licencia es tuya de por vida.</p>
    </div>
    
    <p>Si tienes alguna pregunta, escríbenos a <a href="mailto:support@scifi-electronics.com" style="color: #06b6d4;">support@scifi-electronics.com</a></p>
    
    <p style="margin-top: 40px;">
      Disfruta creando,<br>
      El equipo de SCI-FI ELECTRONICS
    </p>
  </div>
</body>
</html>
```

---

## 🔧 IMPLEMENTACIÓN CON SENDGRID

### Instalación:

```bash
npm install @sendgrid/mail
```

### Código para enviar emails:

```typescript
// /api/send-order-email.ts

import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendOrderConfirmation(orderData: any) {
  const msg = {
    to: orderData.email,
    from: 'noreply@scifi-electronics.com', // Tu email verificado en SendGrid
    subject: `✅ Tu compra en SCI-FI ELECTRONICS - Orden #${orderData.orderId}`,
    html: generateOrderEmailHTML(orderData),
    attachments: [
      {
        content: orderData.invoicePDF, // Base64 del PDF
        filename: `invoice-${orderData.orderId}.pdf`,
        type: 'application/pdf',
        disposition: 'attachment'
      }
    ]
  };

  try {
    await sgMail.send(msg);
    console.log('Order email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

function generateOrderEmailHTML(orderData: any): string {
  // Aquí va el HTML del email (la plantilla de arriba)
  // Reemplaza {{variables}} con datos reales
  
  let html = `<!DOCTYPE html>...`; // Template completo
  
  // Replace variables
  html = html.replace(/{{ORDER_ID}}/g, orderData.orderId);
  html = html.replace(/{{ORDER_DATE}}/g, new Date().toLocaleDateString());
  html = html.replace(/{{CUSTOMER_EMAIL}}/g, orderData.email);
  
  // Generate products list
  const productsHTML = orderData.products.map((product: any) => `
    <div class="download-box">
      <h4>${product.name}</h4>
      <a href="${product.downloadLinks.vst3}">VST3</a>
      <a href="${product.downloadLinks.au}">AU</a>
      <a href="${product.downloadLinks.aax}">AAX</a>
      <code>${product.licenseKey}</code>
    </div>
  `).join('');
  
  html = html.replace('{{#each PRODUCTS}}...{{/each}}', productsHTML);
  
  return html;
}
```

---

## 🎯 FLUJO COMPLETO

1. **Cliente completa pago en Stripe** → Stripe envía webhook
2. **Tu backend recibe webhook** → Procesa la orden
3. **Genera links de descarga seguros** (AWS S3 signed URLs)
4. **Genera claves de licencia** únicas por producto
5. **Genera factura PDF** (usa bibliotecas como `pdfkit`)
6. **Envía Email #1** con links y claves (inmediato)
7. **Envía Email #2** con factura PDF (inmediato)
8. **Envía Email #3** de bienvenida (24 horas después con cron job)

---

## 📝 VARIABLES A REEMPLAZAR

- `{{ORDER_ID}}` - ID único de la orden
- `{{ORDER_DATE}}` - Fecha de la compra
- `{{CUSTOMER_EMAIL}}` - Email del cliente
- `{{TOTAL_AMOUNT}}` - Total pagado
- `{{PRODUCTS}}` - Array de productos comprados
- `{{downloadLink_VST3}}` - Link de descarga VST3
- `{{downloadLink_AU}}` - Link de descarga AU
- `{{downloadLink_AAX}}` - Link de descarga AAX
- `{{licenseKey}}` - Clave de licencia única

---

¿Necesitas ayuda implementando el sistema de emails?
