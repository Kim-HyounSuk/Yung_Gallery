'use client'

import { Button } from '@/components/ui/button'
import { useSubmitApplication } from '@/hook/application'
import { FormConfig } from '@/type/application'
import clsx from 'clsx'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'sonner'
import { ConsentDialog } from './consent-dialog'
import { FormWizardProvider, useFormWizard } from './form-wizard.context'

interface FormWizardRootProps {
  config: FormConfig
  children: React.ReactNode
}

export function FormWizardRoot({ children, config }: FormWizardRootProps) {
  return (
    <FormWizardProvider config={config}>
      <div className="relative mx-auto flex w-full max-w-[850px] flex-1 flex-col gap-4 pb-4 shadow-xl md:my-8 md:rounded-lg">
        {children}
      </div>
    </FormWizardProvider>
  )
}

export function FormWizardNav() {
  const { config, goToNext, goToPrev, curStep, isFirstStep, isLastStep } =
    useFormWizard()
  const { formState } = useFormContext()
  const { submit, isSubmit } = useSubmitApplication(config)
  const [isDialog, setIsDialog] = useState(false)

  const handleNext = async () => {
    const isValid = await goToNext()
    if (!isValid) {
      toast.error('필수 항목을 모두 올바르게 입력해주세요.')
    }
  }

  const handleSubmitClick = async () => {
    // 마지막 스텝 검증
    const isValid = await goToNext()
    if (isValid) {
      setIsDialog(true)
    } else {
      toast.error('모든 필수 항목을 올바르게 입력해주세요.')
    }
  }

  const handleSubmit = async () => {
    await submit()
    setIsDialog(false)
  }

  const curStepErrors = formState.errors[curStep.fieldName]
  const hasCurStepErrors = Boolean(curStepErrors)

  return (
    <>
      <div className="z-10 flex flex-1 flex-col gap-6 px-4 md:px-[50px]">
        <div className="flex items-center justify-between">
          <Button
            className="text-body-lg! px-(--px-lg) font-semibold"
            type="button"
            size="lg"
            variant="outline"
            onClick={goToPrev}
            disabled={isSubmit || isDialog || isFirstStep}
          >
            이전
          </Button>
          <Button
            className="text-body-lg! px-(--px-lg) font-semibold"
            size="lg"
            type="button"
            variant={isLastStep ? 'outline' : 'default'}
            onClick={handleNext}
            disabled={hasCurStepErrors || isLastStep || isDialog || isSubmit}
          >
            다음
          </Button>
        </div>
        {isLastStep && (
          <Button
            onClick={handleSubmitClick}
            className="text-body-lg! h-(--h-md) px-(--px-lg) py-(--py-lg) font-semibold"
            size="lg"
            type="button"
            disabled={hasCurStepErrors || isSubmit || isDialog}
          >
            {isSubmit ? '제출 중...' : '제출하기 (Submit)'}
          </Button>
        )}
      </div>

      <ConsentDialog
        open={isDialog}
        onOpenChange={setIsDialog}
        onConfirm={handleSubmit}
        isSubmit={isSubmit}
      />
    </>
  )
}

export function FormWizardContent() {
  const { curStep } = useFormWizard()

  const StepComponent = curStep.component

  return (
    <main className="z-10">
      <StepComponent />
    </main>
  )
}

export function FormWizardStepBar() {
  const { config, curStepIdx } = useFormWizard()
  return (
    <div className="bg-background flex justify-between gap-2 p-4 md:px-[50px]">
      {Array.from({ length: config.steps.length }).map((_, step) => (
        <div
          key={step}
          className={clsx('h-2 flex-1 rounded bg-gray-200', {
            'bg-primary': step <= curStepIdx,
          })}
        />
      ))}
    </div>
  )
}
