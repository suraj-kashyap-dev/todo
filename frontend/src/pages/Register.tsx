import { FormikHelpers, useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Input } from '../components/ui/form-controls/Input';
import { Button } from '../components/ui/form-controls/Button';
import { Label } from '../components/ui/form-controls/Label';
import { ErrorMessage } from '../components/ui/form-controls/ErrorMessage';
import GithubIcon from '../assets/github.svg';
import GoogleIcon from '../assets/google.svg';
import { RegisterData } from '../types/auth.types';
import { useAuthApi } from '../hooks/useAuthApi';
import { Bounce, toast } from 'react-toastify';

const initialValues = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    // .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Password is required'),
  firstName: Yup.string()
    .min(2, 'First name is too short')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Last name is too short')
    .required('Last name is required'),
});

const Register: React.FC = () => {
  const { t } = useTranslation();
  const { registerUser, loading, error } = useAuthApi();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
    }
  }, [error]);

  const { errors, handleSubmit, handleBlur, values, handleChange, touched } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (
        values: RegisterData,
        { setSubmitting, setErrors }: FormikHelpers<RegisterData>,
      ) => {
        try {
          await registerUser(values);
          navigate('/');
        } catch (error: any) {
          if (error.status == 422) {
            setErrors(error.response.data.errors);
          }

          setSubmitting(false);
        }
      },
    });

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold">{t('register.title')}</h2>
        <p className="mt-2 text-gray-600">{t('register.description')}</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name Field */}
        <div>
          <Label htmlFor="firstName">{t('First name')}</Label>
          <Input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Enter your first name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstName}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              errors.firstName && touched.firstName
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
            }`}
          />
          {errors.firstName && touched.firstName && (
            <ErrorMessage error={errors.firstName} />
          )}
        </div>

        {/* Last Name Field */}
        <div>
          <Label htmlFor="lastName">{t('Last Name')}</Label>
          <Input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Enter your last name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.lastName}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              errors.lastName && touched.lastName
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
            }`}
          />
          {errors.lastName && touched.lastName && (
            <ErrorMessage error={errors.lastName} />
          )}
        </div>

        {/* Email Field */}
        <div>
          <Label htmlFor="email">{t('register.email')}</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
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
          <Label htmlFor="password">{t('register.password')}</Label>
          <Input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            placeholder="Enter your password"
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

        {/* Submit Button */}
        <Button type="submit" isLoading={loading} className="w-full">
          {t('register.register-btn')}
        </Button>

        <div className="border border-dashed border-gray-200"></div>

        {/* Google Login Button */}
        <Button type="button" variant="secondary" className="w-full" size="sm">
          <div className="flex items-center gap-2">
            <img src={GoogleIcon} alt="Google" className="h-5 w-auto" />
            <p>{t('login.login-google-btn')}</p>
          </div>
        </Button>

        {/* GitHub Login Button */}
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
          {t('register.already-have-account')}
        </Link>
      </div>
    </div>
  );
};

export default Register;
