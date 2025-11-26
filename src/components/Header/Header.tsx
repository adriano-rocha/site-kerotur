import { useTranslation } from "react-i18next";
import ToursDropdown from "../ToursDropdown/ToursDropdown";
import { useState, useRef, useEffect } from "react";
import toursData from "../../data/tours.json";

interface HeaderProps {
  onTourSelect?: (tourId: string) => void;
}

function Header({ onTourSelect }: HeaderProps) {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToursDropdownOpen, setIsToursDropdownOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const languageRefDesktop = useRef<HTMLLIElement | null>(null);
  const languageRefMobile = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const languages = [
    { code: "pt-BR", flag: "br.png", name: "Português" },
    { code: "en", flag: "en.png", name: "English" },
    { code: "es", flag: "es.png", name: "Español" },
    { code: "fr", flag: "fr.png", name: "Français" },
    { code: "al", flag: "al.png", name: "Deutsch" },
    { code: "it", flag: "it.png", name: "Italiano" },
    { code: "ru", flag: "ru.png", name: "Русский" },
    { code: "ch", flag: "ch.png", name: "中文" },
    { code: "jp", flag: "jp.png", name: "日本語" },
    { code: "ar", flag: "ar.png", name: "العربية" },
    { code: "he", flag: "isr.jpg", name: "עברית" },
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

  return (
    <header className="bg-white text-[#0008B] p-4 sticky top-0 z-50 shadow-lg">
      <nav className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/public/images/logo.jpg"
            alt="Kerotur Logo"
            className="h-12 md:h-16 w-auto"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.parentElement!.innerHTML =
                '<h1 class="text-xl md:text-2xl font-bold text-[#0008B]">Kerotur</h1>';
            }}
          />
        </div>

        {/* MENU DESKTOP */}
        <ul className="hidden lg:flex gap-6 items-center font-semibold">
          <li>
            <a href="#sobre" className="hover:text-[#00ffff] transition">
              {t("header.aboutUs")}
            </a>
          </li>

          {/* Dropdown Passeios */}
          <li
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button className="hover:text-[#00ffff] transition flex items-center gap-1 py-2">
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
                onClose={() => setIsToursDropdownOpen(false)}
              />
            )}
          </li>

          <li>
            <a href="#parceiros" className="hover:text-[#00ffff] transition">
              {t("header.partners")}
            </a>
          </li>

          <li>
            <a href="#contato" className="hover:text-[#00ffff] transition">
              {t("header.contact")}
            </a>
          </li>

          <li className="border-l border-[#0008B] h-6 mx-2"></li>

          {/* Idiomas Desktop - BANDEIRAS REDONDAS */}
          <li className="relative" ref={languageRefDesktop}>
            <button
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              className="flex items-center gap-2 hover:opacity-80 transition px-2 py-2"
            >
              <img
                src={`/public/flags/${currentLanguage.flag}`}
                alt={currentLanguage.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 shadow-md"
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
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 max-h-96 overflow-y-auto">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition ${
                      i18n.language === lang.code
                        ? "bg-blue-50 text-[#00ffff]"
                        : "text-[#0008B]"
                    }`}
                  >
                    <img
                      src={`/public/flags/${lang.flag}`}
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
                src={`/public/flags/${currentLanguage.flag}`}
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
                      i18n.language === lang.code
                        ? "bg-blue-50 text-[#00ffff]"
                        : "text-[#0008B]"
                    }`}
                  >
                    <img
                      src={`/public/flags/${lang.flag}`}
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
        <ul className="lg:hidden mt-4 space-y-3 pb-4 border-t border-gray-200 pt-4 font-semibold">
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
              <ul className="mt-2 ml-4 space-y-2">
                {toursData.map(
                  (tour: { id: string; name: { [key: string]: string } }) => (
                    <li key={tour.id}>
                      <button
                        onClick={() => handleTourSelect(tour.id)}
                        className="text-sm hover:text-[#00ffff] transition"
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
  );
}

export default Header;