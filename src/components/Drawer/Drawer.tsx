import React from 'react';
import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';
import useCreatePortal from '../../utils/useCreatePortal';
import usePopoverContainer from '../../utils/usePopoverContainer';
import useAnimationDuration from '../../utils/useAnimationDuration';
import { ModalStack } from '../ModalStack';
import { useModalContainer } from '../ModalContainer';

import styles from './Drawer.module.scss';
import { DrawerProps } from './types';

const cx = bindClassNames(styles);

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
    size,
    placement,
    overlayProps,
    animationProps = {},
    ...otherProps
  } = props;

  const Element = as || 'div';

  const createPortal = useCreatePortal();

  const modalContainer = useModalContainer();

  const containerRef = usePopoverContainer({
    refocusOnClose: true,
    onClose,
    open,
  });

  const [show, onAnimationEnd] = useAnimationDuration(open, animationProps);

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

Drawer.defaultProps = {
  open: false,
  noOverlay: false,
  size: 'xs',
  placement: 'left',
};

export default Drawer;
