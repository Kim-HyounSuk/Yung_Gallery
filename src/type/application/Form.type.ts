import { FieldValues, Path, UseFormProps } from 'react-hook-form'
import { ZodType } from 'zod'

/**
 * 기본 폼 데이터 타입
 */
export type FormData = FieldValues

/**
 * 폼 개별 Step 타입
 */
export interface FormStep<T extends FormData = FormData> {
  id: string
  component: React.ComponentType
  fieldName: Path<T>
}

/**
 * 폼 전체 설정 타입
 */
export interface FormConfig<T extends FormData = FormData> {
  id: string
  schema: ZodType<T, T>
  steps: FormStep<T>[]
  submitEndpoint: string
  defaultValues: UseFormProps<T>['defaultValues']
}
