'use client'

import { CompanyInfoForm } from '@/features/saudi/company-info/ui'
import { InterestAreaForm } from '@/features/saudi/interest-area/ui/form'
import { Button } from '@/shared/ui/button'
import { Form } from '@/shared/ui/form'
import {
  FORM_STEPS,
  SaudiFormData,
  SaudiFormSchema,
} from '@/widgets/saudi/model'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export function SaudiForm() {
  const [curStep, setCurStep] = useState(FORM_STEPS.COMPANY_INFO)
  const [isSubmit, setIsSubmit] = useState(false)

  const form = useForm<SaudiFormData>({
    resolver: zodResolver(SaudiFormSchema),
    defaultValues: {
      companyInfo: {
        companyName: '',
        managerName: '',
        managerEmail: '',
        foundingYear: '',
        documentUploads: [],
      },
      interestArea: {
        areas: [],
        subitems: [],
      },
    },
    mode: 'onChange',
  })

  const validateCurStep = async () => {
    let isStepValid = false

    switch (curStep) {
      case FORM_STEPS.COMPANY_INFO:
        isStepValid = await form.trigger('companyInfo')
        break
      case FORM_STEPS.INTEREST_AREA:
        isStepValid = await form.trigger('interestArea')
        break
    }

    return isStepValid
  }

  const handleNext = async () => {
    const isStepValid = await validateCurStep()

    if (isStepValid) {
      setCurStep((prev) => Math.min(prev + 1, FORM_STEPS.ADDITIONAL))
    }
  }
  const handlePrev = async () => {
    setCurStep((prev) => Math.max(prev - 1, FORM_STEPS.COMPANY_INFO))
  }

  const onSubmit = async (data: SaudiFormData) => {
    setIsSubmit(true)

    try {
      const res = await fetch('/api/business-in-saudi/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        throw new Error('제출에 실패했습니다')
      }

      toast.success('성공적으로 제출되었습니다.')
    } catch (error) {
      toast.error((error as Error).message || '제출 중 오류가 발생했습니다.')
    } finally {
      setIsSubmit(false)
    }
  }

  const renderStep = () => {
    switch (curStep) {
      case FORM_STEPS.COMPANY_INFO:
        return <CompanyInfoForm form={form} />
      case FORM_STEPS.INTEREST_AREA:
        return <InterestAreaForm form={form} />
      default:
        return null
    }
  }

  return (
    <div className="relative mx-auto flex w-full max-w-[850px] flex-1 flex-col gap-4 pb-4 shadow-xl md:my-8 md:rounded-lg">
      <div className="sticky top-0 z-20">
        {/* Form 헤더 영역 */}
        <header className="bg-primary text-primary-foreground flex w-full flex-col gap-4 px-6 py-8 md:rounded-t-lg md:p-[50px]">
          <div className="flex w-full items-center justify-center gap-4 md:gap-8">
            <div className="h-[75px] w-[75px] bg-[url(/images/logo_g.png)] bg-contain bg-center bg-no-repeat md:h-[100px] md:w-[100px]" />
            <h1 className="text-title-sm md:text-title-lg font-bold">
              Program Application
              <br />
              Business in Saudi
            </h1>
          </div>
          <p className="text-body-sm md:text-body-md text-center break-keep">
            <span className="font-semibold">Business in Saudi</span> 프로그램은
            사우디아라비아 진출을 모색하는 한국 기업(브랜드)를 위한 프로그램
            입니다.
            <br />
            <span className="font-semibold">Yung Gallery</span>가 시작과 끝을
            함께하며, 안정적이고 효과적인 현지 비즈니스 진출을 지원하고
            있습니다.
          </p>
        </header>

        {/* STEP바 영역 */}
        <div className="bg-background flex justify-between gap-2 p-4 md:px-[50px]">
          {Object.values(FORM_STEPS).map((step) => (
            <div
              key={step}
              className={clsx('h-2 flex-1 rounded bg-gray-200', {
                'bg-primary': step <= curStep,
              })}
            />
          ))}
        </div>
      </div>

      {/* 컨텐츠 영역 */}
      <Form {...form}>
        <form className="z-10">{renderStep()}</form>
      </Form>

      <div className="z-10 flex flex-1 justify-between px-4 md:px-[50px]">
        <Button
          className="text-body-lg! px-(--px-lg)! py-(--py-lg)! font-semibold"
          type="button"
          size="lg"
          variant="outline"
          onClick={handlePrev}
          disabled={curStep === FORM_STEPS.COMPANY_INFO}
        >
          이전
        </Button>

        {curStep === FORM_STEPS.ADDITIONAL ? (
          <Button
            className="text-body-lg! px-(--px-lg)! py-(--py-lg)! font-semibold"
            size="lg"
            type="submit"
            disabled={isSubmit}
          >
            {isSubmit ? '제출 중...' : '제출하기'}
          </Button>
        ) : (
          <Button
            className="text-body-lg! px-(--px-lg)! py-(--py-lg)! font-semibold"
            size="lg"
            type="button"
            onClick={handleNext}
          >
            다음
          </Button>
        )}
      </div>

      <div className="fixed top-1/2 left-1/2 h-[400px] w-[300px] -translate-x-1/2 -translate-y-1/2 bg-[url(/images/logo_b.png)] bg-contain bg-center bg-no-repeat opacity-5 md:h-[600px] md:w-[500px]" />

      <footer className="text-label-md flex flex-col items-center gap-1 px-4 text-center text-gray-500 md:px-[50px]">
        <div className="h-[50px] w-[50px] bg-[url(/images/logo_g.png)] bg-contain bg-center bg-no-repeat md:h-[75px] md:w-[75px]" />
        copyright © 2025 All rights reserved by YUNG GALLERY - Business in
        Saudi
      </footer>
    </div>
  )
}
