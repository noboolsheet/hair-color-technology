import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { Icon } from './Icon'

type Variant = 'primary' | 'outline' | 'ghost'

const base =
  'group inline-flex items-center justify-center gap-2.5 rounded-[3px] font-sans font-semibold ' +
  'transition-all duration-300 ease-bench focus-visible:outline-2 ' +
  'text-[0.95rem] leading-none tracking-[-0.01em] disabled:opacity-50 disabled:pointer-events-none'

const variants: Record<Variant, string> = {
  // The One Voice Rule — magenta è l'azione primaria, rara e portante.
  primary:
    'bg-magenta text-white px-6 py-3.5 shadow-[0_10px_28px_-12px_rgba(230,0,126,0.6)] ' +
    'hover:bg-magenta-deep hover:-translate-y-0.5 hover:shadow-[0_16px_34px_-14px_rgba(230,0,126,0.7)]',
  outline:
    'border border-ink/25 text-ink px-6 py-3.5 hover:border-ink/60 hover:bg-band/[0.03]',
  ghost: 'text-ink px-2 py-2 hover:text-magenta',
}

interface CommonProps {
  children: ReactNode
  variant?: Variant
  icon?: 'whatsapp' | 'arrow' | 'mail' | 'phone'
  className?: string
}

export function Button({
  children,
  variant = 'primary',
  icon,
  className = '',
  to,
  href,
  onClick,
  type,
  disabled,
}: CommonProps & {
  to?: string
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
}) {
  const cls = `${base} ${variants[variant]} ${className}`
  const inner = (
    <>
      {icon === 'whatsapp' && <Icon name="whatsapp" size={19} />}
      {icon === 'mail' && <Icon name="mail" size={19} />}
      {icon === 'phone' && <Icon name="phone" size={19} />}
      <span>{children}</span>
      {icon === 'arrow' && (
        <Icon
          name="arrow"
          size={18}
          className="transition-transform duration-300 ease-bench group-hover:translate-x-1"
        />
      )}
    </>
  )

  if (to) return <Link to={to} className={cls}>{inner}</Link>
  if (href) {
    // tel:/mailto: aprono l'app nativa: niente target="_blank".
    const external = /^https?:/i.test(href)
    return (
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className={cls}
      >
        {inner}
      </a>
    )
  }
  return (
    <button type={type ?? 'button'} onClick={onClick} disabled={disabled} className={cls}>
      {inner}
    </button>
  )
}
