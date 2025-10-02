import React from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRef';
import { getChildRef, mergeRef } from '../../utils/refUtils';

import styles from './Stack.module.scss';

const cx = bindClassNames(styles);

/* Props */

export type StackSeparatorProps = {
  /**
   * Optionnal element to add the separator style to
   */
  children?: React.ReactNode;
};

/**
 * Renders a growing element to create space between elements in a Stack.
 */
export const StackSeparator = forwardRefWithAs<StackSeparatorProps, 'div'>((props, ref) => {
  const { children, as, className, ...otherProps } = props;

  const Element = as || 'div';

  if (React.isValidElement(children)) {
    return React.cloneElement<React.ComponentPropsWithRef<React.ElementType>>(children, {
      ref: mergeRef(getChildRef(children), ref),
      className: cx('grow', children.props.className),
    });
  }

  return <Element role="separator" ref={ref} className={cx('grow', className)} {...otherProps} />;
});

StackSeparator.displayName = 'StackSeparator';

export default StackSeparator;
