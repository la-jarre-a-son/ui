import React from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRef';

import styles from './FormField.module.scss';

const cx = bindClassNames(styles);

/**
 * Renders the root container of a field.
 *
 * Used internally by the FormField
 */
export const FieldContainer = forwardRefWithAs<null, 'label'>((props, ref) => {
  const { children, as, className, ...otherProps } = props;

  const Element = as || 'label';

  return (
    <Element ref={ref} className={cx('root', className)} {...otherProps}>
      {children}
    </Element>
  );
});

FieldContainer.displayName = 'FieldContainer';

export default FieldContainer;
