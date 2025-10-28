'use client'

import { Tabs } from '@/components/ui/tabs'
import { INTEREST_AREAS } from '@/const/application/business-in-saudi'
import { AreaId, SubItemId } from '@/type/application/business-in-saudi'
import { SubItemList } from './sub-item-list'

interface Props {
  selectedAreas: string[]
  selectedSubItems: string[]
  onSubItemChange: (
    areaId: AreaId,
    subItemId: SubItemId,
    checked: boolean,
  ) => void
}

export function AreaTabs({
  selectedAreas,
  selectedSubItems,
  onSubItemChange,
}: Props) {
  return (
    <Tabs defaultValue={Object.keys(INTEREST_AREAS)[0]}>
      {/* 관심분야 탭 목록 */}
      <Tabs.List>
        {Object.values(INTEREST_AREAS).map((area) => {
          const selectedCount = area.subItems.filter((sub) =>
            selectedSubItems.includes(sub.id),
          ).length

          return (
            <Tabs.Trigger key={area.id} value={area.id}>
              {area.label}
              {selectedAreas.includes(area.id) && (
                <span className="text-body-sm text-muted-foreground">
                  ({selectedCount})
                </span>
              )}
            </Tabs.Trigger>
          )
        })}
      </Tabs.List>

      {/* 세부 항목 탭 컨텐츠 */}
      {Object.values(INTEREST_AREAS).map((area) => (
        <Tabs.Content
          className="flex flex-col gap-2"
          key={area.id}
          value={area.id}
        >
          <SubItemList
            area={area}
            selectedSubItems={selectedSubItems}
            onSubItemChange={onSubItemChange}
          />
        </Tabs.Content>
      ))}
    </Tabs>
  )
}
