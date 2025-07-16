import {ReactElement} from 'react';

import {
  TextFieldStrategy,
  ImageSliderFieldStrategy,
  LocationFieldStrategy,
} from '@components';

import {
  FieldRenderStrategy,
  type FieldRenderContext,
  type FieldConfig,
} from '@types';

class FieldRenderer<T extends Record<string, any>> {
  #strategies: FieldRenderStrategy<T>[];

  constructor() {
    this.#strategies = [
      new TextFieldStrategy<T>(),
      new ImageSliderFieldStrategy<T>(),
      new LocationFieldStrategy<T>(),
    ];
  }

  render(
    field: FieldConfig,
    fieldKey: keyof T,
    context: FieldRenderContext<T>,
  ): ReactElement {
    const strategy = this.#strategies.find(strategy =>
      strategy.canRender(field),
    );

    if (!strategy) {
      throw new Error(`No strategy found for field type: ${field.type}`);
    }

    return strategy.render(field, fieldKey, context);
  }

  addStrategy(strategy: FieldRenderStrategy<T>): void {
    this.#strategies.push(strategy);
  }

  removeStrategy(strategyType: new () => FieldRenderStrategy<T>): void {
    this.#strategies = this.#strategies.filter(
      strategy => !(strategy instanceof strategyType),
    );
  }
}

export default FieldRenderer;
