'use client'

import { extractFiles } from '@/lib/application'
import { usePreviewStore } from '@/store/application'
import type { FormData } from '@/type/application'
import { FormConfig } from '@/type/application'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

/**
 * 폼 페이지에서 사용: 데이터 검증 및 미리보기 생성
 */
export function useGeneratePreview(config: FormConfig) {
  const router = useRouter()
  const [isSubmit, setIsSubmit] = useState(false)
  const setPreviewData = usePreviewStore((state) => state.setPreviewData)
  const setFormData = usePreviewStore((state) => state.setFormData)
  const setFiles = usePreviewStore((state) => state.setFiles)

  const generatePreview = async (formValues: FormData) => {
    setIsSubmit(true)

    try {
      const { cleanData, files } = extractFiles(formValues)

      // FormData 생성
      const formData = new FormData()
      formData.append('data', JSON.stringify(cleanData))
      files.forEach((file) => formData.append('files', file))

      const res = await fetch(`/api/application/${config.id}/create-preview`, {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        console.error('Server validation error:', errorData)
        throw new Error(errorData.error || '검증에 실패했습니다')
      }

      const responseData = await res.json()

      // preview 데이터, 파일, 폼 데이터를 store에 저장
      if (responseData.previewData) {
        setPreviewData(responseData.previewData)
      }

      // FormData를 스토어에 저장
      setFormData(formValues)
      setFiles(files)

      toast.success('미리보기 화면으로 이동됩니다')

      setTimeout(() => {
        router.push(`/application/${config.id}/preview`)
      }, 1000)
    } catch (error) {
      toast.error(
        (error as Error).message || '미리보기 생성 중 오류가 발생했습니다.',
      )
      console.error('Preview generation error:', error)
    } finally {
      setIsSubmit(false)
    }
  }

  return {
    generatePreview,
    isSubmit,
  }
}

/**
 * Preview 페이지에서 사용: 메일 발송
 */
export function useSubmitEmail(config: FormConfig) {
  const router = useRouter()
  const [isSubmit, setIsSubmit] = useState(false)

  const submitEmail = async () => {
    setIsSubmit(true)

    try {
      const { previewData, formData, files } = usePreviewStore.getState()

      if (!previewData) {
        throw new Error('미리보기 데이터가 없습니다')
      }

      if (!formData) {
        throw new Error('폼 데이터가 없습니다')
      }

      const { cleanData } = extractFiles(formData)

      // FormData 생성
      const sendFormData = new FormData()
      sendFormData.append('data', JSON.stringify(cleanData))
      sendFormData.append('emailHtml', previewData.emailHtml)

      // 파일 추가
      files.forEach((file) => {
        sendFormData.append('files', file)
      })

      // 검증된 데이터로 메일 발송
      const res = await fetch(`/api/application/${config.id}/send-mail`, {
        method: 'POST',
        body: sendFormData,
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        console.error('Email send error:', errorData)
        throw new Error(errorData.error || '메일 발송에 실패했습니다')
      }

      // 성공
      toast.success('성공적으로 제출되었습니다.')

      // store 초기화
      usePreviewStore.setState({
        previewData: null,
        files: [],
        formData: null,
      })

      setTimeout(() => {
        router.push(`/application/business-in-saudi`)
      })
    } catch (error) {
      toast.error(
        (error as Error).message || '메일 발송 중 오류가 발생했습니다.',
      )
      console.error('Email submit error:', error)
    } finally {
      setIsSubmit(false)
    }
  }

  return {
    submitEmail,
    isSubmit,
  }
}

/**
 * 하위호환성을 위한 통합 hook (deprecated)
 */
export function useSubmitApplication(config: FormConfig) {
  const { generatePreview, isSubmit: isGenerating } = useGeneratePreview(config)
  const { submitEmail, isSubmit: isSubmitting } = useSubmitEmail(config)

  return {
    generatePreview,
    submitEmail,
    isSubmit: isGenerating || isSubmitting,
  }
}
