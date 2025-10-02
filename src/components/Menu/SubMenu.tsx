import React, { useCallback, useEffect, useState } from 'react';

import { MergeProps } from '../../utils/typeUtils';
import { attemptFocus } from '../../utils/focusUtils';
import { useForkRef } from '../../utils/refUtils';
import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithStatic } from '../../utils/forwardRef/forwardRefWithStatic';

import type { DropdownProps } from '../Dropdown';
import { ListItem } from '../List';

import type { MenuItemProps } from './MenuItem';
import { Menu, MenuProps } from './Menu';

import styles from './Menu.module.scss';

const cx = bindClassNames(styles);

type SubMenuStatic = {
  /**
   * Icon when submenu is open
   */
  ICON_OPEN: string;
  /**
   * Icon when submenu is closed
   */
  ICON_CLOSED: string;
};

const dropdownProps = {
  disablePortal: true,
  disableStacking: true,
  placement: 'right-start',
  triggerKeys: ['ArrowRight', 'ArrowLeft', 'Enter'],
} as DropdownProps;

/* Props */

type SubMenuOwnProps = {
  /**
   * Content of the SubMenu item
   */
  text: React.ReactNode;
};

export type SubMenuProps = MergeProps<MenuProps, MenuItemProps & SubMenuOwnProps>;

/**
 * Renders a sub menu / nested menu that will open as a separate floating menu.
 *
 * It has the same rendering as a Menu, with additional interactions for opening/closing.
 *
 * To be used inside a `<Menu>` component.
 */
export const SubMenu = forwardRefWithStatic<HTMLLIElement, SubMenuProps, SubMenuStatic>(
  (props: SubMenuProps, ref) => {
    const { children, left, right, disabled, text, ...otherProps } = props;
    const [containerEl, setContainerEl] = useState<HTMLElement | null>(null);
    const [triggerRef, triggerMergedRef] = useForkRef<HTMLElement | null>(ref);

    const [open, setOpen] = useState(false);

    const handleClose = useCallback(() => {
      setOpen(false);
    }, [setOpen]);

    const handleOpen = useCallback(() => {
      setOpen(true);
    }, [setOpen]);

    useEffect(() => {
      function handleKeyDown(e: KeyboardEvent) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
          attemptFocus(triggerRef.current, true);
          handleClose();
          e.preventDefault();
          e.stopPropagation();
        }
      }
      if (containerEl) {
        containerEl.addEventListener('keydown', handleKeyDown);
      }

      return () => {
        if (containerEl) {
          containerEl.removeEventListener('keydown', handleKeyDown);
        }
      };
    }, [containerEl, handleClose, triggerRef]);

    return (
      <Menu
        trigger={
          <ListItem
            tabIndex={-1}
            interactive
            ref={triggerMergedRef}
            left={left}
            disabled={disabled}
            role="menuitem"
            as="button"
            right={
              <>
                {right}
                <i
                  className={cx(
                    'subMenuIcon',
                    open && '--open',
                    open && SubMenu.ICON_OPEN,
                    !open && SubMenu.ICON_CLOSED
                  )}
                />
              </>
            }
          >
            {text}
          </ListItem>
        }
        tabIndex={undefined}
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        ref={setContainerEl}
        dropdownProps={dropdownProps}
        {...otherProps}
      >
        {children}
      </Menu>
    );
  }
);

SubMenu.ICON_OPEN = 'fi fi-rr-angle-right';
SubMenu.ICON_CLOSED = 'fi fi-rr-angle-right';

SubMenu.displayName = 'SubMenu';

export default SubMenu;
