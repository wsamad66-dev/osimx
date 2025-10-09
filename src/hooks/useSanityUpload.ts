'use client'

import { useState, useCallback } from 'react'

export type UploadStatus = 'idle' | 'uploading' | 'success' | 'error'

export interface UploadProgress {
  loaded: number
  total: number
  percentage: number
}

export interface UploadResult {
  assetId: string
  url: string
  originalFilename: string
}

export interface UseUploadReturn {
  uploadFile: (file: File, onProgress?: (progress: UploadProgress) => void) => Promise<UploadResult>
  status: UploadStatus
  progress: UploadProgress
  error: string | null
  reset: () => void
}

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]

/**
 * Custom hook for uploading files to Sanity Assets API
 * Handles file validation, progress tracking, and error management
 */
export function useSanityUpload(): UseUploadReturn {
  const [status, setStatus] = useState<UploadStatus>('idle')
  const [progress, setProgress] = useState<UploadProgress>({
    loaded: 0,
    total: 0,
    percentage: 0
  })
  const [error, setError] = useState<string | null>(null)

  const reset = useCallback(() => {
    setStatus('idle')
    setProgress({ loaded: 0, total: 0, percentage: 0 })
    setError(null)
  }, [])

  const uploadFile = useCallback(
    async (file: File, onProgress?: (progress: UploadProgress) => void): Promise<UploadResult> => {
      // Reset state
      setError(null)
      setProgress({ loaded: 0, total: 0, percentage: 0 })
      setStatus('uploading')

      try {
        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
          throw new Error(`Le fichier est trop volumineux. Taille maximale : ${MAX_FILE_SIZE / 1024 / 1024}MB`)
        }

        // Validate file type
        if (!ALLOWED_TYPES.includes(file.type)) {
          throw new Error('Type de fichier non supporté. Formats acceptés : PDF, JPG, PNG, WEBP, DOC, DOCX')
        }

        // Create FormData
        const formData = new FormData()
        formData.append('file', file)

        // Upload with XMLHttpRequest for progress tracking
        const result = await new Promise<UploadResult>((resolve, reject) => {
          const xhr = new XMLHttpRequest()

          // Progress tracking
          xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable) {
              const percentage = Math.round((e.loaded / e.total) * 100)
              const progressData = {
                loaded: e.loaded,
                total: e.total,
                percentage
              }
              setProgress(progressData)
              
              // Call external progress callback if provided
              onProgress?.(progressData)
            }
          })

          // Success handler
          xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              try {
                const response = JSON.parse(xhr.responseText)
                resolve(response)
              } catch (parseError) {
                reject(new Error('Erreur lors du traitement de la réponse'))
              }
            } else {
              try {
                const errorResponse = JSON.parse(xhr.responseText)
                reject(new Error(errorResponse.error || 'Erreur lors de l\'upload'))
              } catch {
                reject(new Error(`Erreur HTTP: ${xhr.status}`))
              }
            }
          })

          // Error handler
          xhr.addEventListener('error', () => {
            reject(new Error('Erreur réseau lors de l\'upload'))
          })

          // Abort handler
          xhr.addEventListener('abort', () => {
            reject(new Error('Upload annulé'))
          })

          // Send request
          xhr.open('POST', '/api/upload')
          xhr.send(formData)
        })

        setStatus('success')
        return result

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue lors de l\'upload'
        setError(errorMessage)
        setStatus('error')
        throw new Error(errorMessage)
      }
    },
    []
  )

  return {
    uploadFile,
    status,
    progress,
    error,
    reset
  }
}
