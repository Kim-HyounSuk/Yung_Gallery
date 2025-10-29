'use client'

import { FileUploader } from '@/components/application'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { MAX_FILE_SIZE, MAX_TOTAL_SIZE } from '@/const/application'
import { BusinessInSaudiFormData } from '@/type/application/business-in-saudi'
import { useFormContext } from 'react-hook-form'

export function CompanyInfoStep() {
  const { control } = useFormContext<BusinessInSaudiFormData>()

  return (
    <div className="flex flex-col gap-8 p-4 md:px-[50px]">
      <FormField
        control={control}
        name="companyInfo.companyName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-body-lg! font-semibold">
              회사명(Company Name) <span className="text-destructive">*</span>
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
        control={control}
        name="companyInfo.managerName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-body-lg! font-semibold">
              담당자 성명(Manager Name){' '}
              <span className="text-destructive">*</span>
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
        control={control}
        name="companyInfo.managerEmail"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-body-lg! font-semibold">
              업무용 Email(Work Email){' '}
              <span className="text-destructive">*</span>
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
        control={control}
        name="companyInfo.foundingYear"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-body-lg! font-semibold">
              설립 연도(Year of Business Incorporation){' '}
              <span className="text-destructive">*</span>
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
        control={control}
        name="companyInfo.documentUploads"
        render={({ field }) => (
          <FormItem>
            <FormLabel asChild className="text-body-lg! font-semibold">
              <legend>
                제출 서류(Required Documents){' '}
                <span className="text-destructive">*</span>
              </legend>
            </FormLabel>
            <FormDescription className="text-body-sm! text-muted-foreground">
              회사 소개서, 전년도 매출 증빙{' '}
              <span className="text-destructive font-semibold">
                (누락시 진행이 불가합니다)
              </span>
            </FormDescription>
            <FormControl>
              <FileUploader
                value={field.value || []}
                onChange={field.onChange}
                onError={(message) => {
                  control.setError('companyInfo.documentUploads', {
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
