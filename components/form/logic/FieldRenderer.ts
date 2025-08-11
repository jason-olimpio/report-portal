/**
 * FieldRenderer.ts
 *
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Class responsible for rendering form fields based on their type.
 * Uses strategy pattern to determine which component to render for each field type.
 */

import {ReactElement} from 'react'

import {
  TextFieldStrategy,
  ImageSliderFieldStrategy,
  LocationFieldStrategy,
} from './strategies'

import {
  FieldRenderStrategy,
  type FieldRenderContext,
  type FieldConfig,
} from '@types'

class FieldRenderer<T extends Record<string, any>> {
  #strategies: FieldRenderStrategy<T>[]

  constructor() {
    this.#strategies = [
      new TextFieldStrategy<T>(),
      new ImageSliderFieldStrategy<T>(),
      new LocationFieldStrategy<T>(),
    ]
  }

  render(
    field: FieldConfig,
    fieldKey: keyof T,
    context: FieldRenderContext<T>,
  ): ReactElement {
    const strategy = this.#strategies.find(strategy =>
      strategy.canRender(field),
    )

    if (!strategy)
      throw new Error(`No strategy found for field type: ${field.type}`)

    return strategy.render(field, fieldKey, context)
  }
}

export default FieldRenderer
