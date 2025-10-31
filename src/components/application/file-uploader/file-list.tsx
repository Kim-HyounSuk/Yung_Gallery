'use client'

import { Button } from '@/components/ui/button'
import { FilePreviewItem } from './file-preview-item'

interface Props {
  files: File[]
  maxFiles: number
  maxTotalSize: number
  onRemove: (index: number) => void
  onRemoveAll: () => void
  getTotalSize: (files: File[]) => number
  formatFileSize: (bytes: number) => string
}

export function FileList({
  files,
  maxFiles,
  maxTotalSize,
  onRemove,
  onRemoveAll,
  getTotalSize,
  formatFileSize,
}: Props) {
  if (files.length === 0) return null

  return (
    <>
      {/* 파일 개수 및 전체 삭제 */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">
          <span className="text-primary">{files.length}개</span> / {maxFiles}개
          <span className="text-muted-foreground ml-2">
            (총 용량: {formatFileSize(getTotalSize(files))} /{' '}
            {formatFileSize(maxTotalSize)})
          </span>
        </p>
        <Button
          className="bg-primary-foreground text-primary px-(--px-sm) font-semibold"
          type="button"
          variant="outline"
          size="sm"
          onClick={onRemoveAll}
        >
          전체 파일 삭제
        </Button>
      </div>

      {/* 업로드된 파일 목록 */}
      <div className="space-y-2">
        {files.map((file, index) => (
          <FilePreviewItem
            key={index}
            file={file}
            index={index}
            onRemove={onRemove}
            formatFileSize={formatFileSize}
          />
        ))}
      </div>
    </>
  )
}
