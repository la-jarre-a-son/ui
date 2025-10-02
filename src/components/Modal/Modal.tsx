import React, { useMemo, useState } from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';
import { MergeProps } from '../../utils/typeUtils';
import { Ref, useMergeRef } from '../../utils/refUtils';
import usePopoverContainer from '../../utils/usePopoverContainer';
import useCreatePortal from '../../utils/useCreatePortal';
import useAnimationDuration, { AnimationDurationOptions } from '../../utils/useAnimationDuration';

import { ModalStack } from '../ModalStack';
import { useModalContainer } from '../ModalContainer';

import { ModalContext, ModalContextValue, OnModalClose } from './ModalContext';

import styles from './Modal.module.scss';

const cx = bindClassNames(styles);

/* Props */

export const ModalSizes = ['sm', 'md', 'lg', 'xl', 'fullscreen'] as const;

export type ModalSize = (typeof ModalSizes)[number];

export type ModalProps = MergeProps<{
  /**
   * Is the modal opened
   */
  open?: boolean;
  /**
   * The size of the modal (in teeeshirt size, or `fullscreen`)
   */
  size?: ModalSize;
  /**
   * Makes the backdrop fully transparent
   */
  noOverlay?: boolean;
  /**
   * Props to pass to the dialog element
   */
  dialogProps?: React.ComponentPropsWithRef<'div'>;
  /**
   * Props to pass to the overlay element
   */
  overlayProps?: React.HTMLProps<HTMLDivElement>;
  /**
   * Callback fired when the modal need to close.
   * Take the cause of closing as parameter.
   */
  onClose?: OnModalClose;
  /**
   * The modal content
   */
  children?: React.ReactNode;
  /**
   * Disable the portal behaviour
   */
  disablePortal?: boolean;
  /**
   * Disable the autofocus behaviour, useful when using an autoFocus props on a particular element
   */
  disableAutoFocus?: boolean;
  /**
   * Props to pass to the `useAnimationDuration` hook
   */
  animationProps?: AnimationDurationOptions;
}>;

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
    disableAutoFocus,
    animationProps = {},
    ...otherProps
  } = props;

  const Element = as || 'div';

  const createPortal = useCreatePortal(disablePortal);

  const modalContainer = useModalContainer();

  const containerRef = usePopoverContainer({
    refocusOnClose: true,
    autoFocus: !disableAutoFocus,
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
              className={cx(
                'root',
                !!modalContainer && '--contained',
                size && `--${size}`,
                open ? '--show' : '--hide',
                className
              )}
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
        </ModalContext.Provider>,
        modalContainer
      )
    : null;
});

Modal.displayName = 'Modal';

export default Modal;
