import { AnimationDurationOptions } from '../../utils';

export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';

export type TooltipProps = {
  /**
   * The tooltip content
   */
  content?: string;
  /**
   * The tooltip title
   */
  title?: string;
  /**
   * The tooltip placement
   */
  placement?: TooltipPlacement;
  /**
   * The content to decorate with a tooltip
   */
  children?: React.ReactNode;
  /**
   * Disable the portal behaviour of the tooltip content
   */
  disablePortal?: boolean;
  /**
   * Add an `aria-label` or `aria-description` to the trigger element
   * Use `none` if the trigger element already have it
   */
  describeAs?: 'label' | 'description' | 'none';
  /**
   * Props to pass to the `useAnimationDuration` hook
   */
  animationProps?: AnimationDurationOptions;

  /**
   * Forces the tooltip to show
   */
  forceOpen?: boolean;
};

export type TooltipPopperProps = {
  /**
   * The anchor element taken as a reference to place the floating element
   */
  anchorEl: HTMLElement | null;
  /**
   * The tooltip placement
   */
  placement?: TooltipPlacement;
  /**
   * SHow the content
   */
  show?: boolean;
  /**
   * The tooltip title
   */
  title?: string;
  /**
   * The tooltip content
   */
  content?: string;
};
