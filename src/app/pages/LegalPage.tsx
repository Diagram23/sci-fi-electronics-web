/**
 * ─────────────────────────────────────────────────────────────
 *  SCI-FI ELECTRONICS — PÁGINAS LEGALES
 *  Válido para España y la Unión Europea
 *
 *  IMPORTANTE: Sustituye los datos marcados con [PLACEHOLDER]
 *  por los datos reales de tu empresa antes de publicar.
 *  Este documento es una plantilla informada; consulta a un
 *  abogado especializado para validación final.
 * ─────────────────────────────────────────────────────────────
 */

import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '@/app/components/Footer';
import { ArrowLeft, Shield, FileText, Lock, Cookie } from 'lucide-react';
import { useSEO } from '@/app/hooks/useSEO';
import { seoKeywords } from '@/app/config/seoConfig';

// ─── Secciones de navegación legal ───────────────────────────
const LEGAL_SECTIONS = [
  { id: 'aviso-legal',  label: 'Aviso Legal',          icon: FileText, path: '/legal/aviso-legal'  },
  { id: 'terminos',     label: 'Términos y Condiciones', icon: Shield,   path: '/legal/terminos'    },
  { id: 'license',      label: 'License Agreement',    icon: FileText, path: '/legal/license'      },
  { id: 'privacidad',   label: 'Política de Privacidad', icon: Lock,     path: '/legal/privacidad'  },
  { id: 'cookies',      label: 'Política de Cookies',    icon: Cookie,   path: '/legal/cookies'     },
];

// ─── Datos de empresa (sustituir por los reales) ──────────────
const COMPANY = {
  name:     'SCI-FI ELECTRONICS, S.L.',
  nif:      'B-[XXXXXXXX]',                          // ← NIF real
  address:  'Calle [DIRECCIÓN], [CIUDAD], [CP], España', // ← dirección real
  email:    'legal@sci-fi-electronics.com',
  phone:    '+34 [XXXXXXXXX]',                        // ← teléfono real
  registry: 'Registro Mercantil de [CIUDAD], Tomo [X], Folio [X], Hoja [X]', // ← datos RM reales
  dpo:      'dpo@sci-fi-electronics.com',
};

const TODAY_YEAR = 2026;
const LAST_UPDATE = '1 de marzo de 2026';

// ─── Contenido: Aviso Legal ───────────────────────────────────
function AvisoLegal() {
  return (
    <LegalDocument title="Aviso Legal" lastUpdate={LAST_UPDATE}>
      <Section title="1. Datos identificativos del titular">
        <p>En cumplimiento de lo establecido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se facilitan los siguientes datos identificativos del titular del sitio web:</p>
        <DataTable rows={[
          ['Denominación social', COMPANY.name],
          ['NIF', COMPANY.nif],
          ['Domicilio social', COMPANY.address],
          ['Registro Mercantil', COMPANY.registry],
          ['Correo electrónico', COMPANY.email],
          ['Teléfono de contacto', COMPANY.phone],
        ]} />
      </Section>

      <Section title="2. Objeto">
        <p>El presente Aviso Legal regula el acceso y uso del sitio web <strong>sci-fi-electronics.com</strong> (en adelante, «el Sitio Web»), titularidad de {COMPANY.name}, cuya actividad consiste en el desarrollo y comercialización de plugins de procesamiento de audio en formato digital.</p>
      </Section>

      <Section title="3. Condiciones de acceso y uso">
        <p>El acceso al Sitio Web es gratuito y no exige previa suscripción o registro, salvo para la realización de compras. El Usuario se compromete a hacer un uso diligente del Sitio Web, con pleno respeto a la normativa vigente, la moral y las buenas costumbres.</p>
        <p>Queda expresamente prohibido:</p>
        <ul>
          <li>Utilizar el Sitio Web con fines ilícitos, lesivos o contrarios al orden público.</li>
          <li>Reproducir, distribuir o comunicar públicamente el contenido del Sitio Web sin autorización expresa.</li>
          <li>Introducir, almacenar o transmitir virus, troyanos o cualquier otro programa informático dañino.</li>
          <li>Descompilar, desensamblar o realizar ingeniería inversa sobre cualquier software adquirido en el Sitio Web.</li>
        </ul>
      </Section>

      <Section title="4. Propiedad intelectual e industrial">
        <p>Todos los contenidos del Sitio Web —incluyendo, sin carácter limitativo, los diseños, marcas, logotipos, textos, imágenes, sonidos, código fuente y plugins de audio— son propiedad exclusiva de {COMPANY.name} o de sus licenciantes y están protegidos por la legislación española e internacional sobre propiedad intelectual e industrial.</p>
        <p>El Usuario no adquiere ningún derecho de propiedad sobre los contenidos al acceder al Sitio Web. Cualquier uso no autorizado constituye una infracción de los derechos de {COMPANY.name} y podrá dar lugar a las acciones legales oportunas.</p>
      </Section>

      <Section title="5. Limitación de responsabilidad">
        <p>{COMPANY.name} no garantiza la disponibilidad continua del Sitio Web y se reserva el derecho a suspenderlo, modificarlo o interrumpirlo sin previo aviso. En ningún caso {COMPANY.name} será responsable de:</p>
        <ul>
          <li>Daños causados por interrupciones o fallos técnicos del Sitio Web.</li>
          <li>El contenido de sitios web enlazados de terceros.</li>
          <li>Daños derivados de virus o malware introducidos por terceros.</li>
          <li>Pérdida de datos o daños al equipo del Usuario.</li>
        </ul>
      </Section>

      <Section title="6. Ley aplicable y jurisdicción">
        <p>El presente Aviso Legal se rige por la legislación española. Para la resolución de cualquier controversia derivada del uso del Sitio Web, las partes se someten, con renuncia expresa a cualquier otro fuero que pudiera corresponderles, a la jurisdicción de los Juzgados y Tribunales de la ciudad de [CIUDAD], salvo que la normativa de consumidores establezca otro fuero imperativo.</p>
        <p>Para la resolución de litigios en línea, la Unión Europea pone a disposición del consumidor la plataforma ODR (Online Dispute Resolution): <strong>https://ec.europa.eu/consumers/odr</strong></p>
      </Section>
    </LegalDocument>
  );
}

