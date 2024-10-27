import React, { useEffect, useState } from 'react';
import { Save, Camera, Edit, Trash, Share2, Copy, Check } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useWorkspaceApi } from '../../hooks/useWorkspaceApi';
import { showToast } from '../../utils/toast';
import { Input } from '../../components/ui/form-controls/Input';
import { Label } from '../../components/ui/form-controls/Label';
import { Button } from '../../components/ui/form-controls/Button';
import { useNavigate, useParams } from 'react-router-dom';
import Confirm from '../../components/alert/Confirm';
import { toast } from 'react-toastify';
import Divider from '../../components/Divider';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Workspace name is required')
    .min(2, 'Workspace name must be at least 2 characters'),
});

const EditWorkspace: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isConfirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [copy, setCopy] = useState<boolean>(false);
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const navigate = useNavigate();

  const {
    getWorkspaceById,
    updateWorkspace,
    loading,
    error,
    currentWorkspace,
    destroyWorkspace,
  } = useWorkspaceApi();

  const formik = useFormik({
    initialValues: {
      name: '',
      image: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      if (workspaceId) {
        await updateWorkspace(workspaceId, {
          name: values.name,
          file: values.image,
        });
        showToast('Workspace updated successfully');
      }
    },
  });

  useEffect(() => {
    if (workspaceId) {
      getWorkspaceById(workspaceId);
    }
  }, [workspaceId]);

  useEffect(() => {
    formik.setValues({
      name: currentWorkspace?.name ?? '',
      image: null,
    });

    if (currentWorkspace?.image) {
      setImagePreview(`http://localhost:5000/${currentWorkspace.image}`);
    }
  }, [currentWorkspace]);

  useEffect(() => {
    if (error) {
      showToast(error, { type: 'error' });
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

  const handleDelete = () => {
    if (workspaceId) {
      destroyWorkspace(workspaceId);

      toast("Workspace delete successgully", {
        type: "success",
      });

      navigate('/dashboard')
    }
  }

  const handleCopy = () => {
    setCopy(true);

    setTimeout(() => {
      setCopy(false);
    }, 1500);
  }

  return (
    <React.Fragment>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full space-y-8 rounded-lg bg-white p-8 shadow-md"
      >
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Edit Workspace
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Update the workspace details below.
          </p>
        </div>

        <div className="space-y-6">
          {/* Image Upload Section */}
          <div className="flex items-center gap-6">
            <Label
              htmlFor="image"
              className="block cursor-pointer text-sm font-medium text-gray-700"
            >
              {imagePreview ? 'Edit Image' : 'Add Image'}
            </Label>
            <div className="flex items-center">
              <Input
                type="file"
                id="image"
                name="image"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              {!imagePreview ? (
                <div
                  onClick={handleEditImage}
                  className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
                >
                  <Camera className="text-gray-400" />
                </div>
              ) : (
                <div className="relative h-24 w-24">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-full w-full rounded-lg object-cover"
                    crossOrigin="anonymous"
                  />
                  <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-50 opacity-0 transition-opacity hover:opacity-100">
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
          </div>

          {/* Name Input */}
          <div>
            <Label
              htmlFor="name"
              className="required block text-sm font-medium text-gray-700"
            >
              Workspace Name
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Enter workspace name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className={`mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${formik.errors.name ? 'border-red-500' : ''
                }`}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.name}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            leftIcon={<Save />}
            isLoading={loading}
            disabled={loading}
          >
            Update
          </Button>
        </div>
      </form>

      <div className="my-4 w-full space-y-8 rounded-lg bg-white p-8 shadow-md">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Invite Members
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Invite a member by sharing a link they can use to join this workspace.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Enter workspace name"
            className="mt-1 w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />

          <button
            type='button'
            className="rounded-lg bg-blue-500 p-2 text-white shadow transition hover:bg-blue-600"
            onClick={handleCopy}
            title="Create Workspace"
          >
            { ! copy ? <Copy className="h-5 w-5" /> : <Check className="h-5 w-5" />  }
            
          </button>
        </div>


        <Divider className="my-4 border-gray-300" />

        {/* Invite member */}
        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            leftIcon={<Share2 />}
            isLoading={loading}
            disabled={loading}
          >
            Invite Member
          </Button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="my-4 w-full space-y-8 rounded-lg bg-white p-8 shadow-md">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Danger Zone
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Deleting the workspace will permanently remove all related data from the database.
          </p>
        </div>

        <Divider className="my-4 border-gray-300" />

        <div className="flex justify-end">
          <Button
            type="button"
            variant="danger"
            leftIcon={<Trash />}
            isLoading={loading}
            disabled={loading}
            onClick={() => setConfirmOpen(true)}
          >
            Delete
          </Button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Confirm
        isOpen={isConfirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Confirm Deletion Workspace?"
        description="This action will permanently remove all related data from the database."
        confirmText="Confirm Deletion"
        cancelText="Cancel"
      />
    </React.Fragment>
  );
};

export default EditWorkspace;
