import React, { useMemo, useState } from 'react';

import { bindClassNames } from '../../utils/classNames';
import { Ref, useMergeRef } from '../../utils/refUtils';
import usePopoverContainer from '../../utils/usePopoverContainer';
import useCreatePortal from '../../utils/useCreatePortal';
import useAnimationDuration from '../../utils/useAnimationDuration';
import { ModalStack } from '../ModalStack';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import { ModalContextValue, ModalProps } from './types';
import { ModalContext } from './ModalContext';

import styles from './Modal.module.scss';

const cx = bindClassNames(styles);

/**
 * Wraps any content in a floating Box centered in the application, conditionally mounted & displayed.
 *
 * Should be used contextually to give more information or gather additional info following a user action.
 *
 * Can contain ModalHeader, ModalContent and ModalActions.
 *
 * The open state must be controlled externally.
 */
export const Modal = forwardRefWithAs<ModalProps, 'div'>((props, ref) => {
  const {
    as,
    children,
    open,
    onClose,
    dialogProps,
    noOverlay,
    overlayProps,
    className,
    size,
    disablePortal,
    animationProps = {},
    ...otherProps
  } = props;

  const Element = as || 'div';

  const createPortal = useCreatePortal(disablePortal);

  const containerRef = usePopoverContainer({
    refocusOnClose: true,
    onClose,
    open,
  });

  const [dialogEl, dialogRef] = useState<HTMLDivElement | null>();
  const mergedDialogRef = useMergeRef(
    containerRef,
    dialogProps?.ref as Ref<HTMLDivElement>,
    dialogRef as Ref<HTMLDivElement>
  );

  const [show, onAnimationEnd] = useAnimationDuration(open, {
    onAnimationEnd: dialogProps?.onAnimationEnd,
    ...animationProps,
  });

  const modalContextValue: ModalContextValue = useMemo(
    () => ({
      onClose,
      dialogEl,
    }),
    [onClose, dialogEl]
  );

  return show
    ? createPortal(
        <ModalContext.Provider value={modalContextValue}>
          <ModalStack hideOnStack>
            <Element
              {...otherProps}
              className={cx('root', size && `--${size}`, open ? '--show' : '--hide', className)}
              ref={ref}
            >
              <div
                {...(overlayProps || {})}
                role="presentation"
                className={cx('backdrop', noOverlay && '--noOverlay', overlayProps?.className)}
              />
              <div
                {...(dialogProps || {})}
                role="dialog"
                aria-modal="true"
                ref={mergedDialogRef}
                onAnimationEnd={onAnimationEnd}
                className={cx('container', dialogProps?.className)}
              >
                {children}
              </div>
            </Element>
          </ModalStack>
        </ModalContext.Provider>
      )
    : null;
});

Modal.displayName = 'Modal';

export default Modal;
