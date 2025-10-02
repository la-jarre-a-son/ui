import React from 'react';

import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';
import useEvent from '../../utils/useEvent';

import { ListItem } from '../List';
import Checkbox, { CheckboxProps } from '../Checkbox';
import Switch from '../Switch';

import { useMenu } from './MenuContext';
import type { MenuItemProps } from './MenuItem';

function addOrRemove<T>(arr: T[], value: T): T[] {
  if (!Array.isArray(arr)) {
    if (typeof arr === 'string') return [arr, value];
    return [];
  }
  const index = arr.indexOf(value);

  if (index !== -1) {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
  }

  return [...arr, value];
}

/* Props */

export type MenuItemCheckboxVariant = 'checkbox' | 'switch';

export type MenuItemCheckboxProps = Omit<MenuItemProps, 'value' | 'selected' | 'left'> & {
  /**
   * The component to use as the input component
   *
   * `checkbox`: the Checkbox component
   * `switch`: the Switch component
   */
  variant?: MenuItemCheckboxVariant;
  /**
   * The value of the checkbox item
   */
  value?: string;
  /**
   * Specifies that the checkbox is checked
   */
  checked?: boolean;
  /**
   * Props to pass to the Checkbox component used internally
   */
  checkboxProps?: CheckboxProps;
};

/**
 * Renders a menu item with a checkbox on left, interactions and accessibility `menuitemcheckbox` role.
 *
 * To be used inside a `<Menu>` or `<SubMenu>` component.
 *
 * If the `value` matches the parent Menu `value`, the item is automatically `checked`.
 */
export const MenuItemCheckbox = forwardRefWithAs<MenuItemCheckboxProps, 'button'>((props, ref) => {
  const {
    children,
    className,
    value,
    checked,
    onClick,
    as,
    variant = 'checkbox',
    checkboxProps,
    ...otherProps
  } = props;

  const { onChange: menuOnchange, value: selectedValue } = useMenu();

  const handleClick = useEvent((e: React.MouseEvent<HTMLElement>) => {
    if (onClick) onClick(e);
    if (!value) return;
    const newValue = addOrRemove(selectedValue as string[], value);
    if (menuOnchange) menuOnchange(newValue);
    if (menuOnchange && value) menuOnchange(newValue);
  });

  const isChecked = checked ?? (!!value && selectedValue?.includes(value));

  const CheckboxElement = variant === 'switch' ? Switch : Checkbox;

  return (
    <ListItem
      ref={ref}
      as={as || 'button'}
      tabIndex={-1}
      interactive
      onClick={handleClick}
      role="menuitemcheckbox"
      aria-checked={isChecked}
      className={className}
      {...otherProps}
      left={
        <CheckboxElement
          as="span"
          {...(checkboxProps || {})}
          checked={isChecked}
          role="presentation"
          tabIndex={-1}
        />
      }
    >
      {children}
    </ListItem>
  );
});

MenuItemCheckbox.displayName = 'MenuItemCheckbox';

export default MenuItemCheckbox;
