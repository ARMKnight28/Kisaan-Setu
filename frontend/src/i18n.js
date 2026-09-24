import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import hi from './locales/hi.json';
import mr from './locales/mr.json';

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  mr: { translation: mr }
};

// Check stored language preference or default to English
const savedLanguage = localStorage.getItem('user_language') || localStorage.getItem('i18nextLng') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: ['en', 'hi', 'mr'].includes(savedLanguage) ? savedLanguage : 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

/**
 * Universal language switcher helper that updates both i18n and localStorage
 * @param {string} lng - 'en' | 'hi' | 'mr'
 */
export const changeAppLanguage = (lng) => {
  if (['en', 'hi', 'mr'].includes(lng)) {
    i18n.changeLanguage(lng);
    localStorage.setItem('user_language', lng);
    localStorage.setItem('i18nextLng', lng);
  }
};

export default i18n;