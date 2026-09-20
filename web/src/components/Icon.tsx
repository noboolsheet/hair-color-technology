/**
 * Icone disegnate a mano (stroke coerente 1.6, currentColor). Niente emoji
 * o glifi unicode al posto di un sistema di icone (craft floor).
 */
type IconName =
  | 'whatsapp'
  | 'arrow'
  | 'arrowUp'
  | 'pin'
  | 'clock'
  | 'instagram'
  | 'facebook'
  | 'google'
  | 'drop'
  | 'check'
  | 'plus'
  | 'star'
  | 'mail'
  | 'phone'
  | 'menu'
  | 'close'
  | 'heart'
  | 'leaf'
  | 'flask'
  | 'sun'
  | 'moon'
  | 'globe'
  | 'chevron'
  | 'upload'
  | 'file'

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const paths: Record<IconName, JSX.Element> = {
  whatsapp: (
    <>
      <path {...stroke} d="M4 20l1.3-4a8 8 0 113 3L4 20z" />
      <path {...stroke} d="M9.2 9.5c-.2 1.6 2.3 5 4.3 5 .9 0 1.6-.5 1.7-1.2.1-.4-1.4-1-1.8-.8-.3.2-.5.6-.8.6-.6 0-2-1.4-2-2 0-.3.4-.5.6-.8.2-.4-.4-1.9-.8-1.8-.5.1-1.1.5-1.4 1z" />
    </>
  ),
  arrow: <path {...stroke} d="M4 12h15m-6-6l6 6-6 6" />,
  arrowUp: <path {...stroke} d="M12 20V5m-6 6l6-6 6 6" />,
  pin: (
    <>
      <path {...stroke} d="M12 21c4-4.5 7-7.6 7-11a7 7 0 10-14 0c0 3.4 3 6.5 7 11z" />
      <circle {...stroke} cx="12" cy="10" r="2.4" />
    </>
  ),
  clock: (
    <>
      <circle {...stroke} cx="12" cy="12" r="8.5" />
      <path {...stroke} d="M12 7.5V12l3 2" />
    </>
  ),
  instagram: (
    <>
      <rect {...stroke} x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle {...stroke} cx="12" cy="12" r="3.6" />
      <circle cx="16.6" cy="7.4" r="1" fill="currentColor" />
    </>
  ),
  facebook: <path {...stroke} d="M14.5 8.5H16V5.6h-1.9c-2 0-3.1 1.2-3.1 3.2v1.6H9v2.9h2v6.2h3v-6.2h2.1l.4-2.9H14v-1.3c0-.5.2-.6.5-.6z" />,
  google: (
    <>
      <path {...stroke} d="M20 12.2c0 4.6-3.2 7.8-8 7.8a8 8 0 110-16 7.6 7.6 0 015.3 2.1L15 8.5A4.9 4.9 0 1012 17a4.3 4.3 0 004.4-3.4H12v-2.7h8z" />
    </>
  ),
  drop: <path {...stroke} d="M12 3.5c3.2 4 5.5 6.6 5.5 9.5a5.5 5.5 0 01-11 0c0-2.9 2.3-5.5 5.5-9.5z" />,
  check: <path {...stroke} d="M5 12.5l4.2 4.2L19 7" />,
  plus: <path {...stroke} d="M12 5v14M5 12h14" />,
  star: <path {...stroke} d="M12 4l2.3 4.9 5.2.7-3.8 3.6 1 5.3-4.7-2.6-4.7 2.6 1-5.3L4.5 9.6l5.2-.7z" />,
  mail: (
    <>
      <rect {...stroke} x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <path {...stroke} d="M4 7l8 6 8-6" />
    </>
  ),
  phone: <path {...stroke} d="M6.5 4h3l1.2 3.4-1.8 1.4a11 11 0 004.9 4.9l1.4-1.8L18.5 17v2.5c0 .8-.7 1.5-1.6 1.4A15 15 0 013.6 6.1 1.5 1.5 0 015 4.5z" />,
  menu: <path {...stroke} d="M4 7h16M4 12h16M4 17h16" />,
  close: <path {...stroke} d="M6 6l12 12M18 6L6 18" />,
  heart: <path {...stroke} d="M12 20s-7-4.6-7-9.5A3.7 3.7 0 0112 8a3.7 3.7 0 017 2.5C19 15.4 12 20 12 20z" />,
  leaf: (
    <>
      <path {...stroke} d="M5 19c0-7 5-12 14-12 0 9-5 13-11 13-2 0-3-1-3-1z" />
      <path {...stroke} d="M9 15c2.5-2.5 5-4 8.5-5" />
    </>
  ),
  flask: (
    <>
      <path {...stroke} d="M10 3v6l-4.6 8A2 2 0 007.2 20h9.6a2 2 0 001.8-3L14 9V3" />
      <path {...stroke} d="M9 3h6M8.2 14h7.6" />
    </>
  ),
  sun: (
    <>
      <circle {...stroke} cx="12" cy="12" r="4" />
      <path {...stroke} d="M12 3v2m0 14v2M5 12H3m18 0h-2M6 6L4.6 4.6M19.4 19.4 18 18M6 18l-1.4 1.4M19.4 4.6 18 6" />
    </>
  ),
  moon: <path {...stroke} d="M20 14.5A8 8 0 019.5 4 7 7 0 1020 14.5z" />,
  globe: (
    <>
      <circle {...stroke} cx="12" cy="12" r="8.5" />
      <path {...stroke} d="M3.5 12h17M12 3.5c2.3 2.3 3.4 5.3 3.4 8.5S14.3 18.2 12 20.5C9.7 18.2 8.6 15.2 8.6 12S9.7 5.8 12 3.5z" />
    </>
  ),
  chevron: <path {...stroke} d="M6 9l6 6 6-6" />,
  upload: (
    <>
      <path {...stroke} d="M12 15V4m-4 4l4-4 4 4" />
      <path {...stroke} d="M4 15v3a2 2 0 002 2h12a2 2 0 002-2v-3" />
    </>
  ),
  file: (
    <>
      <path {...stroke} d="M7 3h7l4 4v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z" />
      <path {...stroke} d="M14 3v4h4" />
    </>
  ),
}

export function Icon({
  name,
  size = 22,
  className = '',
}: {
  name: IconName
  size?: number
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
    >
      {paths[name]}
    </svg>
  )
}
