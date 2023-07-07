import React, { forwardRef, useMemo } from 'react';

import useListNav from '../../utils/useListNav';
import Dropdown, { DropdownList } from '../Dropdown';
import useEvent from '../../utils/useEvent';
import { useMergeRef } from '../../utils/refUtils';

import { MenuProps } from './types';
import { MenuContext } from './MenuContext';

const defaultQuerySelector = '[role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"]';

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
