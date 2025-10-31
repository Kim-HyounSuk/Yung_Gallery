import { createEmail } from '@/lib/email/business-in-saudi'
import { businessInSaudiFormServerSchema } from '@/type/application/business-in-saudi'
import { NextRequest, NextResponse } from 'next/server'

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

    // 3. 첨부파일 처리 - FormData에서 파일 추출
    const attachmentInfo: { filename: string; size: number }[] = []
    const fileList = formData.getAll('files')

    if (fileList && fileList.length > 0) {
      for (const fileItem of fileList) {
        if (fileItem instanceof File) {
          attachmentInfo.push({
            filename: fileItem.name,
            size: fileItem.size,
          })
        }
      }
    }

    // 4. JSON 데이터에 파일 정보 추가 (검증용)
    const dataWithFiles = {
      ...parsedData,
      companyInfo: {
        ...parsedData.companyInfo,
        documentUploads: attachmentInfo.map((att) => ({
          name: att.filename,
          size: att.size,
          type: '',
        })),
      },
    }

    // 5. Zod 스키마로 검증
    const validationResult =
      businessInSaudiFormServerSchema.safeParse(dataWithFiles)
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.issues,
        },
        { status: 400 },
      )
    }

    // 5. 이메일 HTML 생성
    const emailHtml = await createEmail({ formData: parsedData })

    // 7. 성공 응답
    return NextResponse.json(
      {
        success: true,
        message: 'Application create preivew successfully',
        previewData: {
          emailHtml,
          attachmentInfo,
        },
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
