import React from 'react';
import useEvent from '../../utils/useEvent';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';
import Radio from '../Radio';
import { useMenu } from './MenuContext';
import ListItem from '../List/ListItem';
import { MenuItemRadioProps } from './types';

/**
 * Renders a menu item with a radio on left, interactions and accessibility `menuitemradio` role.
 *
 * To be used inside a `<Menu>` or `<SubMenu>` component.
 *
 * If the `value` matches the parent Menu `value`, the item is automatically `checked`.
 */
export const MenuItemRadio = forwardRefWithAs<MenuItemRadioProps, 'button'>((props, ref) => {
  const { children, className, value, checked, onClick, as, ...otherProps } = props;

  const { onChange: menuOnchange, value: selectedValue } = useMenu();

  const handleClick = useEvent((e: React.MouseEvent<HTMLElement>) => {
    if (onClick) onClick(e);
    if (menuOnchange && value) menuOnchange(value);
  });

  const isChecked = checked ?? selectedValue === value ?? false;

  return (
    <ListItem
      ref={ref}
      as={as || 'button'}
      tabIndex={-1}
      interactive
      onClick={handleClick}
      role="menuitemradio"
      aria-checked={isChecked}
      className={className}
      {...otherProps}
      left={<Radio as="span" checked={isChecked} role="presentation" />}
    >
      {children}
    </ListItem>
  );
});

MenuItemRadio.displayName = 'MenuItemRadio';

export default MenuItemRadio;
