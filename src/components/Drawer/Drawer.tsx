import React from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';
import useCreatePortal from '../../utils/useCreatePortal';
import usePopoverContainer, { CloseReason } from '../../utils/usePopoverContainer';
import useAnimationDuration, { AnimationDurationOptions } from '../../utils/useAnimationDuration';

import { ModalStack } from '../ModalStack';
import { useModalContainer } from '../ModalContainer';

import styles from './Drawer.module.scss';

const cx = bindClassNames(styles);

/* Props */

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

/**
 * Wraps any content in a floating Box attached to one side of the application, conditionally mounted & displayed.
 *
 * The open state must be controlled externally.
 */
export const Drawer = forwardRefWithAs<DrawerProps, 'div'>((props, ref) => {
  const {
    as,
    open,
    onClose,
    children,
    className,
    noOverlay,
    size = 'sm',
    placement = 'left',
    overlayProps,
    animationProps = {},
    ...otherProps
  } = props;

  const createPortal = useCreatePortal();

  const modalContainer = useModalContainer();

  const containerRef = usePopoverContainer({
    refocusOnClose: true,
    onClose,
    open,
  });

  const [show, onAnimationEnd] = useAnimationDuration(open, animationProps);

  const Element = as || 'div';

  return show
    ? createPortal(
        <ModalStack hideOnStack>
          <div className={cx('root', !!modalContainer && '--contained')} ref={ref}>
            <div
              {...(overlayProps || {})}
              role="presentation"
              className={cx(
                'backdrop',
                open ? '--showBackdrop' : '--hideBackdrop',
                noOverlay && '--noOverlay',
                overlayProps?.className
              )}
            />
            <Element
              role="dialog"
              aria-modal="true"
              ref={containerRef}
              onAnimationEnd={onAnimationEnd}
              className={cx(
                className,
                'container',
                open ? '--show' : '--hide',
                size && `--${size}`,
                placement && `--${placement}`
              )}
              {...otherProps}
            >
              {children}
            </Element>
          </div>
        </ModalStack>,
        modalContainer
      )
    : null;
});

Drawer.displayName = 'Drawer';

export default Drawer;
