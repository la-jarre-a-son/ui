import React from 'react';
import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import styles from './FormField.module.scss';
import { FieldLabelProps } from './types';

const cx = bindClassNames(styles);

/**
 * Renders a label for a field.
 *
 * Used internally by the FormField
 */
export const FieldLabel = forwardRefWithAs<FieldLabelProps, 'div'>((props, ref) => {
  const { children, as, className, hide, ...otherProps } = props;

  const Element = as || 'div';

  return (
    <Element ref={ref} className={cx('label', hide && 'label--hide', className)} {...otherProps}>
      {children}
    </Element>
  );
});

FieldLabel.displayName = 'FieldLabel';

export default FieldLabel;
