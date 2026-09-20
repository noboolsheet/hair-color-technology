// Server Node/Express — Hair Color Technology.
//   • Serve la SPA compilata (dist/) in produzione.
//   • POST /api/send-contact      — invia per email il modulo contatti.
//   • POST /api/send-application  — invia la candidatura, con il CV allegato.
// Entrambi inviano via Gmail SMTP (nodemailer). I segreti vivono in un .env
// locale (git-ignored) o nell'ambiente dell'host:
//   GMAIL_USER          indirizzo Gmail che autentica SMTP (anche mittente)
//   GMAIL_APP_PASSWORD  App Password Gmail (16 caratteri, serve la 2FA)
//   CONTACT_TO          casella che riceve i messaggi (default: GMAIL_USER)
//   PORT                porta del server (default 8787)

import 'dotenv/config'
import express from 'express'
import compression from 'compression'
import nodemailer from 'nodemailer'
import multer from 'multer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST = path.resolve(__dirname, '..', 'dist')
const PORT = process.env.PORT || 8787

const { GMAIL_USER, GMAIL_APP_PASSWORD, CONTACT_TO } = process.env
const mailConfigured = Boolean(GMAIL_USER && GMAIL_APP_PASSWORD)

const transporter = mailConfigured
  ? nodemailer.createTransport({ service: 'gmail', auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD } })
  : null

const MAX_FILE_BYTES = 5 * 1024 * 1024 // 5 MB — tenere allineato col client
const ALLOWED_MIME = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
])

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const clean = (v = '') => String(v).replace(/[<>]/g, '').trim().slice(0, 4000)
const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
// Il consenso deve essere accettato: il checkbox invia "on"/"true".
const consentGiven = (v) => v === 'on' || v === 'true' || v === true || v === '1'

// CV → in memoria, poi allegato all'email.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_BYTES },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_MIME.has(file.mimetype)) cb(null, true)
    else cb(new Error('INVALID_FILE_TYPE'))
  },
})

const app = express()
app.use(compression())
app.use(express.json({ limit: '32kb' }))

// ── Rate limit minimale in memoria (per IP) ──────────────────────────────
const hits = new Map()
function rateLimited(ip) {
  const now = Date.now()
  const rec = hits.get(ip) || { count: 0, start: now }
  if (now - rec.start > 60_000) {
    rec.count = 0
    rec.start = now
  }
  rec.count += 1
  hits.set(ip, rec)
  return rec.count > 8
}

// ── Invio email condiviso (HTML + testo) ─────────────────────────────────
async function sendFormEmail(res, { subject, heading, name, email, rows, attachments = [] }) {
  if (!mailConfigured) {
    console.warn('[mail] non configurato. Ricevuto:', subject)
    return res.status(503).json({ ok: false, error: 'Servizio email non configurato sul server.' })
  }
  try {
    await transporter.sendMail({
      from: `"Sito Hair Color Technology" <${GMAIL_USER}>`,
      to: CONTACT_TO || GMAIL_USER,
      replyTo: `"${name}" <${email}>`,
      subject,
      text: rows.map(([k, v]) => `${k}: ${v}`).join('\n'),
      html: `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:auto">
        <div style="border-left:4px solid #E6007E;padding:4px 0 4px 14px;margin-bottom:18px">
          <div style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#9CAF88">Hair Color Technology</div>
          <h2 style="margin:4px 0 0;color:#333;font-size:20px">${esc(heading)}</h2>
        </div>
        <table cellpadding="7" style="border-collapse:collapse;font-size:14px;color:#333;width:100%">
          ${rows
            .map(
              ([k, v]) =>
                `<tr><td style="color:#6B6B67;vertical-align:top;white-space:nowrap"><strong>${esc(k)}</strong></td><td style="border-bottom:1px solid #eee">${esc(v).replace(/\n/g, '<br>')}</td></tr>`,
            )
            .join('')}
        </table>
      </div>`,
      attachments,
    })
    return res.json({ ok: true })
  } catch (err) {
    console.error('[mail] invio fallito:', err.message)
    return res.status(500).json({ ok: false, error: 'Invio non riuscito.' })
  }
}

