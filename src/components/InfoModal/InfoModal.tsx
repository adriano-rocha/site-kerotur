import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'mission' | 'vision' | 'values';
}

function InfoModal({ isOpen, onClose, type }: InfoModalProps) {
  const { t } = useTranslation();

  // Fechar modal ao pressionar ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Previne scroll do body
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header do Modal */}
        <div className="bg-gradient-to-r from-[#00ffff] to-[#00008B] p-6 rounded-t-xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {t(`${type}.title`)}
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition duration-300"
              aria-label="Fechar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Conteúdo do Modal */}
        <div className="p-6 md:p-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-[#00008B] text-base md:text-lg leading-relaxed whitespace-pre-line">
              {t(`${type}.text`)}
            </p>
          </div>

          {/* Botão de Fechar */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={onClose}
              className="bg-[#FF8C00] hover:bg-[#e67b00] text-white font-bold px-8 py-3 rounded-full transition duration-300 shadow-lg hover:scale-105"
            >
              {t('modal.close') || 'Fechar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoModal;