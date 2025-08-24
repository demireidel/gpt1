# Plan Nuclear Argentino — Hero

**Fecha:** 2025-08-24

Este ZIP incluye **todo lo necesario** para correr el hero:

- Proyecto Next.js 15.5 con React 19, Tailwind 4, Framer Motion, Three.js + R3F.
- `static-hero/` (versión **estática** que corre con doble click).
- `Dockerfile` para build y runtime reproducible.
- `vercel.json` para deploy rápido en Vercel.

## 1) Ejecutar local (Node 20+)

```bash
pnpm i
pnpm dev
# producción
pnpm build
pnpm start
```

## 2) Deploy en Vercel

- Importá el repo/carpeta en Vercel y dejá el Build Command por defecto (`pnpm build`).

## 3) Docker (opcional)

```bash
docker build -t pna-hero .
docker run -p 3000:3000 pna-hero
```

## 4) Hero **estático** instantáneo

Abrí `static-hero/index.html` en el navegador: no requiere Node ni instalar paquetes.

---

> Paleta: azul Cherenkov + negro. Lema: **El futuro es nuclear**. A11y: respeta `prefers-reduced-motion`. El lienzo WebGL se carga diferido.
