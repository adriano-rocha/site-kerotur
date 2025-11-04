import { useTranslation } from 'react-i18next'

function LanguageSelector() {
  const { i18n } = useTranslation()

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  const languages = [
    { code: 'pt-BR', flag: '/flags/br.png', label: 'Português' },
    { code: 'en', flag: '/flags/en.png', label: 'English' },
    { code: 'es', flag: '/flags/es.png', label: 'Español' },
  ]

  return (
    <div className="flex gap-2 md:gap-3 items-center">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`rounded-full overflow-hidden hover:scale-110 transition-all duration-200 w-7 h-7 md:w-9 md:h-9 ${
            i18n.language === lang.code 
              ? 'ring-2 md:ring-4 ring-white shadow-lg' 
              : 'ring-1 md:ring-2 ring-transparent hover:ring-blue-300'
          }`}
          title={lang.label}
          aria-label={`Mudar idioma para ${lang.label}`}
        >
          <img 
            src={lang.flag} 
            alt={`${lang.label} flag`}
            className="w-full h-full object-cover"
          />
        </button>
      ))}
    </div>
  )
}

export default LanguageSelector