import {
  CUR_FUND_STAGE,
  EXPECT_TIMELINE,
} from '@/features/saudi/additional/model'
import z from 'zod'

export const AdditionalFormSchema = z.object({
  expectTimeline: z.enum(EXPECT_TIMELINE, {
    message: '예상 시기를 선택하세요',
  }),
  curFundStage: z.enum(CUR_FUND_STAGE, {
    message: '투자 단계를 선택하세요',
  }),
  comment: z.string().optional(),
})

export type AdditionalFormData = z.infer<typeof AdditionalFormSchema>
