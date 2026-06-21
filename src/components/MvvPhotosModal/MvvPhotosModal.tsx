import { useEffect } from "react";

interface MVVPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "mission" | "vision" | "values";
}

function MVVPhotoModal({ isOpen, onClose, type }: MVVPhotoModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const content = {
    mission: {
      title: "Nossa Missão",
      text: "Proporcionar experiências turísticas inesquecíveis, conectando pessoas às belezas naturais e culturais do Rio de Janeiro com segurança, conforto e excelência no atendimento.",
      icon: "🎯",
      bgImage: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=1200",
      gradient: "from-blue-900/80 to-blue-700/80",
    },
    vision: {
      title: "Nossa Visão",
      text: "Ser reconhecida como referência em turismo receptivo no Rio de Janeiro, destacando-se pela qualidade dos serviços, inovação e compromisso com a satisfação dos clientes.",
      icon: "👁️",
      bgImage: "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?w=1200",
      gradient: "from-purple-900/80 to-purple-700/80",
    },
    values: {
      title: "Nossos Valores",
      text: "• Excelência no atendimento\n• Segurança e responsabilidade\n• Respeito ao meio ambiente\n• Compromisso com a cultura local\n• Transparência e ética\n• Paixão pelo que fazemos",
      icon: "⭐",
      bgImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200",
      gradient: "from-orange-900/80 to-orange-700/80",
    },
  };

  const currentContent = content[type];

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      {/* Card estilo foto/polaroid */}
      <div
        className="relative max-w-3xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Imagem de fundo com overlay gradiente */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img
            src={currentContent.bgImage}
            alt={currentContent.title}
            className="w-full h-full object-cover"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-b ${currentContent.gradient}`}
          ></div>

          {/* Botão fechar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full p-2 transition-all duration-300"
            aria-label="Fechar"
          >
            <svg
              className="w-6 h-6"
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

          {/* Título e ícone sobre a imagem */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <span className="text-6xl md:text-7xl mb-4 animate-bounce">
              {currentContent.icon}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-center px-4 drop-shadow-lg">
              {currentContent.title}
            </h2>
          </div>
        </div>

        {/* Conteúdo texto - estilo polaroid */}
        <div className="p-8 md:p-12 bg-white">
          <p className="text-gray-800 text-lg md:text-xl leading-relaxed text-center whitespace-pre-line">
            {currentContent.text}
          </p>
        </div>

        {/* Borda inferior decorativa */}
        <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500"></div>
      </div>
    </div>
  );
}

export default MVVPhotoModal;