// ─── Contenido: Términos y Condiciones ───────────────────────
function Terminos() {
  return (
    <LegalDocument title="Términos y Condiciones de Compra" lastUpdate={LAST_UPDATE}>

      <AlertBox color="196,154,108">
        <strong>ANTES DE ADQUIRIR UN PRODUCTO:</strong> Al completar la compra y acceder al enlace de descarga, el Usuario acepta íntegramente las presentes condiciones y renuncia expresamente a su derecho de desistimiento de conformidad con el artículo 103.m) del Real Decreto Legislativo 1/2007 y el artículo 16.m) de la Directiva 2011/83/UE.
      </AlertBox>

      <Section title="1. Definiciones">
        <DataTable rows={[
          ['Vendedor', `${COMPANY.name}, titular del Sitio Web`],
          ['Usuario / Cliente', 'Persona física o jurídica que realiza una compra en el Sitio Web'],
          ['Plugin', 'Software de procesamiento de audio en formato digital (VST3, AU, AAX)'],
          ['Licencia', 'Derecho de uso personal e intransferible del Plugin adquirido'],
          ['Descarga', 'Acceso al enlace para obtener el archivo de instalación y la clave de licencia'],
        ]} />
      </Section>

      <Section title="2. Aceptación de los términos">
        <p>El acceso al Sitio Web y la realización de cualquier compra implican la aceptación plena, sin reservas y en su totalidad, de las presentes Condiciones. Si el Usuario no está de acuerdo con alguna de estas condiciones, deberá abstenerse de realizar cualquier compra.</p>
        <p>En el proceso de compra, el Usuario deberá marcar la casilla de consentimiento que confirma haber leído, comprendido y aceptado los presentes Términos y Condiciones, la Política de Privacidad y la renuncia expresa al derecho de desistimiento.</p>
      </Section>

      <Section title="3. Naturaleza de los productos">
        <p>Todos los productos comercializados por {COMPANY.name} son <strong>contenidos digitales no prestados en soporte material</strong> (plugins de audio en formato VST3, AU y/o AAX). En consecuencia, les resulta de aplicación el régimen especial previsto en el artículo 66 bis y concordantes del Real Decreto Legislativo 1/2007.</p>
        <p>Los productos incluyen:</p>
        <ul>
          <li>Archivo de instalación descargable del plugin de audio.</li>
          <li>Clave de licencia de activación personal e intransferible.</li>
          <li>Actualizaciones futuras de la misma versión mayor sin coste adicional.</li>
          <li>Acceso al manual de usuario en formato digital.</li>
        </ul>
        <p><strong>No se entrega soporte físico (CD, USB, etc.) en ningún caso.</strong></p>
      </Section>

      <Section title="4. Proceso de compra y formación del contrato">
        <p>El proceso de compra se realiza a través del procesador de pagos Lemon Squeezy (Lemon Squeezy Inc.), quien actúa como <em>Merchant of Record</em> y es responsable del procesamiento del pago. El contrato se perfecciona en el momento en que el Usuario recibe el correo electrónico de confirmación de Lemon Squeezy con el enlace de descarga y la clave de licencia.</p>
        <p>El idioma del contrato es el inglés o el español, según la preferencia del Usuario en el proceso de compra.</p>
      </Section>

      <Section title="5. Precios e impuestos">
        <p>Los precios indicados en el Sitio Web se expresan en dólares estadounidenses (USD). Los precios incluyen los impuestos aplicables en la jurisdicción del comprador. Lemon Squeezy, en su condición de Merchant of Record, es responsable del cálculo y liquidación del IVA (VAT/GST) aplicable según la normativa del país del comprador, en cumplimiento de la Directiva 2006/112/CE y demás normativa fiscal europea.</p>
      </Section>

      <Section title="6. EXCLUSIÓN DEL DERECHO DE DESISTIMIENTO — CLÁUSULA IRRENUNCIABLE">
        <AlertBox color="139,111,71">
          <p><strong>RENUNCIA EXPRESA AL DERECHO DE DESISTIMIENTO</strong></p>
          <p>De conformidad con el artículo 103, letra m), del Real Decreto Legislativo 1/2007, de 16 de noviembre, por el que se aprueba el texto refundido de la <em>Ley General para la Defensa de los Consumidores y Usuarios</em> (LGDCU), que transpone el artículo 16.m) de la Directiva 2011/83/UE del Parlamento Europeo y del Consejo:</p>
          <p><strong>El derecho de desistimiento no será aplicable</strong> a los contratos de suministro de contenido digital que no se preste en soporte material, una vez que la ejecución haya comenzado con el previo consentimiento expreso del consumidor y con el reconocimiento por su parte de que en consecuencia pierde su derecho de desistimiento.</p>
          <p>Al marcar la casilla de aceptación en el proceso de pago, el Usuario:</p>
          <ol>
            <li>Presta su <strong>consentimiento expreso e inequívoco</strong> para que la ejecución del contrato comience inmediatamente tras la confirmación del pago.</li>
            <li>Reconoce y acepta que, al acceder al enlace de descarga o canjear la clave de licencia, <strong>pierde de forma definitiva e irrevocable su derecho de desistimiento</strong>.</li>
            <li>Declara haber sido informado de esta circunstancia de forma clara y comprensible antes de finalizar la compra.</li>
          </ol>
          <p>Esta exclusión es conforme a derecho y ha sido validada por el Tribunal de Justicia de la Unión Europea en interpretación de la Directiva 2011/83/UE.</p>
        </AlertBox>
      </Section>

      <Section title="7. Política de no devoluciones">
        <p>Dado que los productos de {COMPANY.name} son contenidos digitales cuya entrega se inicia de forma inmediata tras el pago y el consentimiento expreso del Usuario, <strong>no se admitirán devoluciones ni reembolsos una vez que el Usuario haya accedido al enlace de descarga o activado la clave de licencia</strong>, salvo en los supuestos previstos en los apartados siguientes.</p>

        <p><strong>Excepciones en las que sí procede el reembolso:</strong></p>
        <ul>
          <li><strong>Duplicidad de pago:</strong> Si el cargo se ha realizado más de una vez por el mismo producto, se reembolsará el importe cobrado en exceso.</li>
          <li><strong>Producto defectuoso no subsanable:</strong> Si el plugin no funciona correctamente en el sistema operativo y la versión de DAW declarados como compatibles por {COMPANY.name}, y tras un plazo razonable de asistencia técnica el defecto no ha podido subsanarse, el Usuario tendrá derecho a la resolución del contrato y al reintegro del precio pagado, de conformidad con el artículo 118 y siguientes del Real Decreto Legislativo 1/2007.</li>
          <li><strong>Aplicación de la garantía legal:</strong> Conforme a la normativa vigente, el contenido digital debe ajustarse al contrato. En caso de falta de conformidad que no pueda subsanarse mediante actualización, procederá el reembolso total.</li>
        </ul>

        <p>Para solicitar un reembolso por alguna de las causas anteriores, el Usuario deberá dirigirse a <strong>{COMPANY.email}</strong> en un plazo máximo de 30 días desde la fecha de compra, indicando el número de pedido, el motivo y adjuntando la documentación justificativa.</p>
      </Section>

      <Section title="8. Licencia de uso">
        <p>La adquisición de un Plugin otorga al Usuario una <strong>licencia personal, no exclusiva, no transferible e intransferible</strong> para instalar y usar el Plugin en un número limitado de dispositivos de su propiedad (véase la tabla de activaciones del producto concreto en su página de descripción).</p>
        <p>La licencia queda expresamente limitada a los siguientes usos:</p>
        <ul>
          <li>Uso personal y profesional del Usuario titular de la licencia.</li>
          <li>Instalación en un máximo de 3 (tres) equipos simultáneamente, salvo indicación contraria en la descripción del producto.</li>
        </ul>
        <p><strong>Está expresamente prohibido:</strong></p>
        <ul>
          <li>Vender, alquilar, ceder, sublicenciar o transmitir la licencia a terceros.</li>
          <li>Distribuir, publicar o compartir el archivo de instalación o la clave de licencia.</li>
          <li>Utilizar el Plugin para la creación de otros productos de software competidores.</li>
          <li>Realizar ingeniería inversa, descompilar o desensamblar el Plugin.</li>
          <li>Eliminar o alterar los avisos de derechos de propiedad intelectual.</li>
        </ul>
        <p>El incumplimiento de estas condiciones implicará la resolución automática de la licencia y podrá dar lugar a acciones legales por infracción de derechos de propiedad intelectual.</p>
      </Section>

      <Section title="9. Compatibilidad y requisitos técnicos">
        <p>Es responsabilidad exclusiva del Usuario verificar que su sistema cumple con los requisitos mínimos publicados en la página de descripción de cada Plugin antes de realizar la compra. Los requisitos mínimos incluyen:</p>
        <ul>
          <li>Sistema operativo compatible (macOS 11 Big Sur o superior / Windows 10 64-bit o superior).</li>
          <li>DAW compatible con los formatos VST3, AU o AAX, según corresponda.</li>
          <li>Mínimo 8 GB de RAM y procesador de 64 bits.</li>
          <li>Conexión a internet para la activación inicial de la licencia.</li>
        </ul>
        <p>{COMPANY.name} no asumirá responsabilidad alguna por fallos de funcionamiento debidos al incumplimiento de los requisitos técnicos por parte del Usuario.</p>
      </Section>

      <Section title="10. Advertencia de salud y seguridad auditiva">
        <AlertBox color="27,107,90">
          <p><strong>ADVERTENCIA IMPORTANTE — SALUD AUDITIVA</strong></p>
          <p>Los plugins de {COMPANY.name} son herramientas de procesamiento de audio que pueden generar, amplificar o distorsionar señales de audio a niveles elevados. La exposición prolongada a niveles de presión sonora superiores a 85 dB(A) puede causar daño auditivo permanente e irreversible.</p>
          <p>{COMPANY.name} <strong>no asume responsabilidad alguna</strong> por:</p>
          <ul>
            <li>Daños auditivos, pérdida de audición, tinnitus o cualquier lesión física derivada del uso de sus productos a volúmenes elevados.</li>
            <li>Daños materiales al equipo de audio (altavoces, auriculares, interfaces de audio) causados por picos de señal.</li>
            <li>Daños a equipos eléctricos o electrónicos derivados del uso del Plugin.</li>
          </ul>
          <p>El Usuario es el único responsable de gestionar correctamente los niveles de señal y de utilizar los equipos de protección auditiva adecuados. Se recomienda comenzar siempre con los faders de salida al mínimo.</p>
        </AlertBox>
      </Section>

      <Section title="11. Limitación de responsabilidad">
        <p>En la máxima medida permitida por la ley aplicable, {COMPANY.name} <strong>no será responsable</strong> de:</p>
        <ul>
          <li>Daños directos, indirectos, incidentales, especiales, punitivos o consecuentes.</li>
          <li>Lucro cesante o pérdida de ingresos.</li>
          <li>Pérdida de datos de proyectos musicales o cualquier obra.</li>
          <li>Interrupciones del trabajo o del flujo creativo.</li>
          <li>Cualquier daño que supere el importe efectivamente pagado por el Usuario en los 12 meses anteriores al hecho causante.</li>
        </ul>
        <p>Esta limitación de responsabilidad se aplica independientemente de la forma de la acción legal, ya sea en contrato, agravio, responsabilidad estricta o cualquier otra teoría.</p>
      </Section>

      <Section title="12. Garantía del contenido digital">
        <p>De conformidad con el Real Decreto-ley 7/2021, de 27 de abril, que transpone la Directiva (UE) 2019/770 sobre contratos de suministro de contenidos y servicios digitales, {COMPANY.name} garantiza que sus Plugins:</p>
        <ul>
          <li>Cumplen con las especificaciones técnicas publicadas en el Sitio Web.</li>
          <li>Son aptos para los fines para los que ordinariamente se utilizan plugins del mismo tipo.</li>
          <li>Se actualizarán cuando sea necesario para mantener su conformidad.</li>
        </ul>
        <p>El plazo de garantía de conformidad del contenido digital es de <strong>dos (2) años</strong> desde la fecha de entrega.</p>
      </Section>

      <Section title="13. Resolución de conflictos">
        <p>Las presentes Condiciones se rigen por la legislación española. Para cualquier controversia derivada de la interpretación o ejecución de este contrato, las partes se someten a los Juzgados y Tribunales del domicilio del consumidor cuando este actúe como tal. En caso de que el Usuario actúe como empresario o profesional, se someterán a los Juzgados y Tribunales de [CIUDAD].</p>
        <p>Plataforma de resolución de litigios en línea (ODR) de la UE: <strong>https://ec.europa.eu/consumers/odr</strong></p>
        <p>Organismo de resolución alternativa de litigios (RAL) en España: <strong>Junta Arbitral de Consumo</strong> competente según el domicilio del consumidor.</p>
      </Section>

      <Section title="14. Modificaciones">
        <p>{COMPANY.name} se reserva el derecho a modificar las presentes Condiciones en cualquier momento. Los cambios serán publicados en el Sitio Web con indicación de la fecha de última actualización. Las compras realizadas antes de la modificación seguirán rigiéndose por las Condiciones vigentes en el momento de la compra.</p>
      </Section>
    </LegalDocument>
  );
}

