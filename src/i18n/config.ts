import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import ptBR from '../locales/pt-BR/translation.json'
import en from '../locales/en/translation.json'
import es from '../locales/es/translation.json'
import fr from '../locales/fr/translation.json'
import al from '../locales/al/translation.json'
import it from '../locales/it/translation.json'
import ru from '../locales/ru/translation.json'
import ch from '../locales/ch/translation.json'
import jp from '../locales/jp/translation.json'
import ar from '../locales/ar/translation.json'
import he from '../locales/he/translation.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      'pt-BR': { translation: ptBR },
      en: { translation: en },
      es: { translation: es },
      fr: { translation: fr },
      al: { translation: al },
      it: { translation: it },
      ru: { translation: ru },
      ch: { translation: ch },
      jp: { translation: jp },
      ar: { translation: ar },
      he: { translation: he },
    },
    fallbackLng: 'pt-BR',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n