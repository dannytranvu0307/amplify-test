import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


import translationEN from './Language/en/translation.json';
import translationJP from './Language/jp/translation.json';
const resources = {
  en: {
    translation: translationEN
  },
  jp: {
    translation: translationJP
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language')||'jp',
    fallbackLng: localStorage.getItem('language')||'jp',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });


export default i18n;