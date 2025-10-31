import { INTEREST_AREAS } from '@/const/application/business-in-saudi'
import {
  AreaId,
  BusinessInSaudiFormData,
} from '@/type/application/business-in-saudi'
import { render } from '@react-email/components'
import { EmailTemplate } from './email-template'

interface Props {
  formData: BusinessInSaudiFormData
  attachments?: {
    filename: string
    content: Buffer
  }
}

export async function createEmail({ formData }: Props) {
  // 1. 관심분야와 세부항목의 label 추출
  const selectedInterestAreas = formData.interestArea.areas
    .map((areaId) => INTEREST_AREAS[areaId as AreaId]?.label)
    .filter(Boolean) as string[]

  const selectedSubItems = formData.interestArea.subitems.map((subItemId) => {
    // 기타 항목인 경우 사용자가 입력한 텍스트 반환
    if (
      subItemId === INTEREST_AREAS.other.subItems[0].id &&
      formData.interestArea.otherText
    ) {
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

  // 2. 이메일 HTML 렌더링
  const emailHtml = await render(
    EmailTemplate({
      formData,
      selectedInterestAreas,
      selectedSubItems,
    }),
  )

  return emailHtml
}
