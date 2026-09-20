# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

El sitio ya está construido y desplegado. Stack: **Vite + React 18 + TypeScript +
Tailwind**, SPA servida por un **server Express** (`server/index.js`) que además
expone la API de los formularios (`/api/send-contact`, `/api/send-application`,
envío por Gmail). Todo corre en **un solo contenedor Docker** en una Raspberry Pi.

```sh
npm run dev            # servidor de desarrollo
npm run build          # prebuild (optimiza imágenes) + tsc --noEmit + vite build
npm run images         # solo la pipeline de imágenes (images-resources → public/images)
./deploy-hct.sh prod   # levanta el stack con docker compose
./expose.sh prod       # preview público por Tailscale Funnel
./ship-hct.sh "msg"    # verifica, commitea y sube a GitHub (ver flujo de entrega)
```

**No hay lint ni tests configurados** — la verificación es `npm run build`. No
inventes comandos que no existan aquí.

Dónde vive qué: los datos reales del salón (contacto, dirección, horarios, P. IVA,
marcas) están centralizados en `src/content/site.ts`; el copy traducido en
`src/i18n/locales/{it,en,es}.ts` (el italiano es el idioma del cliente final); las
páginas en `src/pages/` y los componentes compartidos en `src/components/`.

## What this project is

The digital ecosystem for **Hair Color Technology di Francesca Polizza**, a boutique hair salon in Paola (Calabria, Italy) specializing in hair health, advanced/technical coloring, and non-invasive treatments (Goldwell products). The audience is women ~25–60 in Paola and nearby towns. Primary conversion actions are **online booking** and **WhatsApp** contact.

The end customer is Italian and local — user-facing copy should generally be in **Italian**, even though the brand document itself is written in Spanish.

## Brand identity (design source of truth)

All UI, content, and visual work must follow the brand. Details live in
`documents/brand/Overview de la marca.docx` — a local, gitignored folder for internal
working documents that must never ship to the server; the essentials:

- **Archetype:** The Sage (technical authority, science of color) + The Caregiver (warmth, hair-health reassurance).
- **Voice:** professional, empathetic, warm, expert, elegant, reassuring, educational (explain the *why* of each treatment). **Never** cold, distant, overly casual, improvised, or making miracle/unrealistic promises.
- **Aesthetic:** clean, luminous, "zen/wellness" — neutral white light, healthy-hair texture, organic interior tones (wood, lit mirrors), with punctual pops of technical color.
- **Color palette:**
  - Sage Green `#9CAF88` — dominant (health, calm, nature)
  - Pure / limewash white `#FFFFFF` / `#F9F9F6` — primary digital background (cleanliness, space)
  - Magenta / fuchsia `#E6007E` — accent, logo, and CTAs (modernity, energy)
  - Urban gray / marble `#333333` / `#E5E5E5` — structure and sophistication
- **Content pillars:** (1) hair health & diagnosis (educational), (2) transformations / before-after, (3) salon experience & team, (4) promotions/events/makeup & booking CTAs.

## ⚑ Flujo de entrega (el owner hace pull desde la Raspberry Pi)

Replicado de `control-tower`, adaptado: allí el trabajo pasa por ramas locales
(`control-tower-mvp` → `dev` → `prod`) porque conviven varias iniciativas; aquí
**`prod` es la única rama y la única con remoto** (`origin` → `noboolsheet/hct-web`),
así que el flujo se queda en verificar → commit → push.

Al terminar cada cambio, entrégalo con:

```sh
./ship-hct.sh "Mensaje del commit"   # verifica (typecheck + build), commitea y sube
./ship-hct.sh --check                # solo verifica, sin tocar git
```

`ship-hct.sh` **verifica antes de commitear** — si `npm run build` falla no se
commitea nada, para que `prod` esté siempre desplegable. Corre el build primero a
propósito: el `prebuild` regenera los `.webp` de `public/images/`, y así esos
cambios entran en el mismo commit. Además aborta si detecta un `.env` o un
fichero de ≥2 MB preparado para subir (la Pi tiene poco disco). Nota: hace
`git add -A`, así que no sirve para entregar solo una parte del árbol.

Luego, en la Pi: `./update-hct.sh prod` (hace `git pull --ff-only` + `./deploy-hct.sh prod`).

**No hay GitHub Actions**: el "CI" es esa puerta de calidad local, igual que en
control-tower. Este proyecto no tiene lint ni tests configurados, así que la
verificación es `tsc --noEmit` + `vite build` (lo que hace `npm run build`).

## Ficheros que NO viajan al servidor

`images-resources/` (originales de imagen, ~19 MB) y `documents/` (documentación
interna de trabajo) están en `.gitignore` y `.dockerignore`. Lo que se sirve son
los derivados ya versionados en `public/images/`. El build sobrevive a que
`images-resources/` no exista —que es el caso en la Pi—: el `prebuild` avisa y
sigue. Guarda una copia de ambas carpetas fuera del proyecto: no las cubre git.

## Tooling: impeccable design skill

The [impeccable](https://impeccable.style) design skill is installed at `.claude/skills/impeccable/` with hooks registered in `.claude/settings.local.json`:

- **PostToolUse** (Edit/Write/MultiEdit) runs an immediate UI anti-pattern check.
- **Stop** runs a full design deep-pass at the end of a turn.

These fire automatically on UI file edits — expect design feedback and act on it. Run `/impeccable init` to seed project design context, and use its commands (`craft`, `polish`, `audit`, `layout`, `typeset`, `colorize`, etc.) when doing visual work. Wire the brand palette above into whatever design tokens the eventual stack uses so impeccable and the UI stay in sync.
