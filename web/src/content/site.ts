/**
 * ─────────────────────────────────────────────────────────────────────────
 *  DATI REALI DEL SALONE — DA COMPLETARE
 * ─────────────────────────────────────────────────────────────────────────
 *  Tutti i dati di contatto e i link reali vivono qui, in un solo file.
 *  I valori marcati "DA COMPLETARE" sono segnaposto: sostituiscili con i
 *  dati reali del salone. Nessun dato falso viene mostrato come se fosse vero.
 *
 *  Checklist rapida:
 *   - whatsappNumber, phone, email (destinatario del modulo)
 *   - address, mapsUrl, mapsEmbedSrc, hours
 *   - social (instagram, facebook, googleBusiness)
 *   - goldwellUrl e gli altri marchi
 *   - catalogoServiziUrl / catalogoProdottiUrl (i PDF, quando ci sono)
 */

export const TODO = 'DA COMPLETARE'

export const site = {
  name: 'Hair Color Technology',
  owner: 'Francesca Polizza',
  cityShort: 'Paola',
  region: 'Calabria',
  tagline: 'La scienza del colore, l’arte di curare i tuoi capelli.',
  claim:
    'Salone boutique a Paola specializzato in salute del capello, colorazione tecnica avanzata e trattamenti non invasivi.',

  // ── Contatti ──────────────────────────────────────────────────────────
  // Numero in formato internazionale senza "+", spazi o trattini (per WhatsApp).
  whatsappNumber: '393409067574',
  whatsappMessage:
    'Ciao Hair Color Technology! Vorrei informazioni per un appuntamento.',
  phoneDisplay: '+39 340 906 7574',
  // Partita IVA — obbligatoria nel footer per legge (art. 35 DPR 633/72).
  vatNumber: '03855570788',
  // Indirizzo email che riceverà i moduli (contatti e candidature).
  // Impostalo nel server tramite la variabile d'ambiente CONTACT_TO.
  emailDisplay: 'haircolortechnology@gmail.com',

  // ── Sede ──────────────────────────────────────────────────────────────
  address: {
    street: 'Via S. Rocco, 49',
    city: 'Paola',
    zip: '87027',
    province: 'CS',
    country: 'Italia',
  },
  // Link "Indicazioni" e sorgente per l'iframe della mappa.
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Via+S.+Rocco+49+87027+Paola+CS',
  mapsEmbedSrc:
    'https://maps.google.com/maps?q=Via%20S.%20Rocco%2049%2C%2087027%20Paola%20CS&z=16&output=embed',

  // ── Orari ─────────────────────────────────────────────────────────────
  // Ordine da Lunedì a Domenica. Gli orari (value) non si traducono; i nomi
  // dei giorni e "Chiuso" arrivano dalle traduzioni. "closed: true" chiude.
  // Mercoledì e domenica chiuso; gli altri giorni 9:00–17:30 orario continuato.
  hours: [
    { value: '09:00–17:30' }, // Lunedì
    { value: '09:00–17:30' }, // Martedì
    { value: '', closed: true }, // Mercoledì
    { value: '09:00–17:30' }, // Giovedì
    { value: '09:00–17:30' }, // Venerdì
    { value: '09:00–17:30' }, // Sabato
    { value: '', closed: true }, // Domenica
  ] as { value: string; closed?: boolean }[],

  // ── Social & link esterni ─────────────────────────────────────────────
  social: {
    instagram:
      'https://www.instagram.com/haircolortechnology?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    facebook: 'https://www.facebook.com/profile.php?id=61560254945558&locale=it_IT',
    googleBusiness: 'https://share.google/EK1u3grUVfMdbj0Wv',
    tiktok: '',
  },

  // ── Marchi & prodotti ─────────────────────────────────────────────────
  // `logo` punta a un file generato in public/images dalla pipeline immagini
  // (metti l'originale in images-resources/). `logoW`/`logoH` sono le dimensioni
  // intrinseche: servono al browser per riservare lo spazio ed evitare salti di
  // layout. `logoMaxH` è la sola regolazione ottica, perché i due lockup hanno
  // proporzioni molto diverse (Goldwell è una striscia, Kerasilk è impilato).
  brands: [
    {
      name: 'Goldwell',
      url: 'https://www.goldwell.com',
      note: 'Colore e cura professionale',
      logo: '/images/goldwell_logo.svg',
      logoW: 188,
      logoH: 22,
      logoMaxH: 30,
    },
    {
      name: 'Kerasilk',
      url: 'https://www.kerasilk.com',
      note: 'Trattamenti di lusso su misura',
      logo: '/images/kerasilk_logo.webp',
      logoW: 381,
      logoH: 223,
      logoMaxH: 66,
    },
  ],
  // I PDF dei cataloghi. Vuoti finché non esistono: i pulsanti restano
  // visibili ma spenti, così si sa che stanno arrivando.
  catalogoServiziUrl: '',
  catalogoProdottiUrl: '',

  // ── Recensioni ────────────────────────────────────────────────────────
  // Link diretto alle recensioni Google (bottone "Leggi su Google").
  googleReviewsUrl:
    'https://www.google.com/search?sa=X&sca_esv=2872aa23361dbd4c&hl=it-IT&biw=1512&bih=861&sxsrf=APpeQntOQUn339RAF6bjv2XiRU0NT7QL5w:1785952232414&q=Hair+Color+Technology+di+Francesca+Polizza+Parrucchiere+Donna+Recensioni&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxI2NjE1tjQ2sDQ1MzU0MzY1MzG32MDI-IrRwyMxs0jBOT8nv0ghJDU5Iw_ISq9USMlUcCtKzEtOLU5OVAjIz8msqgLSiUVFpcnJGZmpRakKLvl5eYkKQanJqXnFmfl5mYtYqWYUAHaWff6wAAAA&rldimm=3453930956516356478&tbm=lcl&ved=2ahUKEwjVh5jDhoqWAxXr-gIHHZAFPBIQ9fQKegQIPRAG#lkt=LocalPoiReviews',
  // Profilo Google per lasciare una nuova recensione.
  reviewsUrl: 'https://share.google/EK1u3grUVfMdbj0Wv',
} as const

/** Costruisce il link WhatsApp con messaggio precompilato. */
export function whatsappHref(message = site.whatsappMessage): string {
  const n = site.whatsappNumber.replace(/[^\d]/g, '')
  return `https://wa.me/${n}?text=${encodeURIComponent(message)}`
}

/** Vero quando un valore è ancora un segnaposto (per rendering condizionale). */
export function isTodo(v: string): boolean {
  return !v || v === TODO
}
