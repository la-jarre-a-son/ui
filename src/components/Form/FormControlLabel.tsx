import React from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRef';

import styles from './FormControlLabel.module.scss';

const cx = bindClassNames(styles);

/* Props */

export type FormControlLabelProps = {
  /**
   * The control label
   */
  label: React.ReactNode;
  /**
   * The hint text of the control
   */
  hint?: string;
  /**
   * The error text if the field is invalid
   */
  error?: string | null;
  /**
   * Specifies that the control is disabled
   */
  disabled?: boolean;
  /**
   * Puts the control after its label
   */
  reverse?: boolean;
  /**
   * The control to decorate
   */
  children?: React.ReactNode;
};

/**
 * Renders a label to decorate a nested `Checkbox`, `Radio` or `Switch` control.
 */
export const FormControlLabel = forwardRefWithAs<FormControlLabelProps, 'label'>(
  ({ className, as, label, hint, error, disabled, reverse, children, ...otherProps }, ref) => {
    const Element = as || 'label';

    const hintContent = error || hint;

    return (
      <Element
        ref={ref}
        className={cx('root', disabled && '--disabled', reverse && '--reverse', className)}
        {...otherProps}
      >
        <div className={cx('control')}>{children}</div>
        <div className={cx('container')}>
          <div className={cx('label')}>{label}</div>
          {!!hintContent && (
            <div
              role={error ? 'alert' : undefined}
              className={cx('hint', !!error && 'hint--error', className)}
            >
              {hintContent}
            </div>
          )}
        </div>
      </Element>
    );
  }
);

FormControlLabel.displayName = 'FormControlLabel';

export default FormControlLabel;
