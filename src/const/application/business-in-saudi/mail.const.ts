import { Manager, ManagerMap } from '@/type/application'

export const MANAGER_MAP: ManagerMap = {
  partnership: [],
  license: [],
  export: [],
  incubator: [],
  dammam_mall: [],
  business_service: [],
  other: [],
}

// 최고 담당자 (모든 관심분야의 메일을 받음)
export const SUPER_MANAGER: Manager = {
  email: process.env.SUPER_MANAGER!,
  name: '최고 담당자',
  isSuper: true,
}
