import {createElement, ReactElement} from 'react'

import {TextField} from '@components'

import {
  type FieldConfig,
  FieldRenderStrategy,
  type FieldRenderContext,
  FormField,
} from '@types'

class TextFieldStrategy<T extends Record<string, any>>
  implements FieldRenderStrategy<T>
{
  canRender({type}: FieldConfig): boolean {
    return type === FormField.Text
  }

  render(
    field: FieldConfig,
    fieldKey: keyof T,
    context: FieldRenderContext<T>,
  ): ReactElement {
    if (!this.canRender(field))
      throw new Error('TextFieldStrategy cannot render this field type')

    const {form, touched, errors, handleChange} = context
    const fieldProps = {
      label: field.label,
      error: touched[fieldKey] && errors[fieldKey],
    }

    return createElement(TextField, {
      key: fieldKey as string,
      ...fieldProps,
      value: form[fieldKey] as string,
      onChangeText: (value: string) =>
        handleChange(fieldKey, value as T[typeof fieldKey]),
      ...field.inputProps,
    })
  }
}

export default TextFieldStrategy
