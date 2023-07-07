import React, { useMemo } from 'react';

import { RadioGroupProps } from './types';
import { RadioGroupContext } from './RadioGroupContext';

/**
 * Provides a state context to manage a group of `Radio` component relative to the same data.
 *
 * It accepts the name of the selected radio as a `value` and an `onChange` function.
 */
export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  value,
  onChange,
  children,
  disabled,
}) => {
  const groupState = useMemo(
    () => ({
      name,
      disabled,
      currentValue: value,
      onChange,
    }),
    [name, value, disabled, onChange]
  );

  return <RadioGroupContext.Provider value={groupState}>{children}</RadioGroupContext.Provider>;
};

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
