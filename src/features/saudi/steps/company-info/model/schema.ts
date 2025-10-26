import z from 'zod'

export const CompanyInfoStepSchema = z.object({
  companyName: z.string().min(1, '회사명은 필수 항목입니다'),
  managerName: z.string().min(1, '담당자명은 필수 항목입니다'),
  managerEmail: z.string().email('올바른 이메일 형식이 아닙니다'),
  foundingYear: z
    .string()
    .regex(/^\d{4}$/, '올바른 연도 형식이 아닙니다 (예: 2020)'),
  documentUploads: z
    .array(
      z.object({
        name: z.string(),
        size: z.number(),
        type: z.string(),
        base64: z.string(),
      }),
    )
    .min(1, '최소 1개의 파일을 업로드해야 합니다')
    .max(3, '최대 3개의 파일만 업로드 가능합니다')
    .refine(
      (files) => {
        const totalSize = files.reduce((acc, file) => acc + file.size, 0)
        return totalSize <= 20 * 1024 * 1024 // 20 MB
      },
      { message: '총 파일 크기는 20MB를 초과할 수 없습니다' },
    ),
})

export type CompanyInfoStepData = z.infer<typeof CompanyInfoStepSchema>
