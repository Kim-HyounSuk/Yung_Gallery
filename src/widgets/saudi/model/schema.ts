import { CompanyInfoFormSchema } from '@/features/saudi/company-info/model'
import { InterestAreaFormSchema } from '@/features/saudi/interest-area/model'
import z from 'zod'

export const SaudiFormSchema = z.object({
  companyInfo: CompanyInfoFormSchema,
  interestArea: InterestAreaFormSchema,
})

export type SaudiFormData = z.infer<typeof SaudiFormSchema>
