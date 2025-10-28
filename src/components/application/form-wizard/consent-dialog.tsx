import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  isSubmit?: boolean
  title?: string
  content?: React.ReactNode
  confirmText?: string
  cancelText?: string
}

export function ConsentDialog({
  open,
  onOpenChange,
  onConfirm,
  isSubmit = false,
  title = '개인정보 제공 및 활용 동의(Consent) *',
  content,
  confirmText = '동의 및 제출',
  cancelText = '거부',
}: Props) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-body-lg font-semibold">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription
            className="text-body-md text-foreground break-keep"
            asChild
          >
            {content ? (
              content
            ) : (
              <span>
                본 양식을 제출하는 것은 제공된 정보, 개인 데이터 및 문서의
                정확성을 <span className="font-semibold">인정함과 동시에</span>,
                프로그램의{' '}
                <span className="font-semibold">협업 및 파트너십을 촉진할</span>
                목적으로 이를 관련 제3자와 공유하는데 동의하는 것으로{' '}
                <span className="font-semibold">간주 됩니다</span>
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isSubmit}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault()
              onConfirm()
            }}
            disabled={isSubmit}
          >
            {isSubmit ? '제출 중...' : confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
