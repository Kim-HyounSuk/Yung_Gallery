import { FormConfig } from '@/type/application'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'sonner'

export function useSubmitApplication(config: FormConfig) {
  const [isSubmit, setIsSubmit] = useState(false)
  const { getValues, reset } = useFormContext()

  const submit = async () => {
    setIsSubmit(true)

    try {
      const formValues = getValues()

      // 디버깅: 폼 데이터 확인
      console.log('Form values:', formValues)
      console.log('Document uploads:', formValues.companyInfo?.documentUploads)

      // FormData 생성
      const formData = new FormData()

      // 파일을 제외한 데이터를 JSON으로 직렬화
      const dataToSend = { ...formValues }

      // JSON 데이터를 FormData에 추가
      formData.append('data', JSON.stringify(dataToSend))

      const res = await fetch(config.submitEndpoint, {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        console.error('Server validation error:', errorData)
        throw new Error(errorData.error || '제출에 실패했습니다')
      }

      // 성공
      toast.success('성공적으로 제출되었습니다.')

      // 폼 리셋
      reset()

      setTimeout(() => {
        redirect('/')
      }, 1000)
    } catch (error) {
      toast.error((error as Error).message || '제출 중 오류가 발생했습니다.')
      console.error('Submit error:', error)
    } finally {
      setIsSubmit(false)
    }
  }

  return {
    submit,
    isSubmit,
  }
}
