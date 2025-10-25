export const INTEREST_AREAS = {
  partnership: {
    id: 'partnership',
    label: '파트너십',
    subItems: [
      { id: 'government_cooperation', label: '정부 협력' },
      { id: 'business_cooperation', label: '기업간 협력' },
    ],
  },
  license: {
    id: 'license',
    label: '라이센스',
    subItems: [
      { id: 'legal_permit', label: '법적 허가' },
      { id: 'legal_service_provider', label: '법률 서비스 제공자 연결' },
      { id: 'regulatory_access', label: '규제기관 접근' },
      { id: 'saudi_corporation_support', label: '사우디 내 법인 설립지원' },
      { id: 'insurance_provider', label: '보험 서비스 제공자 연결' },
      { id: 'saudi_bank_account', label: '사우디 내 기업은행 계좌개설 지원' },
    ],
  },
  export: {
    id: 'export',
    label: '해외 유통 및 수출',
    subItems: [
      { id: 'export_declaration', label: '수출신고 및 통관' },
      { id: 'local_distribution', label: '물류 및 현지유통' },
      { id: 'local_marketing', label: '현지 마케팅 및 유통망 개척' },
    ],
  },
  incubator: {
    id: 'incubator',
    label: '인큐베이터/엑셀레이터',
    subItems: [
      { id: 'market_analysis', label: '시장 규모 파악' },
      { id: 'office_space', label: '사무공간 확보 지원' },
    ],
  },
  dammam_mall: {
    id: 'dammam_mall',
    label: '담암몰 입점 지원',
    subItems: [
      { id: 'recruitment', label: '직원 채용' },
      { id: 'interior_quote', label: '인터리어 견적 문의' },
      { id: 'trade_distribution', label: '무역 및 유통' },
      { id: 'warehouse', label: '창고' },
      { id: 'employee_support', label: '직원 주거/차량 지원' },
    ],
  },
  business_service: {
    id: 'business_service',
    label: '비즈니스 서비스 및 지원',
    subItems: [
      { id: 'telecom_provider', label: '통신 서비스 제공자 연결' },
      { id: 'overseas_expansion', label: '해외 시장 서비스 확장 지원' },
      { id: 'marketing_support', label: '마케팅 지원' },
      {
        id: 'business_networking',
        label: '비즈니스 네트워킹(행사, 협의회 등) 지원',
      },
    ],
  },
  other: {
    id: 'other',
    label: '기타',
    subItems: [{ id: 'other_custom', label: '기타(Other)' }],
  },
} as const
