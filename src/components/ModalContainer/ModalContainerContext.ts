import { createContext, useContext } from 'react';

export const ModalContainerContext = createContext<HTMLDivElement | null>(null);

export function useModalContainer() {
  return useContext(ModalContainerContext);
}
