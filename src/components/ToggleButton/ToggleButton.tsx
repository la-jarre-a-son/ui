import React from 'react';

import { forwardRefWithAs } from '../../utils/forwardRef';
import { MergeProps } from '../../utils/typeUtils';

import { Button, ButtonIntent, ButtonVariant, ButtonProps } from '../Button';

/* Props */

export type ToggleButtonProps = MergeProps<
  {
    /**
     * Specifies that the button is selected
     */
    selected?: boolean;
    /**
     * The color intent to apply when selected
     */
    selectedIntent?: ButtonIntent;
    /**
     * The stylistic variant to apply when selected
     */
    selectedVariant?: ButtonVariant;
  },
  ButtonProps
>;

/**
 * Renders a Button with an aditionnal pressed state controlled with the `selected` prop.
 *
 * This component accept all the props of the `Button` component, minus the `variant` and `intent` that depends on the selected state.
 */
export const ToggleButton = forwardRefWithAs<ToggleButtonProps, 'button'>((props, ref) => {
  const {
    as,
    variant = 'filled',
    intent = 'neutral',
    selected = false,
    children,
    selectedIntent = 'primary',
    selectedVariant = 'filled',
    ...otherProps
  } = props;

  return (
    <Button
      as={as}
      ref={ref}
      {...otherProps}
      variant={selected ? selectedVariant : variant}
      intent={selected ? selectedIntent : intent}
      aria-pressed={!!selected}
    >
      {children}
    </Button>
  );
});

ToggleButton.displayName = 'ToggleButton';

export default ToggleButton;
