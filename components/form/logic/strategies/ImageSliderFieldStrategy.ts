/**
 * ImageSliderFieldStrategy.ts
 *
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Strategy class for rendering image slider fields in forms.
 * Implements the FieldRenderStrategy interface to handle image selection
 * and display functionality.
 */

import {createElement, ReactElement} from 'react'

import {ImageSliderField} from '@components'

import {
  type FieldConfig,
  FieldRenderStrategy,
  type FieldRenderContext,
  FormField,
} from '@types'

class ImageSliderFieldStrategy<T extends Record<string, any>>
  implements FieldRenderStrategy<T>
{
  canRender({type}: FieldConfig): boolean {
    return type === FormField.ImageSlider
  }

  render(
    field: FieldConfig,
    fieldKey: keyof T,
    context: FieldRenderContext<T>,
  ): ReactElement {
    if (!this.canRender(field))
      throw new Error('ImageSliderFieldStrategy cannot render this field type')

    const {form, touched, errors, handleChange} = context
    const fieldProps = {
      label: field.label,
      error: touched[fieldKey] && errors[fieldKey],
    }

    return createElement(ImageSliderField, {
      key: fieldKey as string,
      ...fieldProps,
      imageUris: form[fieldKey] as string[] | undefined,
      onImagesSelected: (uris: string[]) =>
        handleChange(fieldKey, uris as T[keyof T]),
      maxImages: field.maxImages,
    })
  }
}

export default ImageSliderFieldStrategy
