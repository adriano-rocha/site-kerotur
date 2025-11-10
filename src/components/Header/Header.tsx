import { useTranslation } from 'react-i18next'
import LanguageSelector from '../LanguageSelector/LanguageSelector'
import ToursDropdown from '../ToursDropdown/ToursDropdown'
import { useState, useRef, useEffect } from 'react'
import toursData from '../../data/tours.json'

interface HeaderProps {
  onTourSelect?: (tourId: string) => void
}

function Header({ onTourSelect }: HeaderProps) {
  const { t, i18n } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isToursDropdownOpen, setIsToursDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLLIElement>(null)
  const timeoutRef = useRef<number | null>(null)

  const handleTourSelect = (tourId: string) => {
    if (onTourSelect) {
      onTourSelect(tourId)
    }
    setIsToursDropdownOpen(false)
    setIsMenuOpen(false)
  }

  const handleMouseEnter = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
    }
    setIsToursDropdownOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setIsToursDropdownOpen(false)
    }, 200)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <header className="bg-yellow-300 text-blue-600 p-4 sticky top-0 z-50 shadow-lg">
      <nav className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl md:text-2xl font-bold">Kerotur</h1>
        
        {/* Menu Desktop */}
        <ul className="hidden lg:flex gap-6 items-center font-semibold">
          <li>
            <a href="#sobre" className="hover:text-blue-800 transition">
              {t('header.aboutUs')}
            </a>
          </li>
          
          {/* Dropdown de Passeios */}
          <li 
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button className="hover:text-blue-800 transition flex items-center gap-1 py-2">
              {t('header.tours')}
              <svg 
                className={`w-4 h-4 transition-transform ${isToursDropdownOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isToursDropdownOpen && (
              <ToursDropdown 
                onSelectTour={handleTourSelect}
                onClose={() => setIsToursDropdownOpen(false)}
              />
            )}
          </li>

          <li>
            <a href="#parceiros" className="hover:text-blue-800 transition">
              {t('header.partners')}
            </a>
          </li>
          <li>
            <a href="#contato" className="hover:text-blue-800 transition">
              {t('header.contact')}
            </a>
          </li>
          
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
            className="text-blue-600 focus:outline-none"
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
              className="block hover:text-blue-800 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('header.aboutUs')}
            </a>
          </li>
          
          {/* Submenu Passeios Mobile */}
          <li>
            <button
              onClick={() => setIsToursDropdownOpen(!isToursDropdownOpen)}
              className="w-full text-left hover:text-blue-800 transition flex items-center justify-between"
            >
              {t('header.tours')}
              <svg 
                className={`w-4 h-4 transition-transform ${isToursDropdownOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isToursDropdownOpen && (
              <ul className="mt-2 ml-4 space-y-2">
                {toursData.map((tour: { id: string; name: { [key: string]: string } }) => (
                  <li key={tour.id}>
                    <button
                      onClick={() => handleTourSelect(tour.id)}
                      className="text-sm hover:text-blue-800 transition"
                    >
                      {tour.name[i18n.language] || tour.name['pt-BR']}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <a 
              href="#parceiros" 
              className="block hover:text-blue-800 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('header.partners')}
            </a>
          </li>
          <li>
            <a 
              href="#contato" 
              className="block hover:text-blue-800 transition"
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