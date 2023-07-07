import React from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import { FormControlLabelProps } from './types';

import styles from './FormControlLabel.module.scss';

const cx = bindClassNames(styles);

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
