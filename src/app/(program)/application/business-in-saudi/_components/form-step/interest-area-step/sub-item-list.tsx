'use client'

import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { INTEREST_AREAS } from '@/const/application/business-in-saudi'
import {
  AreaId,
  BusinessInSaudiFormData,
  InterestArea,
  SubItemId,
} from '@/type/application/business-in-saudi'
import { useFormContext } from 'react-hook-form'

interface Props {
  area: InterestArea
  selectedSubItems: string[]
  onSubItemChange: (
    areaId: AreaId,
    subItemId: SubItemId,
    checked: boolean,
  ) => void
}

export function SubItemList({
  area,
  selectedSubItems,
  onSubItemChange,
}: Props) {
  const { control } = useFormContext<BusinessInSaudiFormData>()
  const isOtherSelected = selectedSubItems.includes(
    INTEREST_AREAS.other.subItems[0].id,
  )

  return (
    <div className="flex flex-col gap-4">
      {area.subItems.map((subItem) => (
        <div className="flex items-center gap-2" key={subItem.id}>
          <Checkbox
            className="border-primary"
            id={`sel-${subItem.id}`}
            checked={selectedSubItems.includes(subItem.id)}
            onCheckedChange={(checked) =>
              onSubItemChange(area.id, subItem.id, checked as boolean)
            }
          />
          <Label
            htmlFor={`sel-${subItem.id}`}
            className="text-body-md! font-normal!"
          >
            {subItem.label}
          </Label>

          {/* 기타 항목 직접입력 */}
          {area.id === INTEREST_AREAS.other.id &&
            subItem.id === INTEREST_AREAS.other.subItems[0].id &&
            isOtherSelected && (
              <FormField
                control={control}
                name="interestArea.otherText"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="직접 입력" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
        </div>
      ))}
    </div>
  )
}
