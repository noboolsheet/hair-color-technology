import { Link } from 'react-router-dom'
import { site, isTodo } from '../content/site'
import { Icon } from './Icon'
import { Notation, PhotoPlaceholder } from './bits'
import { Reveal } from './Reveal'
import { useI18n } from '../i18n'
import { useConsent } from '../consent/ConsentProvider'

/**
 * Il consenso alla mappa non vive più qui: sta nel ConsentProvider, insieme
 * alle altre categorie del banner. Il riquadro qui sotto resta come scorciatoia
 * — chi ha rifiutato tutto può comunque caricare la sola mappa da qui, con un
 * atto esplicito — e concede la sola categoria `maps`, nient'altro.
 */

/** Riquadro che sostituisce la mappa finché non si acconsente a caricarla. */
function MapConsent({ onAccept }: { onAccept: () => void }) {
  const { t } = useI18n()
  return (
    <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-4 bg-sunken px-6 py-10 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-raised text-sageInk ring-1 ring-sage-600/20">
        <Icon name="pin" size={22} />
      </span>
      <div>
        <h3 className="text-lg font-semibold text-ink">{t.mappa.mapConsentTitle}</h3>
        <p className="mx-auto mt-2 max-w-sm text-[0.95rem] leading-relaxed text-ink/70">
          {t.mappa.mapConsentBody}
        </p>
      </div>
      <button
        type="button"
        onClick={onAccept}
        className="inline-flex items-center gap-2 rounded-[3px] bg-magenta px-5 py-2.5 text-[0.95rem] font-medium text-white transition-colors duration-300 ease-bench hover:bg-magenta-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta"
      >
        {t.mappa.mapConsentAction}
        <Icon name="arrow" size={16} />
      </button>
      {/* Chi non vuole caricare Google ha comunque come arrivare: l'indirizzo
          è qui accanto e "Indicazioni stradali" apre Maps in una scheda nuova. */}
      <Link to="/cookie" className="notation !text-ink/50 underline-offset-4 hover:underline">
        {t.mappa.mapConsentNote}
      </Link>
    </div>
  )
}

/** Mappa + orari, condiviso tra Home e Contatti. */
export function MapHours() {
  const { t } = useI18n()
  const { address, mapsEmbedSrc, mapsUrl, hours } = site
  const hasMap = !isTodo(mapsEmbedSrc)
  const { consent, grant } = useConsent()
  // getDay(): 0 = domenica … 6 = sabato → indice con lunedì primo (0..6).
  const todayIndex = (new Date().getDay() + 6) % 7

  return (
    <div className="grid gap-8 md:grid-cols-2 md:gap-12">
      {/* Mappa */}
      <Reveal className="overflow-hidden rounded-[5px] ring-1 ring-ink/10">
        {hasMap ? (
          consent.maps ? (
            <iframe
              title={`${t.mappa.whereTitle} — Hair Color Technology, Paola`}
              src={mapsEmbedSrc}
              className="h-full min-h-[320px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <MapConsent onAccept={() => grant('maps')} />
          )
        ) : (
          <PhotoPlaceholder
            label={t.mappa.mapTodo}
            ratio="aspect-[4/3] md:aspect-auto md:h-full"
          />
        )}
      </Reveal>

      {/* Orari + indirizzo */}
      <div>
        <Reveal>
          <div className="flex items-start gap-3">
            <Icon name="pin" size={22} className="mt-1 shrink-0 text-sageInk" />
            <div>
              <h3 className="text-lg font-semibold">{t.mappa.whereTitle}</h3>
              <p className="mt-1 text-ink/70">
                {isTodo(address.street) ? t.mappa.todoAddress : address.street}
                {' · '}
                {isTodo(address.zip) ? '' : `${address.zip} `}
                {address.city} ({address.province}), {address.country}
              </p>
              <a
                href={isTodo(mapsUrl) ? undefined : mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-2 inline-flex items-center gap-1.5 text-[0.95rem] text-magenta hover:text-magenta-deep ${
                  isTodo(mapsUrl) ? 'pointer-events-none opacity-50' : ''
                }`}
              >
                {t.common.directions} <Icon name="arrow" size={16} />
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-8">
          <div className="flex items-center gap-3">
            <Icon name="clock" size={22} className="shrink-0 text-sageInk" />
            <h3 className="text-lg font-semibold">{t.mappa.hoursTitle}</h3>
          </div>
          <ul className="mt-4 divide-y divide-ink/10">
            {hours.map((h, i) => {
              const isToday = i === todayIndex
              return (
                <li
                  key={i}
                  className={`flex items-center justify-between py-2.5 ${
                    isToday ? 'font-medium' : ''
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {t.days[i]}
                    {isToday && <Notation className="!text-magenta">{t.common.today}</Notation>}
                  </span>
                  <span className={h.closed ? 'text-ink/40' : 'text-ink/80'}>
                    {h.closed ? t.closed : h.value}
                  </span>
                </li>
              )
            })}
          </ul>
          <p className="mt-4 text-[0.9rem] text-ink/55">{t.mappa.byAppointment}</p>
        </Reveal>
      </div>
    </div>
  )
}
