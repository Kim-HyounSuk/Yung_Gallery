'use client'

import { SaudiFormData } from '@/entities/application/model'
import {
  MAX_FILE_SIZE,
  MAX_TOTAL_SIZE,
} from '@/features/saudi/steps/company-info/model'
import { FileUploader } from '@/features/saudi/steps/company-info/ui'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { UseFormReturn } from 'react-hook-form'

interface Props {
  form: UseFormReturn<SaudiFormData>
}

export function CompanyInfoStep({ form }: Props) {
  return (
    <div className="flex flex-col gap-8 p-4 md:px-[50px]">
      <FormField
        control={form.control}
        name="companyInfo.companyName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-body-lg! font-semibold">
              회사명(Company Name) *
            </FormLabel>
            <FormControl>
              <Input
                className="h-(--h-md) px-(--px-md)! py-(--py-md)!"
                placeholder="Yung Gallery Co., Ltd."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="companyInfo.managerName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-body-lg! font-semibold">
              담당자 성명(Manager Name) *
            </FormLabel>
            <FormControl>
              <Input
                className="h-(--h-md) px-(--px-md)! py-(--py-md)!"
                placeholder="홍길동 / Hong Gil-dong"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="companyInfo.managerEmail"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-body-lg! font-semibold">
              업무용 Email(Work Email) *
            </FormLabel>
            <FormControl>
              <Input
                type="email"
                className="h-(--h-md) px-(--px-md)! py-(--py-md)!"
                placeholder="example@exmaple.com"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="companyInfo.foundingYear"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-body-lg! font-semibold">
              설립 연도(Year of Business Incorporation) *
            </FormLabel>
            <FormControl>
              <Input
                className="h-(--h-md) px-(--px-md)! py-(--py-md)!"
                placeholder="YYYY"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="companyInfo.documentUploads"
        render={({ field }) => (
          <FormItem>
            <FormLabel
              htmlFor="file-control"
              className="text-body-lg! font-semibold"
            >
              제출 서류(Required Documents) *
            </FormLabel>
            <FormDescription className="text-body-sm! text-muted-foreground">
              (회사 소개서, 전년도 매출 증빙)
            </FormDescription>
            <FormControl>
              <FileUploader
                id="file-control"
                value={field.value || []}
                onChange={field.onChange}
                onError={(message) => {
                  form.setError('companyInfo.documentUploads', {
                    message,
                  })
                }}
                maxFiles={3}
                maxFileSize={MAX_FILE_SIZE}
                maxTotalSize={MAX_TOTAL_SIZE}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
