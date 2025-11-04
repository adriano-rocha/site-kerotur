import { useTranslation } from 'react-i18next'

function Hero() {
  const { t } = useTranslation()

  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h2 className="text-5xl font-bold mb-4">
            {t('hero.title')}
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            {t('hero.subtitle')}
          </p>
          <div className="flex gap-4">
            <a 
              href="https://wa.me/5521982251450" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300 flex items-center gap-2"
            >
              <span>💬</span>
              {t('hero.whatsappButton')}
            </a>
            <a 
              href="#passeios"
              className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-lg transition duration-300"
            >
              {t('hero.toursButton')}
            </a>
          </div>
        </div>
      </div>
      
      {/* Elemento decorativo */}
      <div className="absolute bottom-0 right-0 opacity-10">
        <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#FFFFFF" d="M45.3,-57.6C58.3,-49.1,68.5,-34.7,72.4,-18.8C76.3,-3,73.9,14.3,66.4,28.4C58.9,42.5,46.3,53.4,32.1,59.7C17.9,66,-7.9,67.7,-29.4,62.1C-50.9,56.5,-68.1,43.6,-75.7,26.4C-83.3,9.2,-81.3,-12.3,-73.1,-30.1C-64.9,-47.9,-50.5,-62,-34.7,-70.1C-18.9,-78.2,-1.7,-80.3,13.8,-76.8C29.3,-73.3,32.3,-66.1,45.3,-57.6Z" transform="translate(100 100)" />
        </svg>
      </div>
    </section>
  )
}

export default Hero