import React from 'react';
import { getChildRef, useMergeRef } from '../../utils/refUtils';
import { useModalStack } from './useModalStack';

import { ModalStackProps } from './types';

/**
 * Registers his child element to the modal stack
 */
export const ModalStack: React.FC<ModalStackProps> = ({
  children,
  hideOnStack,
  disableStacking,
}) => {
  const modalRef = useModalStack({
    hideOnStack,
    disableStacking,
  });
  const mergedRef = useMergeRef(getChildRef(children), modalRef);

  return React.isValidElement(children) && React.Children.only(children)
    ? React.cloneElement<React.ComponentPropsWithRef<React.ElementType>>(children, {
        ref: mergedRef,
      })
    : null;
};

export default ModalStack;
