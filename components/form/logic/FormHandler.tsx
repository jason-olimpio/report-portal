import {useState, useEffect} from 'react'
import {Alert, View} from 'react-native'
import z, {ZodType} from 'zod'

import {useTranslation} from 'react-i18next'
import {useUserLocation} from '@hooks'

import FieldRenderer from './FieldRenderer'

import {SaveButton} from '@components'

import {extractFieldErrors, createAllTouchedState} from '@utils'

import {
  type FormErrors,
  type FormTouched,
  type FieldRenderContext,
  type FieldConfig,
  FormField,
} from '@types'

type FormHandlerProps<T extends Record<string, any>> = {
  schema: ZodType<T>
  initialState: T
  fields: FieldConfig[]
  onSave?: (data: T) => Promise<void> | void
  className?: string
  saveButtonLabel?: string
}

const FormHandler = <T extends Record<string, any>>({
  schema,
  initialState,
  fields,
  onSave,
  className,
  saveButtonLabel,
}: FormHandlerProps<T>) => {
  const {t} = useTranslation()
  const {getCurrentPosition} = useUserLocation()

  const [form, setForm] = useState<T>(initialState)
  const [errors, setErrors] = useState<FormErrors<T>>({})
  const [touched, setTouched] = useState<FormTouched<T>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fieldRenderer = new FieldRenderer<T>()

  useEffect(() => {
    setForm(initialState)

    const hasLocationField = fields.some(
      field => field.type === FormField.Location,
    )

    if (hasLocationField) captureLocation()
  }, [initialState, fields])

  const captureLocation = async () => {
    try {
      const location = await getCurrentPosition()

      const locationField = fields.find(
        field => field.type === FormField.Location,
      )

      if (!locationField) return

      setForm(currentForm => ({
        ...currentForm,
        [locationField.key]: location,
      }))
    } catch {
      Alert.alert(t('errors.locationError'))
    }
  }

  const handleChange = (field: keyof T, value: T[keyof T]) => {
    setForm(currentForm => ({...currentForm, [field]: value}))
    setTouched(currentTouched => ({...currentTouched, [field]: true}))
    validate(field, value)
  }

  const validate = (field: keyof T, value: T[keyof T]) => {
    const updatedForm = {...form, [field]: value}
    const result = schema.safeParse(updatedForm)

    if (result.success) {
      setErrors(currentErrors => ({...currentErrors, [field]: undefined}))
      return
    }

    const tree = z.treeifyError(result.error)
    const fieldIssues = (tree as any)[field]?._errors

    setErrors(currentErrors => ({
      ...currentErrors,
      [field]: fieldIssues ? fieldIssues[0] : undefined,
    }))
  }

  const handleSave = async () => {
    const allTouched = createAllTouchedState<T>(fields)
    setTouched(allTouched)

    const {success, error} = schema.safeParse(form)

    if (!success) {
      const fieldErrors = extractFieldErrors<T>(error.issues)
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    setIsSubmitting(true)

    try {
      if (onSave) {
        await onSave(form)
        resetFormState()
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetFormState = () => {
    setForm(initialState)
    setTouched({})
  }

  const renderContext: FieldRenderContext<T> = {
    form,
    touched,
    errors,
    handleChange,
  }

  return (
    <View
      className={`p-5 mb-6 rounded-xl bg-background-secondaryLight 
      dark:bg-background-secondaryDark ${className || ''}`}>
      {fields.map(field => {
        const fieldKey = field.key as keyof T

        return fieldRenderer.render(field, fieldKey, renderContext)
      })}

      <SaveButton
        onPress={handleSave}
        disabled={isSubmitting}
        label={saveButtonLabel}
        isSubmitting={isSubmitting}
      />
    </View>
  )
}

export default FormHandler
