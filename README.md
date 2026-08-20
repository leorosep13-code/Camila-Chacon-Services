# club by cami — Camila Chacón

Sitio de **Camila Chacón**, consultora de crecimiento digital y comercial en Barranquilla, Colombia.

Es la versión productiva del prototipo `legacy/prototipo-original.html`: mismos colores, misma
tipografía y las mismas animaciones, pero convertido en una aplicación mantenible, segura y
optimizada para desplegar en Vercel.

---

## Stack y por qué

| Pieza     | Elección                                 | Razón                                                                                                                                                                                                                       |
| --------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework | **Next.js 16 (App Router)**              | Es el estándar con mejor soporte a largo plazo para sitios de marketing: renderizado en servidor, SEO por archivos (sitemap, robots, Open Graph), optimización de imágenes y despliegue nativo en Vercel sin configuración. |
| Lenguaje  | **TypeScript en modo estricto**          | Un error de tipo se ve al escribir, no cuando el cliente entra al sitio.                                                                                                                                                    |
| Estilos   | **CSS plano con variables**              | El diseño original ya estaba resuelto en CSS. Reescribirlo en Tailwind habría introducido diferencias visuales sin ganar nada. Se conservó tal cual, partido por secciones.                                                 |
| Contenido | **Archivos TypeScript en `src/content`** | Todos los textos, precios y servicios están en un solo lugar. Cambiar una copia no exige tocar ningún componente.                                                                                                           |
| Iconos    | **Sprite SVG propio**                    | Cero dependencias, cero peticiones extra, mismo trazo del diseño.                                                                                                                                                           |
| Métricas  | **Vercel Analytics + Speed Insights**    | Sin cookies y sin rastreo entre sitios.                                                                                                                                                                                     |

> **Por qué no Tailwind ni una librería de componentes:** el valor de este proyecto está en un
> diseño ya definido y en que el cliente pueda editar textos sin romper nada. Añadir un sistema de
> estilos encima habría multiplicado las dependencias a mantener sin mejorar el resultado.

---

## Metodología de trabajo

- **Componentes de servidor por defecto.** Solo se marca `"use client"` lo que necesita
  interacción (menú, carrusel, formulario, modal, consentimiento). El resto se envía como HTML ya
  renderizado: mejor SEO y menos JavaScript.
- **Contenido separado de la presentación.** `src/content` guarda los datos; `src/components` los
  pinta.
- **Mejora progresiva.** Si el JavaScript falla, la página se lee completa: los textos están en el
  HTML, el carrusel sigue teniendo scroll nativo y los enlaces de WhatsApp funcionan.
- **Accesibilidad de base.** Enlace de salto al contenido, foco visible, `aria-*` en menú y
  diálogos, y respeto a `prefers-reduced-motion`.
- **Convención de commits:** `tipo(alcance): descripción` — `feat`, `fix`, `docs`, `style`,
  `refactor`, `chore`.

---

## Estructura

```
src/
├── app/                      Rutas (App Router)
│   ├── layout.tsx            Estructura común, fuentes, metadatos, JSON-LD
│   ├── page.tsx              La landing
│   ├── globals.css           Punto de entrada de estilos
│   ├── not-found.tsx         Página 404
│   ├── icon.svg              Favicon
│   ├── opengraph-image.tsx   Imagen de vista previa al compartir (generada)
│   ├── sitemap.ts robots.ts manifest.ts
│   ├── privacidad/ terminos/ cookies/    Páginas legales
│   └── api/vcard/route.ts    Tarjeta de contacto descargable (.vcf)
├── components/
│   ├── layout/               Cabecera, pie, flotantes, avisos
│   ├── sections/             Una sección de la landing por archivo
│   └── ui/                   Piezas reutilizables (Icon, Brand, Rail, Marquee)
├── content/                  TODOS los textos y datos editables
├── lib/                      Entorno, WhatsApp, consentimiento, JSON-LD
├── styles/                   CSS original partido por secciones (01→09) + añadidos (10)
└── proxy.ts                  Content-Security-Policy con nonce por petición
```

---

## Poner en marcha

```bash
npm install
cp .env.example .env.local     # ajusta los valores si hace falta
npm run dev                    # http://localhost:3000
```

Comandos útiles:

```bash
npm run build        # compilación de producción
npm run check        # tipos + lint + formato (lo mismo que corre CI)
npm run format       # aplica formato a todo el proyecto
```

---

## Variables de entorno

Se documentan en `.env.example`. Todas empiezan por `NEXT_PUBLIC_` porque son datos públicos que se
muestran en la página.

| Variable                         | Para qué                                                        |
| -------------------------------- | --------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`           | URL canónica. Alimenta metadatos, `sitemap.xml` y `robots.txt`. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`    | Número en formato internacional sin `+` (ej. `573045673052`).   |
| `NEXT_PUBLIC_CONTACT_EMAIL`      | Correo publicado.                                               |
| `NEXT_PUBLIC_INSTAGRAM_URL`      | Perfil de Instagram.                                            |
| `NEXT_PUBLIC_CALENDAR_EMBED_URL` | URL del iframe de Google Calendar.                              |
| `NEXT_PUBLIC_CALENDAR_LINK_URL`  | Enlace corto de respaldo del calendario.                        |
| `NEXT_PUBLIC_ENABLE_ANALYTICS`   | `false` desactiva las métricas.                                 |

