"use client";

import { useEffect } from "react";

/**
 * Motor de efectos ligado al scroll. Es el equivalente del <script> del
 * prototipo, pero encapsulado en un solo componente cliente:
 *
 *   1. Header compacto al bajar (.hdr.is-stuck)
 *   2. Enlace de navegación activo según la sección visible
 *   3. Botón "volver arriba" (.top.is-on)
 *   4. Parallax suave en la foto ([data-parallax])
 *   5. Aparición progresiva de bloques (.rv -> .is-in)
 *   6. Contadores animados de la sección de cifras
 *   7. Trazado de la línea del método
 *
 * No pinta nada: solo añade y quita clases sobre el HTML ya renderizado en el
 * servidor. Si el JavaScript falla, la página sigue siendo legible porque
 * el CSS deja los elementos visibles con `prefers-reduced-motion`.
 */
export function ScrollEffects() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const hdr = document.getElementById("hdr");
    const toTop = document.getElementById("toTop");
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('#nav a[href^="#"]'));
    const parallaxEls = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));

    /* ---------------- scroll ---------------- */
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;

      hdr?.classList.toggle("is-stuck", y > 20);
      toTop?.classList.toggle("is-on", y > 700);

      const pos = y + 160;
      let current = "";
      for (const section of sections) {
        if (pos >= section.offsetTop) current = section.id;
      }
      for (const link of navLinks) {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${current}`);
      }

      if (!reduce) {
        for (const el of parallaxEls) {
          const rect = el.getBoundingClientRect();
          const delta = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
          el.style.transform = `translateY(${(delta * -22).toFixed(2)}px)`;
        }
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    /* ---------------- contadores ---------------- */
    const frames = new Set<number>();

    const runCounter = (el: HTMLElement) => {
      const target = Number.parseFloat(el.dataset.count ?? "0");
      const prefix = el.dataset.pre ?? "";

      if (reduce || Number.isNaN(target)) {
        el.textContent = `${prefix}${Number.isNaN(target) ? "" : target}`;
        return;
      }

      const duration = 1400;
      let start: number | null = null;

      const tick = (time: number) => {
        if (start === null) start = time;
        const progress = Math.min((time - start) / duration, 1);
        // Easing "out cubic": arranca rápido y frena al final.
        el.textContent = prefix + Math.round(target * (1 - Math.pow(1 - progress, 3)));
        if (progress < 1) frames.add(requestAnimationFrame(tick));
      };

      frames.add(requestAnimationFrame(tick));
    };

    /* ---------------- reveal ---------------- */
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(".rv, #method, .stat b[data-count]"),
    );

    let observer: IntersectionObserver | null = null;

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const el = entry.target as HTMLElement;
            if (el.classList.contains("rv") || el.id === "method") el.classList.add("is-in");
            if (el.dataset.count !== undefined) runCounter(el);
            observer?.unobserve(el);
          }
        },
        { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
      );
      for (const el of targets) observer.observe(el);
    } else {
      // Navegador sin IntersectionObserver: se muestra todo de una vez.
      for (const el of targets) {
        el.classList.add("is-in");
        if (el.dataset.count !== undefined) runCounter(el);
      }
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer?.disconnect();
      for (const id of frames) cancelAnimationFrame(id);
    };
  }, []);

  return null;
}
