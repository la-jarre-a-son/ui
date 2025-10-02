import { createContext, useContext } from 'react';

export type ModalContainerContextValue = {
  container: HTMLDivElement | null;
};

export const ModalContainerContext = createContext<ModalContainerContextValue>({
  container: null,
});

export function useModalContainer() {
  const context = useContext(ModalContainerContext);
  return context?.container;
}
