import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// standard.css espone entrambi gli assi (wght + wdth): serve alla voce
// display "expanded" del mondo. index.css includerebbe solo il peso.
import '@fontsource-variable/archivo/standard.css'
import '@fontsource-variable/martian-mono/standard.css'
// Il logotipo usa due caratteri, come il logo originale del salone: lo script
// calligrafico per "Hair Color" e un display sottile in maiuscolo per
// "Technology".
import '@fontsource/great-vibes'
import '@fontsource/italiana'
import './index.css'
import App from './App'
import { ThemeProvider } from './theme/ThemeProvider'
import { I18nProvider } from './i18n'
import { ConsentProvider } from './consent/ConsentProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <I18nProvider>
        <ConsentProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ConsentProvider>
      </I18nProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
