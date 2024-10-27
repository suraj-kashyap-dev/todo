import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold">{t('errors.404.title')}</h1>
      <p className="mt-4 text-lg">{t('errors.404.message')}</p>
      <Link
        to="/dashboard"
        className="mt-6 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        {t('Go Back To Dashboard')}
      </Link>
    </div>
  );
};

export default NotFound;
