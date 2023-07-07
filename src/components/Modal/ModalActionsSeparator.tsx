import React from 'react';
import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import styles from './Modal.module.scss';

const cx = bindClassNames(styles);

/**
 * Renders a separating space between actions in the footer of a modal.
 *
 * Must be used inside a ModalActions component.
 */
export const ModalActionsSeparator = forwardRefWithAs<null, 'div'>((props, ref) => {
  const { children, as, className, ...otherProps } = props;

  const Element = as || 'div';

  return (
    <Element ref={ref} className={cx('separator', className)} {...otherProps}>
      {children}
    </Element>
  );
});

ModalActionsSeparator.displayName = 'ModalActionsSeparator';

export default ModalActionsSeparator;
