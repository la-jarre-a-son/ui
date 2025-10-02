import React from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import styles from './Modal.module.scss';

const cx = bindClassNames(styles);

/* Props */

export type ModalActionsDirection = 'auto' | 'vertical' | 'horizontal';

export type ModalActionsProps = {
  /**
   * The Direction of the action buttons
   */
  direction?: ModalActionsDirection;
};

/**
 * Wraps the footer of a modal.
 *
 * Must be used inside a Modal component.
 */
export const ModalActions = forwardRefWithAs<ModalActionsProps, 'footer'>((props, ref) => {
  const { children, className, direction = 'auto', as, ...otherProps } = props;
  const Element = as || 'footer';

  return (
    <Element
      ref={ref}
      className={cx('actions', className, direction && `actions--${direction}`)}
      {...otherProps}
    >
      {children}
    </Element>
  );
});

ModalActions.displayName = 'ModalActions';

export default ModalActions;
