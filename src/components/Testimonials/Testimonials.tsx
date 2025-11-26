import { useTranslation } from 'react-i18next'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const testimonials = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  image: `/depoimentos/depoimento${i + 1}.png`,
}))

function Testimonials() {
  const { t } = useTranslation()
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({})

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  function scrollPrev() {
    emblaApi?.scrollPrev()
  }

  function scrollNext() {
    emblaApi?.scrollNext()
  }

  const handleImageError = (id: number) => {
    setImageErrors(prev => ({ ...prev, [id]: true }))
  }

  return (
    <section className="bg-[#00ffff]/10 py-16" data-aos="fade-up">
      <div className="container mx-auto px-4 max-w-5xl">

        {/* Título */}
        <h2 className="text-4xl font-bold text-center mb-4 text-[#0008B]">
          {t('testimonials.title')}
        </h2>

        <p className="text-center text-[#0008B]/80 mb-12 max-w-2xl mx-auto">
          {t('testimonials.subtitle')}
        </p>

        {/* Carrossel */}
        <div className="relative mx-auto max-w-3xl">

          <div className="overflow-hidden rounded-2xl shadow-xl" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((item) => (
                <div
                  key={item.id}
                  className="flex-[0_0_100%] px-2"
                >
                  <div className="rounded-2xl overflow-hidden border border-[#00ffff]/30 shadow-lg bg-white min-h-[400px] flex items-center justify-center">
                    {imageErrors[item.id] ? (
                      <div className="flex flex-col items-center justify-center p-8 text-gray-400">
                        <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm">Depoimento {item.id}</p>
                        <p className="text-xs mt-1">Imagem não encontrada</p>
                      </div>
                    ) : (
                      <img
                        src={item.image}
                        alt={`Depoimento ${item.id}`}
                        className="w-full h-auto object-contain"
                        loading="lazy"
                        onError={() => handleImageError(item.id)}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botão Anterior */}
          <button
            onClick={scrollPrev}
            aria-label="Anterior"
            className="bg-white hover:bg-[#00ffff]/20 flex items-center justify-center rounded-full shadow-xl w-12 h-12 absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 transition hover:scale-110 border border-[#00ffff]"
          >
            <ChevronLeft className="w-6 h-6 text-[#0008B]" />
          </button>

          {/* Botão Próximo */}
          <button
            onClick={scrollNext}
            aria-label="Próximo"
            className="bg-white hover:bg-[#00ffff]/20 flex items-center justify-center rounded-full shadow-xl w-12 h-12 absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 transition hover:scale-110 border border-[#00ffff]"
          >
            <ChevronRight className="w-6 h-6 text-[#0008B]" />
          </button>

        </div>

        {/* Indicadores (dots) */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className="w-2 h-2 rounded-full bg-[#00ffff] hover:bg-[#0008B] transition"
              aria-label={`Ir para depoimento ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials