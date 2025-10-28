export type AreaId =
  | 'partnership'
  | 'license'
  | 'export'
  | 'incubator'
  | 'dammam_mall'
  | 'business_service'
  | 'other'
export type SubItemId = string

export interface SubItem {
  id: SubItemId
  label: string
}

export interface InterestArea {
  id: AreaId
  label: string
  subItems: SubItem[]
}

export type InterestAreaMap = Record<AreaId, InterestArea>
