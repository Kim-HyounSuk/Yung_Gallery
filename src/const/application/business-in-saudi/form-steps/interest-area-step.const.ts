import { InterestAreaMap } from '@/type/application/business-in-saudi'

export const INTEREST_AREAS: InterestAreaMap = {
  partnership: {
    id: 'partnership',
    label: '파트너십',
    subItems: [
      { id: 'gov_cooperation', label: '정부 협력' },
      { id: 'biz_cooperation', label: '기업 간 협력' },
    ],
  },
  license: {
    id: 'license',
    label: '라이센스',
    subItems: [
      { id: 'legal_permit', label: '법적 허가' },
      { id: 'legal_service', label: '법률 서비스 제공' },
      { id: 'regulatory_access', label: '규제 기관 접근' },
      { id: 'corp_setup', label: '사우디 내 법인 설립 지원' },
      { id: 'insurance_service', label: '보험 서비스 제공' },
      { id: 'bank_account', label: '사우디 내 은행업무(계좌 개설)' },
      { id: 'product_registration', label: '제품등록(SFDA)' }, // 신규 - 좋음
      { id: 'quality_assurance', label: '품질보증(SASO)' }, // 신규 - 좋음
    ],
  },
  export: {
    id: 'export',
    label: '해외 유통 및 수출',
    subItems: [
      { id: 'export_declaration', label: '수출 신고 및 통관' },
      { id: 'local_distribution', label: '물류 및 현지 유통' },
      { id: 'local_marketing', label: '현지 마케팅 및 유통망 개척' },
      { id: 'warehouse', label: '물류 창고' },
    ],
  },
  incubator: {
    id: 'incubator',
    label: '인큐베이터/엑셀레이터',
    subItems: [
      { id: 'market_sizing', label: '시장 규모 파악' }, // 신규 (ID 수정 제안)
      { id: 'office_space', label: '사무공간' },
      { id: 'incubator_warehouse', label: '물류 창고' },
      { id: 'website_creation', label: '홈페이지 제작(영어, 아랍어)' },
    ],
  },
  khovar_mall: {
    // ID 변경 - 좋음
    id: 'khovar_mall',
    label: '코바르 몰 입점 지원',
    subItems: [
      { id: 'hiring', label: '직원 채용' }, // 신규 (ID 수정 제안)
      { id: 'emp_support', label: '직원 주거/차량 지원' }, // 신규 (ID 수정 제안)
      { id: 'quote_inquiry', label: '견적 문의(견적서 첨부)' },
      { id: 'trade_distribution', label: '무역 및 유통' }, // 신규 - 좋음
      { id: 'mall_warehouse', label: '물류 창고' },
      { id: 'on_off_marketing', label: '온/오프라인 마케팅' },
      { id: 'popup_inquiry', label: '팝업 문의' },
    ],
  },
  business_service: {
    id: 'business_service',
    label: '비즈니스 서비스 및 지원',
    subItems: [
      { id: 'payment_system', label: '결제 시스템 구축' },
      { id: 'global_expansion', label: '글로벌 서비스 확장(GCC, MENA AREA)' },
      { id: 'branding_marketing', label: '브랜딩 & 마케팅' },
      { id: 'networking', label: '비즈니스 교류(컨벤션, 행사 등)' },
    ],
  },
  other: {
    id: 'other',
    label: '기타',
    subItems: [{ id: 'other_input', label: '기타(Other)' }],
  },
} as const
