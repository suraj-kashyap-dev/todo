import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import Dropdown from '../ui/Dropdown';

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
    <Dropdown position="bottom-right">
      <Dropdown.Toggle>
        <div className="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-100">
          <Globe className="h-5 w-5" /> <span>{i18n.language}</span>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Content>
        {languageOptions.map((lang) => (
          <div key={lang.value} className="min-w-[150px] max-w-[150px]">
            <div className="grid">
              <button
                onClick={() => changeLanguage(lang.value)}
                className="flex items-start gap-1.5 border-b p-3 last:border-b-0 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-950"
              >
                <span className="icon-information h-fit rounded-full bg-amber-100 text-2xl text-amber-600" />
                <div className="grid">
                  <p className="text-gray-800 dark:text-white">{lang.label}</p>
                </div>
              </button>
            </div>
          </div>
        ))}
      </Dropdown.Content>
    </Dropdown>
  );
};
