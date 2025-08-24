"use client";

import { motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";

const CherenkovCanvas = dynamic(() => import("./CherenkovCanvas"), { ssr: false });

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative isolate min-h-[100svh] overflow-hidden flex items-center"
      aria-label="Plan Nuclear Argentino"
    >
      <div className="hero-fallback" aria-hidden />
      {!reduce && <CherenkovCanvas />}

      <svg className="hero-noise" aria-hidden viewBox="0 0 800 600" preserveAspectRatio="none">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.007" numOctaves="3" seed="3" />
          <feColorMatrix type="saturate" values="1.2"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" fill="oklch(72% 0.18 230)" />
      </svg>

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="max-w-3xl">
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-sm text-white/70"
          >
            <span>Visión nacional</span>
            <span aria-hidden>•</span>
            <span className="text-white/90">Soberanía energética</span>
          </motion.div>

          <motion.h1
            className="display mt-6 text-balance text-5xl md:text-7xl lg:text-8xl font-[700] text-white"
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          >
            Plan Nuclear Argentino
            <span className="block text-white/80">El futuro es <span style={{ color: "oklch(78% 0.17 230)" }}>nuclear</span>.</span>
          </motion.h1>

          <motion.p
            className="mt-6 text-xl/8 text-white/75 max-w-2xl"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Cero carbono de base, empleos de alta calificación y <em>liderazgo tecnológico</em>.
            No es un sueño: es un plan de construcción. Argentina, encendida en azul.
          </motion.p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <motion.a
              href="#sumate"
              className="btn"
              aria-label="Sumarme a la iniciativa"
              whileHover={reduce ? undefined : { scale: 1.02 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
            >
              Quiero sumarme
              <svg aria-hidden viewBox="0 0 24 24" width="20" height="20" fill="none">
                <path d="M5 12h13M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </motion.a>

            <motion.a
              href="#hoja-de-ruta"
              className="btn btn-secondary"
              aria-label="Ver la hoja de ruta"
              whileHover={reduce ? undefined : { scale: 1.02 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
            >
              Ver la hoja de ruta
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
