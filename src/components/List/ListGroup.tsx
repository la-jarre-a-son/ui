import React from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRef';

import { List } from './List';

import styles from './List.module.scss';

const cx = bindClassNames(styles);

/* Props */

export type ListGroupProps = React.ComponentPropsWithoutRef<'li'> & {
  /**
   * Optional header for the section
   */
  header?: React.ReactNode;
  /**
   * Sublist as prop
   */
  listAs?: React.ElementType;
};

/**
 * Renders a list group as a sublist with role group and optional header
 *
 * To be used inside a `<Menu>` or `<SubMenu>` component.
 */
export const ListGroup = forwardRefWithAs<ListGroupProps, 'li'>((props, ref) => {
  const { children, listAs, className, as, header, ...otherProps } = props;

  const Element = as || 'li';
  const ListElement = listAs || List;

  return (
    <Element ref={ref} className={cx('group', className)} {...otherProps}>
      {header && <div className={cx('groupHeader')}>{header}</div>}
      <ListElement role="group">{children}</ListElement>
    </Element>
  );
});

ListGroup.displayName = 'ListGroup';

export default ListGroup;
