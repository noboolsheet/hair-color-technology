import { useRef, useState, type FormEvent } from 'react'
import { Button } from './Button'
import { Icon } from './Icon'
import { Notation } from './bits'
import { useI18n } from '../i18n'

type Status = 'idle' | 'loading' | 'success' | 'error'

const MAX_FILE_BYTES = 5 * 1024 * 1024 // 5 MB — allineato col server
const ALLOWED_EXT = /\.(pdf|doc|docx)$/i

const field =
  'w-full rounded-[3px] border border-ink/20 bg-raised px-4 py-3 text-ink ' +
  'placeholder:text-ink/40 transition-colors duration-200 focus:border-magenta ' +
  'focus-visible:outline-none'

export function ApplicationForm() {
  const { t } = useI18n()
  const f = t.form
  const a = t.application
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [accepted, setAccepted] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const fileInput = useRef<HTMLInputElement>(null)

  const handleFile = (fl?: File | null) => {
    if (!fl) return
    if (!ALLOWED_EXT.test(fl.name) || fl.size > MAX_FILE_BYTES) {
      setError(a.cvError)
      return
    }
    setError('')
    setFile(fl)
  }

  const clearFile = () => {
    setFile(null)
    if (fileInput.current) fileInput.current.value = ''
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setError('')
    const form = e.currentTarget
    const fd = new FormData(form)

    // Honeypot anti-spam
    if (fd.get('company')) {
      setStatus('success')
      form.reset()
      clearFile()
      return
    }
    if (file) fd.set('cv', file)

    try {
      const res = await fetch('/api/send-application', { method: 'POST', body: fd })
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'invio')
      setStatus('success')
      form.reset()
      clearFile()
    } catch {
      setStatus('error')
      setError(a.errorMsg)
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-[5px] bg-sunken p-8 text-center ring-1 ring-sage-600/20">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-sage text-white">
          <Icon name="check" size={28} />
        </span>
        <h3 className="mt-5 text-xl font-semibold">{a.successTitle}</h3>
        <p className="mx-auto mt-2 max-w-sm text-ink/70">{a.successBody}</p>
        <button
          onClick={() => {
            setAccepted(false)
            setStatus('idle')
          }}
          className="mt-5 text-[0.9rem] font-medium text-magenta hover:text-magenta-deep"
        >
          {a.sendAnother}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      {/* honeypot */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5">
          <span className="notation !text-ink/55">{f.name} *</span>
          <input name="name" required autoComplete="name" className={field} placeholder={f.namePh} />
        </label>
        <label className="grid gap-1.5">
          <span className="notation !text-ink/55">{f.phone} *</span>
          <input name="phone" type="tel" required autoComplete="tel" className={field} />
        </label>
        <label className="grid gap-1.5">
          <span className="notation !text-ink/55">{f.email} *</span>
          <input name="email" type="email" required autoComplete="email" className={field} placeholder={f.emailPh} />
        </label>
        <label className="grid gap-1.5">
          <span className="notation !text-ink/55">{a.role}</span>
          <input name="role" className={field} placeholder={a.rolePh} />
        </label>
      </div>

      {/* Upload CV — click o drag & drop */}
      <div className="grid gap-1.5">
        <span className="notation !text-ink/55">{a.cvLabel}</span>
        {file ? (
          <div className="flex items-center justify-between gap-3 rounded-[3px] border border-ink/20 bg-raised px-4 py-3">
            <span className="flex min-w-0 items-center gap-2">
              <Icon name="file" size={18} className="shrink-0 text-sageInk" />
              <span className="truncate text-[0.92rem] text-ink">{file.name}</span>
              <span className="shrink-0 text-[0.78rem] text-ink/50">
                {Math.max(1, Math.round(file.size / 1024))} KB
              </span>
            </span>
            <button
              type="button"
              onClick={clearFile}
              aria-label={a.cvRemove}
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-ink/50 transition-colors hover:bg-magenta/10 hover:text-magenta"
            >
              <Icon name="close" size={16} />
            </button>
          </div>
        ) : (
          <label
            onDragOver={(e) => {
              e.preventDefault()
              setDragOver(true)
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault()
              setDragOver(false)
              handleFile(e.dataTransfer.files?.[0])
            }}
            className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[4px] border-2 border-dashed px-4 py-7 text-center transition-colors ${
              dragOver ? 'border-magenta bg-magenta/5' : 'border-ink/25 bg-raised hover:border-ink/40'
            }`}
          >
            <Icon name="upload" size={24} className="text-sageInk" />
            <span className="max-w-xs text-[0.9rem] text-ink/65">{a.cvHint}</span>
            <input
              ref={fileInput}
              type="file"
              name="cv"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </label>
        )}
      </div>

      <label className="grid gap-1.5">
        <span className="notation !text-ink/55">{f.message} *</span>
        <textarea name="message" required rows={5} className={`${field} resize-y`} placeholder={a.messagePh} />
      </label>

      <label className="flex cursor-pointer items-start gap-3 text-[0.9rem] text-ink/70">
        <input
          type="checkbox"
          name="privacy"
          required
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 accent-magenta"
        />
        <span>
          {f.privacyPre}
          <a href="/privacy" className="text-magenta underline-offset-2 hover:underline">
            {f.privacyLink}
          </a>
          {f.privacyPost} *
        </span>
      </label>

      {status === 'error' && (
        <p role="alert" className="rounded-[3px] bg-magenta/10 px-4 py-3 text-[0.9rem] text-magenta-deep">
          {error}
        </p>
      )}

      <div className="mt-2 flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={!accepted || status === 'loading'} icon={status === 'loading' ? undefined : 'mail'}>
          {status === 'loading' ? a.submitting : a.submit}
        </Button>
        <Notation className="!text-ink/40">{f.replySoon}</Notation>
      </div>
    </form>
  )
}
