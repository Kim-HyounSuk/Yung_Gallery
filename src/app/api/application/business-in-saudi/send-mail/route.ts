import { sendEmail } from '@/lib/email/business-in-saudi'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    // FormData 파싱
    const formDataRequest = await req.formData()

    const jsonData = formDataRequest.get('data')
    const emailHtml = formDataRequest.get('emailHtml')

    if (!jsonData || typeof jsonData !== 'string') {
      return NextResponse.json(
        { error: 'Invalid form data: missing data field' },
        { status: 400 },
      )
    }

    if (!emailHtml || typeof emailHtml !== 'string') {
      return NextResponse.json(
        { error: 'Invalid form data: missing emailHtml field' },
        { status: 400 },
      )
    }

    const formData = JSON.parse(jsonData)

    // 파일 처리
    const attachments: { filename: string; content: Buffer }[] = []
    const fileList = formDataRequest.getAll('files')

    if (fileList && fileList.length > 0) {
      for (const fileItem of fileList) {
        if (fileItem instanceof File) {
          const buffer = Buffer.from(await fileItem.arrayBuffer())
          attachments.push({
            filename: fileItem.name,
            content: buffer,
          })
        }
      }
    }

    await sendEmail({
      formData: formData,
      attachments: attachments.length > 0 ? attachments : undefined,
      emailHTML: emailHtml,
    })

    return NextResponse.json({
      success: true,
      message: 'Application submit successfully',
    })
  } catch (e) {
    console.error('Send mail error:', e)
    return NextResponse.json(
      {
        error: 'Failed to process application',
        message: e instanceof Error ? e.message : 'Unknown error occurred',
      },
      { status: 500 },
    )
  }
}
