'use client'

import {
  ACCEPT_FILE_TYPES,
  MAX_FILE_SIZE,
  MAX_TOTAL_SIZE,
} from '@/const/application'
import {
  fileToBase64,
  formatFileSize,
  getTotalSize,
  validateFile,
  validateFileCount,
  validateTotalSize,
} from '@/lib/application'
import { FileDoc, FileUploaderConfig } from '@/type/application'
import { useState } from 'react'
import { FileDropZone } from './file-drop-zone'
import { FileList } from './file-list'

interface Props extends FileUploaderConfig {
  id?: string
  value: FileDoc[]
  onChange: (files: FileDoc[]) => void
  onError: (msg: string) => void
}

export function FileUploader({
  id,
  value = [],
  onChange,
  onError,
  maxFiles = 3,
  maxFileSize = MAX_FILE_SIZE,
  maxTotalSize = MAX_TOTAL_SIZE,
  acceptedTypes = ACCEPT_FILE_TYPES,
  disabled = false,
}: Props) {
  const [isDrag, setIsDrag] = useState(false)

  const handleFiles = async (files: FileList) => {
    if (!files || files.length === 0) return

    // 파일 개수 체크
    const countError = validateFileCount(value.length, files.length, maxFiles)
    if (countError) {
      onError(countError)
      return
    }

    try {
      // 임시로 uploading 상태 파일 추가
      const tempFiles = Array.from(files).map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        base64: '',
        uploading: true,
        uploaded: false,
      }))

      onChange([...value, ...tempFiles])

      const newDocuments = await Promise.all(
        Array.from(files).map(async (file) => {
          // 파일 검증
          const validationError = validateFile(
            file,
            maxFileSize,
            acceptedTypes,
            formatFileSize,
          )
          if (validationError) {
            throw new Error(validationError)
          }

          // 파일을 base64로 변환
          const base64 = await fileToBase64(file)

          return {
            name: file.name,
            size: file.size,
            type: file.type,
            base64,
            uploading: false,
            uploaded: true,
          }
        }),
      )

      // 전체 용량 체크
      const totalSizeError = validateTotalSize(
        value,
        newDocuments,
        maxTotalSize,
        getTotalSize,
        formatFileSize,
      )
      if (totalSizeError) {
        throw new Error(totalSizeError)
      }

      // 업로드 완료된 파일로 업데이트
      onChange([...value, ...newDocuments])
    } catch (error) {
      // 에러 발생 시 임시 파일 제거
      onChange(value)
      onError(
        error instanceof Error ? error.message : '파일 업로드에 실패했습니다',
      )
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!disabled && value.length < maxFiles) {
      setIsDrag(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDrag(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDrag(false)

    if (disabled || value.length >= maxFiles) return

    const files = e.dataTransfer.files
    handleFiles(files)
  }

  const handleRemove = (idx: number) => {
    const newDocs = value.filter((_, i) => i !== idx)
    onChange(newDocs)
  }

  const handleRemoveAll = () => {
    onChange([])
  }

  const isMaxReached = value.length >= maxFiles

  return (
    <div className="space-y-4">
      {/* 드래그 앤 드롭 영역 */}
      <FileDropZone
        id={id}
        isDrag={isDrag}
        isMaxReached={isMaxReached}
        disabled={disabled}
        maxFiles={maxFiles}
        maxFileSize={maxFileSize}
        maxTotalSize={maxTotalSize}
        formatFileSize={formatFileSize}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onFileSelect={handleFiles}
      />

      {/* 업로드된 파일 목록 */}
      <FileList
        files={value}
        maxFiles={maxFiles}
        maxTotalSize={maxTotalSize}
        onRemove={handleRemove}
        onRemoveAll={handleRemoveAll}
        getTotalSize={getTotalSize}
        formatFileSize={formatFileSize}
      />
    </div>
  )
}
