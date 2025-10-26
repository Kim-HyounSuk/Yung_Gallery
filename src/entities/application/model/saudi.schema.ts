import { AdditionalFormSchema } from '@/features/saudi/steps/additional/model'
import { CompanyInfoFormSchema } from '@/features/saudi/steps/company-info/model'
import { InterestAreaFormSchema } from '@/features/saudi/steps/interest-area/model'
import z from 'zod'

export const SaudiFormSchema = z.object({
  companyInfo: CompanyInfoFormSchema,
  interestArea: InterestAreaFormSchema,
  additional: AdditionalFormSchema,
})

export type SaudiFormData = z.infer<typeof SaudiFormSchema>
