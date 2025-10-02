import React from 'react';

import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';
import { bindClassNames } from '../../utils/classNames';

import styles from './List.module.scss';

const cx = bindClassNames(styles);

/* Props */

export type ListItemProps = {
  /**
   * Content on the left of the item
   */
  left?: React.ReactNode;
  /**
   * Content on the right of the item
   */
  right?: React.ReactNode;
  /**
   * Specifies that the item is selected
   */
  selected?: boolean;
  /**
   * Disables the item and its interactions
   */
  disabled?: boolean;
  /**
   * Specifies that the item has interactions and associated states
   */
  interactive?: boolean;
  /**
   * Specifies that the item is focused
   */
  focused?: boolean;
  /**
   * Props to pass to the left container element
   */
  leftContainerProps?: React.ComponentProps<'div'>;
  /**
   * Props to pass to the right container element
   */
  rightContainerProps?: React.ComponentProps<'div'>;
  /**
   * Content of the item
   */
  children?: React.ReactNode;
};

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
