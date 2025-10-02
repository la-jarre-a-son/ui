import React from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRef';

import styles from './Divider.module.scss';

const cx = bindClassNames(styles);

/**
 * Wraps the content of a divider.
 *
 * Must be used inside a `Divider` component.
 */
export const DividerContent = forwardRefWithAs<null, 'span'>((props, ref) => {
  const { className, as, children, ...otherProps } = props;

  const Element = as ?? 'span';

  return (
    <Element ref={ref} className={cx('content', className)} {...otherProps}>
      {children}
    </Element>
  );
});

DividerContent.displayName = 'DividerContent';

export default DividerContent;
