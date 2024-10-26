import React, { useState } from 'react';
import MediaManager from '../components/MediaManager';

const Important: React.FC = () => {
  const [isMediaManagerOpen, setIsMediaManagerOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<MediaFile | null>(null);

  // Open and close handlers for MediaManager
  const openMediaManager = () => setIsMediaManagerOpen(true);
  const closeMediaManager = () => setIsMediaManagerOpen(false);

  // Handle file selection
  const handleFileSelect = (file: MediaFile) => {
    setSelectedFiles(file);
    closeMediaManager();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Important Tasks</h2>
      
      <button
        onClick={openMediaManager}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Open Media Manager
      </button>

      {selectedFiles && (
        <div className="mt-4">
          <h3 className="font-semibold">Selected File:</h3>
          <p>Filename: {selectedFiles.originalname}</p>
          <p>Path: {selectedFiles.path}</p>
        </div>
      )}

      <MediaManager
        isOpen={isMediaManagerOpen}
        onClose={closeMediaManager}
        onSelect={handleFileSelect}
        multiple={false}
      />
    </div>
  );
};

export default Important;
