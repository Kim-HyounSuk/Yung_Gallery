import {
  FormWizardContent,
  FormWizardNav,
  FormWizardRoot,
  FormWizardStepBar,
} from './form-wizard'

export const FormWizard = Object.assign(FormWizardRoot, {
  Nav: FormWizardNav,
  StepBar: FormWizardStepBar,
  Content: FormWizardContent,
})
