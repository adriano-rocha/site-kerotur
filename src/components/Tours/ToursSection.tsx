import { useState, useImperativeHandle, forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import TourCard from './TourCard'
import TourModal from './TourModal'
import toursData from '../../data/tours.json'

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

export interface TourSectionRef {
  openTourById: (tourId: string) => void
}

const TourSection = forwardRef<TourSectionRef>((_, ref) => {
  const { t } = useTranslation()
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null)

  // Embla Carousel para mobile
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
  })

  function scrollPrev() {
    emblaApi?.scrollPrev()
  }

  function scrollNext() {
    emblaApi?.scrollNext()
  }

  useImperativeHandle(ref, () => ({
    openTourById: (tourId: string) => {
      const tour = toursData.find(t => t.id === tourId)
      if (tour) {
        setSelectedTour(tour as Tour)
        
        // Scroll suave até a seção
        setTimeout(() => {
          document.getElementById('passeios')?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
        }, 100)
      }
    }
  }))

  return (
    <section id="passeios" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center text-blue-600"
          data-aos="fade-down"
        >
          {t('tours.title')}
        </h2>
        <p 
          className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {t('tours.subtitle')}
        </p>

        {/* Grid Desktop (md e acima) */}
        <div 
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          data-aos="zoom-in"
          data-aos-delay="400"
        >
          {toursData.map((tour, index) => (
            <div
              key={tour.id}
              data-aos="zoom-in"
              data-aos-delay={index * 150}
            >
              <TourCard
                tour={tour}
                onClick={() => setSelectedTour(tour as Tour)}
              />
            </div>
          ))}
        </div>

        {/* Carrossel Mobile (apenas mobile) */}
        <div 
          className="md:hidden relative"
          data-aos="zoom-in"
          data-aos-delay="400"
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {toursData.map((tour) => (
                <div 
                  key={tour.id} 
                  className="flex-[0_0_100%] min-w-0 px-2"
                >
                  <TourCard
                    tour={tour}
                    onClick={() => setSelectedTour(tour as Tour)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Botão Anterior */}
          <button
            className="bg-white hover:bg-blue-50 flex items-center justify-center rounded-full shadow-xl w-10 h-10 absolute left-0 -translate-y-1/2 -translate-x-2 top-1/2 z-10 transition duration-300"
            onClick={scrollPrev}
            aria-label="Passeio anterior"
          >
            <ChevronLeft className="w-5 h-5 text-blue-600" />
          </button>

          {/* Botão Próximo */}
          <button
            className="bg-white hover:bg-blue-50 flex items-center justify-center rounded-full shadow-xl w-10 h-10 absolute right-0 -translate-y-1/2 translate-x-2 top-1/2 z-10 transition duration-300"
            onClick={scrollNext}
            aria-label="Próximo passeio"
          >
            <ChevronRight className="w-5 h-5 text-blue-600" />
          </button>

          {/* Indicadores (dots) */}
          <div className="flex justify-center gap-2 mt-6">
            {toursData.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className="w-2 h-2 rounded-full bg-blue-300 hover:bg-blue-600 transition"
                aria-label={`Ir para passeio ${index + 1}`}
              />
            ))}
          </div>
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
})

TourSection.displayName = 'TourSection'

export default TourSection