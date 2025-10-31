'use client'

import { FormWizard } from '@/components/application'
import { useFormWizard } from '@/components/application/form-wizard/form-wizard.context'
import { usePreviewStore } from '@/store/application'
import { useEffect } from 'react'
import { businessInSaudiConfig } from '../_config'

interface Props {
  header: React.ReactNode
  footer: React.ReactNode
  watermark: React.ReactNode
}

function BusinessInSaudiFormContent({ header, footer, watermark }: Props) {
  const { restoreFormData } = useFormWizard()
  const { formData } = usePreviewStore()

  // 미리보기에서 돌아왔을 때 폼 데이터 복원
  useEffect(() => {
    if (formData) {
      restoreFormData()
    }
  }, [formData, restoreFormData])

  return (
    <>
      <div className="sticky top-0 z-20">
        {header}
        <FormWizard.StepBar />
      </div>
      <FormWizard.Content />
      <FormWizard.Nav />
      {footer}
      {watermark}
    </>
  )
}

export function BusinessInSaudiForm({ header, footer, watermark }: Props) {
  return (
    <FormWizard config={businessInSaudiConfig}>
      <BusinessInSaudiFormContent
        header={header}
        footer={footer}
        watermark={watermark}
      />
    </FormWizard>
  )
}
