/**
 * Dati STRUTTURALI del catalogo (non traducibili): ordine e id di servizi,
 * prodotti e categorie, più i nomi di marca. I testi tradotti vivono in
 * src/i18n/locales/* sotto le stesse chiavi.
 *
 * Le categorie e i servizi seguono il menù del salone
 * (documents/contenuti/Menù Servizi.docx, cartella locale non versionata).
 */

export type CategoryId = 'color-tech' | 'taglio' | 'styling' | 'cura' | 'trucco'

export const categoryIds: CategoryId[] = ['color-tech', 'taglio', 'styling', 'cura', 'trucco']

export const serviceIds = [
  // COLOR&TECH
  'colore-radice',
  'colorazione-totale',
  'schiaritura',
  'tonalizzazione',
  'elumen',
  // TAGLIO & TRASFORMAZIONE
  'taglio-sartoriale',
  'taglio-cambio-look',
  // STYLING & PIEGA
  'piega-corti',
  'piega-lunghi',
  'acconciatura',
  // TRATTAMENTI HEALTH & CARE
  'ricostruzione-kerasilk',
  'lisciante-kerasilk',
  'disciplinante-medium',
  'scalp-specialist',
  // TRUCCO & ESTETICA
  'trucco-giorno-sera',
  'trucco-sposa',
  'estetica-base',
] as const
export type ServiceId = (typeof serviceIds)[number]

export const serviceCategory: Record<ServiceId, CategoryId> = {
  'colore-radice': 'color-tech',
  'colorazione-totale': 'color-tech',
  schiaritura: 'color-tech',
  tonalizzazione: 'color-tech',
  elumen: 'color-tech',
  'taglio-sartoriale': 'taglio',
  'taglio-cambio-look': 'taglio',
  'piega-corti': 'styling',
  'piega-lunghi': 'styling',
  acconciatura: 'styling',
  'ricostruzione-kerasilk': 'cura',
  'lisciante-kerasilk': 'cura',
  'disciplinante-medium': 'cura',
  'scalp-specialist': 'cura',
  'trucco-giorno-sera': 'trucco',
  'trucco-sposa': 'trucco',
  'estetica-base': 'trucco',
}

/**
 * I tre servizi in anteprima nella home. Scelti per coprire tre bisogni
 * diversi invece di tre sfumature dello stesso: il colore tecnico che è il
 * cuore del salone, la trasformazione più richiesta della linea Kerasilk, e
 * il taglio, che è la porta d'ingresso per chi non è ancora cliente.
 */
export const homeServiceIds: ServiceId[] = [
  'colorazione-totale',
  'lisciante-kerasilk',
  'taglio-sartoriale',
]

/**
 * Forma dei testi di un servizio, uguale in tutte le lingue. Serve a dare
 * UN tipo solo al dizionario: senza, TypeScript inferisce diciassette forme
 * diverse (alcuni servizi hanno la nota tecnica, altri no) e leggere
 * `svc.tech` diventa un errore su quelli che non ce l'hanno.
 */
/**
 * Le foto prima/dopo di ogni servizio. **Non ce n'è ancora nessuna**: finché
 * questa mappa resta vuota, le schede mostrano il segnaposto salvia invece
 * di un'immagine rotta. Quando arrivano gli scatti, si mettono gli originali
 * in `images-resources/` e si scrive qui la coppia:
 *
 *   'colore-radice': { before: '/images/colore-radice-prima.webp',
 *                      after:  '/images/colore-radice-dopo.webp' },
 */
export const servicePhotos: Partial<Record<ServiceId, { before?: string; after?: string }>> = {}

export interface ServiceCopy {
  name: string
  /** Il nome tecnico del servizio, come sul menù del salone. */
  tagline: string
  /** Due righe per la scheda. */
  short: string
  /** Il testo esteso della pagina dedicata. */
  long: string
  /** I passaggi del rituale, dove il servizio ne ha. */
  steps?: string[]
  duration: string
  /** Solo la cifra ('35 €'): l'etichetta della scheda dice già "a partire
   *  da". Vuoto finché il prezzo non è deciso — allora la scheda dirà
   *  "su richiesta". */
  price: string
  /** Nota tecnica: perché i tempi o il risultato possono cambiare. */
  tech?: string
  /** Cosa NON è compreso, o avvertenze sui tempi. */
  note?: string
}

export const productIds = [
  'dualsenses-color',
  'kerasilk-reconstruct',
  'kerasilk-control',
  'scalp',
  'stylesign',
  'heat-protect',
] as const
export type ProductId = (typeof productIds)[number]

/**
 * Il prodotto messo in evidenza in cima alla pagina prodotti. Per ora è una
 * scelta fissa; quando il salone vorrà cambiarlo ogni settimana, basta
 * cambiare questo id. Kerasilk Reconstruct è il compagno a casa del
 * trattamento di punta del salone, quindi è quello che ha più senso mostrare.
 */
export const productOfTheWeek: ProductId = 'kerasilk-reconstruct'

/** Linee di marca (nomi propri: NON tradotti). */
export const productLine: Record<ProductId, string> = {
  'dualsenses-color': 'Goldwell Dualsenses',
  'kerasilk-reconstruct': 'Goldwell Kerasilk',
  'kerasilk-control': 'Goldwell Kerasilk Control',
  scalp: 'Goldwell Dualsenses Scalp',
  stylesign: 'Goldwell StyleSign',
  'heat-protect': 'Goldwell Dualsenses',
}

/**
 * Le foto dei prodotti. Vuoto finché non arrivano gli scatti: le schede
 * mostrano il segnaposto invece di un'immagine rotta.
 */
export const productPhotos: Partial<Record<ProductId, string>> = {}

/** Forma dei testi di un prodotto, uguale in tutte le lingue. */
export interface ProductCopy {
  name: string
  /** Il bisogno che copre: è l'etichetta della scheda. */
  need: string
  /** Due righe per la scheda. */
  description: string
  /** Il testo esteso della pagina dedicata. */
  long: string
  /** Come si usa. */
  usage: string
  /** Che tipo di prodotto è (scheda tecnica). */
  tipo: string
  /** Ogni quanto usarlo (scheda tecnica). */
  quando: string
}

export const valueIcons = ['heart', 'flask', 'leaf'] as const
