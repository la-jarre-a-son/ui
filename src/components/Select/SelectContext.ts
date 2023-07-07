import { createContext, useContext } from 'react';

type SelectState = {
  onChange: (v: string) => void;
  value?: string | null;
  keepOpened?: boolean;
  refocusTrigger: () => void;
};

export const SelectContext = createContext<SelectState>({
  onChange: () => undefined,
  refocusTrigger: () => undefined,
});

export function useSelect() {
  return useContext(SelectContext);
}
