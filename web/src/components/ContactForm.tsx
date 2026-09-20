import { useState, type FormEvent } from 'react'
import { Button } from './Button'
import { Icon } from './Icon'
import { Notation } from './bits'
import { useI18n } from '../i18n'

type Status = 'idle' | 'loading' | 'success' | 'error'

const field =
  'w-full rounded-[3px] border border-ink/20 bg-raised px-4 py-3 text-ink ' +
  'placeholder:text-ink/40 transition-colors duration-200 focus:border-magenta ' +
  'focus-visible:outline-none'

export function ContactForm() {
  const { t } = useI18n()
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [accepted, setAccepted] = useState(false)
  const f = t.form

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setError('')
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    // Honeypot anti-spam
    if (data.company) {
      setStatus('success')
      form.reset()
      return
    }

    try {
      const res = await fetch('/api/send-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'invio')
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
      setError(f.errorMsg)
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-[5px] bg-sunken p-8 text-center ring-1 ring-sage-600/20">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-sage text-white">
          <Icon name="check" size={28} />
        </span>
        <h3 className="mt-5 text-xl font-semibold">{f.successTitle}</h3>
        <p className="mx-auto mt-2 max-w-sm text-ink/70">{f.successBody}</p>
        <button
          onClick={() => {
            setAccepted(false)
            setStatus('idle')
          }}
          className="mt-5 text-[0.9rem] font-medium text-magenta hover:text-magenta-deep"
        >
          {f.sendAnother}
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
          <span className="notation !text-ink/55">{f.phone}</span>
          <input name="phone" type="tel" autoComplete="tel" className={field} placeholder={f.phoneOpt} />
        </label>
      </div>

      <label className="grid gap-1.5">
        <span className="notation !text-ink/55">{f.email} *</span>
        <input name="email" type="email" required autoComplete="email" className={field} placeholder={f.emailPh} />
      </label>

      <label className="grid gap-1.5">
        <span className="notation !text-ink/55">{f.reason}</span>
        <select name="reason" className={`${field} appearance-none`} defaultValue={f.reasons[0]}>
          {f.reasons.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-1.5">
        <span className="notation !text-ink/55">{f.message} *</span>
        <textarea
          name="message"
          required
          rows={5}
          className={`${field} resize-y`}
          placeholder={f.messagePh}
        />
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
          {status === 'loading' ? f.submitting : f.submit}
        </Button>
        <Notation className="!text-ink/40">{f.replySoon}</Notation>
      </div>
    </form>
  )
}
