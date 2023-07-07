import React from 'react';
import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import styles from './Modal.module.scss';
import { ModalActionsProps } from './types';

const cx = bindClassNames(styles);

/**
 * Wraps the footer of a modal.
 *
 * Must be used inside a Modal component.
 */
export const ModalActions = forwardRefWithAs<ModalActionsProps, 'footer'>((props, ref) => {
  const { children, className, direction, as, ...otherProps } = props;
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

ModalActions.defaultProps = {
  direction: 'auto',
};

export default ModalActions;
