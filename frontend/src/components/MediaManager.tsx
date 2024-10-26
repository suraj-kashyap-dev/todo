import React, { useEffect } from 'react';
import { Upload, Trash, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/Dialog';
import { MediaFile } from '../types/media.types';
import { useMediaApi } from '../hooks/useMediaApi';
import { showToast } from '../utils/toast';

interface MediaManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (file: MediaFile) => void;
  multiple?: boolean;
}

const MediaManager = ({ isOpen, onClose, onSelect, multiple = false }: MediaManagerProps) => {
  const { 
    getMedia,
    loading,
    media,
    storeMedia,
    destroyMedia,
  } = useMediaApi();

  useEffect(() => {
    if (isOpen) getMedia();
  }, [isOpen]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files) {
      return;
    }

    await storeMedia(files);
    showToast('File uploaded successfully', { type: 'success' });
  };

  const handleFileSelect = (file: MediaFile) => {
    onSelect?.(file);

    onClose();
  };


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex h-[600px] flex-col sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Media Manager</DialogTitle>
        </DialogHeader>

        <div className="border-b p-4">
          <label className="flex h-32 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed transition-colors hover:border-blue-500">
            <div className="flex flex-col items-center">
              <Upload className="mb-2 h-8 w-8 text-gray-500" />
              <span className="text-sm text-gray-500">Drop files here or click to upload</span>
            </div>
            <input
              type="file"
              className="hidden"
              multiple={multiple}
              onChange={handleFileUpload}
              accept="image/*,application/pdf"
            />
          </label>
        </div>

        {loading && !media ? (
          <div className="grid flex-1 grid-cols-2 gap-4 overflow-auto p-4 md:grid-cols-3 lg:grid-cols-4">
            {Array(8).fill(0).map((_, index) => (
              <div
                key={index}
                className="group relative animate-pulse cursor-pointer rounded-lg border p-2 transition-all"
              >
                <div className="relative w-full animate-pulse rounded bg-gray-200 pt-[100%]">
                  <div className="absolute inset-0 h-full w-full animate-[shimmer_1.5s_infinite] rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
                </div>
                <div className="mt-2 h-4 animate-pulse rounded bg-gray-200"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid flex-1 grid-cols-2 gap-4 overflow-auto p-4 md:grid-cols-3 lg:grid-cols-4">
            {media?.map(file => (
              <div
                key={file.id}
                className={`relative group border rounded-lg p-2 cursor-pointer transition-all'
                  }`}
                onClick={() => handleFileSelect(file)}
              >
                {file.mimetype.startsWith('image/') ? (
                  <div className="relative w-full pt-[100%]">
                    <img
                      src={`http://localhost:5000/${file.path}`}
                      crossOrigin='anonymous'
                      alt={file.originalname}
                      className="absolute inset-0 h-full w-full rounded object-cover"
                    />
                  </div>
                ) : (
                  <div className="relative w-full pt-[100%]">
                    <div className="absolute inset-0 flex items-center justify-center rounded bg-gray-100">
                      <FileText className="h-8 w-8 text-gray-400" />
                    </div>
                  </div>
                )}

                <div className="mt-2 truncate text-sm">{file.originalname}</div>

                <button
                  className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    destroyMedia(file.id);
                  }}
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MediaManager;
