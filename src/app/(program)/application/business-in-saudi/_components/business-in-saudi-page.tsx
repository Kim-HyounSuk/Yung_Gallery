'use client'

import { FormWizard } from '@/components/application'
import { businessInSaudiConfig } from '../_config'

interface Props {
  header: React.ReactNode
  footer: React.ReactNode
  watermark: React.ReactNode
}

export function BusinessInSaudiForm({ header, footer, watermark }: Props) {
  return (
    <FormWizard config={businessInSaudiConfig}>
      <div className="sticky top-0 z-20">
        {header}
        <FormWizard.StepBar />
      </div>
      <FormWizard.Content />
      <FormWizard.Nav />
      {footer}
      {watermark}
    </FormWizard>
  )
}
