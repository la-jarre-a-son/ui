import React from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import styles from './FormFieldset.module.scss';

const cx = bindClassNames(styles);

/* Props */

export type FormFieldsetProps = {
  /**
   * The fieldset label
   */
  label: React.ReactNode;
  /**
   * Content of the label
   */
  children?: React.ReactNode;
};

/**
 * Renders a label for a field.
 *
 * Used internally by the FormField
 */
export const FormFieldset = forwardRefWithAs<FormFieldsetProps, 'fieldset'>((props, ref) => {
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
