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
        console.log('⌨️ ESC pressionado - fechando modal')
        onClose()
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  // Handler para fechar ao clicar no overlay
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      console.log('🖱️ Clicou no overlay - fechando modal')
      onClose()
    }
  }

  // Handler para o botão X
  const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('❌ Clicou no botão X - fechando modal')
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
          
          {/* Botão X - CORRIGIDO */}
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

          {/* Botão WhatsApp */}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-lg transition duration-300 flex items-center justify-center gap-2"
          >
            <img src="/images/whatsapp.jpg" alt="WhatsApp" className="w-6 h-6 rounded" />
            {t('tours.modal.reserve')}
          </a>
        </div>
      </div>
    </div>
  )
}

export default TourModal