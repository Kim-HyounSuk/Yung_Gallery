import { z } from 'zod'
import { additionalStepSchema } from './form-steps/additional-step.schema'
import { companyInfoStepSchema } from './form-steps/company-in-step.schema'
import { interestAreaStepSchema } from './form-steps/interest-area-step-schema'

export const businessInSaudiFormSchema = z.object({
  companyInfo: companyInfoStepSchema,
  interestArea: interestAreaStepSchema,
  additional: additionalStepSchema,
})

export type BusinessInSaudiFormData = z.infer<typeof businessInSaudiFormSchema>
