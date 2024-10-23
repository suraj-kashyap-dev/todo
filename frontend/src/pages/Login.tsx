import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/form-controls/Button';
import GithubIcon from '../assets/github.svg';
import GoogleIcon from '../assets/google.svg';
import { FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuthApi } from '../hooks/useAuthApi';
import { Input } from '../components/ui/form-controls/Input';
import { Label } from '../components/ui/form-controls/Label';
import { ErrorMessage } from '../components/ui/form-controls/ErrorMessage';
import { LoginCredentials } from '../types/auth.types';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const initialValues = {
  email: '',
  password: '',
};

const Login: React.FC = () => {
  const { loginUser, loading, error } = useAuthApi();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { errors, handleSubmit, handleBlur, values, touched, handleChange } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (
        values: LoginCredentials,
        { setSubmitting }: FormikHelpers<LoginCredentials>,
      ) => {
        try {
          await loginUser(values);
          navigate('/');
        } catch (err) {
          setSubmitting(false);
        }
      },
    });

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold">{t('login.title')}</h2>
        <p className="mt-2 text-gray-600">{t('login.description')}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              errors.email && touched.email
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
            }`}
          />
          {errors.email && touched.email && (
            <ErrorMessage error={errors.email} />
          )}
        </div>

        {/* Password Field */}
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              errors.password && touched.password
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
            }`}
          />
          {errors.password && touched.password && (
            <ErrorMessage error={errors.password} />
          )}
        </div>

        {error && (
          <div className="text-center text-sm text-red-500">{error}</div>
        )}

        <Button type="submit" isLoading={loading} className="w-full">
          {t('login.login-btn')}
        </Button>

        <div className="border border-dashed border-gray-200"></div>

        <Button type="button" variant="secondary" className="w-full" size="sm">
          <div className="flex items-center gap-2">
            <img src={GoogleIcon} alt="Google" className="h-5 w-auto" />
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

      <div className="border border-dashed border-gray-200"></div>

      <div className="flex flex-col text-center">
        <Link
          to="/register"
          className="text-sm text-indigo-600 hover:text-indigo-500"
        >
          {t('login.dont-have-account')}
        </Link>

        <Link
          to="/forget-password"
          className="text-sm text-red-600 hover:text-red-500"
        >
          {t('login.forget-password.title')}
        </Link>
      </div>
    </div>
  );
};

export default Login;