// ── Modulo contatti → email ──────────────────────────────────────────────
app.post('/api/send-contact', (req, res) => {
  const ip = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown')
  if (rateLimited(ip)) return res.status(429).json({ ok: false, error: 'Troppe richieste. Riprova tra poco.' })

  const b = req.body ?? {}
  if (String(b.company || '').trim() !== '') return res.json({ ok: true }) // honeypot

  const name = clean(b.name)
  const email = clean(b.email)
  const phone = clean(b.phone)
  const reason = clean(b.reason) || 'Informazioni'
  const message = clean(b.message)

  if (!name || !EMAIL_RE.test(email) || !message)
    return res.status(400).json({ ok: false, error: 'Compila nome, email valida e messaggio.' })
  if (!consentGiven(b.privacy))
    return res.status(400).json({ ok: false, error: 'È necessario accettare la privacy policy.' })

  return sendFormEmail(res, {
    subject: `Contatto · ${name} — ${reason}`,
    heading: 'Nuovo messaggio dal sito',
    name,
    email,
    rows: [
      ['Motivo', reason],
      ['Nome', name],
      ['Email', email],
      ['Telefono', phone || '—'],
      ['Messaggio', message],
    ],
  })
})

// ── Candidatura → email (con CV allegato) ────────────────────────────────
app.post('/api/send-application', upload.single('cv'), (req, res) => {
  const ip = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown')
  if (rateLimited(ip)) return res.status(429).json({ ok: false, error: 'Troppe richieste. Riprova tra poco.' })

  const b = req.body ?? {}
  if (String(b.company || '').trim() !== '') return res.json({ ok: true }) // honeypot

  const name = clean(b.name)
  const email = clean(b.email)
  const phone = clean(b.phone)
  const role = clean(b.role)
  const message = clean(b.message)

  // "role" (ruolo desiderato) è facoltativo.
  if (!name || !EMAIL_RE.test(email) || !phone || !message)
    return res.status(400).json({ ok: false, error: 'Compila tutti i campi obbligatori.' })
  if (!consentGiven(b.privacy))
    return res.status(400).json({ ok: false, error: 'È necessario accettare la privacy policy.' })

  const attachments = req.file
    ? [{ filename: req.file.originalname, content: req.file.buffer, contentType: req.file.mimetype }]
    : []

  return sendFormEmail(res, {
    subject: `Candidatura · ${name} — ${role}`,
    heading: 'Nuova candidatura (Lavora con noi)',
    name,
    email,
    rows: [
      ['Nome', name],
      ['Email', email],
      ['Telefono', phone],
      ['Ruolo', role || '—'],
      ['Messaggio', message],
      ['CV', req.file ? req.file.originalname : '— (non allegato)'],
    ],
    attachments,
  })
})

// Errori di upload (tipo errato / troppo grande) → 400 chiaro per il client.
app.use((err, _req, res, next) => {
  if (!err) return next()
  const error =
    err.message === 'INVALID_FILE_TYPE'
      ? 'invalid_type'
      : err.code === 'LIMIT_FILE_SIZE'
        ? 'too_large'
        : 'error'
  console.error('[upload] errore:', err.message)
  return res.status(400).json({ ok: false, error })
})

app.get('/api/health', (_req, res) => res.json({ ok: true, mailConfigured }))

// ── File statici + fallback SPA ───────────────────────────────────────────
// Due politiche di cache, perché non tutti i file hanno lo stesso nome-contratto:
//
//   /assets/*  → li genera Vite con l'hash del contenuto nel nome. Se il file
//                cambia, cambia anche l'URL: si possono cachare per sempre.
//   tutto il resto (/images, favicon, robots.txt) → arriva da public/ con un
//                nome FISSO. Un anno di cache qui significa che, aggiornando una
//                foto, chi ha già visitato il sito continua a vedere la vecchia
//                per mesi. `no-cache` non disattiva la cache: obbliga a
//                rivalidare con l'ETag, quindi di norma è un 304 (niente banda)
//                ma la foto nuova si vede subito.
app.use(
  '/assets',
  express.static(path.join(DIST, 'assets'), {
    maxAge: '1y',
    immutable: true,
    index: false,
  }),
)
app.use(express.static(DIST, { setHeaders: (res) => res.setHeader('Cache-Control', 'no-cache'), index: false }))

// L'HTML non va mai cachato: è quello che punta al bundle nuovo dopo un deploy.
app.get(/^\/(?!api\/).*/, (_req, res) => {
  res.setHeader('Cache-Control', 'no-cache')
  res.sendFile(path.join(DIST, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`▶ Hair Color Technology su http://localhost:${PORT}`)
  if (!mailConfigured) {
    console.log('  ⚠  Email non configurata: imposta GMAIL_USER e GMAIL_APP_PASSWORD in .env')
  }
})
