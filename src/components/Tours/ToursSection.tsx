import toursDataRaw from '../../data/tours.json'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import TourCard from './TourCard'
import TourModal from './TourModal'

interface Tour {
  id: string
  name: { [key: string]: string }
  shortDescription: { [key: string]: string }
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

// Fazendo o cast seguro do JSON
const toursData: Tour[] = toursDataRaw as Tour[];

function ToursSection() {
  const { t } = useTranslation()
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null)

  return (
    <section id="passeios" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center text-blue-600">
          {t('tours.title')}
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          {t('tours.subtitle')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {toursData.map((tour) => (
            <TourCard
              key={tour.id}
              tour={tour}
              onClick={() => setSelectedTour(tour)}
            />
          ))}
        </div>
      </div>

      {selectedTour && (
        <TourModal
          tour={selectedTour}
          onClose={() => setSelectedTour(null)}
        />
      )}
    </section>
  )
}

export default ToursSection
