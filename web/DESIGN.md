---
name: Hair Color Technology
description: Il Banco del Colore — a colorist's mixing bench where technical color science and hair-health care are one gesture.
colors:
  sage: "#9CAF88"
  sage-100: "#E2E9D8"
  sage-600: "#6F8159"
  sage-700: "#586747"
  sage-800: "#414C35"
  magenta: "#E6007E"
  magenta-soft: "#F04D9F"
  magenta-deep: "#B80065"
  graphite: "#333333"
  graphite-soft: "#4A4A48"
  limewash: "#F9F9F6"
  pure: "#FFFFFF"
  marble: "#E5E5E5"
typography:
  display:
    fontFamily: "'Archivo Variable', Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5.4vw, 4rem)"
    fontWeight: 640
    lineHeight: 0.98
    letterSpacing: "-0.03em"
    fontVariation: "'wght' 640, 'wdth' 118"
  headline:
    fontFamily: "'Archivo Variable', Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.8rem, 5vw, 3.4rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  body:
    fontFamily: "'Archivo Variable', Archivo, system-ui, sans-serif"
    fontSize: "1.06rem"
    fontWeight: 400
    lineHeight: 1.6
  notation:
    fontFamily: "'Martian Mono Variable', 'Martian Mono', ui-monospace, monospace"
    fontSize: "0.68rem"
    fontWeight: 500
    letterSpacing: "0.14em"
rounded:
  swatch: "2px"
  control: "3px"
  card: "5px"
  panel: "10px"
spacing:
  section-y: "clamp(5rem, 8vw, 7rem)"
  card: "24px"
  gutter: "20px"
components:
  button-primary:
    backgroundColor: "{colors.magenta}"
    textColor: "{colors.pure}"
    rounded: "{rounded.control}"
    padding: "14px 24px"
  button-primary-hover:
    backgroundColor: "{colors.magenta-deep}"
  button-outline:
    textColor: "{colors.graphite}"
    rounded: "{rounded.control}"
    padding: "14px 24px"
  bench-card:
    backgroundColor: "{colors.pure}"
    rounded: "{rounded.card}"
    padding: "24px"
  swatch-chip:
    rounded: "{rounded.swatch}"
    size: "16px"
  filter-chip:
    backgroundColor: "{colors.pure}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.control}"
    padding: "8px 16px"
  filter-chip-active:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.limewash}"
  input:
    backgroundColor: "{colors.pure}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
---

# Design System: Hair Color Technology

## Overview

