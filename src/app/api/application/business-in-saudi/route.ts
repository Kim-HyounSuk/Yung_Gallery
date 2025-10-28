import { NextRequest, NextResponse } from 'next/server'
import { sendBusinessInSaudiEmail } from '@/lib/email/send-business-in-saudi-email'
import { businessInSaudiFormSchema } from '@/type/application/business-in-saudi'

export async function POST(request: NextRequest) {
  try {
    // 1. FormData 파싱
    const formData = await request.formData()

    // 2. JSON 데이터 추출 및 검증
    const jsonData = formData.get('data')
    if (!jsonData || typeof jsonData !== 'string') {
      return NextResponse.json(
        { error: 'Invalid form data: missing data field' },
        { status: 400 },
      )
    }

    const parsedData = JSON.parse(jsonData)

    // 3. Zod 스키마로 검증
    const validationResult = businessInSaudiFormSchema.safeParse(parsedData)
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.issues,
        },
        { status: 400 },
      )
    }

    const validatedData = validationResult.data

    // 4. 첨부파일 처리 - base64에서 Buffer로 변환
    const attachments: { filename: string; content: Buffer }[] = []

    if (
      validatedData.companyInfo.documentUploads &&
      validatedData.companyInfo.documentUploads.length > 0
    ) {
      validatedData.companyInfo.documentUploads.forEach((file) => {
        if (file.base64) {
          // base64 데이터 추출 (data:image/png;base64, 부분 제거)
          const base64Data = file.base64.includes(',')
            ? file.base64.split(',')[1]
            : file.base64

          // base64를 Buffer로 변환
          const buffer = Buffer.from(base64Data, 'base64')

          attachments.push({
            filename: file.name,
            content: buffer,
          })
        }
      })
    }

    // 5. 이메일 발송
    const emailResult = await sendBusinessInSaudiEmail(
      validatedData,
      attachments.length > 0 ? attachments : undefined,
    )

    // 6. 성공 응답
    return NextResponse.json(
      {
        success: true,
        message: 'Application submitted successfully',
        emailResult,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error processing business-in-saudi application:', error)

    return NextResponse.json(
      {
        error: 'Failed to process application',
        message:
          error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 },
    )
  }
}
