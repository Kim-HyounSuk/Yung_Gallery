import { FormConfig } from '@/type/application'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'sonner'

export function useSubmitApplication(config: FormConfig) {
  const [isSubmit, setIsSubmit] = useState(false)
  const { getValues, reset } = useFormContext()

  const submit = async () => {
    setIsSubmit(true)

    try {
      const formData = getValues()

      const res = await fetch(config.submitEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        throw new Error('제출에 실패했습니다')
      }

      // 성공
      toast.success('성공적으로 제출되었습니다.')

      // 폼 리셋
      reset()
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
