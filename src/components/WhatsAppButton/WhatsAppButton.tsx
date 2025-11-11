import { useTranslation } from 'react-i18next'

function WhatsAppButton() {
  const { t } = useTranslation()
  const WHATSAPP_NUMBER = '5521982251450'
  const MESSAGE = encodeURIComponent(t('whatsapp.message'))
  const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${MESSAGE}`

  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Falar no WhatsApp"
      data-aos="zoom-in"
      data-aos-delay="1000"
    >
      {/* Tooltip */}
      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <span className="text-sm font-medium">{t('whatsapp.tooltip')}</span>

        {/* Seta do tooltip */}
        <div className="absolute top-1/2 -translate-y-1/2 -right-2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-green-500"></div>
      </div>

      {/* Botão principal */}
      <div className="bg-green-500 hover:bg-green-600 rounded-full p-4 shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110 animate-pulse hover:animate-none">
        <img 
          src="/images/whats.png" 
          alt="WhatsApp" 
          className="w-12 h-12"
        />
      </div>

      {/* Badge de notificação (opcional) */}
      <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
        1
      </div>
    </a>
  )
}

export default WhatsAppButton
