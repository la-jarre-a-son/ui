import React from 'react';

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
  onChange?: (value: string, event?: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * The content of the group - should contain some Radio elements
   */
  children?: React.ReactNode;
};

export type RadioGroupState = {
  disabled?: boolean;
  name?: string;
  currentValue?: string | null;
  onChange?: RadioGroupProps['onChange'];
};
