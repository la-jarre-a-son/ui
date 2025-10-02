import { createContext, useContext } from 'react';

import { CloseReason } from '../../utils/usePopoverContainer';

export type OnModalClose = (reason?: CloseReason) => void;

export type ModalContextValue = {
  onClose?: OnModalClose;
  dialogEl?: HTMLDivElement | null;
};

export const ModalContext = createContext<ModalContextValue>({});

export function useModal(props: ModalContextValue = {}): ModalContextValue {
  const ctx = useContext(ModalContext);

  return {
    ...ctx,
    onClose: props?.onClose ?? ctx?.onClose,
  };
}
