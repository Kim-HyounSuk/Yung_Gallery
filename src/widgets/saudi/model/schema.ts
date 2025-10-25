import { AdditionalFormSchema } from '@/features/saudi/additional/model'
import { CompanyInfoFormSchema } from '@/features/saudi/company-info/model'
import { InterestAreaFormSchema } from '@/features/saudi/interest-area/model'
import z from 'zod'

export const SaudiFormSchema = z.object({
  companyInfo: CompanyInfoFormSchema,
  interestArea: InterestAreaFormSchema,
  additional: AdditionalFormSchema,
})

export type SaudiFormData = z.infer<typeof SaudiFormSchema>
