import { useTranslation } from 'react-i18next';

function Partners() {
  const { t } = useTranslation();
  const WHATSAPP_LINK = "https://wa.me/5521982251450";

  return (
    <section
      id="parceiros"
      className="relative bg-[#00ffff] py-20 overflow-hidden"
    >
      {/* Fundo decorativo */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#FF8C00] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#0008B] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Título */}
        <div className="text-center mb-12" data-aos="fade-down">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0008B] mb-4">
            {t('partners.title')}
          </h2>
          <div className="w-24 h-1 bg-[#FF8C00] mx-auto mb-6"></div>

          <p className="text-lg text-[#0008B] max-w-3xl mx-auto">
            {t('partners.subtitle')}
          </p>
        </div>

        {/* Conteúdo principal */}
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Texto */}
          <div className="space-y-6 text-[#0008B]" data-aos="fade-right">
            <p className="text-lg leading-relaxed">
              {t('partners.description')}
            </p>

            {/* Destaques */}
            <div className="space-y-5">
              {/* FEATURE 1 - Hospedagem */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#FF8C00] rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-[#0008B]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    {t('partners.feature1.title')}
                  </h3>
                  <p className="text-[#0008B]/80">
                    {t('partners.feature1.description')}
                  </p>
                </div>
              </div>

              {/* FEATURE 2 - Passagens */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#FF8C00] rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-[#0008B]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    {t('partners.feature2.title')}
                  </h3>
                  <p className="text-[#0008B]/80">
                    {t('partners.feature2.description')}
                  </p>
                </div>
              </div>

              {/* FEATURE 3 - Seguro e Serviços */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#FF8C00] rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-[#0008B]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    {t('partners.feature3.title')}
                  </h3>
                  <p className="text-[#0008B]/80">
                    {t('partners.feature3.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Vídeo */}
          <div className="relative flex justify-center" data-aos="fade-left" data-aos-delay="200">
            {/* Badge decorativo - MOVIDO PARA CANTO SUPERIOR ESQUERDO EM VERDE */}
            <div className="absolute -top-6 -left-6 bg-green-500 text-white font-bold px-6 py-3 rounded-full shadow-lg transform -rotate-12 hover:rotate-0 transition-transform duration-300 z-10">
              {t('partners.badge')}
            </div>

            <div className="relative rounded-xl overflow-hidden shadow-2xl bg-white border-4 border-[#0008B] w-full max-w-sm">
              <div className="relative" style={{ aspectRatio: '9/16' }}>
                <video
                  className="w-full h-full object-cover"
                  controls
                  preload="auto"
                  playsInline
                  controlsList="nodownload"
                  crossOrigin="anonymous"
                >
                  <source src="/images/video.mp4" type="video/mp4" />
                  
                  {/* Legendas em todos os idiomas */}
                  <track 
                    src="/images/legendas-pt.vtt" 
                    kind="subtitles" 
                    srcLang="pt-BR" 
                    label="Português"
                    default
                  />
                  <track 
                    src="/images/legendas-en.vtt" 
                    kind="subtitles" 
                    srcLang="en" 
                    label="English"
                  />
                  <track 
                    src="/images/legendas-es.vtt" 
                    kind="subtitles" 
                    srcLang="es" 
                    label="Español"
                  />
                  <track 
                    src="/images/legendas-fr.vtt" 
                    kind="subtitles" 
                    srcLang="fr" 
                    label="Français"
                  />
                  <track 
                    src="/images/legendas-it.vtt" 
                    kind="subtitles" 
                    srcLang="it" 
                    label="Italiano"
                  />
                  <track 
                    src="/images/legendas-de.vtt" 
                    kind="subtitles" 
                    srcLang="de" 
                    label="Deutsch"
                  />
                  <track 
                    src="/images/legendas-he.vtt" 
                    kind="subtitles" 
                    srcLang="he" 
                    label="עברית"
                  />
                  <track 
                    src="/images/legendas-zh.vtt" 
                    kind="subtitles" 
                    srcLang="zh" 
                    label="中文"
                  />
                  <track 
                    src="/images/legendas-ja.vtt" 
                    kind="subtitles" 
                    srcLang="ja" 
                    label="日本語"
                  />
                  <track 
                    src="/images/legendas-ru.vtt" 
                    kind="subtitles" 
                    srcLang="ru" 
                    label="Русский"
                  />
                  
                  {t('partners.videoNotSupported') || 'Seu navegador não suporta a reprodução de vídeos.'}
                </video>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16" data-aos="zoom-in" data-aos-delay="400">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#FF8C00] hover:bg-[#e67b00] text-[#0008B] font-bold text-lg px-8 py-4 rounded-full transition duration-300 shadow-xl hover:scale-105"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            {t('partners.cta')}
          </a>

          <p className="text-[#0008B] mt-4 text-sm font-medium">
            {t('partners.ctaSubtext')}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Partners;