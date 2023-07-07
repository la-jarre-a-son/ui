import { createContext, useContext } from 'react';
import { FormFieldContextValue } from './types';

export const FormFieldContext = createContext<FormFieldContextValue>({
  inputProps: {},
});

export function useFormField() {
  return useContext(FormFieldContext);
}