// ─── Contenido: Política de Privacidad ───────────────────────
function Privacidad() {
  return (
    <LegalDocument title="Política de Privacidad" lastUpdate={LAST_UPDATE}>
      <AlertBox color="196,154,108">
        De conformidad con el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016 (RGPD), y la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).
      </AlertBox>

      <Section title="1. Responsable del tratamiento">
        <DataTable rows={[
          ['Responsable', COMPANY.name],
          ['NIF', COMPANY.nif],
          ['Domicilio', COMPANY.address],
          ['Correo de contacto', COMPANY.email],
          ['Delegado de Protección de Datos (DPO)', COMPANY.dpo],
        ]} />
      </Section>

      <Section title="2. Datos que recopilamos">
        <p>Recopilamos únicamente los datos estrictamente necesarios para la prestación del servicio:</p>
        <DataTable rows={[
          ['Finalidad', 'Datos recopilados'],
          ['Procesamiento del pedido', 'Nombre, correo electrónico, país (gestionado por Lemon Squeezy)'],
          ['Activación de licencia', 'Correo electrónico y clave de licencia generada'],
          ['Newsletter (solo si el Usuario suscribe)', 'Correo electrónico'],
          ['Soporte técnico', 'Correo electrónico, descripción del incidente, información del sistema'],
          ['Analytics del sitio web', 'Datos anonimizados de navegación (sin identificación personal)'],
        ]} />
        <p>No recopilamos datos de pago. El procesamiento de pagos es gestionado íntegramente por <strong>Lemon Squeezy Inc.</strong> como Merchant of Record, sujeto a su propia política de privacidad.</p>
      </Section>

      <Section title="3. Base jurídica del tratamiento">
        <DataTable rows={[
          ['Ejecución del contrato (Art. 6.1.b RGPD)', 'Gestión del pedido, entrega de licencias y soporte postventa'],
          ['Consentimiento explícito (Art. 6.1.a RGPD)', 'Envío de newsletter y comunicaciones comerciales'],
          ['Interés legítimo (Art. 6.1.f RGPD)', 'Prevención del fraude, seguridad del sistema, análisis agregado del servicio'],
          ['Obligación legal (Art. 6.1.c RGPD)', 'Conservación de facturas y datos fiscales según normativa tributaria española'],
        ]} />
      </Section>

      <Section title="4. Destinatarios y transferencias internacionales">
        <p>Sus datos podrán ser comunicados a los siguientes destinatarios:</p>
        <ul>
          <li><strong>Lemon Squeezy Inc.</strong> (EE.UU.) — procesador de pagos y Merchant of Record. La transferencia se ampara en las cláusulas contractuales tipo aprobadas por la Comisión Europea.</li>
          <li><strong>Proveedor de newsletter</strong> — únicamente si el Usuario se ha suscrito voluntariamente.</li>
          <li><strong>Autoridades competentes</strong> — cuando sea exigido por ley.</li>
        </ul>
        <p>No vendemos, alquilamos ni cedemos datos personales a terceros con fines comerciales en ningún caso.</p>
      </Section>

      <Section title="5. Plazos de conservación">
        <DataTable rows={[
          ['Datos de pedido y facturación', '5 años (Ley General Tributaria, Art. 66)'],
          ['Datos de licencia activada', 'Duración de la licencia + 1 año'],
          ['Newsletter', 'Hasta que el Usuario retire su consentimiento'],
          ['Soporte técnico', '2 años desde la última interacción'],
        ]} />
      </Section>

      <Section title="6. Derechos del Usuario">
        <p>El Usuario puede ejercer en cualquier momento los siguientes derechos ante el Responsable del tratamiento:</p>
        <ul>
          <li><strong>Acceso (Art. 15 RGPD):</strong> Conocer qué datos tratamos y obtener una copia.</li>
          <li><strong>Rectificación (Art. 16 RGPD):</strong> Solicitar la corrección de datos inexactos.</li>
          <li><strong>Supresión («derecho al olvido», Art. 17 RGPD):</strong> Solicitar la eliminación de sus datos cuando ya no sean necesarios.</li>
          <li><strong>Limitación del tratamiento (Art. 18 RGPD).</strong></li>
          <li><strong>Portabilidad (Art. 20 RGPD):</strong> Recibir sus datos en formato estructurado y de uso común.</li>
          <li><strong>Oposición (Art. 21 RGPD):</strong> Oponerse a determinados tratamientos.</li>
          <li><strong>Revocación del consentimiento</strong> en cualquier momento, sin que ello afecte a la licitud del tratamiento previo.</li>
        </ul>
        <p>Para ejercer estos derechos, diríjase a <strong>{COMPANY.email}</strong> o <strong>{COMPANY.dpo}</strong> con copia de su documento de identidad. Responderemos en el plazo máximo de un mes.</p>
        <p>Asimismo, tiene derecho a presentar una reclamación ante la <strong>Agencia Española de Protección de Datos (AEPD)</strong> en <strong>www.aepd.es</strong>.</p>
      </Section>

      <Section title="7. Seguridad">
        <p>{COMPANY.name} ha implementado las medidas técnicas y organizativas apropiadas para garantizar un nivel de seguridad adecuado al riesgo, incluyendo cifrado TLS de las comunicaciones, control de acceso a los sistemas, y procedimientos de respuesta ante incidentes de seguridad conforme al artículo 33 RGPD.</p>
      </Section>
    </LegalDocument>
  );
}

