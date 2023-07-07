import React from 'react';
import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import styles from './FormFieldset.module.scss';
import { FieldsetProps } from './types';

const cx = bindClassNames(styles);

/**
 * Renders a label for a field.
 *
 * Used internally by the FormField
 */
export const FormFieldset = forwardRefWithAs<FieldsetProps, 'fieldset'>((props, ref) => {
  const { children, as, label, className, ...otherProps } = props;

  const Element = as || 'fieldset';

  return (
    <Element ref={ref} className={cx('root', className)} {...otherProps}>
      <legend className={cx('label', className)}>{label}</legend>
      {children}
    </Element>
  );
});

FormFieldset.displayName = 'FormFieldset';

export default FormFieldset;
