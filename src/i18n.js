import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locals/en/translation';
import hiTranslations from './locals/hi/translation';
import taTranslations from './locals/ta/translation';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      hi: {
        translation: hiTranslations,
      },
      ta: {
        translation: taTranslations,
      },
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;