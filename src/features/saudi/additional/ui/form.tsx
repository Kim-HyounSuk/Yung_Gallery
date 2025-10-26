'use client'

import { SaudiFormData } from '@/entities/application/model'
import {
  CUR_FUND_STAGE,
  EXPECT_TIMELINE,
} from '@/features/saudi/additional/model'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form'
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group'
import { Textarea } from '@/shared/ui/textarea'
import { UseFormReturn } from 'react-hook-form'

interface Props {
  form: UseFormReturn<SaudiFormData>
}

export function AdditionalForm({ form }: Props) {
  return (
    <div className="flex flex-col gap-8 p-4 md:px-[50px]">
      <FormField
        control={form.control}
        name="additional.expectTimeline"
        render={({ field }) => (
          <FormItem className="flex flex-col gap-4">
            <FormLabel asChild>
              <legend className="text-body-lg! font-semibold">
                진출 예상 시기(Expected Timeline) *
              </legend>
            </FormLabel>
            <FormControl>
              <RadioGroup
                className="flex flex-col md:grid md:grid-cols-2"
                onValueChange={field.onChange}
                value={field.value || ''}
                ref={field.ref}
              >
                {EXPECT_TIMELINE.map((timeline) => (
                  <FormItem className="flex items-center" key={timeline}>
                    <FormControl>
                      <RadioGroupItem
                        className="border-primary"
                        value={timeline}
                      />
                    </FormControl>
                    <FormLabel className="text-body-md! font-normal">
                      {timeline}
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="additional.curFundStage"
        render={({ field }) => (
          <FormItem className="flex flex-col gap-4">
            <FormLabel asChild>
              <legend className="text-body-lg! font-semibold">
                현재 투자 단계(Current Funding Stage) *
              </legend>
            </FormLabel>
            <FormControl>
              <RadioGroup
                className="flex flex-col md:grid md:grid-cols-2"
                onValueChange={field.onChange}
                value={field.value || ''}
                ref={field.ref}
              >
                {CUR_FUND_STAGE.map((stage) => (
                  <FormItem className="flex items-center" key={stage}>
                    <FormControl>
                      <RadioGroupItem
                        className="border-primary"
                        value={stage}
                      />
                    </FormControl>
                    <FormLabel className="text-body-md! font-normal">
                      {stage}
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="additional.comment"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-body-lg! font-semibold">
              기타 문의사항(Other Questions)
            </FormLabel>
            <FormControl>
              <Textarea
                className="min-h-32 resize-none"
                placeholder="자유롭게 작성해주세요"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
