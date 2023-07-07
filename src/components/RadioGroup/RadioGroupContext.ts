import { createContext, useContext } from 'react';

import { RadioGroupState } from './types';

export const RadioGroupContext = createContext<RadioGroupState>({});

export function useRadioGroup() {
  return useContext(RadioGroupContext);
}
