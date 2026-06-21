import { useTranslation } from "react-i18next";
import { useCookieConsent } from "../../hooks/useCookieConsent";

function CookieBanner() {
  const { t } = useTranslation();
  const { status, accept, reject } = useCookieConsent();

  if (status !== "pending") return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-100 bg-white border-t-2 border-[#00008B] shadow-2xl"
      role="dialog"
      aria-live="polite"
      aria-label={t("cookieBanner.title")}
    >
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[#00008B] text-center md:text-left flex-1">
          {t("cookieBanner.message")}{" "}
          <a
            href="#politica-cancelamento"
            className="underline hover:text-[#00ffff] transition"
          >
            {t("cookieBanner.linkText")}
          </a>
        </p>

        <div className="flex gap-3 shrink-0">
          <button
            type="button"
            onClick={reject}
            className="px-5 py-2 rounded-lg border-2 border-[#00008B] text-[#00008B] font-semibold text-sm hover:bg-gray-100 transition"
          >
            {t("cookieBanner.reject")}
          </button>
          <button
            type="button"
            onClick={accept}
            className="px-5 py-2 rounded-lg bg-[#00008B] text-white font-semibold text-sm hover:bg-[#000066] transition"
          >
            {t("cookieBanner.accept")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieBanner;