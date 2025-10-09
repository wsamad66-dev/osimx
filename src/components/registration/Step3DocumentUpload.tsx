'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { Upload, File, X, FileText, Image as ImageIcon, AlertCircle, Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSanityUpload } from '@/hooks/useSanityUpload'
import type { DocumentUpload } from '@/lib/registration-schemas'

interface UploadedFile {
  name: string
  size: number
  type: string
  file?: File // Optional now, as we'll have assetId after upload
  assetId?: string
  url?: string
  uploading?: boolean
  uploadProgress?: number
  uploadError?: string
}

interface Step3DocumentUploadProps {
  defaultValues?: Partial<DocumentUpload>
  onNext: (data: DocumentUpload) => void
  onBack: () => void
}

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ACCEPTED_FILE_TYPES = {
  'application/pdf': ['.pdf'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
}

export function Step3DocumentUpload({ defaultValues, onNext, onBack }: Step3DocumentUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>(defaultValues?.documents || [])
  const [error, setError] = useState<string>('')
  const { uploadFile } = useSanityUpload()

  const onDrop = useCallback(async (acceptedFiles: File[], rejectedFiles: any[]) => {
    setError('')

    // Handle rejected files
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0]
      if (rejection.errors[0]?.code === 'file-too-large') {
        setError('Le fichier est trop volumineux. Taille maximale : 10MB')
      } else if (rejection.errors[0]?.code === 'file-invalid-type') {
        setError('Type de fichier non accepté. Formats acceptés : PDF, JPG, PNG')
      }
      return
    }

    // Add files with uploading state
    const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      file,
      uploading: true,
      uploadProgress: 0,
    }))

    setFiles((prev) => [...prev, ...newFiles])

    // Upload each file to Sanity
    for (let i = 0; i < acceptedFiles.length; i++) {
      const file = acceptedFiles[i]
      const fileIndex = files.length + i

      try {
        // Upload to Sanity with progress tracking
        const result = await uploadFile(file, (progress) => {
          // Update progress in real-time
          setFiles((prev) =>
            prev.map((f, idx) =>
              idx === fileIndex
                ? {
                    ...f,
                    uploadProgress: progress.percentage,
                  }
                : f
            )
          )
        })

        // Update file with Sanity asset info
        setFiles((prev) =>
          prev.map((f, idx) =>
            idx === fileIndex
              ? {
                  ...f,
                  assetId: result.assetId,
                  url: result.url,
                  uploading: false,
                  uploadProgress: 100,
                  file: undefined, // Remove File object after upload
                }
              : f
          )
        )
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erreur lors de l\'upload'
        
        // Update file with error
        setFiles((prev) =>
          prev.map((f, idx) =>
            idx === fileIndex
              ? {
                  ...f,
                  uploading: false,
                  uploadError: errorMessage,
                }
              : f
          )
        )
      }
    }
  }, [files.length, uploadFile])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILE_TYPES,
    maxSize: MAX_FILE_SIZE,
    multiple: true,
  })

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon className="w-5 h-5" />
    if (type === 'application/pdf') return <FileText className="w-5 h-5" />
    return <File className="w-5 h-5" />
  }

  const handleNext = () => {
    if (files.length === 0) {
      setError('Veuillez télécharger au moins un document')
      return
    }

    // Check if any files are still uploading
    const stillUploading = files.some((f) => f.uploading)
    if (stillUploading) {
      setError('Veuillez attendre la fin de l\'upload de tous les fichiers')
      return
    }

    // Check if any files have errors
    const hasErrors = files.some((f) => f.uploadError)
    if (hasErrors) {
      setError('Certains fichiers n\'ont pas pu être téléchargés. Veuillez les supprimer et réessayer.')
      return
    }

    // Pass only the uploaded documents with asset IDs
    const uploadedDocs = files
      .filter((f) => f.assetId)
      .map((f) => ({
        name: f.name,
        size: f.size,
        type: f.type,
        assetId: f.assetId!,
        url: f.url!,
      }))

    onNext({ documents: uploadedDocs })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Info */}
      <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-amber-900">Documents requis</p>
          <p className="text-xs text-amber-700 mt-1">
            Téléchargez vos diplômes, relevés de notes, passeport, ou tout autre document pertinent.
            Formats acceptés : PDF, JPG, PNG (max 10MB par fichier).
          </p>
        </div>
      </div>

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
          transition-all duration-300
          ${isDragActive ? 'border-[#26a5de] bg-[#26a5de]/5' : 'border-gray-300 hover:border-[#26a5de]'}
          ${error ? 'border-red-500' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        {/* Upload icon */}
        <motion.div
          animate={{ y: isDragActive ? -10 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center gap-3"
        >
          <div className={`
            p-4 rounded-full transition-colors duration-300
            ${isDragActive ? 'bg-[#26a5de]/10' : 'bg-gray-100'}
          `}>
            <Upload className={`w-8 h-8 ${isDragActive ? 'text-[#26a5de]' : 'text-gray-400'}`} />
          </div>
          
          <div>
            <p className="text-lg font-semibold text-gray-700">
              {isDragActive ? 'Déposez vos fichiers ici' : 'Glissez-déposez vos documents'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              ou <span className="text-[#26a5de] font-medium">parcourez</span> vos fichiers
            </p>
          </div>

          <p className="text-xs text-gray-400 mt-2">
            PDF, JPG, PNG • Max 10MB par fichier
          </p>
        </motion.div>
      </div>

      {/* Error message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg"
        >
          <AlertCircle className="w-4 h-4" />
          {error}
        </motion.div>
      )}

      {/* Uploaded files list */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between px-1">
              <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-green-600" />
                </div>
                Documents téléchargés ({files.length}/5)
              </p>
              {files.length >= 5 && (
                <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                  Maximum atteint
                </span>
              )}
            </div>

            <div className="space-y-2">
              {files.map((file, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className={`
                    flex flex-col p-4 bg-white rounded-xl border-2 transition-all
                    ${file.uploadError ? 'border-red-300' : file.uploading ? 'border-blue-300' : 'border-gray-200 hover:border-[#26a5de] hover:shadow-md'}
                    ${file.uploading ? 'animate-pulse' : ''}
                  `}
                >
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className={`
                        w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                        ${file.uploadError 
                          ? 'bg-red-100 text-red-600' 
                          : file.uploading 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'bg-gradient-to-br from-[#26a5de]/10 to-[#232d6e]/10 text-[#26a5de]'}
                      `}>
                        {file.uploading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : file.uploadError ? (
                          <AlertCircle className="w-5 h-5" />
                        ) : (
                          getFileIcon(file.type)
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">{file.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                          <span className="text-gray-300">•</span>
                          {file.uploading && (
                            <span className="text-xs text-blue-600 font-medium flex items-center gap-1">
                              <Loader2 className="w-3 h-3 animate-spin" />
                              Upload en cours...
                            </span>
                          )}
                          {file.uploadError && (
                            <span className="text-xs text-red-600 font-medium flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              Échec
                            </span>
                          )}
                          {file.assetId && !file.uploading && (
                            <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                              <Check className="w-3 h-3" />
                              Téléchargé
                            </span>
                          )}
                        </div>
                        {file.uploadError && (
                          <p className="text-xs text-red-600 mt-1">{file.uploadError}</p>
                        )}
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      disabled={file.uploading}
                      className="text-gray-400 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all ml-2 disabled:opacity-50"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Progress bar for uploading files */}
                  {file.uploading && typeof file.uploadProgress === 'number' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3"
                    >
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                        <span>Progression</span>
                        <span className="font-semibold">{file.uploadProgress}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${file.uploadProgress}%` }}
                          transition={{ duration: 0.3 }}
                          className="h-full bg-gradient-to-r from-[#26a5de] to-[#232d6e]"
                        />
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden submit button */}
      <button type="button" onClick={handleNext} className="hidden" id="step3-submit" />
    </motion.div>
  )
}
