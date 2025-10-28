import { z } from 'zod'

export const interestAreaStepSchema = z
  .object({
    areas: z
      .array(z.string())
      .min(1, '최소 1개 이상의 관심 분야를 선택해주세요'),
    subitems: z
      .array(z.string())
      .min(1, '최소 1개 이상의 필요 지원 및 기업 서비스를 선택해주세요'),
    otherText: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.subitems.includes('other_custom')) {
        return data.otherText && data.otherText.trim().length > 0
      }

      return true
    },
    {
      message: '기타 항목의 내용을 입력해주세요',
      path: ['otherText'],
    },
  )

export type InterestAreaFormData = z.infer<typeof interestAreaStepSchema>
