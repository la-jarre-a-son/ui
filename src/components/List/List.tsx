import React from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import { ListProps } from './types';

import styles from './List.module.scss';

const cx = bindClassNames(styles);

/**
 * Wraps an unordered list of elements.
 *
 * This component integrates only the wrapper style.
 * Use it as a base to implement list based UI patterns, with ListItem as children.
 */
export const List = forwardRefWithAs<ListProps, 'ul'>(
  ({ children, className, as, ...props }, ref) => {
    const Element = as || 'ul';

    return (
      <Element ref={ref} {...props} className={cx('root', className)}>
        {children}
      </Element>
    );
  }
);

List.displayName = 'List';

export default List;
