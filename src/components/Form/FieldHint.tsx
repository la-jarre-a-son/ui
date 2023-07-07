import React from 'react';
import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import styles from './FormField.module.scss';
import { FieldHintProps } from './types';

const cx = bindClassNames(styles);

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
