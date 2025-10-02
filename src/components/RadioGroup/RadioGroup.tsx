import React, { useMemo } from 'react';

import { RadioGroupContext, RadioGroupOnChange } from './RadioGroupContext';

/* Props */

export type RadioGroupProps = {
  /**
   * A group name for all Radio wrapped
   */
  name: string;
  /**
   * The current value for the Radio group
   */
  value: string | null;
  /**
   * Disables the Radio wrapped
   */
  disabled?: boolean;
  /**
   * Callback fired when the checked value changes.
   *
   * First argument is the state as a `string`, second argument is the raw event of the input.
   */
  onChange?: RadioGroupOnChange;
  /**
   * The content of the group - should contain some Radio elements
   */
  children?: React.ReactNode;
};

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
