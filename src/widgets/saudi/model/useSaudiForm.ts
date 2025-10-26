'use client'

import { SaudiFormData, SaudiFormSchema } from '@/entities/application/model'
import { AdditionalFormSchema } from '@/features/saudi/steps/additional/model'
import { CompanyInfoFormSchema } from '@/features/saudi/steps/company-info/model'
import { InterestAreaFormSchema } from '@/features/saudi/steps/interest-area/model'
import { FORM_STEPS } from '@/widgets/saudi/model'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { DeepPartial, useForm } from 'react-hook-form'

export function useSaudiForm() {
  const [curStep, setCurStep] = useState(FORM_STEPS.COMPANY_INFO)
  const [isStepValid, setIsStepValid] = useState(false)

  // 폼 메서드 정의 및 초기화
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
        otherText: '',
      },
    },
    mode: 'onChange',
  })

  // 현재 위치한 Step 검증 및 구독
  useEffect(() => {
    const validateStep = (values: DeepPartial<SaudiFormData>) => {
      let result

      switch (curStep) {
        case FORM_STEPS.COMPANY_INFO:
          result = CompanyInfoFormSchema.safeParse(values.companyInfo)
          break
        case FORM_STEPS.INTEREST_AREA:
          result = InterestAreaFormSchema.safeParse(values.interestArea)
          break
        case FORM_STEPS.ADDITIONAL:
          result = AdditionalFormSchema.safeParse(values.additional)
          break
        default:
          result = { success: false }
      }

      setIsStepValid(result.success)
    }

    const subscription = form.watch((values) => {
      validateStep(values)
    })

    validateStep(form.getValues())

    return () => subscription.unsubscribe()
  }, [form, curStep])

  // 네비게이션 버튼 핸들러
  const handleNext = () => {
    if (isStepValid) {
      setCurStep((prev) => Math.min(prev + 1, FORM_STEPS.ADDITIONAL))
    }
  }
  const handlePrev = () => {
    setCurStep((prev) => Math.max(prev - 1, FORM_STEPS.COMPANY_INFO))
  }

  const resetCurStep = () => setCurStep(FORM_STEPS.COMPANY_INFO)

  return { form, curStep, isStepValid, handleNext, handlePrev, resetCurStep }
}
