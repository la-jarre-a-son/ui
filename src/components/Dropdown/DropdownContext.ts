import { createContext, useContext } from 'react';

export type CloseDropdownOptions = { bubble?: boolean; refocus?: boolean };

export type CloseDropdown = (options?: CloseDropdownOptions) => void;

export const DropdownContext = createContext<CloseDropdown | null>(null);

export function useDropdown() {
  return useContext(DropdownContext);
}
