import {createElement, ReactElement} from 'react';

import {ImageSliderField} from '@components';

import {
  FieldConfig,
  FieldRenderStrategy,
  FieldRenderContext,
  FieldType,
  Location,
} from '@types';

class ImageSliderFieldStrategy<T extends Record<string, any>>
  implements FieldRenderStrategy<T>
{
  canRender(field: FieldConfig): boolean {
    return field.type === FieldType.ImageSlider;
  }

  render(
    field: FieldConfig,
    fieldKey: keyof T,
    context: FieldRenderContext<T>,
  ): ReactElement {
    if (!this.canRender(field)) {
      throw new Error('ImageSliderFieldStrategy cannot render this field type');
    }

    const {form, touched, errors, handleChange} = context;
    const fieldProps = {
      label: field.label,
      error: touched[fieldKey] && errors[fieldKey],
    };

    return createElement(ImageSliderField, {
      key: fieldKey as string,
      ...fieldProps,
      imageUris: form[fieldKey] as string[] | undefined,
      onImagesSelected: (uris: string[]) => handleChange(fieldKey, uris),
      onLocationCaptured: (location: Location) =>
        handleChange('location' as keyof T, location),
      maxImages: field.maxImages,
    });
  }
}

export default ImageSliderFieldStrategy;
