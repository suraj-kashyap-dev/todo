import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Input } from '../components/ui/form-controls/Input';
import { Button } from '../components/ui/form-controls/Button';
import GithubIcon from '../assets/github.svg';
import GoogleIcon from '../assets/google.svg';

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirm_password: ""
}

const validationSchema = Yup.object({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  const {
    errors,
    handleSubmit,
    handleBlur,
    values,
    handleChange,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        console.log(values);
      } catch (error) {
        setLoading(false);
      }
    },
  });

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Create an account</h2>
        <p className="mt-2 text-gray-600">Get started with your new account</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="name"
          id="name"
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
          error={errors.name}
          label={t('register.name')}
          placeholder={t('register.name-placeholder')}
          helperText={errors.name}
        />

        <Input
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          error={errors.email}
          label={t('register.email')}
          placeholder={t('register.email-placeholder')}
          helperText={errors.email}
        />

        <Input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          error={errors.password}
          label={t('register.password')}
          placeholder={t('register.password-placeholder')}
          helperText={errors.password}
        />

        <Input
          type="password"
          id="confirm_password"
          name="confirm_password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.confirm_password}
          error={errors.confirm_password}
          label={t('register.confirm_password')}
          placeholder={t('register.confirm-password-placeholder')}
          helperText={errors.confirm_password}
        />

        <Button type="submit" isLoading={loading} className="w-full">
          {t('register.register-btn')}
        </Button>

        <div className="border border-dashed border-gray-200"></div>

        <Button type="button" variant="secondary" className="w-full" size="sm">
          <div className="flex items-center gap-2">
            <img src={GoogleIcon} alt="GitHub" className="h-5 w-auto" />

            <p>{t('login.login-google-btn')}</p>
          </div>
        </Button>

        <Button type="button" variant="secondary" className="w-full" size="sm">
          <div className="flex items-center gap-2">
            <img src={GithubIcon} alt="GitHub" className="h-5 w-auto" />

            <p>{t('login.login-github-btn')}</p>
          </div>
        </Button>
      </form>
      <div className="text-center">
        <Link
          to="/login"
          className="text-sm text-indigo-600 hover:text-indigo-500"
        >
          Already have an account? Sign in
        </Link>
      </div>
    </div>
  );
};

export default Register;