// ─── Contenido: Política de Cookies ──────────────────────────
function Cookies() {
  return (
    <LegalDocument title="Política de Cookies" lastUpdate={LAST_UPDATE}>
      <Section title="1. ¿Qué son las cookies?">
        <p>Las cookies son pequeños archivos de texto que se almacenan en el navegador del Usuario cuando visita un sitio web. Permiten que el sitio recuerde información sobre la visita para mejorar la experiencia del Usuario y obtener estadísticas de uso.</p>
      </Section>

      <Section title="2. Cookies utilizadas en este Sitio Web">
        <DataTable rows={[
          ['Nombre / Tipo', 'Finalidad', 'Duración', 'Carácter'],
          ['session_id', 'Mantener la sesión de compra activa', 'Sesión', 'Estrictamente necesaria'],
          ['cart_items', 'Recordar los productos añadidos al carrito', '7 días', 'Estrictamente necesaria'],
          ['promo_dismissed', 'Recordar si el Usuario cerró la barra de promoción', '30 días', 'Funcional'],
          ['_analytics_*', 'Estadísticas de navegación anonimizadas (sin identificación personal)', '13 meses', 'Analítica'],
          ['ls_*', 'Cookies de Lemon Squeezy para el proceso de pago', 'Sesión', 'Estrictamente necesaria (tercero)'],
        ]} />
      </Section>

      <Section title="3. Cookies de terceros">
        <p>Este Sitio Web puede utilizar servicios de terceros que instalan sus propias cookies:</p>
        <ul>
          <li><strong>Lemon Squeezy:</strong> Necesaria para el procesamiento del pago. Política de privacidad: <em>https://www.lemonsqueezy.com/privacy</em></li>
        </ul>
        <p>No utilizamos cookies de redes sociales, publicidad comportamental ni sistemas de seguimiento entre sitios.</p>
      </Section>

      <Section title="4. Base jurídica">
        <p>Las cookies estrictamente necesarias se amparan en el interés legítimo del Responsable para garantizar el funcionamiento técnico del Sitio Web (Art. 6.1.f RGPD y Art. 22.2 LSSI-CE). Las cookies analíticas y funcionales requieren el consentimiento del Usuario (Art. 6.1.a RGPD), que puede otorgarse o revocarse en cualquier momento.</p>
      </Section>

      <Section title="5. Gestión y rechazo de cookies">
        <p>El Usuario puede configurar su navegador para rechazar, eliminar o recibir una notificación antes de que se instale cualquier cookie:</p>
        <ul>
          <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies y otros datos de sitios</li>
          <li><strong>Firefox:</strong> Opciones → Privacidad y seguridad → Cookies y datos del sitio</li>
          <li><strong>Safari:</strong> Preferencias → Privacidad → Gestionar datos de sitios web</li>
          <li><strong>Edge:</strong> Configuración → Cookies y permisos del sitio</li>
        </ul>
        <p>El rechazo de cookies estrictamente necesarias puede impedir el correcto funcionamiento del proceso de compra.</p>
      </Section>

      <Section title="6. Actualizaciones de la Política de Cookies">
        <p>{COMPANY.name} se reserva el derecho a actualizar esta Política de Cookies. Cualquier cambio relevante será comunicado mediante un aviso en el Sitio Web. La fecha de última actualización aparece al inicio de este documento.</p>
      </Section>
    </LegalDocument>
  );
}

