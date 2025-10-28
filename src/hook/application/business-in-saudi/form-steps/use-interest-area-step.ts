'use client'

import { INTEREST_AREAS } from '@/const/application/business-in-saudi'
import {
  AreaId,
  BusinessInSaudiFormData,
  SubItemId,
} from '@/type/application/business-in-saudi'
import { useFormContext } from 'react-hook-form'

export function useInterestAreaStep() {
  const form = useFormContext<BusinessInSaudiFormData>()

  const selectedAreas = form.watch('interestArea.areas') || []
  const selectedSubItems = form.watch('interestArea.subitems') || []
  const otherText = form.watch('interestArea.otherText') || ''

  /**
   * 세부 항목 선택/해제 처리
   */
  const handleSubItemChange = (
    areaId: AreaId,
    subItemId: SubItemId,
    checked: boolean,
  ) => {
    if (checked) {
      // 세부 항목 추가
      const newSubItems = [...selectedSubItems, subItemId]
      form.setValue('interestArea.subitems', newSubItems, {
        shouldValidate: true,
      })

      // 관심분야가 선택되어 있지 않으면 추가
      if (!selectedAreas.includes(areaId)) {
        const newAreas = [...selectedAreas, areaId]
        form.setValue('interestArea.areas', newAreas, {
          shouldValidate: true,
        })
      }
    } else {
      // 세부 항목 제거
      const newSubItems = selectedSubItems.filter((id) => id !== subItemId)
      form.setValue('interestArea.subitems', newSubItems, {
        shouldValidate: true,
      })

      // 기타 항목 해제시 otherText 초기화
      if (subItemId === 'other_custom') {
        form.setValue('interestArea.otherText', '', {
          shouldValidate: true,
        })
      }

      // 해당 관심분야의 다른 세부 항목이 없으면 관심분야도 제거
      const area = INTEREST_AREAS[areaId]
      const hasOtherSubItems = area.subItems.some(
        (sub) => sub.id !== subItemId && newSubItems.includes(sub.id),
      )

      if (!hasOtherSubItems) {
        const newAreas = selectedAreas.filter((id) => id !== areaId)
        form.setValue('interestArea.areas', newAreas, {
          shouldValidate: true,
        })
      }
    }
  }

  /**
   * Badge에서 세부 항목 제거
   */
  const handleRemoveSubItem = (subItemId: SubItemId) => {
    let areaId: AreaId | null = null

    for (const [id, area] of Object.entries(INTEREST_AREAS)) {
      if (area.subItems.some((sub) => sub.id === subItemId)) {
        areaId = id as AreaId
        break
      }
    }

    if (areaId) {
      handleSubItemChange(areaId, subItemId, false)
    }
  }

  /**
   * 전체 삭제
   */
  const handleClearAll = () => {
    form.setValue('interestArea.areas', [], { shouldValidate: true })
    form.setValue('interestArea.subitems', [], { shouldValidate: true })
    form.setValue('interestArea.otherText', '', { shouldValidate: true })
  }

  return {
    selectedAreas,
    selectedSubItems,
    otherText,
    handleSubItemChange,
    handleRemoveSubItem,
    handleClearAll,
  }
}
