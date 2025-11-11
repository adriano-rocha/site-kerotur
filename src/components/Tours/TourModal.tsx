import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

interface TourModalProps {
  tour: {
    id: string
    name: { [key: string]: string }
    fullDescription: { [key: string]: string }
    image: string
    attractions: { [key: string]: string[] }
    duration: { [key: string]: string }
    price: {
      individual: string
      group: string
    }
    included: { [key: string]: string[] }
  }
  onClose: () => void
}

function TourModal({ tour, onClose }: TourModalProps) {
  const { i18n, t } = useTranslation()
  const currentLang = i18n.language
  const WHATSAPP_LINK = "https://wa.me/5521982251450"

  // Bloquear scroll do body quando modal está aberto
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  // Fechar modal ao pressionar ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  // Handler para fechar ao clicar no overlay
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Handler para o botão X
  const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    onClose()
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header com imagem */}
        <div className="relative h-64 md:h-80">
          <img
            src={tour.image}
            alt={tour.name[currentLang] || tour.name["pt"]}
            loading="lazy"
            className="w-full h-full object-cover rounded-t-2xl"
          />
          
          {/* Botão X */}
          <button
            onClick={handleCloseClick}
            type="button"
            className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 transition duration-300 shadow-lg z-10 cursor-pointer"
            aria-label="Fechar modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-2xl"></div>
          <h2 className="absolute bottom-6 left-6 text-3xl md:text-4xl font-bold text-white">
            {tour.name[currentLang] || tour.name["pt"]}
          </h2>
        </div>

        {/* Conteúdo */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Descrição */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">{t('tours.modal.about')}</h3>
            <p className="text-gray-600 leading-relaxed">{tour.fullDescription[currentLang]}</p>
          </div>

          {/* Atrações */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">{t('tours.modal.attractions')}</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {tour.attractions[currentLang]?.map((attraction, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <span className="text-blue-600 mr-2">✓</span>
                  {attraction}
                </li>
              ))}
            </ul>
          </div>

          {/* Inclusos */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">{t('tours.modal.included')}</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {tour.included[currentLang]?.map((item, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <span className="text-green-600 mr-2">●</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Duração e Preços */}
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">{t('tours.modal.duration')}</p>
                <p className="text-lg font-semibold text-gray-800">{tour.duration[currentLang]}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{t('tours.modal.priceIndividual')}</p>
                <p className="text-2xl font-bold text-blue-600">{tour.price.individual}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{t('tours.modal.priceGroup')}</p>
                <p className="text-2xl font-bold text-green-600">{tour.price.group}</p>
              </div>
            </div>
          </div>

          {/* Botão WhatsApp - CORRIGIDO */}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-lg transition duration-300 flex items-center justify-center gap-3"
          >
            <svg 
              className="w-7 h-7" 
              fill="currentColor" 
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            {t('tours.modal.reserve')}
          </a>
        </div>
      </div>
    </div>
  )
}

export default TourModal