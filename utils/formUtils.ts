import type {FormErrors, FormTouched, FieldConfig} from '@types'
import {z} from 'zod'

export const extractFieldErrors = <T extends Record<string, any>>(
  issues: z.core.$ZodIssue[],
): FormErrors<T> =>
  issues.reduce((accumulator, issue) => {
    const fieldKey = issue.path[0] as keyof T

    if (!accumulator[fieldKey]) accumulator[fieldKey] = issue.message as any

    return accumulator
  }, {} as FormErrors<T>)

export const createAllTouchedState = <T extends Record<string, any>>(
  fields: FieldConfig[],
): FormTouched<T> =>
  fields.reduce((accumulator, field) => {
    accumulator[field.key as keyof T] = true

    return accumulator
  }, {} as FormTouched<T>)
