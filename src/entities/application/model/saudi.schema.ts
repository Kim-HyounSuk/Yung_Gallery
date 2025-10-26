import { AdditionalStepSchema } from '@/features/saudi/steps/additional/model'
import { CompanyInfoStepSchema } from '@/features/saudi/steps/company-info/model'
import { InterestAreaStepSchema } from '@/features/saudi/steps/interest-area/model'
import z from 'zod'

export const SaudiFormSchema = z.object({
  companyInfo: CompanyInfoStepSchema,
  interestArea: InterestAreaStepSchema,
  additional: AdditionalStepSchema,
})

export type SaudiFormData = z.infer<typeof SaudiFormSchema>
