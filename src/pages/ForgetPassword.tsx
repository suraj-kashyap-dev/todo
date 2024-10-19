import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/form-controls/Button';
import { Input } from '../components/ui/form-controls/Input';

const ForgetPassword: React.FC = () => {
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
        <h2 className="text-3xl font-bold">
          {t('login.forget-password.title')}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          id="email"
          label={t('login.email-address')}
          placeholder={t('login.email-address-placeholder')}
        />

        <Button type="submit" isLoading={loading} className="w-full">
          {t('login.forget-password.get-otp')}
        </Button>
      </form>

      <div className="flex flex-col text-center">
        <Link to="/login" className="text-sm text-red-600 hover:text-red-500">
          {t('login.forget-password.remembered')}
        </Link>
      </div>
    </div>
  );
};

export default ForgetPassword;
