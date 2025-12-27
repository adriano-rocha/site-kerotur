import { useTranslation } from "react-i18next";

function Hero() {
  const { t } = useTranslation();

  const flags = [
    { src: "https://flagcdn.com/w80/br.png", alt: "Brasil" },
    { src: "https://flagcdn.com/w80/us.png", alt: "Estados Unidos" },
    { src: "https://flagcdn.com/w80/es.png", alt: "Espanha" },
    { src: "https://flagcdn.com/w80/fr.png", alt: "França" }
  ];

  const ActionButtons = () => (
    <>
      <a
        href="#passeios"
        className="bg-[#FF8C00] text-[#0008B] hover:bg-[#FF7A00] font-bold py-3 px-6 md:px-8 rounded-lg transition duration-300 text-center text-sm md:text-base"
      >
        {t("hero.learnMoreButton")}
      </a>

      <a
        href="https://wa.me/5521982251450"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 md:px-8 rounded-lg transition duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
      >
        <img
          src="/images/whats.png"
          alt="WhatsApp"
          className="w-8 h-8 rounded"
        />
        {t("hero.whatsappButton")}
      </a>
    </>
  );

  return (
    <section className="relative bg-[#00ffff] text-[#0008B] py-8 md:py-12 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          
          {/* Conteúdo Esquerdo */}
          <div className="w-full md:w-1/2 z-10">
            <div 
              className="bg-[#00ffff] rounded-lg py-4 px-2 mb-6"
              data-aos="fade-down"
              data-aos-delay="100"
            >
              <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-[#00008B] mb-0 py-10">
                "A Kerotur leva você para os melhores passeios".
              </h2>
              <div className="flex gap-1.5 mt-0">
                {flags.map((flag) => (
                  <img 
                    key={flag.alt}
                    src={flag.src}
                    alt={flag.alt}
                    className="h-4 w-auto shadow-sm rounded"
                  />
                ))}
              </div>
            </div>

          

            {/* Botões Desktop */}
            <div
              className="hidden md:flex flex-col sm:flex-row gap-3 md:gap-4"
              data-aos="zoom-in"
              data-aos-delay="500"
            >
              <ActionButtons />
            </div>
          </div>

          {/* Imagem */}
          <div
            className="w-full md:w-1/2 flex justify-center md:justify-end"
            data-aos="fade-left"
            data-aos-delay="700"
          >
            <div className="relative w-full max-w-md md:max-w-lg">
              <img
                src="/images/foto-aldo.png"
                alt="Aldo - Guia Kerotur"
                className="w-full h-auto object-contain rounded-lg shadow-2xl"
              />
            
            </div>
          </div>
        </div>

        {/* Botões Mobile */}
        <div
          className="flex md:hidden flex-col gap-3 mt-6"
          data-aos="zoom-in"
          data-aos-delay="500"
        >
          <ActionButtons />
        </div>
      </div>
    </section>
  );
}

export default Hero;