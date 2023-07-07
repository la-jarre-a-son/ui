import React from 'react';
import { AnimationDurationOptions, CloseReason } from '../../utils';

export const DrawerSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export type DrawerSize = (typeof DrawerSizes)[number];

export type DrawerPlacement = 'top' | 'bottom' | 'left' | 'right';

export type DrawerProps = {
  /**
   * The size of the drawer (in teeeshirt size)
   */
  size?: DrawerSize;
  /**
   * The placement of the drawer
   */
  placement?: DrawerPlacement;
  /**
   * Mandatory aria label for the dialog container
   */
  'aria-label': string;
  /**
   * Callbacks when the drawer is closed.
   *
   * NOTE: component must be controller externally
   */
  onClose?: (reason?: CloseReason) => void;
  /**
   * Opens the drawer
   */
  open?: boolean;
  /**
   * Props to pass to the backdrop element
   */
  overlayProps?: React.ComponentProps<'div'>;
  /**
   * Hides the backdrop when drawer is open
   */
  noOverlay?: boolean;
  /**
   * The drawer content
   */
  children?: React.ReactNode;
  /**
   * Props to pass to the `useAnimationDuration` hook
   */
  animationProps?: AnimationDurationOptions;
};
