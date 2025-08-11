/**
 * FormTypes.ts
 *
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Type definitions for form-related data structures and interfaces.
 * Includes field configurations, form validation types, and rendering strategies
 * for dynamic form generation.
 */

import {ComponentProps, ReactElement} from 'react'
import {TextInput} from 'react-native'

export enum FormField {
  Text,
  ImageSlider,
  Location,
}

type BaseFieldConfig = {
  key: string
  label: string
}

export type FieldConfig = BaseFieldConfig & {
  type?: FormField
  inputProps?: Partial<ComponentProps<typeof TextInput>>
  maxImages?: number
}

export type FormErrors<T> = Partial<Record<keyof T, string>>
export type FormTouched<T> = Partial<Record<keyof T, boolean>>

export type FieldRenderContext<T> = {
  form: T
  touched: FormTouched<T>
  errors: FormErrors<T>
  handleChange: (field: keyof T, value: T[keyof T]) => void
}

export interface FieldRenderStrategy<T extends Record<string, any>> {
  canRender(field: FieldConfig): boolean
  render(
    field: FieldConfig,
    fieldKey: keyof T,
    context: FieldRenderContext<T>,
  ): ReactElement
}
