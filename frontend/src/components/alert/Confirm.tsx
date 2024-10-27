import React, { useState, useEffect } from 'react';
import { Button } from '../ui/form-controls/Button';

interface ConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}

const Confirm: React.FC<ConfirmProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  description = 'This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}) => {
  const [show, setShow] = useState(isOpen);

  useEffect(() => {
    if (isOpen) setShow(true);
  }, [isOpen]);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 300); // Wait for animation to complete
  };

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
    >
      <div
        className={`relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg transition-transform duration-300 ${isOpen ? 'scale-100' : 'scale-95'}`}
      >
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="mt-2 text-sm text-gray-600">{description}</p>

        <div className="mt-6 flex justify-end gap-4">
          <Button onClick={handleClose} variant="outline">
            {cancelText}
          </Button>

          <Button
            onClick={() => {
              onConfirm();
              handleClose();
            }}
            variant="danger"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
import { FC } from 'react';