⚠️ **Nunca** pongas un secreto en una variable `NEXT_PUBLIC_*`: Next.js la escribe literalmente en
el JavaScript que descarga el navegador. Un secreto se declara sin ese prefijo y solo se lee en el
servidor.

Todas tienen valor por defecto: si una falta, el sitio no se rompe, solo avisa en los logs del
build.

---

## Seguridad

| Medida                                                     | Dónde                                                   |
| ---------------------------------------------------------- | ------------------------------------------------------- |
| **CSP con `nonce` por petición** y `strict-dynamic`        | `src/proxy.ts`                                          |
| HSTS (2 años, subdominios, preload)                        | `next.config.ts`                                        |
| `X-Frame-Options: DENY` + `frame-ancestors 'none'`         | anti-clickjacking                                       |
| `X-Content-Type-Options: nosniff`                          | evita adivinar tipos MIME                               |
| `Referrer-Policy: strict-origin-when-cross-origin`         | no filtra la URL completa                               |
| `Permissions-Policy`                                       | cámara, micrófono, geolocalización y pagos desactivados |
| `Cross-Origin-Opener-Policy: same-origin`                  | aísla la ventana                                        |
| Cabecera `X-Powered-By` eliminada                          | `poweredByHeader: false`                                |
| `rel="noopener noreferrer"` en todo enlace externo         | regla de ESLint que falla el build                      |
| Iframe de terceros con `sandbox` y **bajo consentimiento** | `CalendarEmbed.tsx`                                     |
| Fuentes servidas desde el propio dominio                   | `next/font` — ninguna IP de visitantes llega a Google   |
| Saneado y tope de longitud en lo que escribe el visitante  | `src/lib/whatsapp.ts`                                   |
| Sin base de datos y sin datos personales almacenados       | el formulario abre WhatsApp, no envía nada              |

**La CSP con nonce hace que las páginas se rendericen por petición** en vez de servirse como HTML
estático. Es un intercambio consciente: en Vercel el coste es de milisegundos y a cambio un script
inyectado no se ejecuta. Si algún día prefieres HTML totalmente estático, se retira el proxy y
se define una CSP fija en `next.config.ts`.

---

## Privacidad y cumplimiento (Colombia)

- Páginas `/privacidad`, `/terminos` y `/cookies` redactadas según la **Ley 1581 de 2012** y el
  **Decreto 1074 de 2015**.
- Casilla de **autorización expresa** obligatoria antes de enviar el formulario.
- El calendario de Google **no se carga** hasta que el visitante lo autoriza; hasta entonces se
  muestra un marcador con alternativas.
- Aviso de cookies donde **rechazar cuesta lo mismo que aceptar**, y se puede revocar desde
  `/cookies`.

---

## Funciones de contacto

Además de lo que ya tenía el prototipo:

1. **Barra fija en móvil** con WhatsApp y Agendar siempre al alcance del pulgar.
2. **Botón flotante de WhatsApp** con etiqueta al pasar el ratón.
3. **Mensaje precargado distinto por servicio y por paquete**: el visitante no tiene que explicar
   desde cero qué le interesa.
4. **Copiar correo y copiar teléfono** con un clic.
5. **Guardar contacto** (`.vcf`) para la agenda del móvil — ruta `/api/vcard`.
6. **Compartir** con la API nativa del sistema, con copia del enlace como respaldo.
7. **Formulario validado** con mensajes de error claros y contador de caracteres.
8. **Enlace `mailto:`** en el pie; el telefono del pie abre WhatsApp, que es el canal
   preferente del negocio. El enlace `tel:` se usa como respaldo si el navegador bloquea el
   portapapeles.
9. **404 con salida a WhatsApp**, para no perder a quien llega por un enlace roto.

---

## Foto de Camila

El repositorio incluye `public/foto-cami.png`, un marcador de posición con los colores de la marca.

Para poner la foto real:

1. Guarda la imagen en `public/` (recomendado: JPG o WebP, retrato, ~900×1100 px, menos de 400 KB).
2. Abre `src/content/sections.ts` y actualiza el bloque `about.photo`:

```ts
photo: {
  src: "/foto-cami.jpg",   // el nombre de tu archivo
  alt: "Camila Chacón, consultora de crecimiento digital y comercial",
  width: 922,              // ancho real de la imagen
  height: 1120,            // alto real de la imagen
},
```

Next.js se encarga solo de convertirla a AVIF/WebP y de servir el tamaño adecuado a cada pantalla.

---

## Editar textos

Todo está en `src/content/`:

| Archivo       | Qué contiene                                                                                        |
| ------------- | --------------------------------------------------------------------------------------------------- |
| `site.ts`     | Marca, navegación, datos de contacto, barra de anuncio, cintas de texto                             |
| `sections.ts` | Hero, promo, sobre mí, momentos, método, servicios, cifras, paquetes, catálogo, razones, formulario |
| `doors.ts`    | Las tres tarjetas del cierre                                                                        |

Los precios del catálogo están en `sections.ts → catalog`.

---

## Despliegue

`vercel.json` fija `"framework": "nextjs"`. No lo quites: sin eso Vercel puede importar el
proyecto con el preset _Other_, compilar bien y luego servir `public/` como sitio estático, con lo
que todas las rutas devuelven 404.

Ver [`docs/DESPLIEGUE.md`](docs/DESPLIEGUE.md).
