'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SubItemId } from '@/type/application/business-in-saudi'
import { X } from 'lucide-react'

interface Props {
  selectedSubItems: SubItemId[]
  otherText: string
  getSubItemLabel: (subItemId: SubItemId, otherText?: string) => string
  onRemove: (subItemId: SubItemId) => void
  onClearAll: () => void
}

export function SelItemsBadgeList({
  selectedSubItems,
  otherText,
  getSubItemLabel,
  onRemove,
  onClearAll,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h4 className="text-body-lg font-semibold">선택된 지원 및 서비스</h4>
        {selectedSubItems.length > 0 && (
          <Button
            onClick={onClearAll}
            type="button"
            variant="outline"
            size="sm"
          >
            전체 삭제
          </Button>
        )}
      </div>

      {selectedSubItems.length > 0 ? (
        <div className="flex flex-col gap-4">
          {selectedSubItems.map((subItemId) => (
            <Badge
              key={subItemId}
              className="max-w-full px-0 pr-2 pl-4"
              variant="outline"
            >
              <span className="text-primary text-body-sm min-w-0 truncate">
                {getSubItemLabel(subItemId, otherText)}
              </span>
              <Button
                className="hover:text-destructive hover:bg-inherit"
                onClick={() => onRemove(subItemId)}
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
  )
}
