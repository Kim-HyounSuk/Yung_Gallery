import { z } from 'zod'
import {
  companyInfoStepSchema,
  companyInfoStepServerSchema,
} from './form-steps/company-in-step.schema'
import { interestAreaStepSchema } from './form-steps/interest-area-step-schema'

// 클라이언트 폼용 schema
export const businessInSaudiFormSchema = z.object({
  companyInfo: companyInfoStepSchema,
  interestArea: interestAreaStepSchema,
})

// 서버 검증용 schema
export const businessInSaudiFormServerSchema = z.object({
  companyInfo: companyInfoStepServerSchema,
  interestArea: interestAreaStepSchema,
})

export type BusinessInSaudiFormData = z.infer<typeof businessInSaudiFormSchema>