// ─── Sub-componentes de UI ─────────────────────────────────────

function LicenseAgreement() {
  return (
    <LegalDocument title="License Agreement" lastUpdate={LAST_UPDATE}>
      <AlertBox color="196,154,108">
        This page is a production draft and should be reviewed before final launch.
      </AlertBox>

      <Section title="1. Permitted Use">
        <p>The purchase of a SCI-FI ELECTRONICS product grants the customer a personal, non-exclusive, non-transferable license to install and use the software or digital content according to the product description and checkout terms.</p>
        <p>The license may be used for personal, professional and commercial creative work by the licensed customer or business entity.</p>
      </Section>

      <Section title="2. Commercial Music Production">
        <p>You may use sounds, presets, plugin processing and rendered audio output from SCI-FI ELECTRONICS products in released music, sound design, film, games, live performances, client work, sample-based productions and other commercial audio projects.</p>
        <p>No additional royalty is owed to SCI-FI ELECTRONICS for music or audiovisual works created with a legitimately licensed product.</p>
      </Section>

      <Section title="3. Plugin Usage">
        <p>Plugins may be installed on devices owned or controlled by the license holder, subject to the activation limits shown on each product page or checkout flow.</p>
        <p>You may not reverse engineer, decompile, modify, bypass licensing controls, resell, rent, sublicense or distribute the plugin installer, license key, authorization file or protected assets.</p>
      </Section>

      <Section title="4. Samples / Presets if applicable">
        <p>Where a product includes samples, presets, impulse responses, wavetables or other source material, those assets may be used inside original musical works and sound design projects.</p>
        <p>Redistribution of isolated samples, preset banks, impulse responses, raw audio files or substantially similar derivative libraries is not permitted without written permission.</p>
      </Section>

      <Section title="5. No Redistribution">
        <p>You may not share, upload, sell, license, mirror, torrent, include in sample packs, include in plugin bundles, or otherwise redistribute SCI-FI ELECTRONICS software, installers, source material, presets, license credentials or product documentation.</p>
        <p>This restriction applies whether redistribution is free, paid, modified, repackaged or embedded in another product.</p>
      </Section>

      <Section title="6. Updates and Support">
        <p>Eligible products may receive maintenance updates, compatibility fixes and documentation updates at SCI-FI ELECTRONICS' discretion.</p>
        <p>Support is provided through the official contact channels. Support does not include custom installation services, DAW training, third-party system repair or compatibility guarantees outside the published system requirements.</p>
      </Section>

      <Section title="7. Refunds / Intro Pricing">
        <p>Intro pricing, launch offers and bundle discounts may be temporary and may change without prior notice. Previous sale pricing does not create a right to future price matching.</p>
        <p>Refund eligibility is governed by the checkout terms, applicable law and the digital-product delivery status. If a payment processor or merchant of record is used, its refund and compliance rules may also apply.</p>
      </Section>

      <Section title="8. Contact">
        <p>For license, support or commercial questions, contact <strong>{COMPANY.email}</strong>. Include the product name, order reference if available, operating system, DAW and a concise description of the request.</p>
      </Section>
    </LegalDocument>
  );
}

