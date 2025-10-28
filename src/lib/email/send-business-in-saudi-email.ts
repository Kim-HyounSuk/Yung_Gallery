import {
  INTEREST_AREAS,
  MANAGER_MAPPING,
  SUPER_MANAGER,
} from '@/const/application/business-in-saudi'
import {
  AreaId,
  BusinessInSaudiFormData,
} from '@/type/application/business-in-saudi'
import { render } from '@react-email/components'
import { resend } from './resend'
import BusinessInSaudiEmail from './templates/business-in-saudi-template'

type Manager = {
  email: string
  name: string
}

export async function sendBusinessInSaudiEmail(
  formData: BusinessInSaudiFormData,
  attachments?: {
    filename: string
    content: Buffer
  }[],
) {
  try {
    // 1. 관심분야와 세부항목의 label 추출
    const selectedInterestAreas = formData.interestArea.areas
      .map((areaId) => INTEREST_AREAS[areaId as AreaId]?.label)
      .filter(Boolean) as string[]

    const selectedSubItems = formData.interestArea.subitems.map((subItemId) => {
      // 기타 항목인 경우 사용자가 입력한 텍스트 반환
      if (subItemId === 'other_custom' && formData.interestArea.otherText) {
        return formData.interestArea.otherText
      }

      // 각 관심분야의 세부항목에서 label 찾기
      for (const area of Object.values(INTEREST_AREAS)) {
        const subItem = area.subItems.find((item) => item.id === subItemId)
        if (subItem) {
          return subItem.label
        }
      }

      return subItemId
    })

    // 2. 중복 제거를 위한 Set 사용
    const recipientEmails = new Set<string>()
    const recipients: Manager[] = []

    // 3. 선택된 관심분야의 담당자 수집
    for (const areaId of formData.interestArea.areas) {
      const managers = MANAGER_MAPPING[areaId]
      if (managers) {
        managers.forEach((manager) => {
          if (!recipientEmails.has(manager.email)) {
            recipientEmails.add(manager.email)
            recipients.push(manager)
          }
        })
      }
    }

    // 4. 최고 담당자 추가 (중복 체크)
    if (!recipientEmails.has(SUPER_MANAGER.email)) {
      recipientEmails.add(SUPER_MANAGER.email)
      recipients.push(SUPER_MANAGER)
    }

    // 5. 이메일 HTML 렌더링
    const emailHtml = await render(
      BusinessInSaudiEmail({
        formData,
        selectedInterestAreas,
        selectedSubItems,
      }),
    )

    // 6. 이메일 발송 (담당자별로 개별 발송)
    const sendPromises = recipients.map(async (recipient) => {
      return resend.emails.send({
        from: process.env.EMAIL_FROM || 'noreply@yunggallery.com',
        to: recipient.email,
        subject: `[Business in Saudi] ${formData.companyInfo.companyName} 신청서`,
        html: emailHtml,
        attachments: attachments?.map((file) => ({
          filename: file.filename,
          content: file.content,
        })),
      })
    })

    // 7. 모든 이메일 발송 완료 대기
    const results = await Promise.allSettled(sendPromises)

    // 8. 발송 실패 체크
    const failedEmails = results
      .map((result, index) => {
        if (result.status === 'rejected') {
          return {
            email: recipients[index].email,
            error: result.reason,
          }
        }
        return null
      })
      .filter(Boolean)

    if (failedEmails.length > 0) {
      console.error('Failed to send emails:', failedEmails)
      throw new Error(
        `Failed to send emails to: ${failedEmails.map((f) => f?.email).join(', ')}`,
      )
    }

    return {
      success: true,
      recipientCount: recipients.length,
      recipients: recipients.map((r) => r.email),
    }
  } catch (error) {
    console.error('Error sending business-in-saudi email:', error)
    throw error
  }
}
