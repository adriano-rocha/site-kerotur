import { useTranslation } from 'react-i18next'

interface TourCardProps {
  tour: {
    id: string
    name: { [key: string]: string }
    shortDescription: { [key: string]: string }
    image: string
    price: {
      individual: string
      group: string
    }
  }
  onClick: () => void
}

function TourCard({ tour, onClick }: TourCardProps) {
  const { i18n, t } = useTranslation()
  const currentLang = i18n.language

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer group">
      <div className="relative overflow-hidden h-64">
        <img
          src={tour.image}
          alt={tour.name[currentLang]}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
          {tour.name[currentLang]}
        </h3>
      </div>

      <div className="p-6">
        <p className="text-gray-600 mb-4 line-clamp-2">
          {tour.shortDescription[currentLang]}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500">{t('tours.card.from')}</p>
            <p className="text-2xl font-bold text-blue-600">{tour.price.individual}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">{t('tours.card.group')}</p>
            <p className="text-xl font-semibold text-green-600">{tour.price.group}</p>
          </div>
        </div>

        <button
          onClick={onClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300"
        >
          {t('tours.card.details')}
        </button>
      </div>
    </div>
  )
}

export default TourCard