function LegalDocument({ title, lastUpdate, children }: {
  title: string; lastUpdate: string; children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{
          margin: '0 0 0.5rem',
          fontFamily: 'var(--font-ui)', fontWeight: 800,
          fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
          letterSpacing: '-0.02em', lineHeight: 1,
          color: 'rgba(254,252,249,0.92)',
        }}>
          {title}
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginTop: '0.8rem' }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(196,154,108,0.5)',
          }}>
            Última actualización: {lastUpdate}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.1)' }}>·</span>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'rgba(196,154,108,0.4)',
          }}>
            Válido para España y la UE
          </span>
        </div>
        <div style={{ height: 1, marginTop: '2rem', background: 'linear-gradient(90deg, rgba(196,154,108,0.25) 0%, transparent 60%)' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        {children}
      </div>
    </motion.div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 style={{
        margin: '0 0 1rem',
        fontFamily: 'var(--font-ui)', fontWeight: 700,
        fontSize: '1rem', letterSpacing: '0.04em',
        color: 'rgba(196,154,108,0.85)',
        paddingBottom: '0.6rem',
        borderBottom: '1px solid rgba(196,154,108,0.1)',
      }}>
        {title}
      </h2>
      <div style={{
        fontFamily: 'var(--font-body)', fontWeight: 300,
        fontSize: '0.9rem', lineHeight: 1.82,
        color: 'rgba(224,213,197,0.72)',
      }}>
        {children}
      </div>
    </section>
  );
}

