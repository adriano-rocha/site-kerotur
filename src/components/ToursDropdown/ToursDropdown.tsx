import { useTranslation } from 'react-i18next'
import toursData from '../../data/tours.json'

interface ToursDropdownProps {
  onSelectTour: (tourId: string) => void
  onClose: () => void
  className?: string 
}

type SupportedLanguage = 'pt-BR' | 'en' | 'es' | 'fr' | 'it' | 'al' | 'ru' | 'ch' | 'jp' | 'ar' | 'he'

function ToursDropdown({ onSelectTour, onClose }: ToursDropdownProps) {
  const { i18n } = useTranslation()
  const currentLang = (i18n.language as SupportedLanguage) || 'pt-BR'

  const handleTourClick = (tourId: string, tourName: string) => {
    console.log('🔍 Tour clicado no dropdown:', { tourId, tourName })
    onSelectTour(tourId)
    onClose()
  }

  return (
    <div 
      className="tours-dropdown absolute top-full left-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl py-4 border border-gray-100/50 z-50 max-h-[400px] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header do Dropdown */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-6 py-4 z-10">
        <h3 className="text-lg font-bold text-[#0008B] flex items-center gap-2">
          <svg className="w-6 h-6 text-[#00ffff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Nossos Passeios
        </h3>
        <p className="text-xs text-gray-500 mt-1">Clique para ver detalhes</p>
      </div>

      <ul className="px-4 space-y-3">
        {toursData.map((tour) => {
          const tourName = tour.name[currentLang] || tour.name['pt-BR']
          const shortDesc = tour.shortDescription[currentLang]?.split(' (')[0] || 'Tour incrível'
          const price = tour.price.individual || 'Consultar'

          return (
            <li key={tour.id}>
              <button
                onClick={() => handleTourClick(tour.id, tourName)}
                className="group w-full px-5 py-4 rounded-xl hover:bg-gradient-to-r hover:from-[#00ffff]/10 hover:to-blue-50/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100 hover:border-[#00ffff]/30 text-left bg-white/80 backdrop-blur-sm shadow-sm"
                type="button"
              >
                <div className="flex items-center gap-4">
                  {/* Imagem do Tour */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={tour.image}
                      alt={tourName}
                      className="w-16 h-16 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = '/images/tours/default-tour.jpg'
                      }}
                    />
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-xs font-bold">★</span>
                    </div>
                  </div>

                  {/* Detalhes do Tour */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-[#0008B] text-base leading-tight truncate group-hover:text-[#0008B]/90">
                      {tourName}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2 leading-relaxed">
                      {shortDesc}
                    </p>
                  </div>

                  {/* Preço e Ícone */}
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xl font-black text-[#0008B] drop-shadow-sm">

                      {price}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Popular
                    </div>
                  </div>
                </div>
              </button>
            </li>
          )
        })}
      </ul>

      {/* Footer do Dropdown */}
      <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm border-t border-gray-100 px-6 py-4 mt-4 z-10">
        <button
          onClick={onClose}
          className="w-full text-sm text-gray-500 hover:text-[#0008B] hover:bg-gray-100 py-2 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Fechar Menu
        </button>
      </div>
    </div>
  )
}

export default ToursDropdown
