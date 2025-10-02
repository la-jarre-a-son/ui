import React from 'react';

import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';
import useEvent from '../../utils/useEvent';

import Radio, { RadioProps } from '../Radio';
import { ListItem } from '../List';

import { useMenu } from './MenuContext';
import type { MenuItemProps } from './MenuItem';

/* Props */

export type MenuItemRadioProps = Omit<MenuItemProps, 'value' | 'selected' | 'left'> & {
  /**
   * The value of the radio item
   */
  value?: string;
  /**
   * Specifies that the radio is checked
   */
  checked?: boolean;
  /**
   * Props to pass to the Radio component used internally
   */
  radioProps?: RadioProps;
};

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

  const isChecked = checked ?? (selectedValue === value || false);

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
