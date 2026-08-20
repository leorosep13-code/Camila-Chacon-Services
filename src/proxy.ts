import { NextResponse, type NextRequest } from "next/server";

/**
 * Content-Security-Policy con `nonce` por peticion (archivo `proxy`, la
 * convencion que sustituye a `middleware` desde Next.js 16).
 *
 * Por que aqui y no en next.config.ts: un nonce solo aporta seguridad si es
 * distinto en cada respuesta, asi que tiene que generarse en tiempo de
 * ejecucion. Next.js lee la cabecera `content-security-policy` de la peticion,
 * extrae el nonce y se lo pone automaticamente a sus propios <script>.
 *
 * `strict-dynamic` hace que los scripts cargados por un script confiable
 * hereden la confianza, y que los navegadores modernos ignoren la lista
 * `https:` (que queda solo como respaldo para navegadores antiguos).
 */
export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV === "development";

  const csp = [
    `default-src 'self'`,
    `base-uri 'self'`,
    `object-src 'none'`,
    `form-action 'self'`,
    `frame-ancestors 'none'`,
    // En desarrollo Next necesita eval para el hot-reload.
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https: ${isDev ? "'unsafe-eval'" : ""}`,
    // Necesario para el <style> que inyecta next/font y para los style="" puntuales.
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' data: blob: https://ssl.gstatic.com`,
    `font-src 'self' data:`,
    // Vercel Analytics / Speed Insights se sirven desde el propio dominio.
    `connect-src 'self' https://vitals.vercel-insights.com${isDev ? " ws: wss:" : ""}`,
    // Unico tercero embebido: el agendamiento de Google Calendar.
    `frame-src https://calendar.google.com https://calendar.app.google`,
    `media-src 'self'`,
    `manifest-src 'self'`,
    `worker-src 'self' blob:`,
    `upgrade-insecure-requests`,
  ]
    .join("; ")
    .replace(/\s{2,}/g, " ")
    .trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("content-security-policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("content-security-policy", csp);

  return response;
}

export const config = {
  matcher: [
    /*
     * Se salta los assets estaticos: no necesitan CSP y asi el proxy
     * no encarece cada peticion de imagen o fuente.
     */
    {
      source:
        "/((?!api|_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|vcf|txt|xml|webmanifest)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
