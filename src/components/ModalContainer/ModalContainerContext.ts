import { createContext, useContext } from 'react';

export const ModalContainerContext = createContext<{ container: HTMLDivElement | null }>({
  container: null,
});

export function useModalContainer() {
  const context = useContext(ModalContainerContext);
  return context?.container;
}
