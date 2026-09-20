/**
 * ─────────────────────────────────────────────────────────────────────────
 *  Le tappe della storia di Francesca — collage cronologico di "Chi siamo"
 * ─────────────────────────────────────────────────────────────────────────
 *  Stessa divisione di `catalog.ts`: qui vivono gli id, le foto e la
 *  disposizione; i testi stanno nelle traduzioni (`t.tappe[id]`), perché sono
 *  gli unici pezzi che cambiano con la lingua.
 *
 *  Fonte dei testi: documents/contenuti/BIOGRAFIA.docx (cartella locale, non
 *  versionata).
 */

export const tappaIds = [
  'scintilla',
  'danza',
  'diciotto',
  'laurea',
  'milano',
  'ritorno',
  'goldwell',
  'salone',
] as const

export type TappaId = (typeof tappaIds)[number]

export interface Tappa {
  /** Foto in public/images. `w`/`h` sono le dimensioni intrinseche del file:
   *  servono al browser per riservare lo spazio ed evitare salti di layout. */
  src: string
  w: number
  h: number
  /** Larghezza massima della cornice, in rem. È calcolata a partire dal
   *  formato per far cadere TUTTE le foto in una fascia di altezza simile:
   *  senza questo i ritratti verticali diventano torri alte il doppio delle
   *  orizzontali e il collage si sfilaccia. */
  maxW: number
  /** Inclinazione a riposo, in gradi. Fissa per tappa — mai casuale, o
   *  cambierebbe a ogni render. Valori piccoli: la foto deve sembrare
   *  appoggiata, non buttata. Il lato non sta qui: nello zigzag lo decide
   *  la posizione della tappa. */
  tilt: number
}

export const tappe: Record<TappaId, Tappa> = {
  scintilla: { src: '/images/la-mia-storia-piccola.webp', w: 2048, h: 1439, tilt: -2.4, maxW: 27 },
  danza: { src: '/images/la-mia-storia-danza.webp', w: 2048, h: 1472, tilt: 1.8, maxW: 29 },
  diciotto: { src: '/images/la-mia-storia-diciotto-anni.webp', w: 1464, h: 2048, tilt: 2.6, maxW: 14.5 },
  laurea: { src: '/images/la-mia-storia-laurea.webp', w: 1302, h: 2048, tilt: -1.6, maxW: 13.6 },
  milano: { src: '/images/la-mia-storia-milano.webp', w: 1152, h: 2048, tilt: 2.1, maxW: 12.6 },
  ritorno: { src: '/images/la-mia-storia-personali-1.webp', w: 1996, h: 1456, tilt: -2.8, maxW: 26 },
  // La foto del banco colore: stesso scatto della home, qui in un altro taglio.
  goldwell: { src: '/images/img-titolare-colore.webp', w: 1440, h: 856, tilt: 1.4, maxW: 30 },
  // Originale a soli 640×503: va tenuta piccola, o si vede la grana.
  salone: { src: '/images/img-titolare-inaugurazione.webp', w: 640, h: 503, tilt: -2.2, maxW: 21 },
}
