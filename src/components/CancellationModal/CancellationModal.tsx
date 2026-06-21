import { useTranslation } from "react-i18next";

interface CancellationModalProps {
  onClose: () => void;
}

function CancellationModal({ onClose }: CancellationModalProps) {
  const { t } = useTranslation();
  const items = t("cancellation.items", { returnObjects: true }) as string[];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b-2 border-[#00008B] px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-bold text-[#00008B]">
            {t("cancellation.title")}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border-2 border-[#00008B] text-[#00008B] flex items-center justify-center hover:bg-[#00008B] hover:text-white transition"
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-6">
          <h3 className="text-base font-bold text-[#00008B] mb-4">
            {t("cancellation.subtitle")}
          </h3>

          <ol className="space-y-4">
            {items.map((item, i) => (
              <li
                key={i}
                className="flex gap-3 text-sm text-[#00008B] leading-relaxed"
              >
                <span className="shrink-0 w-6 h-6 rounded-full bg-[#00008B] text-white text-xs flex items-center justify-center font-bold mt-0.5">
                  {i + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default CancellationModal;