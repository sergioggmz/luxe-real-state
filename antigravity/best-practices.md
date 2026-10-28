# Buenas Prácticas para Aplicaciones Inmobiliarias en Next.js (App Router)

Guía exhaustiva de estándares de desarrollo, arquitectura, rendimiento, UX y estrategias de negocio para aplicaciones web de bienes raíces de alto rendimiento y lujo (Luxe Real Estate).

---

## 1. Arquitectura y Rendimiento con Next.js & React

### Server Components vs Client Components
- **Server Components (RSC) por defecto:** Emplea RSC para todas las páginas de listado, fichas de propiedad, blogs informativos y vistas estáticas. Minimiza el bundle de JavaScript enviado al cliente y acelera drásticamente el First Contentful Paint (FCP) y Time to First Byte (TTFB).
- **Aislamiento quirúrgico de Client Components (`'use client'`):**
  - Mantén la directiva en las "hojas" del árbol de componentes (componentes terminales).
  - Componentes cliente recomendados: carruseles fotográficos, controles deslizantes de precios (sliders), mapas interactivos, modales de contacto, calculadoras de hipoteca y toggles de favoritos.
- **Evita cascadas de datos (Waterfalls):** Realiza las consultas a la base de datos o API en paralelo utilizando `Promise.all()` en Server Components para obtener simultáneamente detalles de la propiedad, propiedades similares y datos del agente.

### Streaming y Suspense
- **Carga progresiva con Skeletons:** Envuelve bloques pesados (listados de tarjetas, mapas geográficos, gráficos de tasación) con `<Suspense fallback={<PropertyCardSkeleton />}>` para que el usuario reciba la interfaz de inmediato sin esperar a los datos externos.
- **Rutas paralelas e interceptadas (Parallel & Intercepting Routes):**
  - Implementa modales de vista rápida de propiedades usando rutas interceptadas (`(..)propiedad/[id]`).
  - Permite a los usuarios previsualizar detalles sin perder el contexto de la búsqueda ni la posición del scroll, manteniendo URLs compartibles directamente.

### Caché y Revalidación de Datos
- **Revalidación bajo demanda (`revalidateTag` / `revalidatePath`):** Configura Server Actions o webhooks que invaliden la caché de la propiedad cuando un agente modifique el precio, estado (disponible/reservado/vendido) o galería en el panel de administración.
- **Incremental Static Regeneration (ISR):** Para páginas de catálogo por ciudad o barrio (`/propiedades/madrid`), utiliza `export const revalidate = 3600` (1 hora) para equilibrar velocidad de carga ultrarrápida y frescura de catálogo.

---

## 2. Optimización Crítica de Imágenes y Multimedia

El sector inmobiliario es puramente visual; una mala gestión de medios arruina los Core Web Vitals (especialmente LCP y CLS).

### Uso Avanzado de `next/image`
- **Prioridad exclusiva en el Hero:** Aplica `priority={true}` únicamente a la primera imagen principal de la ficha o hero de la página (la que marca el Largest Contentful Paint). Nunca agregues `priority` en tarjetas secundarias o listados largos.
- **Atributo `sizes` explícito:** Configura siempre `sizes` acorde al layout responsivo para evitar que dispositivos móviles descarguen imágenes en resolución desktop:
  ```tsx
  <Image
    src={property.mainImage}
    alt={property.title}
    fill
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    className="object-cover"
  />
  ```
- **Placeholders contra el CLS (Cumulative Layout Shift):**
  - Emplea `placeholder="blur"` con `blurDataURL` (generado automáticamente o mediante pequeños hashes base64/LQIP) para que el espacio de la foto esté reservado de inmediato y evite saltos de layout.
- **Formatos modernos:** Configura `next.config.ts` con soporte para formatos modernos de alta compresión:
  ```ts
  images: {
    formats: ['image/avif', 'image/webp'],
  }
  ```

### Videos, Recorridos 360° y Planos
- **Carga diferida (Lazy Loading de Tour Virtual):** Los visores 360° (Matterport, Kuula) o videos en 4K deben cargarse bajo demanda (al pulsar "Iniciar Tour 3D" o mediante Intersection Observer), evitando cargar scripts pesados de terceros en el primer renderizado.
- **Miniaturas de video con fachada ligera:** Muestra un póster estático de alta calidad y carga el iframe o reproductor de video solo tras la interacción del usuario.

---

## 3. SEO Técnico y Datos Estructurados para Bienes Raíces

### Metadatos Dinámicos con `generateMetadata`
- **Títulos y descripciones optimizados para búsqueda transaccional:**
  - Título estructurado: `[Tipo de Propiedad] en [Ubicación] de [m²] | Luxe Estate`.
  - Ejemplo: `Villa Moderna en Venta en La Moraleja, Madrid (500m²) | Luxe Estate`.
