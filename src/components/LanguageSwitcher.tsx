import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';

    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 hover:bg-gray-100 rounded-lg flex items-center gap-2"
      title={i18n.language === 'en' ? 'Switch to Spanish' : 'Cambiar a Inglés'}
    >
      <Globe className="h-5 w-5" />
      <span className="text-sm">{i18n.language.toUpperCase()}</span>
    </button>
  );
};
