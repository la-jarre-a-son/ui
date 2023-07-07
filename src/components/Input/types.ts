import React from 'react';
import { MergeProps, PropsWithAs } from '../../utils/typeUtils';

export const InputSizes = ['sm', 'md', 'lg'] as const;

export type InputSize = (typeof InputSizes)[number];

export type InputContainerProps = {
  /**
   * Specifies that the wrapped input is disabled
   */
  disabled?: boolean;
  /**
   * Specifies that the wrapped input has error
   */
  error?: string | null | boolean;
  /**
   * Content to the left of the wrapped input
   */
  left?: React.ReactNode;
  /**
   * Content to the right of the wrapped input
   */
  right?: React.ReactNode;
  /**
   * Specifies that the wrapped input is focused.
   *
   * NOTE: it does not focus the input itself.
   */
  focused?: boolean;
  /**
   * Makes the container take the whole available width
   */
  block?: boolean;
  /**
   * The input size (in teeshirt size)
   * */
  size?: InputSize;
  /**
   * The wrapped input
   */
  children?: React.ReactNode;
};

export type InputContainerLabelProps = {
  /**
   * The input label size (in teeshirt size)
   * */
  size?: InputSize;
};

export type InputProps = MergeProps<
  InputContainerProps & {
    /**
     * Callbacks when the text value changes.
     *
     * First argument is the value as `string`, second argument is the raw event of the input.
     */
    onChange?: (value: string, event?: React.ChangeEvent<HTMLInputElement>) => void;
    /**
     * Props to pass to the root InputContainer
     *
     * NOTE: other props are passed to the input element.
     */
    containerProps?: PropsWithAs<'div', InputContainerProps>;
  },
  React.ComponentProps<'input'>
>;