function AlertBox({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div style={{
      border: `1px solid rgba(${color},0.28)`,
      background: `rgba(${color},0.05)`,
      padding: '1.4rem 1.6rem',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'var(--font-body)', fontWeight: 300,
      fontSize: '0.875rem', lineHeight: 1.75,
      color: 'rgba(224,213,197,0.78)',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, width: 3, height: '100%',
        background: `rgba(${color},0.7)`,
      }} />
      {children}
    </div>
  );
}

function DataTable({ rows }: { rows: string[][] }) {
  return (
    <div style={{ overflowX: 'auto', marginTop: '0.8rem', marginBottom: '0.8rem' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  style={{
                    padding: '0.7rem 0.9rem',
                    fontFamily: j === 0 ? 'var(--font-mono)' : 'var(--font-body)',
                    fontSize: j === 0 ? '0.68rem' : '0.875rem',
                    letterSpacing: j === 0 ? '0.1em' : 'normal',
                    textTransform: j === 0 ? 'uppercase' : 'none',
                    color: j === 0 ? 'rgba(196,154,108,0.7)' : 'rgba(224,213,197,0.72)',
                    background: i === 0 ? 'rgba(196,154,108,0.04)' : 'transparent',
                    fontWeight: i === 0 ? 600 : 300,
                    verticalAlign: 'top',
                    minWidth: j === 0 ? 160 : 'auto',
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Mapa de páginas ──────────────────────────────────────────
const PAGE_CONTENT: Record<string, React.FC> = {
  'aviso-legal': AvisoLegal,
  'terminos':    Terminos,
  'license':     LicenseAgreement,
  'privacidad':  Privacidad,
  'cookies':     Cookies,
};

const LEGAL_ALIASES: Record<string, string> = {
  privacy: 'privacidad',
  terms: 'terminos',
  legal: 'aviso-legal',
};

// ─── Layout principal ─────────────────────────────────────────
export default function LegalPage() {
  const { section = 'aviso-legal' } = useParams<{ section: string }>();
  const navigate = useNavigate();
  const normalizedSection = LEGAL_ALIASES[section] ?? section;
  const Content = PAGE_CONTENT[normalizedSection] ?? AvisoLegal;
  const activeSection = LEGAL_SECTIONS.find((item) => item.id === normalizedSection);

  useSEO({
    title: activeSection?.id === 'license' ? 'Legal License' : 'Legal',
    description: 'Legal information, privacy, cookies, terms and license agreement for SCI-FI ELECTRONICS.',
    keywords: [...seoKeywords.core, 'audio plugin license', 'VST license agreement', 'software license terms'],
    canonicalPath: `/legal/${section || 'terms'}`,
  });

  return (
    <div style={{ minHeight: '100vh', background: '#1E1B16' }}>

      {/* ── Hero band ── */}
      <div style={{
        paddingTop: 'calc(var(--promo-h, 0px) + 90px)',
        paddingBottom: '3rem',
        paddingLeft: '7vw', paddingRight: '7vw',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        position: 'relative',
      }}>
        <motion.button
          onClick={() => navigate(-1)}
          whileHover={{ x: -3 }}
          style={{
            cursor: 'pointer', background: 'none', border: 'none',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(224,213,197,0.38)',
            marginBottom: '2rem',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(196,154,108,0.7)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(224,213,197,0.38)'; }}
        >
          <ArrowLeft size={12} />
          Volver
        </motion.button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
          <div style={{ width: 24, height: 1, background: 'rgba(196,154,108,0.4)' }} />
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
            letterSpacing: '0.28em', textTransform: 'uppercase',
            color: 'rgba(196,154,108,0.5)',
            lineHeight: 1.6,
          }}>
            SCI-FI ELECTRONICS · Información Legal
          </span>
        </div>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 300,
          fontSize: '0.85rem', lineHeight: 1.7,
          color: 'rgba(224,213,197,0.42)',
          maxWidth: '55ch', margin: 0,
          overflowWrap: 'anywhere',
        }}>
          Documentos legales válidos para España y la Unión Europea. Normativa aplicable: LGDCU, RGPD, LOPDGDD, LSSI-CE, Directiva 2011/83/UE, Directiva (UE) 2019/770.
        </p>
      </div>

      {/* ── Body: sidebar + content ── */}
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        paddingLeft: '7vw', paddingRight: '7vw',
        paddingTop: '4rem', paddingBottom: '6rem',
        display: 'grid',
        gap: '5vw',
        alignItems: 'start',
      }}
        className="grid-cols-1 lg:grid-cols-[220px_1fr]"
      >
        {/* Sidebar nav */}
        <nav style={{
          display: 'flex', flexDirection: 'column', gap: '2px',
          maxWidth: '100%',
          overflowX: 'auto',
        }}
          className="lg:sticky lg:top-[120px] max-lg:flex-row max-lg:flex-wrap"
        >
          {LEGAL_SECTIONS.map(({ id, label, icon: Icon, path }) => {
            const isActive = normalizedSection === id;
            return (
              <Link key={id} to={path} style={{ textDecoration: 'none', maxWidth: '100%' }}>
                <motion.div
                  whileHover={{ x: 2 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.7rem',
                    padding: '0.75rem 1rem',
                    minWidth: 0,
                    background: isActive ? 'rgba(196,154,108,0.08)' : 'transparent',
                    border: `1px solid ${isActive ? 'rgba(196,154,108,0.22)' : 'transparent'}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }}
                >
                  <Icon size={13} color={isActive ? '#C49A6C' : 'rgba(224,213,197,0.35)'} />
                  <span style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.82rem',
                    color: isActive ? 'rgba(196,154,108,0.9)' : 'rgba(224,213,197,0.5)',
                    transition: 'color 0.2s',
                    lineHeight: 1.35,
                  }}>
                    {label}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Content */}
        <main style={{ minWidth: 0 }}>
          <Content />
        </main>
      </div>

      <Footer />
    </div>
  );
}
