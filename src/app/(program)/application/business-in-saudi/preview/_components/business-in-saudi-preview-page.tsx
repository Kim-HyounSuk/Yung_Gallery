'use client'

import { Button } from '@/components/ui/button'
import { useSubmitEmail } from '@/hook/application'
import { formatFileSize } from '@/lib/application'
import { usePreviewStore } from '@/store/application'
import { Download, FileDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { businessInSaudiConfig } from '../../_config'

export default function BusinessInSaudiPreviewPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const previewData = usePreviewStore((state) => state.previewData)
  const files = usePreviewStore((state) => state.files)
  const clearPreviewData = usePreviewStore((state) => state.clearPreviewData)
  const { isSubmit, submitEmail } = useSubmitEmail(businessInSaudiConfig)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleDownload = (filename: string) => {
    const file = files.find((f) => f.name === filename)
    if (!file) {
      console.error('파일을 찾을 수 없습니다:', filename)
      return
    }

    const url = window.URL.createObjectURL(file)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  if (mounted && !previewData) {
    return (
      <div className="z-10 flex flex-1 flex-col items-center justify-center gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-title-sm text-center font-bold">
            미리보기 생성에 실패했습니다
          </h1>
          <p className="text-muted-foreground text-center">
            신청서를 다시 제출해주세요
          </p>
        </div>
        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={() => {
              clearPreviewData()
              router.push('/application/business-in-saudi')
            }}
          >
            돌아가기
          </Button>
        </div>
      </div>
    )
  }

  if (!mounted || !previewData) {
    return null
  }

  const { emailHtml } = previewData

  return (
    <>
      {/* 메인 콘텐츠 */}
      <div className="z-10 flex flex-col gap-2 p-4 md:px-[50px]">
        <h2 className="text-body-lg font-semibold">미리 보기</h2>
        <iframe
          srcDoc={emailHtml}
          className="h-[500px] w-full overflow-x-auto rounded-lg bg-inherit"
          title="Email Preview"
          style={{ border: '1px solid #e5e7eb' }}
        />
      </div>
      {/* 첨부 파일 */}
      <div className="z-10 flex flex-col gap-2 p-4 md:px-[50px]">
        <h2 className="text-body-lg font-semibold">
          첨부파일 ({files?.length || 0})
        </h2>
        <div>
          {files && files.length > 0 ? (
            <div className="flex flex-col gap-2">
              {files.map((file, idx) => (
                <div
                  key={idx}
                  className="border-border flex items-center justify-between rounded-lg border bg-inherit p-4"
                >
                  <div className="flex items-center gap-3">
                    <FileDown className="text-muted-foreground size-5" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">
                        {file.name}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownload(file.name)}
                  >
                    <Download className="size-5" />
                    다운로드
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-body-sm text-muted-foreground text-center">
              첨부파일이 없습니다
            </p>
          )}
        </div>
      </div>
      {/* 버튼 영역 */}
      <div className="z-10 flex gap-3 p-4 md:px-[50px]">
        <Button
          variant="outline"
          onClick={() => router.push('/application/business-in-saudi')}
          disabled={isSubmit}
          className="text-body-lg! h-(--h-md) flex-1 px-(--px-lg) py-(--py-lg) font-semibold"
        >
          돌아가기
        </Button>
        <Button
          onClick={submitEmail}
          disabled={isSubmit}
          className="text-body-lg! h-(--h-md) flex-1 px-(--px-lg) py-(--py-lg) font-semibold"
        >
          {isSubmit ? '제출 중...' : '제출하기'}
        </Button>
      </div>
    </>
  )
}
