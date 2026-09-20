// Pipeline di ottimizzazione immagini — Hair Color Technology.
//
// Metti gli originali (qualsiasi dimensione/formato, anche HEIC da iPhone) in
// `images-resources/` e questo script scrive copie `.webp` ottimizzate per il
// web in `public/images/`, preservando la struttura delle sottocartelle.
// Nel sito le referenzi come `/images/<nome>.webp`.
//
//   npm run images         una passata incrementale (solo file nuovi/modificati)
//   npm run images:watch   resta in ascolto e ottimizza ogni file appena aggiunto
//   (viene eseguito automaticamente prima di `npm run build` via `prebuild`)
//
// Gli originali in `images-resources/` NON vengono distribuiti: stanno fuori da
// `public/`, quindi il deploy contiene solo i .webp leggeri.

import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import heicConvert from 'heic-convert'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SRC_DIR = path.join(ROOT, 'images-resources')
const OUT_DIR = path.join(ROOT, 'public', 'images')

const INPUT_EXTS = new Set([
  '.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff', '.avif', '.heic', '.heif',
  '.svg',
])
const HEIC_EXTS = new Set(['.heic', '.heif'])
// I vettoriali (loghi dei marchi) si copiano così come sono: rasterizzarli in
// .webp li renderebbe sfocati sugli schermi ad alta densità e più pesanti.
const VECTOR_EXTS = new Set(['.svg'])

// Larghezza massima e qualità di default per le immagini del sito.
const MAX_WIDTH = 2400
const QUALITY = 80

const isImage = (file) => INPUT_EXTS.has(path.extname(file).toLowerCase())

const outputPathFor = (srcPath) => {
  const rel = path.relative(SRC_DIR, srcPath)
  // I vettoriali conservano l'estensione; tutto il resto diventa .webp.
  const out = VECTOR_EXTS.has(path.extname(srcPath).toLowerCase())
    ? rel
    : rel.replace(/\.[^.]+$/, '.webp')
  return path.join(OUT_DIR, out)
}

// Salta quando la copia ottimizzata esiste già ed è più recente dell'originale.
const isUpToDate = async (srcPath, outPath) => {
  try {
    const [src, out] = await Promise.all([fs.stat(srcPath), fs.stat(outPath)])
    return out.mtimeMs >= src.mtimeMs
  } catch {
    return false
  }
}

const optimize = async (srcPath, { force = false } = {}) => {
  const outPath = outputPathFor(srcPath)
  const relLabel = path.relative(ROOT, srcPath)

  if (!force && (await isUpToDate(srcPath, outPath))) {
    console.log(`  skip   ${relLabel} (già aggiornato)`)
    return
  }

  await fs.mkdir(path.dirname(outPath), { recursive: true })

  if (VECTOR_EXTS.has(path.extname(srcPath).toLowerCase())) {
    await fs.copyFile(srcPath, outPath)
    console.log(`  ✓ ${relLabel}  →  ${path.relative(ROOT, outPath)} (vettoriale, copiato)`)
    return
  }

  // Il libheif incluso in sharp non decodifica in modo affidabile gli HEIC di
  // iPhone su tutte le piattaforme: per .heic/.heif decodifichiamo prima in un
  // buffer JPEG con heic-convert (JS puro).
  let input = srcPath
  if (HEIC_EXTS.has(path.extname(srcPath).toLowerCase())) {
    const raw = await fs.readFile(srcPath)
    input = Buffer.from(await heicConvert({ buffer: raw, format: 'JPEG', quality: 0.92 }))
  }

  // `unlimited` alza i limiti di sicurezza pixel così le foto grandi decodificano;
  // `rotate()` (senza argomenti) auto-orienta dall'EXIF, così le foto da telefono
  // non risultano ruotate.
  await sharp(input, { unlimited: true })
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(outPath)

  console.log(`  ✓ ${relLabel}  →  ${path.relative(ROOT, outPath)}`)
}

// Raccoglie ricorsivamente i file immagine sotto una cartella.
const walk = async (dir) => {
  let entries
  try {
    entries = await fs.readdir(dir, { withFileTypes: true })
  } catch {
    return []
  }
  const files = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...(await walk(full)))
    else if (entry.isFile() && isImage(entry.name)) files.push(full)
  }
  return files
}

const runOnce = async () => {
  await fs.mkdir(SRC_DIR, { recursive: true })
  await fs.mkdir(OUT_DIR, { recursive: true })

  const files = await walk(SRC_DIR)
  if (files.length === 0) {
    console.log(`Nessuna immagine in ${path.relative(ROOT, SRC_DIR)}/ — niente da ottimizzare.`)
    return
  }
  console.log(`Ottimizzo ${files.length} immagine/i da ${path.relative(ROOT, SRC_DIR)}/ …`)
  for (const file of files) {
    try {
      await optimize(file)
    } catch (err) {
      console.error(`  ✗ ${path.relative(ROOT, file)}: ${err.message}`)
    }
  }
  console.log('Fatto.')
}

const runWatch = async () => {
  await runOnce()
  const { watch } = await import('chokidar')
  console.log(`\nIn ascolto su ${path.relative(ROOT, SRC_DIR)}/ … (Ctrl+C per uscire)`)

  const watcher = watch(SRC_DIR, { ignoreInitial: true, awaitWriteFinish: true })
  const handle = (file) => {
    if (!isImage(file)) return
    optimize(file, { force: true }).catch((err) =>
      console.error(`  ✗ ${path.relative(ROOT, file)}: ${err.message}`),
    )
  }
  watcher.on('add', handle).on('change', handle)

  // Se rimuovi un originale, rimuoviamo anche la copia .webp corrispondente.
  watcher.on('unlink', async (file) => {
    if (!isImage(file)) return
    const outPath = outputPathFor(file)
    try {
      await fs.unlink(outPath)
      console.log(`  rimosso ${path.relative(ROOT, outPath)}`)
    } catch {
      /* niente da rimuovere */
    }
  })
}

const main = process.argv.includes('--watch') ? runWatch : runOnce
main().catch((err) => {
  console.error(err)
  process.exit(1)
})
