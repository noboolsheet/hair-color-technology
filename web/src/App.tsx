import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { CookieBanner } from './components/CookieBanner'
import Home from './pages/Home'
import ChiSiamo from './pages/ChiSiamo'
import Servizi from './pages/Servizi'
import Servizio from './pages/Servizio'
import Prodotti from './pages/Prodotti'
import Prodotto from './pages/Prodotto'
import Contatti from './pages/Contatti'
import LavoraConNoi from './pages/LavoraConNoi'
import Legal from './pages/Legal'
import NotFound from './pages/NotFound'

/**
 * Cambio pagina: si torna in cima, TRANNE quando l'URL porta un'ancora
 * (es. /chi-siamo#storia). React Router non gestisce il '#' nella navigazione
 * lato client — lo fa solo il browser al caricamento completo — quindi senza
 * questo il link atterrerebbe in cima alla pagina invece che sulla sezione.
 *
 * `scrollIntoView()` senza `behavior` lascia decidere al CSS, che ha già
 * `scroll-behavior: smooth` disattivato sotto prefers-reduced-motion.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chi-siamo" element={<ChiSiamo />} />
          <Route path="/servizi" element={<Servizi />} />
          <Route path="/servizi/:id" element={<Servizio />} />
          <Route path="/prodotti" element={<Prodotti />} />
          <Route path="/prodotti/:id" element={<Prodotto />} />
          <Route path="/contatti" element={<Contatti />} />
          <Route path="/lavora-con-noi" element={<LavoraConNoi />} />
          <Route path="/privacy" element={<Legal kind="privacy" />} />
          <Route path="/cookie" element={<Legal kind="cookie" />} />
          <Route path="/note-legali" element={<Legal kind="note" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CookieBanner />
    </>
  )
}
