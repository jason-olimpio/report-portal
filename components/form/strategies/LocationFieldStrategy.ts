import {createElement, ReactElement} from 'react'

import {LocationField} from '@components'

import {
  type FieldConfig,
  FieldRenderStrategy,
  type FieldRenderContext,
  FieldType,
  type Location,
} from '@types'

export class LocationFieldStrategy<T extends Record<string, any>>
  implements FieldRenderStrategy<T>
{
  canRender({type}: FieldConfig): boolean {
    return type === FieldType.Location
  }

  render(
    field: FieldConfig,
    fieldKey: keyof T,
    context: FieldRenderContext<T>,
  ): ReactElement {
    if (!this.canRender(field)) {
      throw new Error('LocationFieldStrategy cannot render this field type')
    }

    const {form, touched, errors} = context
    const fieldProps = {
      label: field.label,
      error: touched[fieldKey] && errors[fieldKey],
    }

    const locationData = form[fieldKey] as Location | undefined

    return createElement(LocationField, {
      key: fieldKey as string,
      ...fieldProps,
      location: locationData,
    })
  }
}

export default LocationFieldStrategy
