import { CreatePreview } from '@/type/api/application'
import { FormData } from '@/type/application'
import { create } from 'zustand'

interface PreviewStore {
  previewData: CreatePreview | null
  files: File[]
  formData: FormData | null
  setPreviewData: (data: CreatePreview) => void
  setFiles: (files: File[]) => void
  setFormData: (data: FormData) => void
  clearPreviewData: () => void
}

export const usePreviewStore = create<PreviewStore>(
  (set: (state: Partial<PreviewStore>) => void) => ({
    previewData: null,
    files: [],
    formData: null,
    setPreviewData: (data: CreatePreview) => set({ previewData: data }),
    setFiles: (files: File[]) => set({ files }),
    setFormData: (data: FormData) => set({ formData: data }),
    clearPreviewData: () =>
      set({ previewData: null, files: [], formData: null }),
  }),
)
