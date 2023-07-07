import React from 'react';
import { bindClassNames } from '../../utils/classNames';
import { InputContainerLabelProps } from './types';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import styles from './InputContainer.module.scss';

const cx = bindClassNames(styles);

/**
 * Renders an inner label in an InputContainer.
 *
 * Should be used in an InputGroup to prepend or append labels.
 */
export const InputContainerLabel = forwardRefWithAs<InputContainerLabelProps, 'div'>(
  ({ children, as, className, size, ...otherProps }, ref) => {
    const Element = as || 'div';
    return (
      <Element ref={ref} className={cx('label', size && `--${size}`, className)} {...otherProps}>
        {children}
      </Element>
    );
  }
);

InputContainerLabel.displayName = 'InputContainerLabel';

InputContainerLabel.defaultProps = {
  size: 'md',
};

export default InputContainerLabel;
