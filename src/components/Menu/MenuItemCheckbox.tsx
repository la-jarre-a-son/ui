import React from 'react';
import useEvent from '../../utils/useEvent';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';
import { useMenu } from './MenuContext';
import ListItem from '../List/ListItem';
import Checkbox from '../Checkbox';
import { MenuItemCheckboxProps } from './types';
import Switch from '../Switch';

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
    variant,
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

MenuItemCheckbox.defaultProps = {
  variant: 'checkbox',
};

export default MenuItemCheckbox;
