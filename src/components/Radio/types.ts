import React from 'react';
import { PropsWithAs } from '../../utils/typeUtils';

export type RadioProps = {
  /**
   * Specifies that the radio is checked
   */
  checked?: boolean;
  /**
   * The value associated to the radio
   */
  value?: string;
  /**
   * Disables the radio and all its interactions
   */
  disabled?: boolean;
  /**
   * Props to pass to the root container element.
   *
   * NOTE: rest of props are passed to the input element
   */
  wrapperProps?: PropsWithAs<React.ElementType, React.ComponentProps<'div'>>;
  /**
   * Callback when the radio state changes.
   *
   * First argument is the state as a `string` corresponding to `value`, second argument is the raw event of the input.
   */
  onChange?: (value: string, event?: React.ChangeEvent<HTMLInputElement>) => void;
};
