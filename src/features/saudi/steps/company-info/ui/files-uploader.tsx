'use client'

import {
  ACCEPT_FILE_TYPES,
  FileDoc,
  MAX_FILE_SIZE,
  MAX_TOTAL_SIZE,
} from '@/features/saudi/steps/company-info/model'
import { Button } from '@/shared/ui/button'
import { CheckCircle2, Download, Loader2, X } from 'lucide-react'
import { useRef, useState } from 'react'

interface Props {
  id?: string
  value: FileDoc[]
  onChange: (files: FileDoc[]) => void
  onError: (msg: string) => void
  maxFiles?: number
  maxFileSize?: number
  maxTotalSize?: number
  acceptedTypes?: string[]
  disabled?: boolean
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
  const fileInputRef = useRef<HTMLInputElement>(null)

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getTotalSize = (files: FileDoc[]) => {
    return files.reduce((acc, file) => acc + file.size, 0)
  }

  const handleFiles = async (files: FileList) => {
    if (!files || files.length === 0) return

    // 최대 개수 체크
    if (value.length + files.length > maxFiles) {
      onError(`최대 ${maxFiles}개까지 첨부 가능합니다`)
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
          // 파일 크기 체크
          if (file.size > maxFileSize) {
            throw new Error(
              `${file.name}의 크기가 ${formatFileSize(maxFileSize)}를 초과합니다`,
            )
          }

          // 파일 타입 체크
          if (!acceptedTypes.includes(file.type)) {
            throw new Error(`${file.name}은(는) 지원하지 않는 파일 형식입니다`)
          }

          // 파일을 base64로 변환
          return new Promise<FileDoc>((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => {
              resolve({
                name: file.name,
                size: file.size,
                type: file.type,
                base64: reader.result as string,
                uploading: false,
                uploaded: true,
              })
            }
            reader.onerror = reject
            reader.readAsDataURL(file)
          })
        }),
      )

      // 전체 용량 체크
      const currentTotalSize = getTotalSize(value)
      const newTotalSize = getTotalSize(newDocuments)

      if (currentTotalSize + newTotalSize > maxTotalSize) {
        throw new Error(
          `전체 파일 용량이 ${formatFileSize(maxTotalSize)}를 초과합니다`,
        )
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
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
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
                handleFiles(e.target.files)
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

      {/* 파일 개수 및 전체 삭제 */}
      {value.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">
            <span className="text-primary">{value.length}개</span> / {maxFiles}
            개
            <span className="text-muted-foreground ml-2">
              (총 용량: {formatFileSize(getTotalSize(value))} /{' '}
              {formatFileSize(maxTotalSize)})
            </span>
          </p>
          <Button
            className="bg-primary-foreground text-primary px-(--px-sm) font-semibold"
            type="button"
            variant="outline"
            size="sm"
            onClick={handleRemoveAll}
          >
            전체 파일 삭제
          </Button>
        </div>
      )}

      {/* 업로드된 파일 목록 */}
      {value.length > 0 && (
        <div className="space-y-2">
          {value.map((doc, index) => (
            <div
              key={index}
              className="hover:bg-point-50 border-ring flex items-center justify-between rounded-lg border bg-white p-4 transition-colors"
            >
              <div className="flex min-w-0 flex-1 items-center">
                {/* 상태 아이콘 */}
                <div className="mr-3 shrink-0">
                  {doc.uploading ? (
                    <Loader2 className="text-primary h-5 w-5 animate-spin" />
                  ) : (
                    <CheckCircle2 className="text-primary h-5 w-5" />
                  )}
                </div>

                {/* 파일 정보 */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{doc.name}</p>
                  <p className="text-muted-foreground text-xs">
                    [{formatFileSize(doc.size)}]
                  </p>
                </div>
              </div>

              {/* 삭제 버튼 */}
              <Button
                className="hover:text-destructive hover:bg-inherit"
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => handleRemove(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
