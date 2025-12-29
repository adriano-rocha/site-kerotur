import { type JSX, useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, MapPin, Play, Pause } from "lucide-react";

interface TourModalProps {
  tour: {
    id: string;
    name: { [key: string]: string };
    shortDescription: { [key: string]: string };
    fullDescription?: { [key: string]: string };
    image: string;
    images?: string[];
    attractions?: { [key: string]: string[] };
    duration?: { [key: string]: string };
    price: {
      value: string;
      perPerson: boolean;
      individual?: string;
      group?: string;
    };
    included?: { [key: string]: string[] };
    buttonText: { [key: string]: string };
  };
  onClose: () => void;
}

function TourModal({ tour, onClose }: TourModalProps): JSX.Element {
  const { i18n } = useTranslation();
  const currentLang = i18n.language ?? "pt-BR";
  const getText = (map?: { [key: string]: string }) =>
    map ? map[currentLang] ?? map["pt-BR"] ?? "" : "";

  // Estado do carrossel
  const images = tour.images || [tour.image];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // ✅ FUNÇÕES MEMOIZADAS - Corrige ESLint e performance
  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // ✅ AUTO PLAY CORRIGIDO - ESLint feliz
  useEffect(() => {
    if (!isPlaying || images.length <= 1) return;

    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, nextImage]);

  // ✅ PAUSE HOVER CORRIGIDO - Mais estável
  useEffect(() => {
    const modalContent = document.querySelector(".tour-modal-content");
    if (!modalContent) return;

    const handleMouseEnter = () => setIsPlaying(false);
    const handleMouseLeave = () => setIsPlaying(true);

    modalContent.addEventListener("mouseenter", handleMouseEnter);
    modalContent.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      modalContent.removeEventListener("mouseenter", handleMouseEnter);
      modalContent.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isPlaying]);

  const WHATSAPP_LINK = `https://wa.me/5521982251450?text=${encodeURIComponent(
    `Olá! Gostaria de mais informações sobre o passeio: ${getText(tour.name)}`
  )}`;

  // Bloquear scroll do body
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Fechar com ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Formatar descrição
  const fullDesc =
    getText(tour.fullDescription) || getText(tour.shortDescription);
  const paragraphs = fullDesc.split("\n").filter((p) => p.trim());

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="tour-modal-content bg-white rounded-2xl max-w-5xl w-full max-h-[85vh] overflow-y-auto shadow-2xl animate-scaleIn relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão X no canto superior */}
        <button
          onClick={onClose}
          className="sticky top-4 right-4 ml-auto mr-4 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110 border border-gray-200 flex items-center justify-center"
          aria-label="Fechar"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Carrossel de Imagens */}
        <div className="relative w-full h-96 md:h-[500px] overflow-hidden bg-gradient-to-br from-gray-900 to-black/20">
          <img
            src={images[currentImageIndex]}
            alt={`${getText(tour.name)} - ${currentImageIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-800 hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "/images/tours/default-tour.jpg";
            }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Controles */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white backdrop-blur-sm text-gray-800 rounded-full p-3 transition-all duration-300 shadow-2xl hover:shadow-white/50 hover:scale-110 z-20 border border-white/30"
                aria-label="Imagem anterior"
              >
                <ChevronLeft className="w-7 h-7" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white backdrop-blur-sm text-gray-800 rounded-full p-3 transition-all duration-300 shadow-2xl hover:shadow-white/50 hover:scale-110 z-20 border border-white/30"
                aria-label="Próxima imagem"
              >
                <ChevronRight className="w-7 h-7" />
              </button>

              {/* Dots + Play/Pause */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/95 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-2xl border border-white/50 z-20">
                <div className="flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentImageIndex
                          ? "bg-[#0008B] w-8 shadow-lg"
                          : "bg-gray-400 hover:bg-gray-500 hover:w-4"
                      }`}
                      aria-label={`Ir para imagem ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 hover:bg-gray-200 rounded-xl transition-all duration-200 hover:scale-110"
                  title={isPlaying ? "Pausar" : "Reproduzir"}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-gray-700" />
                  ) : (
                    <Play className="w-5 h-5 text-gray-700" />
                  )}
                </button>
              </div>

              {/* Contador */}
              <div className="absolute top-6 left-6 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm shadow-xl z-20">
                {currentImageIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>

        {/* Conteúdo */}
        <div className="p-8 md:p-12">
          <div className="flex items-start gap-4 mb-8">
            <MapPin className="w-10 h-10 text-[#FF8C00] flex-shrink-0 mt-1 bg-gradient-to-br from-orange-100 to-orange-200 p-2 rounded-2xl shadow-lg" />
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-[#00ffff] leading-tight">
                {getText(tour.name)}
              </h1>
              {tour.duration && (
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-full font-medium">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {getText(tour.duration)}
                </div>
              )}
            </div>
          </div>

          <div className="prose prose-lg max-w-none mb-12 text-gray-700 leading-relaxed">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="mb-6 text-lg text-justify">
                {paragraph}
              </p>
            ))}
          </div>

          {tour.included && tour.included[currentLang]?.length > 0 && (
            <div className="mb-12 bg-gradient-to-r from-emerald-50 to-teal-50 p-8 rounded-3xl border-2 border-emerald-100 shadow-xl">
              <h3 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center gap-3">
                <svg
                  className="w-8 h-8 p-2 bg-emerald-500 rounded-2xl text-white shadow-lg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                O que está incluído
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {tour.included[currentLang]?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-white/50 backdrop-blur-sm rounded-2xl hover:bg-white transition-all duration-200 hover:shadow-md hover:-translate-y-1"
                  >
                    <span className="text-emerald-500 text-xl font-bold mt-0.5 flex-shrink-0">
                      ✓
                    </span>
                    <span className="text-gray-800 leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-8 rounded-3xl mb-12 shadow-2xl border border-indigo-200/50">
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
              💰 Valor do Passeio
            </h3>
            <div className="flex flex-col lg:flex-row justify-between items-center gap-8 text-center lg:text-left">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-2 uppercase tracking-wider font-medium">
                  Individual
                </p>
                <p className="text-5xl lg:text-6xl font-black text-[#0008B] drop-shadow-lg">
                  {tour.price.individual || tour.price.value || "R$ 0"}
                </p>
                <p className="text-lg text-gray-600 font-medium mt-2">
                  por pessoa
                </p>
              </div>
              {tour.price.group && (
                <div className="flex-1 border-l border-gray-200 pl-8 lg:pl-12">
                  <p className="text-sm text-gray-600 mb-2 uppercase tracking-wider font-medium">
                    Grupo
                  </p>
                  <p className="text-4xl font-black text-emerald-600 drop-shadow-lg">
                    {tour.price.group}
                  </p>
                  <p className="text-lg text-emerald-600 font-bold mt-2">
                    Economia especial!
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 pt-8 border-t-4 border-[#0008B]/20 bg-gradient-to-r from-gray-50 to-transparent rounded-b-3xl">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-black py-9 px-12 rounded-2xl transition-all duration-500 shadow-2xl hover:shadow-3xl hover:-translate-y-2 flex items-center justify-center gap-4 text-base relative overflow-hidden"
            >
              <svg
                className="w-12 h-12 group-hover:scale-110 transition-transform duration-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span>WhatsApp Agora</span>
              <div className="absolute inset-0 bg-white/20 backdrop-blur-sm -skew-x-12 -translate-x-[100%] group-hover:translate-x-0 transition-transform duration-700" />
            </a>

            {/* Botão de fechar com X */}
            <button
              onClick={onClose}
              className="lg:flex-none w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-[#0008B] font-bold text-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:scale-110"
              aria-label="Fechar"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourModal;
