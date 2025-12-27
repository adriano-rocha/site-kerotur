import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './i18n/config'
import App from './App.tsx'
import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
  easing: 'ease-in-out',
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>      {/* ← ENVOLVE O APP AQUI */}
      <App />
    </BrowserRouter>
  </StrictMode>,
)
