import { createContext, useContext } from 'react';

export type FormFieldContextValue = {
  label?: string;
  error?: string | null;
  labelId?: string;
  hintId?: string;
  inputProps: {
    id?: string;
    'aria-invalid'?: boolean;
    'aria-describedby'?: string;
  };
};

export const FormFieldContext = createContext<FormFieldContextValue>({
  inputProps: {},
});

export function useFormField() {
  return useContext(FormFieldContext);
}
