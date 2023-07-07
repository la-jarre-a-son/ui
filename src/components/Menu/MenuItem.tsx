import React from 'react';

import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';
import useEvent from '../../utils/useEvent';

import ListItem from '../List/ListItem';

import { MenuItemProps } from './types';
import { useMenu } from './MenuContext';
import { useDropdown } from '../Dropdown/DropdownContext';

type MenuStatic = {
  ICON_SELECTED: string;
};

/**
 * Renders a menu item with interactions and accessibility `menuitem` role.
 *
 * To be used inside a `<Menu>` or `<SubMenu>` component.
 *
 * If the `value` matches the parent Menu `value`, the item is automatically `selected`.
 */
export const MenuItem = forwardRefWithAs<MenuItemProps, 'button', MenuStatic>(
  ({ children, onClick, as, value, selected, ...props }, ref) => {
    const { value: selectedValue, onChange: menuOnChange, keepOpened } = useMenu();

    const closeDropdown = useDropdown();

    const onChange = useEvent(() => {
      if (menuOnChange && value) menuOnChange(value);
    });

    const handleClick = useEvent((e: React.MouseEvent<HTMLElement>) => {
      if (onClick) onClick(e);
      if (closeDropdown && !keepOpened) {
        closeDropdown({
          bubble: true,
          refocus: true,
        });
      }
      if (onChange) onChange();
    });

    const isSelected = selected ?? (!!value && value === selectedValue);

    return (
      <ListItem
        ref={ref}
        as={as || 'button'}
        role="menuitem"
        tabIndex={-1}
        interactive
        onClick={handleClick}
        selected={isSelected}
        {...props}
      >
        {children}
      </ListItem>
    );
  }
);

MenuItem.displayName = 'MenuItem';

MenuItem.ICON_SELECTED = 'fa-solid fa-check';

export default MenuItem;
