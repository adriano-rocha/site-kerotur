import { useTranslation } from 'react-i18next'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    content: {
      'pt-BR': 'A viagem para Angra dos Reis foi perfeita! A Kerotur organizou tudo nos mínimos detalhes, desde o transporte até as paradas nas ilhas. A equipe é super atenciosa e o passeio superou todas as expectativas. Voltarei com certeza!',
      'en': 'The trip to Angra dos Reis was perfect! Kerotur organized everything down to the smallest detail, from transportation to stops at the islands. The team is super attentive and the tour exceeded all expectations. I will definitely be back!',
      'es': '¡El viaje a Angra dos Reis fue perfecto! Kerotur organizó todo hasta el más mínimo detalle, desde el transporte hasta las paradas en las islas. El equipo es súper atento y el paseo superó todas las expectativas. ¡Volveré sin duda!'
    },
    author: 'Marta Silva',
    destination: {
      'pt-BR': 'Angra dos Reis',
      'en': 'Angra dos Reis',
      'es': 'Angra dos Reis'
    },
    image: '/images/client1.png'
  },
  {
    id: 2,
    content: {
      'pt-BR': 'Sempre quis conhecer Paraty e a Kerotur realizou esse sonho! O centro histórico é lindo e as praias são paradisíacas. O guia era muito conhecedor e contava histórias incríveis. Foi uma experiência cultural e relaxante ao mesmo tempo.',
      'en': 'I always wanted to visit Paraty and Kerotur made that dream come true! The historic center is beautiful and the beaches are paradisiacal. The guide was very knowledgeable and told incredible stories. It was a cultural and relaxing experience at the same time.',
      'es': '¡Siempre quise conocer Paraty y Kerotur hizo ese sueño realidad! El centro histórico es hermoso y las playas son paradisíacas. El guía era muy conocedor y contaba historias increíbles. Fue una experiencia cultural y relajante al mismo tiempo.'
    },
    author: 'Kaio Ozu',
    destination: {
      'pt-BR': 'Paraty',
      'en': 'Paraty',
      'es': 'Paraty'
    },
    image: '/images/client2.png'
  },
  {
    id: 3,
    content: {
      'pt-BR': 'Búzios é simplesmente maravilhoso! A Kerotur nos levou nas praias mais bonitas e ainda tivemos tempo livre para explorar a Orla Bardot. O passeio foi muito bem planejado e o custo-benefício excelente. Recomendo demais!',
      'en': 'Búzios is simply wonderful! Kerotur took us to the most beautiful beaches and we still had free time to explore the Bardot Boardwalk. The tour was very well planned and the value for money was excellent. I highly recommend it!',
      'es': '¡Búzios es simplemente maravilloso! Kerotur nos llevó a las playas más hermosas y todavía tuvimos tiempo libre para explorar el Paseo Bardot. El paseo fue muy bien planificado y la relación calidad-precio excelente. ¡Lo recomiendo muchísimo!'
    },
    author: 'Julia Oliveira',
    destination: {
      'pt-BR': 'Búzios',
      'en': 'Búzios',
      'es': 'Búzios'
    },
    image: '/images/client3.png'
  },
  {
    id: 4,
    content: {
      'pt-BR': 'Já viajei com várias agências, mas a Kerotur se destaca pelo atendimento humanizado e pela qualidade dos serviços. Fizemos o passeio para Angra e foi tudo impecável: pontualidade, segurança e muita diversão. Já estamos planejando a próxima viagem!',
      'en': 'I have traveled with several agencies, but Kerotur stands out for its humanized service and quality of services. We took the trip to Angra and everything was impeccable: punctuality, safety and lots of fun. We are already planning the next trip!',
      'es': 'Ya he viajado con varias agencias, pero Kerotur se destaca por la atención humanizada y la calidad de los servicios. Hicimos el paseo a Angra y todo fue impecable: puntualidad, seguridad y mucha diversión. ¡Ya estamos planeando el próximo viaje!'
    },
    author: 'Ellen Costa',
    destination: {
      'pt-BR': 'Angra dos Reis',
      'en': 'Angra dos Reis',
      'es': 'Angra dos Reis'
    },
    image: '/images/client4.png'
  }
]

function Testimonials() {
  const { i18n, t } = useTranslation()
  const currentLang = i18n.language as 'pt-BR' | 'en' | 'es'
  
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
  })

  function scrollPrev() {
    emblaApi?.scrollPrev()
  }

  function scrollNext() {
    emblaApi?.scrollNext()
  }

  return (
    <section className="bg-blue-50 py-16" data-aos="fade-up">
      <div className="container mx-auto px-4">
        <h2 
          className="text-3xl md:text-4xl font-bold text-center mb-4 text-blue-600"
          data-aos="fade-down"
        >
          {t('testimonials.title')}
        </h2>
        <p 
          className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {t('testimonials.subtitle')}
        </p>

        <div 
          className="relative max-w-4xl mx-auto"
          data-aos="zoom-in"
          data-aos-delay="400"
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((item) => (
                <div key={item.id} className="flex-[0_0_100%] min-w-0 px-3">
                  <article className="bg-white rounded-2xl p-8 shadow-xl h-full flex flex-col">
                    <div className="flex flex-col items-center text-center space-y-6">
                      {/* Imagem do cliente */}
                      <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-blue-200">
                        <img
                          src={item.image}
                          alt={item.author}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Aspas decorativas */}
                      <svg 
                        className="w-12 h-12 text-blue-200" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>

                      {/* Depoimento */}
                      <p className="text-gray-700 leading-relaxed italic">
                        "{item.content[currentLang]}"
                      </p>

                      {/* Autor e destino */}
                      <div>
                        <p className="font-bold text-gray-900 text-lg">{item.author}</p>
                        <div className="flex items-center justify-center gap-2 mt-1">
                          <svg 
                            className="w-4 h-4 text-blue-500" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <p className="text-sm text-gray-500">{item.destination[currentLang]}</p>
                        </div>
                      </div>

                      {/* Estrelas */}
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-5 h-5 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Botão Anterior */}
          <button
            className="bg-white hover:bg-blue-50 flex items-center justify-center rounded-full shadow-xl w-12 h-12 absolute left-0 -translate-y-1/2 -translate-x-6 top-1/2 z-10 transition duration-300 hover:scale-110"
            onClick={scrollPrev}
            aria-label="Depoimento anterior"
          >
            <ChevronLeft className="w-6 h-6 text-blue-600" />
          </button>

          {/* Botão Próximo */}
          <button
            className="bg-white hover:bg-blue-50 flex items-center justify-center rounded-full shadow-xl w-12 h-12 absolute right-0 -translate-y-1/2 translate-x-6 top-1/2 z-10 transition duration-300 hover:scale-110"
            onClick={scrollNext}
            aria-label="Próximo depoimento"
          >
            <ChevronRight className="w-6 h-6 text-blue-600" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Testimonials