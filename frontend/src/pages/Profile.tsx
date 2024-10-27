import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Camera, Save } from 'lucide-react';
import { Input } from '../components/ui/form-controls/Input';
import { Button } from '../components/ui/form-controls/Button';
import { Textarea } from '../components/ui/form-controls/Textarea';
import { Label } from '../components/ui/form-controls/Label';
import { ErrorMessage } from '../components/ui/form-controls/ErrorMessage';
import { useProfileApi } from '../hooks/useProfileApi';
import { showToast } from '../utils/toast';

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
  phoneNumber: Yup.string().required('Phone number is required'),
  address: Yup.string().required('Address is required'),
  company: Yup.string().required('Company is required'),
  bio: Yup.string().max(500, 'Bio must be less than 500 characters'),
});

const Profile = () => {
  const { user, loading, error, getProfile, updateProfile } = useProfileApi();

  useEffect(() => {
    getProfile().catch(console.error);
  }, []);

  useEffect(() => {
    if (error) {
      showToast(error, { type: 'error' });
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
    onSubmit: async (values, { setSubmitting }) => {
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
    <React.Fragment>
      <form
        onSubmit={handleSubmit}
        className="w-full space-y-8 rounded-lg bg-white p-8 shadow-md"
      >
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Create Workspace
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Fill in the details below to create a new workspace.
          </p>
        </div>

        <div className="space-y-6">
          {/* Image Upload Section */}
          <div className="flex flex-col items-center">
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

          {/* Profile Details Section */}
          <div className="flex-1">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex flex-col">
                <Label htmlFor="firstName" className="required">
                  First Name
                </Label>
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

              <div className="flex flex-col">
                <Label htmlFor="lastName" className="required">
                  Last Name
                </Label>
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

              <div className="flex flex-col">
                <Label htmlFor="email" className="required">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className={`${touched.email && errors.email ? 'border-red-500' : ''}`}
                />
                {touched.email && errors.email && (
                  <ErrorMessage error={errors.email} />
                )}
              </div>

              <div className="flex flex-col">
                <Label htmlFor="phoneNumber" className="required">
                  Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phoneNumber}
                  className={`${touched.phoneNumber && errors.phoneNumber ? 'border-red-500' : ''}`}
                />
                {touched.phoneNumber && errors.phoneNumber && (
                  <ErrorMessage error={errors.phoneNumber} />
                )}
              </div>

              <div className="flex flex-col">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                  className={`${touched.address && errors.address ? 'border-red-500' : ''}`}
                />
                {touched.address && errors.address && (
                  <ErrorMessage error={errors.address} />
                )}
              </div>

              <div className="flex flex-col">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.company}
                  className={`${touched.company && errors.company ? 'border-red-500' : ''}`}
                />
                {touched.company && errors.company && (
                  <ErrorMessage error={errors.company} />
                )}
              </div>
            </div>

            <div className="mt-4 flex flex-col">
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
              {touched.bio && errors.bio && <ErrorMessage error={errors.bio} />}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            leftIcon={<Save className="h-5 w-5" />}
            isLoading={loading}
            disabled={loading}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white transition-colors hover:bg-blue-700"
          >
            Save
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Profile;
