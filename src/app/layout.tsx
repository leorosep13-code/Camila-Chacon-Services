import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { headers } from "next/headers";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";

import { IconSprite } from "@/components/ui/Icon";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { ExitModal } from "@/components/layout/ExitModal";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileDock } from "@/components/layout/MobileDock";
import { ScrollEffects } from "@/components/layout/ScrollEffects";
import { TopBar } from "@/components/layout/TopBar";
import { site } from "@/content/site";
import { env } from "@/lib/env";
import { buildJsonLd } from "@/lib/jsonLd";

/**
 * Poppins servida desde nuestro propio dominio.
 *
 * En el prototipo la fuente se pedía a fonts.googleapis.com en cada visita.
 * Con next/font se descarga en tiempo de compilación y se sirve junto al sitio:
 * carga más rápido, no hay salto de tipografía y ninguna IP de los visitantes
 * llega a Google.
 */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  authors: [{ name: site.person, url: site.url }],
  creator: site.person,
  publisher: site.name,
  applicationName: site.name,
  category: "Marketing digital",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  // El favicon lo aporta src/app/icon.svg (metadatos por archivo de Next).
  formatDetection: { telephone: true, email: true, address: false },
};

export const viewport: Viewport = {
  themeColor: "#826DEE",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // El nonce lo genera el middleware; sin él, el <script> de datos
  // estructurados sería bloqueado por la Content-Security-Policy.
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const jsonLd = buildJsonLd();

  return (
    <html lang="es-CO" className={poppins.variable}>
      <body>
        <a className="skip" href="#inicio">
          Saltar al contenido
        </a>

        <IconSprite />

        <TopBar />
        <Header />

        {children}

        <Footer />

        <FloatingActions />
        <MobileDock />
        <ExitModal />
        <CookieBanner />
        <ScrollEffects />

        <script
          type="application/ld+json"
          nonce={nonce}
          // JSON.stringify de datos propios y estáticos: no hay entrada de
          // usuario, y los caracteres < se escapan para no cerrar el <script>.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />

        {env.analyticsEnabled ? (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        ) : null}
      </body>
    </html>
  );
}
