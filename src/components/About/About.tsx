import { useTranslation } from 'react-i18next'

function About() {
  const { t } = useTranslation()

  return (
    <section 
      id="sobre"
      className="relative py-16 md:py-24 overflow-hidden"
    >
      {/* Background com imagem opaca */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/paisagem.jpg)' }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Conteúdo */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-white">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center text-blue-500"
            data-aos="fade-up"
          >
            {t('about.title')}
          </h2>
          
          <div className="space-y-6 text-base md:text-lg leading-relaxed">
            <p data-aos="fade-right" data-aos-delay="100">
              {t('about.paragraph1')}
            </p>
            
            <p data-aos="fade-right" data-aos-delay="200">
              {t('about.paragraph2')}
            </p>
            
            <p data-aos="fade-right" data-aos-delay="300">
              {t('about.paragraph3')}
            </p>
          </div>

          {/* Estatísticas */}
          <div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div 
              className="text-center"
              data-aos="flip-up"
              data-aos-delay="500"
            >
              <div className="text-3xl md:text-4xl font-bold text-yellow-400">15+</div>
              <div className="text-sm md:text-base mt-2">{t('about.stats.years')}</div>
            </div>
            <div 
              className="text-center"
              data-aos="flip-up"
              data-aos-delay="600"
            >
              <div className="text-3xl md:text-4xl font-bold text-yellow-400">5000+</div>
              <div className="text-sm md:text-base mt-2">{t('about.stats.clients')}</div>
            </div>
            <div 
              className="text-center"
              data-aos="flip-up"
              data-aos-delay="700"
            >
              <div className="text-3xl md:text-4xl font-bold text-yellow-400">50+</div>
              <div className="text-sm md:text-base mt-2">{t('about.stats.destinations')}</div>
            </div>
            <div 
              className="text-center"
              data-aos="flip-up"
              data-aos-delay="800"
            >
              <div className="text-3xl md:text-4xl font-bold text-yellow-400">98%</div>
              <div className="text-sm md:text-base mt-2">{t('about.stats.satisfaction')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About