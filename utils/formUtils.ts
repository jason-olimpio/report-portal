import type {FormErrors, FormTouched, FieldConfig} from '@types'

export const extractFieldErrors = <T extends Record<string, any>>(
  fieldErrors: Record<string, unknown>,
): FormErrors<T> =>
  Object.entries(fieldErrors).reduce((accumulator, [fieldKey, errorValue]) => {
    if (Array.isArray(errorValue) && errorValue.length > 0)
      accumulator[fieldKey as keyof T] = errorValue[0] as string

    return accumulator
  }, {} as FormErrors<T>)

export const createAllTouchedState = <T extends Record<string, any>>(
  fields: FieldConfig[],
): FormTouched<T> =>
  fields.reduce((accumulator, field) => {
    accumulator[field.key as keyof T] = true

    return accumulator
  }, {} as FormTouched<T>)
