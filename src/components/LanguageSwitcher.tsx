import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import Dropdown from './ui/Dropdown';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const languageOptions = [
    { value: 'en', label: 'English (EN)' },
    { value: 'es', label: 'Español (ES)' },
    { value: 'ar', label: 'العربية (AR)' },
    { value: 'hi', label: 'हिन्दी (HI)' },
  ];

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-5 w-5" />
      <Dropdown
        options={languageOptions}
        onSelect={changeLanguage}
        selectedValue={i18n.language}
      />
    </div>
  );
};
