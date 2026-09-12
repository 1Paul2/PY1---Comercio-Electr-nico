/* main.jsx — Punto de entrada: monta App en el DOM con StrictMode y HashRouter. */

/* Imports: React, renderizador, router, App y estilos globales. */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/global.css'

/* Renderiza App dentro de StrictMode y HashRouter, en el elemento #root. */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)