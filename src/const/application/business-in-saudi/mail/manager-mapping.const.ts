type Manager = {
  email: string
  name: string
  isSuper?: boolean // 최고 담당자 여부
}

type ManagerMapping = {
  [key: string]: Manager[] // 관심분야 ID별 담당자 배열
}

export const MANAGER_MAPPING: ManagerMapping = {
  partnership: [{ email: 'vanlan6499@gmail.com', name: '파트너십 담당자' }],
  license: [{ email: 'vanlan6499@gmail.com', name: '라이센스 담당자' }],
  export: [{ email: 'vanlan6499@gmail.com', name: '해외유통 담당자' }],
  incubator: [{ email: 'vanlan6499@gmail.com', name: '인큐베이터 담당자' }],
  dammam_mall: [{ email: 'vanlan6499@gmail.com', name: '담암몰 담당자' }],
  business_service: [
    { email: 'vanlan6499@gmail.com', name: '비즈니스서비스 담당자' },
  ],
  other: [{ email: 'vanlan6499@gmail.com', name: '기타문의 담당자' }],
}

// 최고 담당자 (모든 관심분야의 메일을 받음)
export const SUPER_MANAGER: Manager = {
  email: 'vanlan6499@gmail.com',
  name: '최고 담당자',
  isSuper: true,
}
