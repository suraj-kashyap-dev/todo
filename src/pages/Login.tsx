import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/form-controls/Button';
import { Input } from '../components/ui/form-controls/Input';

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error) {}
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold">{t('login.title')}</h2>

        <p className="mt-2 text-gray-600">{t('login.description')}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label={t('login.email-address')}
          placeholder={t('login.email-address-placeholder')}
        />

        <Input
          label={t('login.password')}
          placeholder={t('login.password-placeholder')}
        />

        <Button type="submit" isLoading={loading} className="w-full">
          {t('login.login-btn')}
        </Button>
      </form>

      <div className="text-center">
        <Link
          to="/register"
          className="text-sm text-indigo-600 hover:text-indigo-500"
        >
          {t('login.dont-have-account')}
        </Link>
      </div>
    </div>
  );
};

export default Login;
