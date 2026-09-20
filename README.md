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
| `prod` | 4252 | Caddy lo pubblica sul dominio della cliente (`nbs-infra/caddy/CaddyFile`) |

> In precedenza `prod` usava la 4250, la stessa di `dev`. Ora segue la convenzione
> `42X0` dev / `42X2` prod — vedi `nbs-infra/docs/PORTS.md`.

La porta è legata a `127.0.0.1`: il traffico pubblico entra dalla 443 di Caddy,
che raggiunge il container come `haircolortechnology.app.prod` dentro
`noboolsheet_network`.

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
cd web && npm run images        # rigenera public/images/
```
