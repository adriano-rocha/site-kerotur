import { useTranslation } from 'react-i18next'
import toursData from '../../data/tours.json'

interface ToursDropdownProps {
  onSelectTour: (tourId: string) => void
  onClose: () => void
}

type SupportedLanguage = 'pt-BR' | 'en' | 'es'

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
      className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl py-2 min-w-[250px] z-50 border border-gray-100"
      onClick={(e) => e.stopPropagation()}
    >
      <ul>
        {toursData.map((tour) => {
          const tourName = tour.name[currentLang] || tour.name['pt-BR']
          return (
            <li key={tour.id}>
              <button
                onClick={() => handleTourClick(tour.id, tourName)}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-blue-50 transition text-left border-none bg-transparent cursor-pointer"
                type="button"
              >
                <img
                  src={tour.image}
                  alt={tourName}
                  className="w-12 h-12 object-cover rounded"
                  loading="lazy"
                />
                <span className="text-gray-800 font-medium">
                  {tourName}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ToursDropdown