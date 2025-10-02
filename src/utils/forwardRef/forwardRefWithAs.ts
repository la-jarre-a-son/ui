/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { As, OwnPropsWithAs, PropsWithAs, PropsType } from '../typeUtils';

// Inspired by
// https://github.com/pluralsight/classic-design-system/blob/08f0962dec18d99e1799a16c7b7eac86f01cbc27/packages/util/src/primatives.ts

export interface FunctionComponentWithAs<DefaultComponentType extends As, P extends PropsType> {
  /**
   * Inherited from React.FunctionComponent with modifications to support `as`
   */
  <AsType extends As = DefaultComponentType>(
    props: PropsWithAs<AsType, P>,
    context?: any
  ): React.ReactElement<any, any> | null;

  /**
   * Inherited from React.FunctionComponent
   */
  displayName?: string;
  defaultProps?: Partial<OwnPropsWithAs<DefaultComponentType, P>>;
}

export interface ForwardRefWithAsRenderFunction<
  T extends As,
  P extends PropsType = Record<string, any>,
> {
  (props: OwnPropsWithAs<T, P>, ref: React.Ref<React.ElementRef<T>>): React.ReactNode;
  displayName?: string;
  // explicit rejected with `never` required due to
  // https://github.com/microsoft/TypeScript/issues/36826
  /**
   * defaultProps are not supported on render functions
   */
  defaultProps?: never;
  /**
   * propTypes are not supported on render functions
   */
  propTypes?: never;
}

export function forwardRefWithAs<P extends PropsType, T extends As = 'div', S = unknown>(
  render: ForwardRefWithAsRenderFunction<T, P>
) {
  return React.forwardRef(render) as unknown as FunctionComponentWithAs<T, P> & S;
}
