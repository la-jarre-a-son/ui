import { createContext, useContext } from 'react';

export type RadioGroupOnChange = (
  value: string,
  event?: React.ChangeEvent<HTMLInputElement>
) => void;

export type RadioGroupState = {
  disabled?: boolean;
  name?: string;
  currentValue?: string | null;
  onChange?: RadioGroupOnChange;
};

export const RadioGroupContext = createContext<RadioGroupState>({});

export function useRadioGroup() {
  return useContext(RadioGroupContext);
}
