'use client'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useInterestAreaStep } from '@/hook/application/business-in-saudi'
import { getSubItemLabel } from '@/lib/application/business-in-saudi'
import { BusinessInSaudiFormData } from '@/type/application/business-in-saudi'
import { useFormContext } from 'react-hook-form'
import { AreaTabs } from './interest-area-tabs'
import { SelItemsBadgeList } from './sel-items-badge-list'

export function InterestAreaStep() {
  const { control } = useFormContext<BusinessInSaudiFormData>()

  const {
    selectedAreas,
    selectedSubItems,
    otherText,
    handleSubItemChange,
    handleRemoveSubItem,
    handleClearAll,
  } = useInterestAreaStep()

  return (
    <div className="flex flex-col gap-8 p-4 md:px-[50px]">
      <FormField
        control={control}
        name="interestArea.subitems"
        render={() => (
          <FormItem>
            <FormLabel asChild>
              <legend className="text-body-lg! font-semibold">
                관심 분야별 필요 지원 및 서비스 *
              </legend>
            </FormLabel>
            <FormDescription className="text-muted-foreground">
              필요한 지원 및 서비스를 관심 분야별로 선택해주세요 (복수 선택
              가능)
            </FormDescription>
            <FormControl>
              <AreaTabs
                selectedAreas={selectedAreas}
                selectedSubItems={selectedSubItems}
                onSubItemChange={handleSubItemChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* 선택된 항목 목록 */}
      <SelItemsBadgeList
        selectedSubItems={selectedSubItems}
        otherText={otherText}
        getSubItemLabel={getSubItemLabel}
        onRemove={handleRemoveSubItem}
        onClearAll={handleClearAll}
      />
    </div>
  )
}