- **Open Graph dinámico para redes y mensajería:**
  - Genera tarjetas sociales (`opengraph-image.tsx`) con el precio, número de habitaciones y la foto de portada para que los enlaces compartidos en WhatsApp, Telegram o LinkedIn luzcan profesionales y eleven el CTR.

### Esquema Estructurado (Schema.org / JSON-LD)
- Inyecta JSON-LD en el layout o página de la propiedad para que Google entienda el inventario como catálogo inmobiliario enriquecido:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": "Ático Exclusivo en Barrio de Salamanca",
    "description": "Exclusivo ático con terraza panorámica, 3 dormitorios y acabados de lujo.",
    "datePosted": "2026-05-10",
    "about": {
      "@type": "SingleFamilyResidence",
      "numberOfRooms": 4,
      "numberOfBedrooms": 3,
      "numberOfBathroomsTotal": 3,
      "floorSize": {
        "@type": "QuantitativeValue",
        "value": 240,
        "unitCode": "MTK"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Madrid",
        "addressRegion": "Comunidad de Madrid",
        "postalCode": "28001",
        "addressCountry": "ES"
      }
    },
    "offers": {
      "@type": "Offer",
      "price": "1850000",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock"
    }
  }
  ```

### Indexación y Taxonomía
- **Sitemap dinámico (`app/sitemap.ts`):** Genera sitemaps divididos por tipos de propiedad y ubicaciones geográficas para asegurar la indexación inmediata de nuevas propiedades.
- **Estructura de URL amigable y canónica:** Estructuras jerárquicas legibles: `/propiedades/[ciudad]/[tipo]/[slug-identificador]`. Evita parámetros de ID crudos o sin contexto.

---

## 4. Experiencia de Usuario (UX/UI) y Navegación

### Búsqueda y Filtros
- **Sincronización total con la URL (`URL Search Params`):**
  - Cada filtro (rango de precios, tipo de inmueble, baños, comodidades) debe reflejarse en la URL (ej: `?type=villa&minPrice=500000&beds=3`).
  - Beneficios: los usuarios pueden compartir búsquedas exactas, guardar en favoritos o recargar sin perder su selección.
- **Filtros rápidos e instantáneos:** Añade chips de acceso rápido en la cabecera ("Piscina privada", "Vistas al mar", "Terraza", "Ascensor", "Nuevo desarrollo").
- **Debounce en búsqueda por texto:** Implementa retardo (300-400 ms) en el campo de texto libre para evitar llamadas redundantes a la base de datos mientras el usuario teclea.

### Mapa Interactivo y Listado Sincronizado
- **Clustering y pines de precio:** Representa las propiedades con pines que indiquen el precio abreviado (`1.2M €`, `450k €`). Agrupa propiedades cercanas con clustering para no saturar el mapa.
- **Interacción bidireccional:** Pasar el ratón por encima de una tarjeta de propiedad en la lista debe iluminar su pin en el mapa, y hacer clic en un pin debe desplazar o resaltar la tarjeta correspondiente.
- **Búsqueda por delimitación de mapa ("Buscar al mover el mapa"):** Opción para refrescar el catálogo según el viewport geográfico visible.

### Ficha de la Propiedad (Listing Detail Page)
- **Información técnica estructurada en módulos legibles:**
  - Superficie útil vs. construida claramente diferenciadas.
  - Gastos fijos: comunidad mensual, impuestos (IBI) y certificación energética (etiqueta A, B, C...).
  - Orientación (norte/sur/este/oeste) y año de construcción o última reforma.
- **Galería inmersiva:**
  - Mosaico principal estilo editorial (1 imagen grande + 4 secundarias) con botón "Ver todas las fotos (XX)".
  - Visor a pantalla completa con soporte táctil (swipe) para smartphones y atajos de teclado (flechas y escape).

---

## 5. Captación de Leads y Conversión

El objetivo primordial de una web inmobiliaria es la generación de contactos cualificados.

### CTAs Contextuales y Adaptados a Móvil
- **Barra de contacto flotante inferior (Mobile Sticky CTA):** En smartphones, fija una barra inferior con acciones directas:
  - Botón de WhatsApp ("Chatear con el agente").
  - Botón de llamada directa.
  - Botón "Solicitar visita".
- **Formularios por contexto:** Distingue el objetivo:
  - Formulario rápido: "¿Te interesa? Déjanos tu teléfono y te llamamos en menos de 15 minutos".
  - Formulario de visita presencial: Selector de fecha y franja horaria preferida.
  - Descarga de Dossier / Brochure: Entrega inmediata de PDF de la propiedad a cambio de email y teléfono.

### Seguridad y Validación de Formularios
- **Server Actions con Zod:** Valida esquemas rigurosamente en el servidor para evitar entradas corruptas o inyecciones.
- **Protección antispam silenciosa:** Emplea mecanismos no intrusivos (honeypots en campos ocultos o Cloudflare Turnstile invisible) para no frustrar a clientes de alto perfil con captchas complejos.
- **Respuestas optimistas y feedback claro:** Mensajes de confirmación inmediatos con indicación clara del siguiente paso ("Un agente especializado te contactará hoy antes de las 18:00").

---

## 6. Persistencia, Datos y Supabase

### Modelado de Base de Datos y Rendimiento
- **Índices de consulta frecuentes:** Crea índices compuestos en PostgreSQL para las combinaciones más consultadas:
  ```sql
  CREATE INDEX idx_properties_filter ON properties (status, property_type, price, city);
  ```
- **Búsqueda geoespacial con PostGIS:** Almacena coordenadas geográficas (`geography(Point, 4326)`) para consultas ultra eficientes de radio o polígonos ("propiedades a menos de 5 km del centro").
- **Full Text Search:** Implementa búsquedas de texto en PostgreSQL con `tsvector` para buscar por descripciones, nombres de calles o zonas con soporte de lenguaje español.

### Seguridad y Row Level Security (RLS)
- **Políticas públicas de solo lectura:**
  ```sql
  CREATE POLICY "Propiedades públicas visibles para todos"
  ON properties FOR SELECT
  USING (status = 'active');
  ```
- **Protección absoluta de leads y clientes:** Las tablas de contactos, solicitudes de visita y datos de compradores deben contar con RLS restringido exclusivamente al rol de agente administrativo autenticado (`auth.uid() = agent_id`).

---

## 7. Recomendaciones e Ideas Innovadoras

Para elevar una web inmobiliaria a un nivel prémium y diferenciarse de portales tradicionales:

### 1. Calculadora Hipotecaria y Financiera en Vivo
- Slider interactivo para simular:
  - Aporte inicial / Entrada (ej. 20%).
  - Plazo de amortización (15, 20, 25, 30 años).
  - Tasa de interés estimada (fija o variable).
  - Desglose de impuestos autonómicos (ITP/IVA), gastos de notaría y registro estimados según la región.

### 2. Comparador de Propiedades Lado a Lado
- Permite seleccionar hasta 3 propiedades y abrir una tabla comparativa sincronizada:
  - Precio total y precio por m².
  - Distribución (habitaciones, baños, plantas).
  - Amenidades (piscina, garaje, domótica, seguridad privada).
  - Gastos de mantenimiento anuales estimados.

### 3. Sistema de Favoritos Híbrido (Local + Nube)
- Permite guardar propiedades en favoritos inmediatamente sin necesidad de registro previo (usando `localStorage`).
- Si el usuario decide registrarse o dejar su correo, sincroniza automáticamente sus favoritos con la base de datos de Supabase y envíale un enlace mágico para recuperarlos en cualquier dispositivo.

### 4. Plano Interactivo de la Vivienda
- Presentación de los planos en 2D con iconos o marcadores clicables que muestran la fotografía exacta tomada desde ese punto de vista de la casa.

### 5. Análisis del Entorno y Vecindario (Lifestyle Data)
- Integración de puntuaciones de la zona:
  - Colegios de prestigio cercanos y distancias a pie/coche.
  - Conexión a aeropuertos o transporte de alta velocidad.
  - Oferta gastronómica y zonas comerciales.

### 6. Sistema de Alertas Inteligentes
- Botón "Avísame si baja de precio" o "Guardar esta búsqueda y avisarme de nuevas propiedades similares".

---

## 8. Checklist de Calidad antes de Producción

- [ ] **Lighthouse / Core Web Vitals:** Puntuación > 90 en Performance, Accesibilidad y SEO en Mobile y Desktop.
- [ ] **Sin CLS en listados ni detalles:** Alturas reservadas en tarjetas, imágenes y banners.
- [ ] **Gestión de errores:** Páginas `not-found.tsx` y `error.tsx` personalizadas acordes a la identidad visual de la marca.
- [ ] **Dark Mode / Contraste:** Asegurar ratios de contraste según WCAG AA en textos y botones de acción.
- [ ] **Optimización de Fuentes:** Uso de `next/font` con fuentes pre-cargadas y `display: swap`.
- [ ] **Políticas legales y cookies:** Cumplimiento RGPD en formularios y almacenamiento consentido de preferencias.

