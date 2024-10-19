import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './langs/en.json';
import hi from './langs/hi.json';
import es from './langs/es.json';
import ar from './langs/ar.json';

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  ar: { translation: ar },
  es: { translation: es },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
