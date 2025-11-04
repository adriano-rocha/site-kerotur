import { useTranslation } from 'react-i18next'
import LanguageSelector from '../LanguageSelector/LanguageSelector'
import { useState } from 'react'

function Header() {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-yellow-300 text-blue-600 p-4 sticky top-0 z-50 shadow-lg">
      <nav className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl md:text-2xl font-bold">Kerotur</h1>
        
        {/* Menu Desktop */}
        <ul className="hidden lg:flex gap-6 items-center font-semibold">
          <li><a href="#sobre" className="hover:text-blue-800 transition">{t('header.aboutUs')}</a></li>
          <li><a href="#passeios" className="hover:text-blue-800 transition">{t('header.tours')}</a></li>
          <li><a href="#parceiros" className="hover:text-blue-800 transition">{t('header.partners')}</a></li>
          <li><a href="#contato" className="hover:text-blue-800 transition">{t('header.contact')}</a></li>
          
          {/* Separador */}
          <li className="border-l border-blue-500 h-6 mx-2"></li>
          
          {/* Seletor de idioma */}
          <li>
            <LanguageSelector />
          </li>
        </ul>

        {/* Menu Mobile - Botão Hamburger + Bandeiras */}
        <div className="flex lg:hidden items-center gap-3">
          <LanguageSelector />
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Menu Mobile Dropdown */}
      {isMenuOpen && (
        <ul className="lg:hidden mt-4 space-y-3 pb-4 border-t border-blue-400 pt-4 font-semibold">
          <li>
            <a 
              href="#sobre" 
              className="block hover:text-blue-200 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('header.aboutUs')}
            </a>
          </li>
          <li>
            <a 
              href="#passeios" 
              className="block hover:text-blue-200 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('header.tours')}
            </a>
          </li>
          <li>
            <a 
              href="#parceiros" 
              className="block hover:text-blue-200 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('header.partners')}
            </a>
          </li>
          <li>
            <a 
              href="#contato" 
              className="block hover:text-blue-200 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('header.contact')}
            </a>
          </li>
        </ul>
      )}
    </header>
  )
}

export default Header