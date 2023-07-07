import React from 'react';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';
import Button from '../Button';

import { ToggleButtonProps } from './types';

/**
 * Renders a Button with an aditionnal pressed state controlled with the `selected` prop.
 *
 * This component accept all the props of the `Button` component, minus the `variant` and `intent` that depends on the selected state.
 */
export const ToggleButton = forwardRefWithAs<ToggleButtonProps, 'button'>((props, ref) => {
  const {
    as,
    variant,
    intent,
    selected,
    children,
    selectedIntent,
    selectedVariant,
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

ToggleButton.defaultProps = {
  selected: false,
  variant: 'filled',
  intent: 'neutral',
  selectedIntent: 'primary',
  selectedVariant: 'filled',
};

export default ToggleButton;
