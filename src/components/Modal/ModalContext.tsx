import { createContext, useContext } from 'react';
import { ModalContextValue } from './types';

export const ModalContext = createContext<ModalContextValue>({});

export function useModal(props: ModalContextValue = {}): ModalContextValue {
  const ctx = useContext(ModalContext);

  return {
    ...ctx,
    onClose: props?.onClose ?? ctx?.onClose,
  };
}
