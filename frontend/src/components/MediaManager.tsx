import React, { useState, useEffect, useCallback } from 'react';
import { Upload, Trash, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/Dialog';

interface MediaFile {
  id: string;
  filename: string;
  originalname: string;
  path: string;
  size: number;
  mimetype: string;
  createdAt: Date;
}

interface MediaManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (file: MediaFile) => void;
  multiple?: boolean;
}

const MediaManager = ({ isOpen, onClose, onSelect, multiple = false }: MediaManagerProps) => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Fetch existing files
  const fetchFiles = useCallback(async () => {
    try {
      const response = await fetch('/api/media');
      const data = await response.json();
      setFiles(data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchFiles();
    }
  }, [isOpen, fetchFiles]);

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (!uploadedFiles) return;

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    Array.from(uploadedFiles).forEach(file => {
      formData.append('files', file);
    });

    try {
      const response = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const newFiles = await response.json();
      setFiles(prev => [...newFiles, ...prev]);
      setUploadProgress(100);
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Handle file selection
  const handleFileSelect = (file: MediaFile) => {
    if (multiple) {
      setSelectedFiles(prev => {
        const newSet = new Set(prev);
        if (newSet.has(file.id)) {
          newSet.delete(file.id);
        } else {
          newSet.add(file.id);
        }
        return newSet;
      });
    } else {
      onSelect?.(file);
      onClose();
    }
  };

  const handleFileDelete = async (fileId: string) => {
    try {
      await fetch(`/api/media/${fileId}`, {
        method: 'DELETE',
      });
      setFiles(prev => prev.filter(f => f.id !== fileId));
      setSelectedFiles(prev => {
        const newSet = new Set(prev);
        newSet.delete(fileId);
        return newSet;
      });
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex h-[600px] flex-col sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Media Manager</DialogTitle>
        </DialogHeader>
        
        {/* Upload Section */}
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
          
          {isUploading && (
            <div className="mt-2">
              <div className="h-2 rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Files Grid */}
        <div className="grid flex-1 grid-cols-2 gap-4 overflow-auto p-4 md:grid-cols-3 lg:grid-cols-4">
          {files.map(file => (
            <div
              key={file.id}
              className={`relative group border rounded-lg p-2 cursor-pointer transition-all ${
                selectedFiles.has(file.id) ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'
              }`}
              onClick={() => handleFileSelect(file)}
            >
              {file.mimetype.startsWith('image/') ? (
                <div className="relative w-full pt-[100%]">
                  <img
                    src={file.path}
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
              
              {/* Delete button */}
              <button
                className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFileDelete(file.id);
                }}
              >
                <Trash className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        {multiple && (
          <div className="flex items-center justify-between border-t p-4">
            <div>{selectedFiles.size} files selected</div>
            <button
              className="rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
              onClick={() => {
                const selectedMediaFiles = files.filter(f => selectedFiles.has(f.id));
                onSelect?.(selectedMediaFiles[0]);
                onClose();
              }}
            >
              Select Files
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MediaManager;
