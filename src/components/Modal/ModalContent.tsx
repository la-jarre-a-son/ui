import React from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import styles from './Modal.module.scss';

const cx = bindClassNames(styles);

/**
 * Wraps the content of a modal.
 *
 * Must be used inside a Modal component.
 */
export const ModalContent = forwardRefWithAs<null, 'div'>((props, ref) => {
  const { children, as, className, ...otherProps } = props;

  const Element = as || 'div';

  return (
    <Element ref={ref} className={cx('content', className)} {...otherProps}>
      {children}
    </Element>
  );
});

ModalContent.displayName = 'ModalContent';

export default ModalContent;
