import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Confirm from '../components/alert/Confirm';

const Workspaces: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [isConfirmOpen, setConfirmOpen] = useState(false);

  const handleConfirm = () => {};


  return (
    <div className="p-4">
        {id}
      <button
        onClick={() => setConfirmOpen(true)}
        className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Open Confirm Modal
      </button>

      <Confirm
        isOpen={isConfirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirm}
        title="Delete item?"
        description="This action is permanent and cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default Workspaces;
