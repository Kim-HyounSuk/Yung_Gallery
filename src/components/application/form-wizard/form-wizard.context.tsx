'use client'

import { Form } from '@/components/ui/form'
import { usePreviewStore } from '@/store/application'
import { FormConfig, FormData, FormStep } from '@/type/application'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { useForm } from 'react-hook-form'

interface FormWizardContextValue {
  config: FormConfig
  curStep: FormStep
  curStepIdx: number
  goToNext: () => Promise<boolean>
  goToPrev: () => void
  goToStep: (idx: number) => void
  isFirstStep: boolean
  isLastStep: boolean
  getFormValues: () => FormData
  restoreFormData: () => void
}

const FormWizardContext = createContext<FormWizardContextValue | null>(null)

export function useFormWizard() {
  const context = useContext(FormWizardContext)
  if (!context) {
    throw new Error('useFormWizardContext must be within FormWizardProvider')
  }
  return context
}

interface FormWizardProviderProps {
  config: FormConfig
  children: React.ReactNode
}

export function FormWizardProvider({
  config,
  children,
}: FormWizardProviderProps) {
  const { formData: storedFormData } = usePreviewStore()

  const defaultValues = useMemo(() => {
    return storedFormData || config.defaultValues
  }, [storedFormData, config.defaultValues])

  const form = useForm({
    resolver: zodResolver(config.schema),
    defaultValues,
    mode: 'onChange',
  })

  const [curStepIdx, setCurStepIdx] = useState(0)

  const curStep = config.steps[curStepIdx]
  const isFirstStep = curStepIdx === 0
  const isLastStep = curStepIdx === config.steps.length - 1

  const goToNext = useCallback(async () => {
    const isValid = await form.trigger(curStep.fieldName)

    if (isValid && !isLastStep) {
      setCurStepIdx((prev) => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return isValid
  }, [form, curStep, isLastStep])

  const goToPrev = useCallback(() => {
    if (!isFirstStep) {
      setCurStepIdx((prev) => prev - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [isFirstStep])

  const goToStep = useCallback(
    (idx: number) => {
      if (idx >= 0 && idx < config.steps.length) {
        setCurStepIdx(idx)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
    [config.steps.length],
  )

  const restoreFormData = useCallback(() => {
    if (storedFormData) {
      form.reset(storedFormData)
    }
  }, [form, storedFormData])

  return (
    <Form {...form}>
      <FormWizardContext.Provider
        value={{
          config,
          curStep,
          curStepIdx,
          goToNext,
          goToPrev,
          goToStep,
          isFirstStep,
          isLastStep,
          getFormValues: form.getValues,
          restoreFormData,
        }}
      >
        {children}
      </FormWizardContext.Provider>
    </Form>
  )
}
