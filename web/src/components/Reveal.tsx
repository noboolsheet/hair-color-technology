import type { ReactNode } from 'react'

/**
 * Contenitore di blocco. **Non anima più nulla**, ed è voluto.
 *
 * Prima riproduceva un'entrata in dissolvenza quando il blocco entrava nel
 * viewport. Il difetto: il contenuto veniva disegnato GIÀ visibile e
 * l'animazione partiva da `opacity: 0`, quindi tutto ciò che era visibile al
 * primo caricamento spariva per un istante e rientrava in dissolvenza. Si
 * vedeva come un lampeggio, soprattutto sulle immagini. Su richiesta del
 * proprietario le pagine ora si presentano ferme: l'unico movimento rimasto
 * è la polaroid che si raddrizza al passaggio del mouse.
 *
 * Resta come componente, e non è pigrizia: `className` porta il
 * posizionamento in griglia in una trentina di punti (`md:col-start-2`,
 * `flex w-full min-w-0`…), quindi l'elemento contenitore deve esserci. Se un
 * domani si volesse rimettere un'entrata, si tocca solo questo file.
 */
export function Reveal({
  children,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
}) {
  const Component = Tag as any
  return <Component className={className}>{children}</Component>
}
