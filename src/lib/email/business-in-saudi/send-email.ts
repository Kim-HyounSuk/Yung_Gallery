import {
  MANAGER_MAP,
  SUPER_MANAGER,
} from '@/const/application/business-in-saudi'
import { Manager } from '@/type/application'
import { BusinessInSaudiFormData } from '@/type/application/business-in-saudi'
import { resend } from '../resend'

interface Props {
  formData: BusinessInSaudiFormData
  attachments?: {
    filename: string
    content: Buffer
  }[]
  emailHTML: string
}

export async function sendEmail({ formData, attachments, emailHTML }: Props) {
  try {
    // 1. 수신 이메일 중복 제거를 위한 Set 사용
    const recipientEmail = new Set<string>()
    const recipients: Manager[] = []

    // 2. 선택된 관심분야의 담당자
    for (const areaId of formData.interestArea.areas) {
      const managers = MANAGER_MAP[areaId]
      if (managers) {
        managers.forEach((manager) => {
          if (!recipientEmail.has(manager.email)) {
            recipientEmail.add(manager.email)
            recipients.push(manager)
          }
        })
      }
    }

    // 2. 최고 담당자 추가
    if (!recipientEmail.has(SUPER_MANAGER.email)) {
      recipientEmail.add(SUPER_MANAGER.email)
      recipients.push(SUPER_MANAGER)
    }

    // 3. 이메일 발송
    const send = recipients.map(async (recipient) => {
      return resend.emails.send({
        from: process.env.EMAIL_FROM || 'noreply@yungglobal.com',
        to: recipient.email,
        subject: `[Business in Saudi 지원서] ${formData.companyInfo.companyName}`,
        html: emailHTML,
        attachments: attachments?.map((file) => ({
          filename: file.filename,
          content: file.content,
        })),
      })
    })

    // 4. 모든 이메일 발송 대기
    const results = await Promise.allSettled(send)

    // 5. 발송 실패 체크
    const checkedEmails = results
      .map((result, idx) => {
        if (result.status === 'rejected') {
          return {
            email: recipients[idx].email,
            error: result.reason,
          }
        }
        return null
      })
      .filter(Boolean)

    if (checkedEmails.length > 0) {
      console.error('Failed to send emails', checkedEmails)
      throw new Error(
        `Failed to send emails to: ${checkedEmails.map((f) => f?.email).join(',')}`,
      )
    }

    return {
      success: true,
      data: {
        emailHTML,
        attachments: attachments?.map((file) => ({
          name: file.filename,
          size: file.content.length,
          base64: file.content.toString('base64'),
        })),
      },
    }
  } catch (e) {
    console.error('Error sending Business-in-Saudi email:', e)
    throw e
  }
}
