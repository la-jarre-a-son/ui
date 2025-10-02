import React from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import styles from './FormField.module.scss';

const cx = bindClassNames(styles);

/* Props */

export type FieldHintProps = {
  /**
   * The hint text content
   */
  hint?: React.ReactNode;
  /**
   * The error to be rendered instead of a hint
   */
  error?: React.ReactNode;
};

/**
 * Renders a hint or error for a field.
 *
 * Used internally by the FormField
 */
export const FieldHint = forwardRefWithAs<FieldHintProps, 'div'>((props, ref) => {
  const { as, className, error, hint, ...otherProps } = props;

  const content = error || hint;

  const Element = as || 'div';

  return content ? (
    <Element
      role={error ? 'alert' : undefined}
      ref={ref}
      className={cx('hint', !!error && 'hint--error', className)}
      {...otherProps}
    >
      {content}
    </Element>
  ) : null;
});

FieldHint.displayName = 'FieldHint';

export default FieldHint;
