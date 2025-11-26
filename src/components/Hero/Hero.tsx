import { useTranslation } from "react-i18next";

function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative bg-[#00ffff] text-[#0008B] py-12 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            data-aos="fade-down"
            data-aos-delay="100"
          >
            {t("hero.title")}
          </h2>
          <p
            className="text-base md:text-lg lg:text-xl mb-6 md:mb-8"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            {t("hero.subtitle")}
          </p>
          <div
            className="flex flex-col sm:flex-row gap-3 md:gap-4"
            data-aos="zoom-in"
            data-aos-delay="500"
          >
            <a
              href="https://wa.me/5521982251450"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 md:px-8 rounded-lg transition duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <img
                src="/images/whats.png"
                alt="WhatsApp"
                className="w-6 h-6 rounded"
              />
              {t("hero.whatsappButton")}
            </a>
            <a
              href="#passeios"
              className="bg-[#FF8C00] text-[#0008B] hover:bg-[#FF7A00] font-bold py-3 px-6 md:px-8 rounded-lg transition duration-300 text-center text-sm md:text-base"
            >
              {t("hero.learnMoreButton")}
            </a>
          </div>
        </div>
      </div>

      <div
        className="hidden md:block absolute bottom-0 right-0 w-80 h-80 lg:w-96 lg:h-96"
        data-aos="fade-left"
        data-aos-delay="700"
      >
        <img
          src="/images/agente.png"
          alt="Aldo - Guia Kerotur"
          className="w-full h-full object-cover rounded-full opacity-90 shadow-2xl"
        />
      </div>
    </section>
  );
}

export default Hero;