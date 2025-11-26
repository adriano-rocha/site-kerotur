import { useState, useImperativeHandle, forwardRef, useCallback } from 'react'
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
  fullDescription?: { [key: string]: string }
  image: string
  images?: string[]
  attractions?: { [key: string]: string[] }
  duration?: { [key: string]: string }
  price: {
    individual?: string
    group?: string
    value?: string
    perPerson?: boolean
  }
  included?: { [key: string]: string[] }
  buttonText?: { [key: string]: string }
}

export interface TourSectionRef {
  openTourById: (tourId: string) => void
}

const TourSection = forwardRef<TourSectionRef, object>((_, ref) => {
  const { t } = useTranslation()
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null)

  // Carrossel Desktop (3 slides por vez)
  const [emblaRefDesktop, emblaApiDesktop] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 3,
  })

  // Carrossel Mobile (1 slide por vez)
  const [emblaRefMobile, emblaApiMobile] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  })

  const scrollPrevDesktop = useCallback(() => {
    if (emblaApiDesktop) emblaApiDesktop.scrollPrev()
  }, [emblaApiDesktop])

  const scrollNextDesktop = useCallback(() => {
    if (emblaApiDesktop) emblaApiDesktop.scrollNext()
  }, [emblaApiDesktop])

  const scrollPrevMobile = useCallback(() => {
    if (emblaApiMobile) emblaApiMobile.scrollPrev()
  }, [emblaApiMobile])

  const scrollNextMobile = useCallback(() => {
    if (emblaApiMobile) emblaApiMobile.scrollNext()
  }, [emblaApiMobile])

  // Função para converter tour para o formato esperado pelo TourCard
  const formatTourForCard = (tour: Tour) => {
    return {
      id: tour.id,
      name: tour.name,
      shortDescription: tour.shortDescription,
      image: tour.image,
      price: {
        value: tour.price.individual || tour.price.value || 'Consulte',
        perPerson: tour.price.perPerson !== undefined ? tour.price.perPerson : true
      },
      buttonText: tour.buttonText || { 'pt-BR': 'Reserve agora' }
    }
  }

  // Função para converter tour para o formato esperado pelo TourModal
  const formatTourForModal = (tour: Tour) => {
    return {
      id: tour.id,
      name: tour.name,
      shortDescription: tour.shortDescription,
      fullDescription: tour.fullDescription || tour.shortDescription,
      image: tour.image,
      images: tour.images || [tour.image],
      attractions: tour.attractions || { 'pt-BR': [] },
      duration: tour.duration || { 'pt-BR': 'Consulte' },
      price: {
        value: tour.price.individual || tour.price.value || 'Consulte',
        perPerson: tour.price.perPerson !== undefined ? tour.price.perPerson : true,
        individual: tour.price.individual || tour.price.value || 'Consulte',
        group: tour.price.group || 'Consulte'
      },
      included: tour.included || { 'pt-BR': [] },
      buttonText: tour.buttonText || { 'pt-BR': 'Reserve agora' }
    }
  }

  useImperativeHandle(ref, () => ({
    openTourById: (tourId: string) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const tour = toursData.find((t: any) => t.id === tourId)
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
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center text-[#0008B]"
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

        {/* Carrossel Desktop (3 cards por vez) */}
        <div 
          className="hidden md:block relative"
          data-aos="zoom-in"
          data-aos-delay="400"
        >
          <div className="overflow-hidden" ref={emblaRefDesktop}>
            <div className="flex gap-6">
              {(toursData as Tour[]).map((tour) => (
                <div 
                  key={tour.id} 
                  className="flex-[0_0_calc(33.333%-16px)] min-w-0"
                >
                  <TourCard
                    tour={formatTourForCard(tour)}
                    onClick={() => setSelectedTour(tour)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Botões Desktop */}
          <button
            className="bg-white hover:bg-[#00ffff]/20 flex items-center justify-center rounded-full shadow-xl w-12 h-12 absolute left-0 -translate-y-1/2 -translate-x-6 top-1/2 z-10 transition duration-300 hover:scale-110"
            onClick={scrollPrevDesktop}
            aria-label="3 passeios anteriores"
          >
            <ChevronLeft className="w-6 h-6 text-[#0008B]" />
          </button>

          <button
            className="bg-white hover:bg-[#00ffff]/20 flex items-center justify-center rounded-full shadow-xl w-12 h-12 absolute right-0 -translate-y-1/2 translate-x-6 top-1/2 z-10 transition duration-300 hover:scale-110"
            onClick={scrollNextDesktop}
            aria-label="Próximos 3 passeios"
          >
            <ChevronRight className="w-6 h-6 text-[#0008B]" />
          </button>

          {/* Indicadores Desktop */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(toursData.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApiDesktop?.scrollTo(index * 3)}
                className="w-2 h-2 rounded-full bg-[#00ffff] hover:bg-[#0008B] transition"
                aria-label={`Ir para grupo ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Carrossel Mobile (1 card por vez) */}
        <div 
          className="md:hidden relative"
          data-aos="zoom-in"
          data-aos-delay="400"
        >
          <div className="overflow-hidden" ref={emblaRefMobile}>
            <div className="flex">
              {(toursData as Tour[]).map((tour) => (
                <div 
                  key={tour.id} 
                  className="flex-[0_0_100%] min-w-0 px-2"
                >
                  <TourCard
                    tour={formatTourForCard(tour)}
                    onClick={() => setSelectedTour(tour)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Botões Mobile */}
          <button
            className="bg-white hover:bg-[#00ffff]/20 flex items-center justify-center rounded-full shadow-xl w-10 h-10 absolute left-0 -translate-y-1/2 -translate-x-2 top-1/2 z-10 transition duration-300"
            onClick={scrollPrevMobile}
            aria-label="Passeio anterior"
          >
            <ChevronLeft className="w-5 h-5 text-[#0008B]" />
          </button>

          <button
            className="bg-white hover:bg-[#00ffff]/20 flex items-center justify-center rounded-full shadow-xl w-10 h-10 absolute right-0 -translate-y-1/2 translate-x-2 top-1/2 z-10 transition duration-300"
            onClick={scrollNextMobile}
            aria-label="Próximo passeio"
          >
            <ChevronRight className="w-5 h-5 text-[#0008B]" />
          </button>

          {/* Indicadores Mobile (limitado a 10 + contador) */}
          <div className="flex justify-center gap-2 mt-6 items-center">
            {toursData.slice(0, 10).map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApiMobile?.scrollTo(index)}
                className="w-2 h-2 rounded-full bg-[#00ffff] hover:bg-[#0008B] transition"
                aria-label={`Ir para passeio ${index + 1}`}
              />
            ))}
            {toursData.length > 10 && (
              <span className="text-gray-400 text-xs ml-1">
                +{toursData.length - 10}
              </span>
            )}
          </div>
        </div>
      </div>

      {selectedTour && (
        <TourModal
          tour={formatTourForModal(selectedTour)}
          onClose={() => setSelectedTour(null)}
        />
      )}
    </section>
  )
})

TourSection.displayName = 'TourSection'

export default TourSection