**Creative North Star: "Il Banco del Colore" (The Colorist's Bench)**

The site is the colorist's mixing bench brought to the screen. Color is mixed into a living spectrum, the health of the hair is read like an instrument, and every service is expressed as a *formula* — a base, a tone, a developer, a timing. The world dramatizes the brand's exact mechanism — *the science of color, the art of caring for your hair* — rather than asserting it. The Sage (technical mastery, the numbered logic of professional color) and the Caregiver (the warm hand, the protected fibre) share one luminous surface.

The register is luminous and material, never clinical. The ground is limewash white and neutral daylight — the way the physical salon actually looks. Sage green washes whole working surfaces the way it dominates the room. Magenta is rationed to a single high-voltage voice: the primary action and the "active/selected" state. The signature moment is the interactive **banco** on the homepage — selecting a service remixes a grained spectral surface and reveals that service's technical formula in tracked mono.

The world deliberately **refuses** the glossy model-hero luxe-spa homepage every salon ships (and its minimalist-editorial opposite), the cold clinical laboratory, and the AI-default cream-paper-plus-high-contrast-serif-plus-terracotta look.

**Key Characteristics:**
- A living, *mixed* spectral field (sage → limewash → magenta), grained, never a flat gradient.
- Services and treatments rendered as technical **formulas** (base / tone / developer / timing) in Martian Mono.
- Magenta reserved for the single primary action and active state.
- Warm limewash ground with sage carrying whole regions — the bench, not the lab.
- Crisp swatch/formula-card shapes; flat surfaces that lift only on interaction.

## Colors

A luminous limewash ground carrying large sage working-surfaces, punctuated by a single high-voltage magenta and structured in graphite. The palette is fixed by the brand and binding.

### Primary
- **Salvia / Sage Green** (`#9CAF88`, with tints `sage-100 #E2E9D8` and shades to `sage-800 #414C35`): the dominant working color — fills whole regions (product section, philosophy list marks, page-hero grounds, the spectral surface), and now carries the labels and small marks that previously leaked magenta. Signals health, regeneration, calm.

### Secondary
- **Magenta Tecnico** (`#E6007E`, hover `magenta-deep #B80065`): the logo and the single call-to-action voice. Reserved for the primary button, the active navigation link, the "oggi" current-day marker, form error/link states, and exactly one expressive hero headline accent word. Its rarity is the point.

### Neutral
- **Bianco Calizo / Limewash** (`#F9F9F6`) and **Bianco Puro** (`#FFFFFF`): the primary digital ground and card surfaces — cleanliness, daylight, space.
- **Grafite / Graphite** (`#333333`, soft `#4A4A48`): body text, headings, technical notation, and the dark footer/feature bands.
- **Marmo / Marble** (`#E5E5E5`): quiet dividers and inactive structure.

### Named Rules
**The One Voice Rule.** Magenta covers ≤10% of any screen and speaks only for the primary action and the active/selected state (plus a single deliberate hero accent word). Category labels, needs, stars, and section icons are sage — never magenta.

**The Mixed-Not-Printed Rule.** The spectral field is a CSS/SVG gradient deformed by an SVG turbulence displacement (`feTurbulence` + `feDisplacementMap`) with a soft-light grain overlay, so it reads as pigment mixed by hand, never a flat gradient.

**The Warm Bench Rule.** Every technical element sits on a warm ground (limewash, sage, the white formula card). No pure clinical white-on-black.

## Typography

**Display / UI / Body Font:** Archivo (variable, `'Archivo Variable'`) — display uses the width axis (`wdth` 112–118) for the "expanded" instrument-panel voice.
**Notation Font:** Martian Mono (variable) for level / tone / developer / timing codes.

**Character:** Archivo is a precise grotesque with the feel of a well-set identity program — confident at large display sizes, neutral in body. Martian Mono, tracked out and small, makes professional color notation read as evidence of expertise. Warmth comes from scale, the sage ground, and the Italian expert-but-empathetic copy — not from a decorative serif.

### Hierarchy
- **Display** (`.display`, wght 640 / wdth 118, `clamp(2.5rem, 5.4vw, 4rem)`, line-height 0.98, tracking -0.03em): the hero statement and page-hero titles.
- **Headline** (`.display-tight`, wght 600, `clamp(1.8rem, 5vw, 3.4rem)`): section openers.
- **Title** (Archivo 500–600, ~1.25rem): service, value, and product names.
- **Body** (Archivo 400, ~1.06rem, line-height 1.6, measure ≤68ch): educational copy in Italian.
- **Notation / Label** (`.notation`, Martian Mono 500, 0.68rem, tracking 0.14em, uppercase): the technical codes and small labels; on light grounds set at graphite/80 for legibility.

### Named Rules
**The Notation Rule.** Technical codes (level, tone, vol, timing) are always tracked mono, small, and never carry running prose. They are instruments, not a paragraph face.

## Layout

The spatial model is a **working bench**: a broad calm surface read across, with stations stacked down the scroll (Diagnosi → Formula → Cura → Trasformazioni → Esperienza → Contatti). Container max width 72rem (`max-w-6xl`), 20px gutters growing to 32px, section vertical rhythm `clamp(5rem, 8vw, 7rem)`. Sections alternate limewash / white / sage / graphite grounds for tonal layering. One spacing rhythm throughout, more space above a heading than below it. On mobile the hero un-centers so the interactive banco card sits within the first viewport, and two-column stations stack full-width.

## Elevation & Depth

Flat and material by default; depth comes from tonal layering (sage regions on limewash, marble dividers), not ambient shadows. Shadows appear only as a response to state: a card or swatch lifted on hover/selection, and the soft cast under the spectral bench surface behind the hero formula card.

### Shadow Vocabulary
- **Lift** (`box-shadow: 0 18px 40px -24px rgba(51,51,51,0.45)`): interactive cards on hover.
- **Bench** (`box-shadow: 0 28px 60px -28px rgba(51,51,51,0.45)`): the spectral surface the hero formula card rests on.
- **Action** (`box-shadow: 0 10px 28px -12px rgba(230,0,126,0.6)`): the magenta primary button.

### Named Rules
**The Flat-Bench Rule.** Surfaces rest flat on the bench. A shadow means something was picked up — hover, selection, the active formula — and nothing else.

## Shapes

The form language is the **color swatch and the formula card**: crisp rectangular swatch chips at 2px radius, controls/chips at 3px, cards at 5px, and larger spectral panels at 10px. Borders are hairline graphite/marble (1px). The mixing-bowl curve appears as the one organic counter-form in the spectral field's displaced, grained edge.

## Components

### Buttons
- **Shape:** crisp, 3px radius (`rounded.control`).
- **Primary:** magenta ground, white text, 14×24px padding, Action shadow; hover → magenta-deep with a 2px lift. The single CTA voice.
- **Outline:** 1px graphite/25 border, graphite text; hover deepens the border. Secondary actions.
- **Ghost:** text-only, graphite → magenta on hover. Inline/tertiary.

### Chips
- **Service selector (banco) / category filter:** 3px radius; inactive = sage-100 or white with 1px graphite ring; active = graphite ground, limewash text.

### Cards (BenchCard)
- **Corner:** 5px radius. **Background:** pure white. **Border:** 1px graphite/10. **Shadow:** none at rest; Lift on hover when interactive. **Padding:** 24px.

### Inputs / Fields
- **Style:** white ground, 1px graphite/20 border, 3px radius, 12×16px padding. **Focus:** border shifts to magenta; a magenta focus ring on keyboard focus. **Error:** magenta alert band.

### Formula Readout (signature)
Label/value rows in Martian Mono separated by hairline rules — the technical "formula" of a service (base, tone, developer, timing). Labels at graphite/80; values in graphite. Inverts to limewash on dark grounds.

### Spectral Field (signature)
An SVG linear gradient (sage-dominant, magenta as the closing accent) deformed by animated `feTurbulence` + `feDisplacementMap`, with a soft-light grain overlay. `tone` (0–1) shifts the magenta accent's position and is driven by the banco's service selection. Reduced-motion freezes the turbulence.

### Navigation
Fixed, transparent over the hero, gaining a limewash/blur bar with a 1px border on scroll. Links graphite/80 → magenta with an animated underline on the active route; mobile collapses to a full-width sheet.

## Do's and Don'ts

### Do:
- **Do** render the spectrum as *mixed* pigment (grain, living transition) — The Mixed-Not-Printed Rule.
- **Do** keep magenta rare and load-bearing (primary action + active state + one hero accent) — The One Voice Rule.
- **Do** set technical notation in tracked Martian Mono, small, at graphite/80 on light grounds — The Notation Rule.
- **Do** keep the ground luminous limewash with sage carrying whole regions.
- **Do** write all user-facing copy in **Italian**, in the Sage + Caregiver voice, explaining the *why*.
- **Do** express services and treatments as technical formulas, not generic menu rows.
- **Do** keep the interactive banco card within the first viewport on mobile.

### Don't:
- **Don't** ship the glossy model-hero luxe-spa hero or the minimalist-editorial opposite — the refused rut.
- **Don't** put a mono kicker/eyebrow above a heading.
- **Don't** spend magenta on category labels, stars, or decorative icons.
- **Don't** build same-size icon+heading+text card grids; differentiate the structure.
- **Don't** use scratch/film-grain textures that read as hair *damage*, or a cold clinical lab look.
- **Don't** fabricate testimonials, prices, or before/after results; real business data lives in `src/content/site.ts` as marked placeholders.
