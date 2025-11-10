import { useTranslation } from 'react-i18next'

function Contact() {
  const { t } = useTranslation()
  const WHATSAPP_NUMBER = '5521982251450'
  const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`
  const EMAIL = 'kerotur@kerotur.com'
  const PHONE = '+55 21 98225-1450'
  const ADDRESS = 'Rua Noronha Torrezão, 282/1002B, Niterói - RJ'

  return (
    <section id="contato" className="py-16 md:py-24 bg-linear-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        {/* Título */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-blue-600">
            {t('contact.title')}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          
          {/* Coluna Esquerda - Canais de Contato (1/3) */}
          <div className="space-y-4">
            
            {/* WhatsApp - Destaque */}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-green-500 hover:bg-green-600 text-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <div className="bg-white/20 rounded-full p-2">
                  <img src="/images/whats.png" alt="WhatsApp" className="w-8 h-8 rounded-full" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{t('contact.whatsapp.title')}</h3>
                  <p className="text-green-100 text-sm">{PHONE}</p>
                </div>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </a>

            {/* E-mail */}
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 hover:border-blue-300 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 rounded-full p-2">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-gray-800">{t('contact.email.title')}</h3>
                  <a href={`mailto:${EMAIL}`} className="text-blue-600 hover:text-blue-700 text-sm">
                    {EMAIL}
                  </a>
                </div>
              </div>
            </div>

            {/* Telefone */}
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 hover:border-yellow-300 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-100 rounded-full p-2">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-gray-800">{t('contact.phone.title')}</h3>
                  <a href={`tel:${WHATSAPP_NUMBER}`} className="text-gray-700 hover:text-blue-600 text-sm">
                    {PHONE}
                  </a>
                </div>
              </div>
            </div>

            {/* Endereço */}
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 rounded-full p-2 mt-1">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-gray-800 mb-1">{t('contact.address.title')}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{ADDRESS}</p>
                </div>
              </div>
            </div>

            {/* Horário de Atendimento */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-start gap-3">
                <div className="bg-blue-200 rounded-full p-2 mt-1">
                  <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-gray-800 mb-2">{t('contact.hours.title')}</h3>
                  <p className="text-gray-700 text-xs mb-1">{t('contact.hours.weekdays')}</p>
                  <p className="text-gray-700 text-xs mb-1">{t('contact.hours.saturday')}</p>
                  <p className="text-gray-600 text-xs">{t('contact.hours.sunday')}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Coluna Direita - Mapa e CTA (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Mapa */}
            <div className="bg-white rounded-2xl p-2 shadow-xl h-[450px] lg:h-[550px] overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3674.0856644850755!2d-43.11881!3d-22.90363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997f5b4e9e7e0f%3A0x1234567890abcdef!2sRua%20Noronha%20Torrez%C3%A3o%2C%20282%20-%20Niter%C3%B3i%2C%20RJ!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '12px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização Kerotur"
              ></iframe>
            </div>

            {/* CTA Final */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 lg:p-8 text-white text-center shadow-xl">
              <h3 className="text-xl lg:text-2xl font-bold mb-2">{t('contact.cta.title')}</h3>
              <p className="mb-5 text-blue-100 text-sm lg:text-base">{t('contact.cta.description')}</p>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <img src="/images/whats.png" alt="WhatsApp" className="w-6 h-6 rounded-full" />
                {t('contact.cta.button')}
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Contact
