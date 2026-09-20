/**
 * Recensioni REALI dei clienti (Google, tutte 5 stelle). Sono testimonianze
 * autentiche in italiano: NON vanno tradotte. Le nuove recensioni si leggono e
 * si lasciano su Google (site.social.googleBusiness / site.reviewsUrl).
 */
export interface Review {
  author: string
  text: string
}

export const reviews: Review[] = [
  {
    author: 'Maria Fernanda Artigas Herold',
    text: 'Mi è piaciuta tantissimo Francesca. Molto bella, molto brava e molto professionale. Nel suo negozio lei e la sua assistente si prendono continuamente cura dei clienti e del loro benessere. Un servizio meraviglioso. Sono rimasta molto soddisfatta del risultato dei miei capelli e da ora in poi verrò sempre qui.',
  },
  {
    author: 'Mariateresa D’Ambrosio',
    text: 'Bellissima esperienza, bel negozio e la piega semplicemente meravigliosa! Nonostante i miei capelli non tengano mai molto, è durata parecchio: grazie Francesca e Valentina, siete state davvero una bella scoperta!',
  },
  {
    author: 'Fiore Mannarino',
    text: 'Alta professionalità.',
  },
]

/** Valutazione aggregata su Google (recensioni tutte a 5 stelle). */
export const rating = {
  value: 5 as number | null,
  count: reviews.length as number | null,
}
