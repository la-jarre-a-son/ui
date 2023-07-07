import React from 'react';

import { bindClassNames, forwardRefWithAs } from '../../utils';

import { List } from './List';

import { ListGroupProps } from './types';

import styles from './List.module.scss';

const cx = bindClassNames(styles);

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
