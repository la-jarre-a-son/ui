import React, { forwardRef, useMemo } from 'react';

import { MergeProps } from '../../utils/typeUtils';
import { useMergeRef } from '../../utils/refUtils';
import useListNav from '../../utils/useListNav';
import useEvent from '../../utils/useEvent';

import Dropdown, { DropdownList, DropdownListProps, DropdownProps } from '../Dropdown';

import { MenuContext } from './MenuContext';

const defaultQuerySelector = '[role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"]';

/* Props */

type MenuOwnProps = {
  /**
   * The Menu trigger element
   */
  trigger?: DropdownProps['trigger'];
  /**
   * Controls the Menu open state.
   *
   * Menu is controlled internally if `undefined`
   */
  open?: boolean;
  /**
   * Callback fired when menu is closed
   */
  onClose?: () => void;
  /**
   * Callback fired when menu is open
   */
  onOpen?: () => void;
  /**
   * Optional anchor element used as a reference for the placement
   */
  anchorEl?: HTMLElement | null;
  /**
   * Optional trigger element to attache event to manage openning
   */
  triggerEl?: HTMLElement | null;
  /**
   * Props to pass to the Dropdown component used internally
   */
  dropdownProps?: Partial<Omit<DropdownProps, 'children'>>;
  /**
   * Content of the menu - should be MenuItem kind of elements
   */
  children?: React.ReactNode;
  /**
   * Query selector string allowing the menu to find his navagable items
   */
  itemQuerySelector?: string;
  /**
   * keep the menu opened on selection
   */
  keepOpened?: boolean;
};

type StringValueMenu = MenuOwnProps & {
  /**
   * The current value (or list of values) of menu
   */
  value?: string;
  /**
   * Callback fired when value changes
   */
  onChange?: (v: string) => void;
};

type ArrayValueMenu = MenuOwnProps & {
  /*
   * The current value of menu
   */
  value?: string[];
  /*
   * Callback fired when value changes
   */
  onChange?: (v: string[]) => void;
};

export type MenuProps = MergeProps<StringValueMenu | ArrayValueMenu, DropdownListProps>;

/**
 * Renders a list of possible actions in a temporary floating box relative to a `trigger` element.
 *
 * Menu can contain any elements like MenuItem, Divider, MenuItemCheckbox, MenuItemRadio and SubMenu.
 *
 * Menu can be opened and controlled internally when a trigger is provided,
 * but can also be controlled externally.
 */
export const Menu = forwardRef<HTMLDivElement, MenuProps>((props, ref) => {
  const {
    open,
    value,
    onOpen,
    trigger,
    onClose,
    onChange,
    anchorEl,
    children,
    triggerEl,
    className,
    keepOpened,
    dropdownProps,
    itemQuerySelector = defaultQuerySelector,
    ...otherProps
  } = props;

  const listBoxRef = useListNav({
    itemQuerySelector,
  });
  const mergedRef = useMergeRef(listBoxRef, ref);

  const handleChange = useEvent((v: string & string[]) => {
    if (onChange) onChange(v);
  });

  const state = useMemo(
    () => ({
      onChange: handleChange,
      keepOpened,
      value,
    }),
    [handleChange, value, keepOpened]
  );

  return (
    <MenuContext.Provider value={state}>
      <Dropdown
        closeOnTab
        trigger={trigger}
        open={open}
        onClose={onClose}
        onOpen={onOpen}
        anchorEl={anchorEl}
        triggerEl={triggerEl}
        {...(dropdownProps || {})}
      >
        <DropdownList ref={mergedRef} role="menu" className={className} {...otherProps}>
          {children}
        </DropdownList>
      </Dropdown>
    </MenuContext.Provider>
  );
});

Menu.displayName = 'Menu';

export default Menu;
