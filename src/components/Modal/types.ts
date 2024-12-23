import React from 'react';
import { MergeProps, CloseReason, AnimationDurationOptions } from '../../utils';

export const ModalSizes = ['sm', 'md', 'lg', 'xl', 'fullscreen'] as const;

export type ModalSize = (typeof ModalSizes)[number];

export type HeaderRenderFunction = (headerProps: ModalHeaderProps) => React.ReactNode;

export type OnModalClose = (reason?: CloseReason) => void;

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

export type ModalTitleProps = React.ComponentPropsWithRef<'div'>;

export type ModalHeaderProps = {
  /**
   * The modal title
   */
  title?: string;
  /**
   * Props to pass to the title element
   */
  titleProps?: ModalTitleProps;
  /**
   * Callbacks fired after triggering the close button
   */
  onClose?: OnModalClose;
  /**
   * The modal header content
   */
  children?: React.ReactNode;
};

export type ModalActionsDirection = 'auto' | 'vertical' | 'horizontal';

export type ModalActionsProps = {
  /**
   * The Direction of the action buttons
   */
  direction?: ModalActionsDirection;
};

export type ModalContextValue = {
  onClose?: OnModalClose;
  dialogEl?: HTMLDivElement | null;
};
