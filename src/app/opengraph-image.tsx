import { ImageResponse } from "next/og";
import { site } from "@/content/site";

/**
 * Imagen que se ve al compartir el enlace por WhatsApp, Instagram o LinkedIn.
 * Se genera en tiempo de compilación, así que no hay ningún archivo que
 * mantener a mano ni que se quede desactualizado.
 */
export const alt = `${site.name} — ${site.person}, ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1A1A1A",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Halo morado, el mismo del hero */}
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -160,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background: "#826DEE",
            opacity: 0.45,
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="52" height="52" viewBox="0 0 24 24">
            <path
              d="M12 12V3M12 12 5.8 5.8M12 12H3M12 12 5.8 18.2M12 12v9M12 12 18.2 18.2M12 12h9M12 12 18.2 5.8"
              fill="none"
              stroke="#826DEE"
              strokeWidth="2.6"
              strokeLinecap="square"
            />
          </svg>
          <span style={{ color: "#fff", fontSize: 38, fontWeight: 700, letterSpacing: "-0.03em" }}>
            club by cami
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              color: "#fff",
              fontSize: 78,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
              textTransform: "uppercase",
            }}
          >
            Tu negocio merece
          </span>
          <span
            style={{
              color: "#D8F382",
              fontSize: 78,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
              textTransform: "uppercase",
            }}
          >
            vender más
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <span style={{ color: "#C7C7D0", fontSize: 30 }}>
            {site.person} · {site.role}
          </span>
          <span style={{ color: "#8E8E99", fontSize: 24, letterSpacing: "0.14em" }}>
            ESTRATEGIA · CONTENIDO · E-COMMERCE · PUBLICIDAD · DATOS
          </span>
        </div>
      </div>
    ),
    size,
  );
}
