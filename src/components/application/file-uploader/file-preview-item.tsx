'use client'

import { Button } from '@/components/ui/button'
import { FileDoc } from '@/type/application'
import { CheckCircle2, Loader2, X } from 'lucide-react'

interface Props {
  file: FileDoc
  index: number
  onRemove: (index: number) => void
  formatFileSize: (bytes: number) => string
}

export function FilePreviewItem({
  file,
  index,
  onRemove,
  formatFileSize,
}: Props) {
  return (
    <div className="hover:bg-point-50 border-ring flex items-center justify-between rounded-lg border bg-white p-4 transition-colors">
      <div className="flex min-w-0 flex-1 items-center">
        {/* 상태 아이콘 */}
        <div className="mr-3 shrink-0">
          {file.uploading ? (
            <Loader2 className="text-primary h-5 w-5 animate-spin" />
          ) : (
            <CheckCircle2 className="text-primary h-5 w-5" />
          )}
        </div>

        {/* 파일 정보 */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{file.name}</p>
          <p className="text-muted-foreground text-xs">
            [{formatFileSize(file.size)}]
          </p>
        </div>
      </div>

      {/* 삭제 버튼 */}
      <Button
        className="hover:text-destructive hover:bg-inherit"
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={() => onRemove(index)}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}
