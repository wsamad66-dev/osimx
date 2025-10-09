'use client';

import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  File, 
  X, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Image as ImageIcon,
  Loader2
} from 'lucide-react';

const BRAND_COLORS = {
  primary: '#26a5de',
  secondary: '#232d6e',
  accent: '#f29100',
  white: '#ffffff',
};

interface DocumentUploadProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  error?: string;
  maxFiles?: number;
  maxSizeMB?: number;
}

const ACCEPTED_FILE_TYPES = {
  'application/pdf': ['.pdf'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
};

const MAX_FILE_SIZE_MB = 10;

export default function DocumentUpload({
  files,
  onFilesChange,
  error,
  maxFiles = 5,
  maxSizeMB = MAX_FILE_SIZE_MB,
}: DocumentUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [fileErrors, setFileErrors] = useState<{ [key: string]: string }>({});

  const validateFile = (file: File): string | null => {
    // Check file size
    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > maxSizeMB) {
      return `File size must be less than ${maxSizeMB}MB`;
    }

    // Check file type
    const fileType = file.type;
    const isValidType = Object.keys(ACCEPTED_FILE_TYPES).includes(fileType);
    if (!isValidType) {
      return 'File type not supported. Please upload PDF, JPG, PNG, or DOC files.';
    }

    return null;
  };

  const handleFiles = useCallback(
    (newFiles: FileList | File[]) => {
      const fileArray = Array.from(newFiles);
      const validFiles: File[] = [];
      const errors: { [key: string]: string } = {};

      // Check total file count
      if (files.length + fileArray.length > maxFiles) {
        alert(`You can only upload up to ${maxFiles} files`);
        return;
      }

      fileArray.forEach((file) => {
        const error = validateFile(file);
        if (error) {
          errors[file.name] = error;
        } else {
          validFiles.push(file);
        }
      });

      setFileErrors(errors);

      if (validFiles.length > 0) {
        // Simulate upload progress
        validFiles.forEach((file) => {
          let progress = 0;
          const interval = setInterval(() => {
            progress += 10;
            setUploadProgress((prev) => ({
              ...prev,
              [file.name]: progress,
            }));

            if (progress >= 100) {
              clearInterval(interval);
              setTimeout(() => {
                setUploadProgress((prev) => {
                  const newProgress = { ...prev };
                  delete newProgress[file.name];
                  return newProgress;
                });
              }, 500);
            }
          }, 100);
        });

        onFilesChange([...files, ...validFiles]);
      }
    },
    [files, maxFiles, maxSizeMB, onFilesChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFiles(e.target.files);
      }
    },
    [handleFiles]
  );

  const removeFile = useCallback(
    (index: number) => {
      const newFiles = files.filter((_, i) => i !== index);
      onFilesChange(newFiles);
    },
    [files, onFilesChange]
  );

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension || '')) {
      return <ImageIcon className="w-6 h-6" />;
    }
    return <FileText className="w-6 h-6" />;
  };

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <motion.div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative border-2 border-dashed rounded-2xl p-8 transition-all ${
          isDragging
            ? 'border-blue-500 bg-blue-50 scale-105'
            : error
            ? 'border-red-300 bg-red-50'
            : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50/50'
        }`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          onChange={handleFileInput}
        />

        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="flex flex-col items-center text-center">
            <motion.div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: `${BRAND_COLORS.primary}20` }}
              animate={{
                scale: isDragging ? [1, 1.2, 1] : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <Upload
                className="w-8 h-8"
                style={{ color: BRAND_COLORS.primary }}
              />
            </motion.div>

            <h3 className="text-lg font-semibold mb-2" style={{ color: BRAND_COLORS.secondary }}>
              {isDragging ? 'Drop files here' : 'Upload Your Documents'}
            </h3>

            <p className="text-sm text-gray-600 mb-4">
              Drag and drop files here, or click to browse
            </p>

            <div className="flex flex-wrap gap-2 justify-center text-xs text-gray-500">
              <span className="px-2 py-1 bg-white rounded border border-gray-200">PDF</span>
              <span className="px-2 py-1 bg-white rounded border border-gray-200">JPG</span>
              <span className="px-2 py-1 bg-white rounded border border-gray-200">PNG</span>
              <span className="px-2 py-1 bg-white rounded border border-gray-200">DOC</span>
            </div>

            <p className="text-xs text-gray-500 mt-3">
              Max {maxFiles} files • Up to {maxSizeMB}MB each
            </p>
          </div>
        </label>
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.div
          className="flex items-start gap-2 p-4 bg-red-50 border border-red-200 rounded-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </motion.div>
      )}

      {/* File Errors */}
      {Object.keys(fileErrors).length > 0 && (
        <div className="space-y-2">
          {Object.entries(fileErrors).map(([fileName, errorMsg]) => (
            <motion.div
              key={fileName}
              className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-red-700 truncate">{fileName}</p>
                <p className="text-xs text-red-600">{errorMsg}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Uploaded Files List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              Uploaded Files ({files.length}/{maxFiles})
            </h4>

            {files.map((file, index) => {
              const isUploading = uploadProgress[file.name] !== undefined;
              const progress = uploadProgress[file.name] || 0;

              return (
                <motion.div
                  key={`${file.name}-${index}`}
                  className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* File Icon */}
                  <div
                    className="flex-shrink-0 p-2 rounded-lg"
                    style={{ backgroundColor: `${BRAND_COLORS.primary}20` }}
                  >
                    <div style={{ color: BRAND_COLORS.primary }}>
                      {getFileIcon(file.name)}
                    </div>
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {file.name}
                      </p>
                      {!isUploading && (
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>

                    {/* Upload Progress Bar */}
                    {isUploading && (
                      <div className="mt-2">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full"
                              style={{ backgroundColor: BRAND_COLORS.primary }}
                              initial={{ width: '0%' }}
                              animate={{ width: `${progress}%` }}
                              transition={{ duration: 0.1 }}
                            />
                          </div>
                          <span className="text-xs text-gray-600">{progress}%</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Remove Button */}
                  {!isUploading && (
                    <motion.button
                      onClick={() => removeFile(index)}
                      className="flex-shrink-0 p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Remove file"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  )}

                  {/* Loading Spinner */}
                  {isUploading && (
                    <Loader2 className="w-5 h-5 text-blue-500 animate-spin flex-shrink-0" />
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Helper Text */}
      {files.length === 0 && (
        <div className="text-center">
          <p className="text-sm text-gray-500">
            💡 Tip: Upload your passport, transcripts, and test scores for faster processing
          </p>
        </div>
      )}

      {files.length > 0 && files.length < maxFiles && (
        <div className="text-center">
          <button
            onClick={() => document.getElementById('file-upload')?.click()}
            className="text-sm font-medium hover:underline"
            style={{ color: BRAND_COLORS.primary }}
          >
            + Add more documents ({maxFiles - files.length} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
