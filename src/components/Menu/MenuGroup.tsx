import React, { forwardRef } from 'react';

import { ListGroup } from '../List';

import { MenuGroupProps } from './types';

/**
 * Renders a menu group containing other menu items and with a
 *
 * To be used inside a `<Menu>` or `<SubMenu>` component.
 */
export const MenuGroup = forwardRef<HTMLDivElement, MenuGroupProps>((props, ref) => {
  const { children, className, ...otherProps } = props;

  return (
    <ListGroup as="div" listAs="div" ref={ref} className={className} {...otherProps}>
      {children}
    </ListGroup>
  );
});

MenuGroup.displayName = 'MenuGroup';

export default MenuGroup;
