import { FormConfig } from '@/type/application'
import { businessInSaudiFormSchema } from '@/type/application/business-in-saudi'
import {
  AdditionalStep,
  CompanyInfoStep,
  InterestAreaStep,
} from '../_components'

export const businessInSaudiConfig: FormConfig = {
  id: 'business-in-saudi',
  schema: businessInSaudiFormSchema,
  steps: [
    {
      id: 'company-info',
      component: CompanyInfoStep,
      fieldName: 'companyInfo',
    },
    {
      id: 'interest-area',
      component: InterestAreaStep,
      fieldName: 'interestArea',
    },
    {
      id: 'additional',
      component: AdditionalStep,
      fieldName: 'additional',
    },
  ],
  submitEndpoint: '/api/application/business-in-saudi',
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
}
