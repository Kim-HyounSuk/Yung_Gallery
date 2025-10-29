import { INTEREST_AREAS } from '@/const/application/business-in-saudi'
import { SubItemId } from '@/type/application/business-in-saudi'

/**
 * 세부 항목 ID로 라벨 가져오기
 */
export function getSubItemLabel(
  subItemId: SubItemId,
  otherText?: string,
): string {
  for (const area of Object.values(INTEREST_AREAS)) {
    const subItem = area.subItems.find((sub) => sub.id === subItemId)

    if (subItem) {
      // 기타 항목이고 직접 입력한 텍스트가 있으면
      if (subItemId === INTEREST_AREAS.other.subItems[0].id && otherText) {
        return `${area.label} > ${otherText}`
      }

      return `${area.label} > ${subItem.label}`
    }
  }

  return subItemId
}
