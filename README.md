# Hair Color Technology

Repositorio della cliente. Per ora contiene solo il sito, ma la struttura lascia
spazio a ciò che verrà dopo (prenotazioni, automazioni, quello che serve) senza
dover riorganizzare nulla.

```
web/      il sito: SPA Vite + React con un server Express che serve la build
          e gestisce i moduli di contatto via Gmail
envs/     configurazione per ambiente, in git, SENZA segreti
docs/     materiale di lavoro — GITIGNORED (originali in ../../_assets/hair-color-technology/)
```

## Il sito

Un solo container: il server Express serve `dist/` **e** l'API dei moduli sulla
stessa porta. Sito in italiano, con pagina per prodotto, FAQ e recensioni.

| Profilo | Porta | Come ci si arriva |
|---------|-------|-------------------|
| `dev` | 4250 | `http://localhost:4250` |
| `prod` | 4252 | pubblico sul dominio della cliente via Cloudflare Tunnel |

> In precedenza `prod` usava la 4250, la stessa di `dev`. Ora segue la convenzione
> `42X0` dev / `42X2` prod — vedi `nbs-infra/docs/PORTS.md`.

vibox non ha IP pubblico, quindi la porta pubblica è un **Cloudflare Tunnel**: il
connettore esce da casa, Cloudflare termina il TLS e instrada il dominio verso il
container `haircolortechnology.app.prod`. Non serve aprire nulla sul router.

Il tunnel non è ancora configurato per questo sito — vedi come è fatto in
`nbs-clients/alondra/web/cloudflared/`.

## Flusso di lavoro

```sh
./deploy-hct.sh {dev|prod}     # build + run in locale o sul server
./expose.sh prod               # anteprima puntuale via Tailscale Funnel
./ship-hct.sh "Messaggio"      # dal Mac: verifica, commit e push su GitHub
./update-hct.sh prod           # su vibox: pull + redeploy
```

`ship-hct.sh` costruisce prima di committare: `main` deve restare sempre
deployabile. `update-hct.sh` è l'altra metà, da eseguire sul server.

Prima del primo deploy, creare il file dei segreti del profilo:

```sh
cp web/server/.env.example web/.env.prod     # GMAIL_USER + GMAIL_APP_PASSWORD
```

File distinti per profilo (`web/.env.dev`, `web/.env.prod`) così sviluppare non
usa l'account di posta reale della cliente.

## Immagini

I `.webp` serviti si generano dagli originali, che **non sono nel repo** (pesavano
19 MB, incluso un `.ai` da 16 MB): vivono in
`../../_assets/hair-color-technology/imagenes/`.

```sh
cd web
IMAGES_SRC_DIR=../../../_assets/hair-color-technology/imagenes npm run images
```

Senza `IMAGES_SRC_DIR` lo script cerca in `web/images-resources/` (vuota e
gitignored), utile solo per provare con qualche immagine sciolta.
