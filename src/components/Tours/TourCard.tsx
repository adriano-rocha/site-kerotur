import { useTranslation } from 'react-i18next'

interface TourCardProps {
  tour: {
    id: string
    name: { [key: string]: string }
    shortDescription: { [key: string]: string }
    image: string
    price: {
      value: string
      perPerson: boolean
    }
    buttonText: { [key: string]: string }
  }
  onClick: () => void
}

function TourCard({ tour, onClick }: TourCardProps) {
  const { i18n, t } = useTranslation()
  const currentLang = i18n.language

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer group"
    >
      <div className="relative overflow-hidden h-64">
        <img
          src={tour.image}
          alt={tour.name[currentLang] || tour.name['pt-BR']}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            // Fallback para imagem padrão se não encontrar
            e.currentTarget.src = '/images/tours/default-tour.jpg'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white pr-4">
          {tour.name[currentLang] || tour.name['pt-BR']}
        </h3>
      </div>

      <div className="p-6">
        <p className="text-gray-600 mb-4 line-clamp-3 min-h-[72px]">
          {tour.shortDescription[currentLang] || tour.shortDescription['pt-BR']}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-2xl font-bold text-[#0008B]">
              {tour.price.value}
            </p>
            {tour.price.perPerson && (
              <p className="text-sm text-gray-500">por pessoa</p>
            )}
          </div>
        </div>

        <div className="w-full bg-[#FF8C00] hover:bg-[#FF7A00] text-[#0008B] font-bold py-3 rounded-lg transition duration-300 text-center">
          {tour.buttonText[currentLang] || tour.buttonText['pt-BR'] || t('tours.card.reserve')}
        </div>
      </div>
    </div>
  )
}

export default TourCard