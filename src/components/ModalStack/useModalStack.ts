import useRefEffect from '../../utils/useRefEffect';
import modalStackManager from './modalStackManager';

export type ModalStackRegister = {
  hideOnStack?: boolean;
  disableStacking?: boolean;
};

export const modalStack = modalStackManager();

export function useModalStack({ hideOnStack, disableStacking }: ModalStackRegister) {
  return useRefEffect(
    (rootEl) => {
      let remove: () => void | undefined;

      if (rootEl && !disableStacking) {
        remove = modalStack.add({
          rootEl,
          hideOnStack,
        });
      }

      return () => {
        if (remove) remove();
      };
    },
    [hideOnStack, disableStacking]
  );
}

export default useModalStack;
