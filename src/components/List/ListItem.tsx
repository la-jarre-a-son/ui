import React from 'react';

import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';
import { bindClassNames } from '../../utils/classNames';

import { ListItemProps } from './types';

import styles from './List.module.scss';

const cx = bindClassNames(styles);

/**
 * Renders a list item with optional interactions and states.
 *
 * Can be used in a List component, or in any other list wrapping component (like `<ol>` or `<ul>`).
 */
export const ListItem = forwardRefWithAs<ListItemProps, 'li'>(
  (
    {
      as,
      left,
      right,
      focused,
      disabled,
      children,
      selected,
      className,
      interactive,
      leftContainerProps,
      rightContainerProps,
      ...props
    },
    ref
  ) => {
    const Element = as || 'li';

    return (
      <Element
        ref={ref}
        aria-disabled={disabled}
        aria-current={selected ? 'true' : undefined}
        className={cx(
          'item',
          interactive && '--interactive',
          disabled && '--disabled',
          selected && '--selected',
          focused && '--focused',
          className
        )}
        {...props}
      >
        {left && (
          <div
            {...(leftContainerProps || {})}
            className={cx('itemLeft', leftContainerProps?.className)}
          >
            {left}
          </div>
        )}
        {children}
        {right && (
          <div
            {...(rightContainerProps || {})}
            className={cx('itemRight', rightContainerProps?.className)}
          >
            {right}
          </div>
        )}
      </Element>
    );
  }
);

ListItem.displayName = 'ListItem';

export default ListItem;
