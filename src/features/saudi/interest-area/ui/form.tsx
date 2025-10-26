'use client'

import { SaudiFormData } from '@/entities/application/model'
import {
  AreaId,
  INTEREST_AREAS,
  SubItemId,
} from '@/features/saudi/interest-area/model'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Checkbox } from '@/shared/ui/checkbox'
import { Tabs } from '@/shared/ui/custom/tabs'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { X } from 'lucide-react'

import { UseFormReturn } from 'react-hook-form'

interface Props {
  form: UseFormReturn<SaudiFormData>
}

export function InterestAreaForm({ form }: Props) {
  const selAreas = form.watch('interestArea.areas') || []
  const selSubItems = form.watch('interestArea.subitems') || []
  const otherText = form.watch('interestArea.otherText') || ''

  const handleSubItemChage = (
    areaId: AreaId,
    subItemId: SubItemId,
    checked: boolean,
  ) => {
    if (checked) {
      // 세부 항목 추가
      const newSubItems = [...selSubItems, subItemId]
      form.setValue('interestArea.subitems', newSubItems, {
        shouldValidate: true,
      })

      // 관심분야가 선택되어 있지 않으면 추가
      if (!selAreas.includes(areaId)) {
        const newAreas = [...selAreas, areaId]
        form.setValue('interestArea.areas', newAreas, { shouldValidate: true })
      }
    } else {
      // 세부 항목 제거
      const newSubItems = selSubItems.filter((id) => id !== subItemId)
      form.setValue('interestArea.subitems', newSubItems, {
        shouldValidate: true,
      })

      // 기타 항목 해제시 otherText 초기화
      if (subItemId === 'other_custom') {
        form.setValue('interestArea.otherText', '', { shouldValidate: true })
      }

      // 해당 관심분야의 다른 세부 항목이 없으면 관심분야도 제거
      const area = INTEREST_AREAS[areaId]
      const hasOtherSubItems = area.subItems.some(
        (sub) => sub.id !== subItemId && newSubItems.includes(sub.id),
      )

      if (!hasOtherSubItems) {
        const newAreas = selAreas.filter((id) => id !== areaId)
        form.setValue('interestArea.areas', newAreas, { shouldValidate: true })
      }
    }
  }

  // Badge에서 세부 항목 제거
  const handleRemoveSubItems = (subItemId: SubItemId) => {
    let areaId = ''
    for (const [id, area] of Object.entries(INTEREST_AREAS)) {
      if (area.subItems.some((sub) => sub.id === subItemId)) {
        areaId = id
        break
      }
    }

    if (areaId) {
      handleSubItemChage(areaId as AreaId, subItemId, false)
    }
  }

  // 선택된 세부 항목의 레이블 가져오기
  const getSubItemLabel = (subItemId: SubItemId) => {
    for (const area of Object.values(INTEREST_AREAS)) {
      const subItem = area.subItems.find((sub) => sub.id === subItemId)
      if (subItem) {
        if (subItemId === 'other_custom' && otherText)
          return `${area.label} > ${otherText}`

        return `${area.label} > ${subItem.label}`
      }
    }

    return subItemId
  }

  const isSelOther = selSubItems.includes('other_custom')

  return (
    <div className="flex flex-col gap-8 p-4 md:px-[50px]">
      <FormField
        control={form.control}
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
              <Tabs defaultValue={Object.keys(INTEREST_AREAS)[0]}>
                {/* 관심분야 영역 */}
                <Tabs.List>
                  {Object.values(INTEREST_AREAS).map((area) => (
                    <Tabs.Trigger key={area.id} value={area.id}>
                      {area.label}
                      {selAreas.includes(area.id) && (
                        <span className="text-body-sm text-muted-foreground">
                          (
                          {
                            area.subItems.filter((sub) =>
                              selSubItems.includes(sub.id),
                            ).length
                          }
                          )
                        </span>
                      )}
                    </Tabs.Trigger>
                  ))}
                </Tabs.List>

                {/* 세부 항목 영역 */}
                {Object.values(INTEREST_AREAS).map((area) => (
                  <Tabs.Content
                    className="flex flex-col gap-2"
                    key={area.id}
                    value={area.id}
                  >
                    <div className="flex flex-col gap-4">
                      {area.subItems.map((subItem) => (
                        <div
                          className="flex items-center gap-2"
                          key={subItem.id}
                        >
                          <Checkbox
                            className="border-primary"
                            id={`sel-${subItem.id}`}
                            checked={selSubItems.includes(subItem.id)}
                            onCheckedChange={(checked) =>
                              handleSubItemChage(
                                area.id,
                                subItem.id,
                                checked as boolean,
                              )
                            }
                          />
                          <Label
                            htmlFor={`sel-${subItem.id}`}
                            className="text-body-md! font-normal!"
                          >
                            {subItem.label}
                          </Label>

                          {/* 직접입력 영역 Input */}
                          {area.id === 'other' && isSelOther && (
                            <FormField
                              control={form.control}
                              name="interestArea.otherText"
                              render={({ field }) => (
                                <FormItem>
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
                  </Tabs.Content>
                ))}
              </Tabs>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* 선택된 관심분야 세부항목 영역 */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h4 className="text-body-lg font-semibold">선택된 지원 및 서비스</h4>
          <Button
            onClick={() => {
              form.setValue('interestArea.areas', [], {
                shouldValidate: true,
              })
              form.setValue('interestArea.subitems', [], {
                shouldValidate: true,
              })
              form.setValue('interestArea.otherText', '', {
                shouldValidate: true,
              })
            }}
            type="button"
            variant="outline"
            size="sm"
          >
            전체 삭제
          </Button>
        </div>
        {selSubItems.length > 0 ? (
          <div className="flex flex-col gap-4">
            {selSubItems.map((subItemId) => (
              <Badge
                key={subItemId}
                className="max-w-full px-0 pr-2 pl-4"
                variant="outline"
              >
                <span className="text-primary text-body-sm min-w-0 truncate">
                  {getSubItemLabel(subItemId)}
                </span>
                <Button
                  className="hover:text-destructive hover:bg-inherit"
                  onClick={() => handleRemoveSubItems(subItemId)}
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        ) : (
          <div className="text-muted-foreground my-8 flex items-center justify-center">
            선택된 항목이 없습니다
          </div>
        )}
      </div>
    </div>
  )
}
