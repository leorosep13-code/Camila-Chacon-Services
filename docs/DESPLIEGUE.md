# Despliegue en Vercel

Guía paso a paso, pensada para hacerse una sola vez.

---

## 1. Subir el código a GitHub

El repositorio `Camila-Chacon-Services` ya está creado. Desde la carpeta del proyecto:

```bash
git init
git branch -M main
git add .
git commit -m "feat: sitio de club by cami en Next.js"
git remote add origin https://github.com/<TU-USUARIO>/Camila-Chacon-Services.git
git push -u origin main
```

Si Git pide identificarte por primera vez:

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@correo.com"
```

> `.env.local` **no se sube**: está en `.gitignore`. Los valores reales se cargan en Vercel.

---

## 2. Crear el proyecto en Vercel

1. Entra a [vercel.com/new](https://vercel.com/new) e inicia sesión con GitHub.
2. Importa el repositorio **Camila-Chacon-Services**.
3. Vercel detecta Next.js solo. **No cambies** el comando de build ni el directorio de salida.
4. Antes de pulsar _Deploy_, abre **Environment Variables** y añade estas seis, para
   _Production_, _Preview_ y _Development_:

| Nombre                           | Valor                                                             |
| -------------------------------- | ----------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`           | `https://camila-chacon-services.vercel.app` (o tu dominio propio) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`    | `573045673052` — **con el 57 delante**                            |
| `NEXT_PUBLIC_CONTACT_EMAIL`      | `camila.chaconb@gmail.com`                                        |
| `NEXT_PUBLIC_INSTAGRAM_URL`      | `https://instagram.com/clubdecami`                                |
| `NEXT_PUBLIC_CALENDAR_EMBED_URL` | la URL larga del iframe (está en `.env.example`)                  |
| `NEXT_PUBLIC_CALENDAR_LINK_URL`  | `https://calendar.app.google/cgepqveJBkL9ofUB9`                   |

Opcional: `NEXT_PUBLIC_ENABLE_ANALYTICS=false` si no quieres métricas.

5. **Deploy.** El primer despliegue tarda 1–2 minutos.

---

## 3. Dominio propio

1. En el proyecto: **Settings → Domains → Add**.
2. Escribe el dominio (ej. `clubdecami.com`).
3. Vercel te dice qué registros DNS crear en tu proveedor:
   - Dominio raíz → registro `A` a `76.76.21.21`
   - `www` → registro `CNAME` a `cname.vercel-dns.com`
4. El certificado HTTPS se emite solo, en minutos.
5. **Importante:** actualiza `NEXT_PUBLIC_SITE_URL` al dominio definitivo y vuelve a desplegar,
   para que los metadatos, el `sitemap.xml` y los datos estructurados apunten bien.

---

## 4. Activar métricas

En el proyecto de Vercel: pestaña **Analytics** → _Enable_, y **Speed Insights** → _Enable_.
El código ya está integrado; solo hay que activarlo en el panel.

---

## 5. Comprobaciones después del primer despliegue

- [ ] La página carga con los colores, la fuente Poppins y las animaciones.
- [ ] El botón de WhatsApp abre el chat con el mensaje precargado.
- [ ] El aviso de cookies aparece; al aceptar, el calendario se carga.
- [ ] El formulario exige la casilla de autorización antes de enviar.
- [ ] `/privacidad`, `/terminos` y `/cookies` cargan.
- [ ] `/sitemap.xml` y `/robots.txt` responden.
- [ ] `/api/vcard` descarga el contacto.
- [ ] Comparte el enlace por WhatsApp y verifica que sale la imagen de vista previa.
- [ ] Pasa el sitio por [securityheaders.com](https://securityheaders.com) — debería dar **A**.
- [ ] Pasa el sitio por [PageSpeed Insights](https://pagespeed.web.dev/).

---

## 6. Registrar en Google

1. [Google Search Console](https://search.google.com/search-console) → añadir propiedad por
   prefijo de URL.
2. Verifica el dominio (el método DNS es el más estable).
3. Envía `https://TU-DOMINIO/sitemap.xml`.
4. Crea el perfil de **Google Business** para aparecer en búsquedas locales de Barranquilla.

---

## 7. Flujo de trabajo diario

Cada `git push` a `main` despliega a producción automáticamente. Para cambios con revisión previa:

```bash
git checkout -b cambio-textos
# ...editar src/content/...
npm run check          # tipos, lint y formato
git commit -am "docs: actualiza precios del catálogo"
git push -u origin cambio-textos
```

Vercel genera una **URL de vista previa** para esa rama. Cuando el resultado convence, se fusiona
a `main` y sale a producción.

---

## Solución de problemas

**Sale un 404 de Vercel (`NOT_FOUND`) aunque el build diga "Ready".** Significa que el proyecto
no está usando el preset de Next.js: Vercel compila, pero luego sirve la carpeta `public/` como
sitio estático y, al no haber un `index.html`, todo devuelve 404. Se reconoce porque
`/foto-cami.png` sí responde y `/` no.

El repositorio ya trae `vercel.json` con `"framework": "nextjs"`, que lo fija de forma permanente
y tiene prioridad sobre lo que diga el panel. Si aun así ocurre, comprueba en **Settings → Build
and Deployment → Framework Preset** que ponga _Next.js_, y vuelve a desplegar.

**El build falla por tipos o lint.** Es intencional: `next.config.ts` no permite desplegar con
errores. Ejecuta `npm run check` en local para ver el detalle.

**Los botones de WhatsApp abren un chat vacio o inexistente.** Al numero le falta el codigo de
pais. `NEXT_PUBLIC_WHATSAPP_NUMBER` debe ser `573045673052`, no `3045673052`. Se comprueba mirando
el codigo fuente de la pagina publicada: los enlaces deben decir `wa.me/573045673052`.

**El calendario no aparece.** Es el comportamiento correcto hasta que el visitante acepta. Pulsa
«Cargar calendario» o acepta en el aviso de cookies.

**La imagen de vista previa no se actualiza en WhatsApp.** WhatsApp cachea las vistas previas
durante días. Prueba añadiendo `?v=2` al final del enlace.

**Cambié una variable de entorno y no se ve el cambio.** Las variables `NEXT_PUBLIC_*` se
incrustan durante el build: hay que volver a desplegar (**Deployments → ⋯ → Redeploy**).
