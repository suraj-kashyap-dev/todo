import { useEffect } from 'react';
import { FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';
import { Camera, Save } from 'lucide-react';
import { Input } from '../components/ui/form-controls/Input';
import { Button } from '../components/ui/form-controls/Button';
import { Textarea } from '../components/ui/form-controls/Textarea';
import { Label } from '../components/ui/form-controls/Label';
import { ErrorMessage } from '../components/ui/form-controls/ErrorMessage';
import { useProfileApi } from '../hooks/useProfileApi';
import { showToast } from '../utils/toast';
import { User } from '../types/auth.types';
import { useTranslation } from 'react-i18next';
import Loading from '../components/Loading';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  address: '',
  company: '',
  bio: '',
};

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  phoneNumber: Yup.string().required('phoneNumber number is required'),
  address: Yup.string().required('Address is required'),
  company: Yup.string().required('Company is required'),
  bio: Yup.string().max(500, 'Bio must be less than 500 characters'),
});

const Profile = () => {
  const { user, loading, error, getProfile, updateProfile } = useProfileApi();
  const { t } = useTranslation();

  useEffect(() => {
    getProfile().catch(console.error);
  }, []);

  useEffect(() => {
    if (error) {
      showToast(error, {
        type: 'error',
      });
    }
  }, [error]);

  const {
    errors,
    handleSubmit,
    handleBlur,
    values,
    touched,
    handleChange,
    setValues,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (
      values: Partial<User>,
      { setSubmitting }: FormikHelpers<Partial<User>>,
    ) => {
      try {
        await updateProfile(values);

        showToast('Profile updated successfully', { type: 'success' });
      } catch (error: any) {
        if (error.status === 422) {
          console.log(error.response.data.errors);
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (user) {
      setValues({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        address: user.address || '',
        company: user.company || '',
        bio: user.bio || '',
      });
    }
  }, [user, setValues]);

  return (
    <form onSubmit={handleSubmit}>

    <div className="mx-auto bg-gray-100 px-6 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t('Profile')}</h2>
        <Button
          type="submit"
          variant="primary"
          leftIcon={<Save className="h-4 w-4" />}
          isLoading={loading}
          disabled={loading}
        >
          Save
        </Button>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <img
                  src={
                    'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                  }
                  alt="Profile"
                  className="h-32 w-32 rounded-full object-cover"
                />
                <button
                  type="button"
                  className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700"
                >
                  <Camera className="h-4 w-4" />
                </button>
              </div>
            </div>

           <div className="flex-1 space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                      className={`${touched.firstName && errors.firstName ? 'border-red-500' : ''}`}
                    />
                    {touched.firstName && errors.firstName && (
                      <ErrorMessage error={errors.firstName} />
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                      className={`${touched.lastName && errors.lastName ? 'border-red-500' : ''}`}
                    />
                    {touched.lastName && errors.lastName && (
                      <ErrorMessage error={errors.lastName} />
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      className={`${touched.email && errors.email ? 'border-red-500' : ''}`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    {touched.email && errors.email && (
                      <ErrorMessage error={errors.email} />
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      className={`${touched.phoneNumber && errors.phoneNumber ? 'border-red-500' : ''}`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.phoneNumber}
                    />
                    {touched.phoneNumber && errors.phoneNumber && (
                      <ErrorMessage error={errors.phoneNumber} />
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      type="text"
                      className={`${touched.company && errors.address ? 'border-red-500' : ''}`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address}
                    />
                    {touched.address && errors.address && (
                      <ErrorMessage error={errors.address} />
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      className={`${touched.company && errors.company ? 'border-red-500' : ''}`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.company}
                    />
                    {touched.company && errors.company && (
                      <ErrorMessage error={errors.company} />
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bio}
                    className={`${touched.bio && errors.bio ? 'border-red-500' : ''}`}
                  />
                  {touched.bio && errors.bio && (
                    <ErrorMessage error={errors.bio} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
      </form>
  );
};

export default Profile;
