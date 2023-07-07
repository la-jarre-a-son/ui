import React from 'react';

import { PropsWithAs } from '../../utils/typeUtils';

export type SwitchProps = {
  /**
   * Specifies that the switch is checked
   */
  checked?: boolean;
  /**
   * Disables the switch and all its interactions
   */
  disabled?: boolean;
  /**
   * Props to pass to the root container element.
   *
   * NOTE: rest of props are passed to the input element
   */
  wrapperProps?: PropsWithAs<React.ElementType, React.ComponentProps<'div'>>;
  /**
   * Callback when the switch state changes.
   *
   * First argument is the state as a `boolean`, second argument is the raw event of the input.
   */
  onChange?: (value: boolean, event?: React.ChangeEvent<HTMLInputElement>) => void;
};
