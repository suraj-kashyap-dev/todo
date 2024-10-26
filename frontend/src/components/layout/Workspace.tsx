import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/Dialog';
import { PlusCircle, Save, Camera, Edit, Trash } from 'lucide-react';
import { Input } from '../ui/form-controls/Input';
import { Label } from '../ui/form-controls/Label';
import { Button } from '../ui/form-controls/Button';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useWorkspaceApi } from '../../hooks/useWorkspaceApi';
import { showToast } from '../../utils/toast';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Workspace name is required')
    .min(2, 'Workspace name must be at least 2 characters'),
});

const Workspace: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { storeWorspace, loading, error } = useWorkspaceApi();

  const formik = useFormik({
    initialValues: {
      name: '',
      image: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      await storeWorspace({
        name: values.name,
        file: values.image,
      });

      showToast("Workspace created successfully");

      setIsOpen(false);
    },
  });

  useEffect(() => {
    if(error) {
      showToast(error, {
        type: 'error',
      });
    }
  }, [error]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      formik.setFieldValue('image', file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDeleteImage = () => {
    setImagePreview(null);
    formik.setFieldValue('image', null);
  };

  const handleEditImage = () => {
    const input = document.getElementById('image') as HTMLInputElement;
    input?.click();
  };

  return (
    <React.Fragment>
      <button
        onClick={() => setIsOpen(true)}
        className="ml-2 rounded-lg p-2 hover:bg-gray-100"
        title="Create Workspace"
      >
        <PlusCircle className="h-5 w-5" />
      </button>

      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent className="flex h-[600px] flex-col rounded-lg bg-white p-6 shadow-lg sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-800">
              Media Manager
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              Please fill in the details below to upload your media.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              {/* Permanent Media Uploader */}
              <Label
                htmlFor="image"
                className="!mb-0 grid h-[120px] w-[120px] cursor-pointer items-center justify-items-center rounded border border-dashed border-gray-300 transition-all hover:border-gray-400 dark:border-gray-800 dark:mix-blend-exclusion dark:invert"
              >
                <Input
                  type="file"
                  id="image"
                  name="image"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange} // Handle file change
                />
                <div className="flex flex-col items-center">
                  <Camera />
                  <p className="grid text-center text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Add Image
                    <span className="text-xs"> png, jpeg, jpg </span>
                  </p>
                </div>
              </Label>

              {/* Image Preview with edit and delete icons */}
              {imagePreview && (
                <div className="group relative h-[120px] w-[120px] cursor-pointer">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-full w-full rounded-md border border-gray-300 object-cover"
                  />
                  {/* Overlay for icons */}
                  <div className="absolute inset-0 flex items-center justify-center rounded bg-black bg-opacity-50 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={handleEditImage}
                      className="mx-2 text-white"
                    >
                      <Edit className="h-6 w-6" />
                    </button>
                    <button
                      type="button"
                      onClick={handleDeleteImage}
                      className="mx-2 text-white"
                    >
                      <Trash className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <Label htmlFor="name" className="required">
                Name
              </Label>
              <Input
                type="text"
                name="name"
                placeholder="Enter workspace name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  formik.errors.name && formik.touched.name
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                }`}
              />
              {formik.errors.name && formik.touched.name && (
                <p className="mt-1 text-sm text-red-500">{formik.errors.name}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              leftIcon={<Save />}
              size="sm"
              isLoading={loading}
              className="self-end bg-blue-600 text-white transition duration-200 hover:bg-blue-700"
            >
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default Workspace;
