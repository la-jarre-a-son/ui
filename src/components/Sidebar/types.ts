import React from 'react';
import { AnimationDurationOptions } from '../../utils';
import { PropsWithAs, As } from '../../utils/typeUtils';

export const SidebarSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export const SidebarPlacements = ['top', 'bottom', 'left', 'right'] as const;

export type SidebarSize = (typeof SidebarSizes)[number];

export type SidebarPlacement = (typeof SidebarPlacements)[number];

export type SidebarContainerProps = {
  /**
   * Opens the sidebar
   */
  open?: boolean;
  /**
   * The placement of the Sidebar
   */
  placement?: SidebarPlacement;
  /**
   * Callbacks when the Sidebar is closed.
   *
   * NOTE: component must be controlled externally
   */
  onClose?: () => void;
  /**
   * The size of the Sidebar (in teeeshirt size)
   */
  size?: SidebarSize;
  /**
   * Display an inset shadow and background
   */
  inset?: boolean;
  /**
   * The Sidebar content
   */
  sidebar?: React.ReactNode;
  /**
   * The content
   */
  children?: React.ReactNode;
  /**
   * Props to pass to the `useAnimationDuration` hook
   */
  animationProps?: AnimationDurationOptions;
  /**
   * Props to pass to the sidebar container
   */
  sidebarProps?: Partial<PropsWithAs<As, null>>;
  /**
   * Props to pass to the content container
   */
  contentProps?: Partial<PropsWithAs<As, null>>;
};
