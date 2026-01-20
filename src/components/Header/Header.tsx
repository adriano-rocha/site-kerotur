import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ToursDropdown from "../ToursDropdown/ToursDropdown";
import { useState, useRef, useEffect } from "react";
import toursData from "../../data/tours.json";

interface HeaderProps {
  onTourSelect?: (tourId: string) => void;
}

function Header({ onTourSelect }: HeaderProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToursDropdownOpen, setIsToursDropdownOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const languageRefDesktop = useRef<HTMLLIElement | null>(null);
  const languageRefMobile = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const WHATSAPP_LINK = "https://wa.me/5521982251450";
  const INSTAGRAM_LINK = "https://www.instagram.com/kerotur_/";
  const FACEBOOK_LINK = "https://www.facebook.com/share/1G1BD6rCFg/";
  const LINKTREE_LINK = "https://linktr.ee/kerotur_";
  const TRIPADVISOR_LINK =
    "https://www.tripadvisor.com.br/Attraction_Review-g303506-d32984640-Reviews-Kerotur_Turismo_e_Eventos-Rio_de_Janeiro_State_of_Rio_de_Janeiro.html";

  const languages = [
    { code: "pt-BR", flag: "br.png", name: "Português" },
    { code: "en", flag: "eua.png", name: "English" },
    { code: "es", flag: "es.png", name: "Español" },
    { code: "fr", flag: "fr.png", name: "Français" },
    { code: "it", flag: "it.png", name: "Italiano" },
    { code: "al", flag: "al.png", name: "Deutsch" },
    { code: "he", flag: "isr.jpg", name: "עברית" },
    { code: "ch", flag: "ch.png", name: "中文" },
    { code: "jp", flag: "jp.png", name: "日本語" },
    { code: "ar", flag: "ar.png", name: "العربية" },
    { code: "ru", flag: "ru.png", name: "Русский" },
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const handleTourSelect = (tourId: string) => {
    if (onTourSelect) onTourSelect(tourId);
    setIsToursDropdownOpen(false);
    setIsMenuOpen(false);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    setIsToursDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setIsToursDropdownOpen(false);
    }, 200);
  };

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsLanguageMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const clickedOutsideDesktop =
        languageRefDesktop.current &&
        !languageRefDesktop.current.contains(target);

      const clickedOutsideMobile =
        languageRefMobile.current &&
        !languageRefMobile.current.contains(target);

      if (
        (languageRefDesktop.current || languageRefMobile.current) &&
        clickedOutsideDesktop &&
        clickedOutsideMobile
      ) {
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, []);

  // ADICIONE completo antes do return (linha ~170)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="bg-white text-[#0008B] sticky top-0 z-50 shadow-lg">
        {/* Barra Superior - Contatos e Redes Sociais */}
        <div
          className={`bg-[#FF8C00] border-b border-orange-400 transition-all duration-300 ${
            isScrolled ? "h-0 opacity-0" : "h-20 sm:h-16"
          }`}
        >
          <div className="container mx-auto px-4 py-3 sm:py-2 flex items-center h-full">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 w-full text-sm md:text-base">
              {/* Contatos - AZUL ULTRAMAR */}
              <div className="flex flex-wrap items-center gap-4 md:ml-auto text-[#00008B] font-semibold">
                <a
                  href="mailto:kerotur@kerotur.com"
                  className="flex items-center gap-2 hover:text-[#00ffff] transition text-[#00008B] font-semibold"
                >
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>kerotur@kerotur.com</span>
                </a>
                <a
                  href="tel:+5521982251450"
                  className="flex items-center gap-2 hover:text-[#00ffff] transition text-[#00008B] font-semibold"
                >
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
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>+55 (21) 98225-1450</span>
                </a>
              </div>

              {/* Redes Sociais - TODOS CORRIGIDOS */}
              <div className="flex gap-2 items-center">
                {/* Site */}

                {/* TripAdvisor */}
                <a
                  href={TRIPADVISOR_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-[#0008B] hover:bg-green-700 text-[#0008B] hover:text-white rounded-full flex items-center justify-center transition duration-300"
                  aria-label="TripAdvisor"
                >
                  <svg
                    className="w-4 h-4 fill-current stroke-current"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H1.058l1.506 1.506A8.367 8.367 0 0 0 .751 12c0 4.625 3.749 8.373 8.373 8.373 2.36 0 4.494-.976 6.012-2.547l1.499 1.499 1.499-1.499c1.518 1.571 3.652 2.547 6.012 2.547 4.625 0 8.373-3.748 8.373-8.373 0-1.566-.437-3.03-1.187-4.287l1.506-1.506h-3.304c-2.307-1.569-4.975-2.353-7.645-2.353-2.304 0-4.572.636-6.564 1.835-1.992-1.199-4.26-1.835-6.564-1.835zm-2.883 4.706c2.393 0 4.332 1.94 4.332 4.332s-1.94 4.332-4.332 4.332-4.332-1.94-4.332-4.332 1.94-4.332 4.332-4.332zm11.754 0c2.393 0 4.332 1.94 4.332 4.332s-1.94 4.332-4.332 4.332-4.332-1.94-4.332-4.332 1.94-4.332 4.332-4.332zM9.123 11.5c-.913 0-1.653.74-1.653 1.653s.74 1.653 1.653 1.653 1.653-.74 1.653-1.653-.74-1.653-1.653-1.653zm11.754 0c-.913 0-1.653.74-1.653 1.653s.74 1.653 1.653 1.653 1.653-.74 1.653-1.653-.74-1.653-1.653-1.653z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href={INSTAGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-[#0008B] hover:bg-pink-600 text-[#0008B] hover:text-white rounded-full flex items-center justify-center transition duration-300"
                  aria-label="Instagram"
                >
                  <svg
                    className="w-4 h-4 fill-current stroke-current"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href={FACEBOOK_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-[#0008B] hover:bg-blue-600 text-[#0008B] hover:text-white rounded-full flex items-center justify-center transition duration-300"
                  aria-label="Facebook"
                >
                  <svg
                    className="w-4 h-4 fill-current stroke-current"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22.154 12.137c0-6.425-5.225-11.65-11.65-11.65 0 0-11.65 0-11.65 11.65 0 5.958 4.363 10.936 10.064 11.845V15.37h-3.037v-3.425h3.037v-2.587c0-3.01 1.79-4.656 4.529-4.656 1.311 0 2.687.234 2.687.234v2.953h-1.511c-1.491 0-1.956.924-1.956 1.87v2.25h3.328l-.532 3.425h-2.796v8.612c1.452-.26 2.847-1.084 4.128-2.187z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>

                {/* Linktree */}
                <a
                  href={LINKTREE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-[#0008B] hover:bg-green-500 text-[#0008B] hover:text-white rounded-full flex items-center justify-center transition duration-300"
                  aria-label="Linktree"
                >
                  <svg
                    className="w-4 h-4 fill-current stroke-current"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M13.73 4.82l1.55-1.55 4.35 4.35-1.55 1.55-2.8-2.8-2.8 2.8-1.55-1.55 2.8-2.8zm-.93 9.8l1.55 1.55-4.35 4.35-1.55-1.55 2.8-2.8-2.8-2.8 1.55-1.55 2.8 2.8zm-5.6-5.6l1.55-1.55 4.35 4.35-1.55 1.55-2.8-2.8-2.8 2.8-1.55-1.55 2.8-2.8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-[#0008B] hover:bg-green-600 text-[#0008B] hover:text-white rounded-full flex items-center justify-center transition duration-300"
                  aria-label="WhatsApp"
                >
                  <svg
                    className="w-4 h-4 fill-current stroke-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/images/logo.jpg"
              alt="Kerotur Logo"
              className="h-16 md:h-20 w-auto"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.parentElement!.innerHTML =
                  '<h1 class="text-xl md:text-2xl font-bold text-[#0008B]">Kerotur</h1>';
              }}
            />
          </div>

          {/* MENU DESKTOP */}
          <ul className="hidden lg:flex gap-6 items-center font-semibold text-lg text-[#00008B]">
            {/* Home - Scroll to Top */}
            <li>
              <button
                onClick={scrollToTop}
                className="hover:text-[#000080] hover:underline underline-offset-4 transition-all duration-200 ease-in-out cursor-pointer"
              >
                {t("header.home")}
              </button>
            </li>

            <li>
              <a
                href="#sobre"
                className="hover:text-[#000080] hover:underline underline-offset-4 transition-all duration-200 ease-in-out cursor-pointer"
              >
                {t("header.aboutUs")}
              </a>
            </li>
            {/* Missão */}
            <li>
              <button
                type="button"
                onClick={() => navigate("/mvv?type=mission")}
                className="hover:text-[#000080] hover:underline underline-offset-4 transition-all duration-200 ease-in-out cursor-pointer"
              >
                {t("header.mission")}
              </button>
            </li>

            {/* Visão */}
            <li>
              <button
                type="button"
                onClick={() => navigate("/mvv?type=vision")}
                className="hover:text-[#000080] hover:underline underline-offset-4 transition-all duration-200 ease-in-out cursor-pointer"
              >
                {t("header.vision")}
              </button>
            </li>

            {/* Valores */}
            <li>
              <button
                type="button"
                onClick={() => navigate("/mvv?type=values")}
                className="hover:text-[#000080] hover:underline underline-offset-4 transition-all duration-200 ease-in-out cursor-pointer"
              >
                {t("header.values")}
              </button>
            </li>
            {/* Dropdown Passeios */}
            <li
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="hover:text-[#00008B] transition flex items-center gap-1 py-2 cursor-pointer">
                {t("header.tours")}
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isToursDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isToursDropdownOpen && (
                <ToursDropdown
                  onSelectTour={handleTourSelect}
                  className="tours-dropdown"
                  onClose={() => setIsToursDropdownOpen(false)}
                />
              )}
            </li>

            <li>
              <a
                href="#parceiros"
                className="hover:text-[#000080] hover:underline underline-offset-4 transition-all duration-200 ease-in-out cursor-pointer"
              >
                {t("header.partners")}
              </a>
            </li>

            <li>
              <a
                href="#contato"
                className="hover:text-[#000080] hover:underline underline-offset-4 transition-all duration-200 ease-in-out cursor-pointer"
              >
                {t("header.contact")}
              </a>
            </li>

            <li className="border-l border-[#0008B] h-6 mx-2"></li>

            {/* Idiomas Desktop - BANDEIRAS REDONDAS */}
            <li className="relative" ref={languageRefDesktop}>
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center gap-2 hover:opacity-80 transition px-2 py-2 hover:text-[#00008B] "
              >
                <img
                  src={`/flags/${currentLanguage.flag}`}
                  alt={currentLanguage.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 shadow-md "
                />
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isLanguageMenuOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 max-h-96 overflow-y-auto hover:text-[#00008B] ">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition ${
                        i18n.language === lang.code ? "bg-[#00ffff]" : ""
                      }`}
                    >
                      <img
                        src={`/flags/${lang.flag}`}
                        alt={lang.name}
                        className="w-8 h-8 rounded-full object-cover border-2 border-gray-300 shadow-sm"
                      />
                      <span className="text-sm font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </li>
          </ul>

          {/* MENU MOBILE */}
          <div className="flex lg:hidden items-center gap-3">
            <div className="relative" ref={languageRefMobile}>
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="w-10 h-10 flex items-center justify-center"
              >
                <img
                  src={`/flags/${currentLanguage.flag}`}
                  alt={currentLanguage.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 shadow-md"
                />
              </button>

              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 max-h-96 overflow-y-auto">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition ${
                        i18n.language === lang.code ? "bg-[#00ffff]" : ""
                      }`}
                    >
                      <img
                        src={`/flags/${lang.flag}`}
                        alt={lang.name}
                        className="w-8 h-8 rounded-full object-cover border-2 border-gray-300 shadow-sm"
                      />
                      <span className="text-sm font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#0008B] focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Dropdown mobile */}
        {isMenuOpen && (
          <ul className="lg:hidden mt-4 space-y-3 pb-4 border-t border-gray-200 pt-4 font-semibold px-4">
            {/* Home - Mobile */}
            <li>
              <button
                onClick={scrollToTop}
                className="block hover:text-[#00ffff] transition w-full text-left"
              >
                {t("header.home")}
              </button>
            </li>

            <li>
              <a
                href="#sobre"
                className="block hover:text-[#00ffff] transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("header.aboutUs")}
              </a>
            </li>

            <li>
              <button
                onClick={() => setIsToursDropdownOpen(!isToursDropdownOpen)}
                className="w-full text-left hover:text-[#00ffff] transition flex items-center justify-between"
              >
                {t("header.tours")}
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isToursDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isToursDropdownOpen && (
                <ul className="mt-2 ml-4 space-y-2 max-h-48 overflow-y-auto tours-dropdown">
                  {toursData.map(
                    (tour: { id: string; name: { [key: string]: string } }) => (
                      <li key={tour.id}>
                        <button
                          onClick={() => handleTourSelect(tour.id)}
                          className="text-sm hover:text-[#00ffff] transition block w-full text-left py-2"
                        >
                          {tour.name[i18n.language] || tour.name["pt-BR"]}
                        </button>
                      </li>
                    )
                  )}
                </ul>
              )}
            </li>

            <li>
              <a
                href="#parceiros"
                className="block hover:text-[#00ffff] transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("header.partners")}
              </a>
            </li>

            {/* Missão */}
            <li>
              <button
                onClick={() => {
                  navigate("/mvv?type=mission");
                  setIsMenuOpen(false);
                }}
                className="hover:text-[#00ffff] transition"
              >
                {t("mission.title")}
              </button>
            </li>

            {/* Visão */}
            <li>
              <button
                onClick={() => {
                  navigate("/mvv?type=vision");
                  setIsMenuOpen(false);
                }}
                className="hover:text-[#00ffff] transition"
              >
                {t("vision.title")}
              </button>
            </li>

            {/* Valores */}
            <li>
              <button
                onClick={() => {
                  navigate("/mvv?type=values");
                  setIsMenuOpen(false);
                }}
                className="hover:text-[#00ffff] transition"
              >
                {t("values.title")}
              </button>
            </li>

            <li>
              <a
                href="#contato"
                className="block hover:text-[#00ffff] transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("header.contact")}
              </a>
            </li>
          </ul>
        )}
      </header>
    </>
  );
}

export default Header;
