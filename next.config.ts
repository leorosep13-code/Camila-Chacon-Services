import type { NextConfig } from "next";

/**
 * Cabeceras de seguridad aplicadas a todas las rutas.
 *
 * La Content-Security-Policy NO se define aqui: se genera por peticion en
 * `src/proxy.ts` porque necesita un `nonce` aleatorio distinto en cada
 * respuesta. Aqui van solo las cabeceras estaticas.
 */
const securityHeaders = [
  // Evita que el navegador "adivine" el tipo MIME de un recurso.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Bloquea el embebido del sitio en iframes ajenos (anti clickjacking).
  // Complementa a `frame-ancestors` de la CSP para navegadores antiguos.
  { key: "X-Frame-Options", value: "DENY" },
  // No filtra la URL completa hacia terceros.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Desactiva APIs del navegador que este sitio no usa.
  {
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "browsing-topics=()",
      "interest-cohort=()",
      "payment=()",
      "usb=()",
    ].join(", "),
  },
  // Fuerza HTTPS durante 2 anos, incluidos subdominios.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Aisla el sitio de ventanas abiertas por/hacia terceros.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // No revelar la version de Next.js en las cabeceras.
  poweredByHeader: false,

  // Falla el build si hay errores de tipos (no se despliega roto).
  // El lint corre aparte, en `npm run check` y en CI: Next 16 ya no lo integra.
  typescript: { ignoreBuildErrors: false },

  images: {
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Los assets con hash son inmutables: cache agresiva.
        source: "/fonts/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
