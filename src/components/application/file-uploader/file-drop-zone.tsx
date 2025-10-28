'use client'

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { useRef } from 'react'

interface Props {
  id?: string
  isDrag: boolean
  isMaxReached: boolean
  disabled: boolean
  maxFiles: number
  maxFileSize: number
  maxTotalSize: number
  formatFileSize: (bytes: number) => string
  onDragOver: (e: React.DragEvent) => void
  onDragLeave: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent) => void
  onFileSelect: (files: FileList) => void
}

export function FileDropZone({
  id,
  isDrag,
  isMaxReached,
  disabled,
  maxFiles,
  maxFileSize,
  maxTotalSize,
  formatFileSize,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileSelect,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`relative rounded-lg border-2 border-dashed transition-colors ${
        isDrag ? 'border-primary bg-primary/5' : 'border-ring'
      } ${isMaxReached || disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
    >
      <div className="flex flex-col items-center justify-center px-6 py-12">
        <Download className="mb-4 h-12 w-12 text-gray-400" />
        <p className="text-body-sm text-muted-foreground mb-4 text-center">
          PDF, 이미지(JPG, PNG), Word 문서 <br />
          (최소 1개, 최대 {maxFiles}개, 각 파일 최대{' '}
          {formatFileSize(maxFileSize)}, 전체 최대{' '}
          {formatFileSize(maxTotalSize)})
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          onChange={(e) => {
            if (e.target.files) {
              onFileSelect(e.target.files)
            }
            e.target.value = ''
          }}
          className="hidden"
          disabled={isMaxReached || disabled}
        />
        <Button
          id={id}
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isMaxReached || disabled}
          className="mt-2 border-none px-(--px-md) font-semibold"
        >
          <Download className="mr-2 h-4 w-4" />
          파일선택
        </Button>
      </div>
    </div>
  )
}
