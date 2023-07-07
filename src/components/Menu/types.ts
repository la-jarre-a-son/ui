import React from 'react';
import { MergeProps } from '../../utils/typeUtils';
import { DropdownProps } from '../Dropdown/types';
import { CardProps } from '../Card/types';
import { ListProps } from '../List/types';
import { CheckboxProps } from '../Checkbox';
import { RadioProps } from '../Radio';
import { ListGroupProps } from '../List';

export type MenuItemProps = {
  /**
   * Content on the left of the item
   */
  left?: React.ReactNode;
  /**
   * Content on the right of the item
   */
  right?: React.ReactNode;
  /**
   * Specifies that the item is selected
   */
  selected?: boolean;
  /**
   * Disables the item and its interactions
   */
  disabled?: boolean;
  /**
   * An optional value associated to the item
   *
   * If specified on an item inside a Menu with a value,
   * the selected state will be automatically managed.
   */
  value?: string;
  /**
   * Callback fired when user clicks on item or press enter
   */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  /**
   * Callback fired when user presses a key
   */
  onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
  /**
   * Content of the item
   */
  children?: React.ReactNode;
};

type SubMenuOwnProps = {
  /**
   * Content of the SubMenu item
   */
  text: React.ReactNode;
};

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

export type MenuProps = MergeProps<
  StringValueMenu | ArrayValueMenu,
  CardProps & ListProps & Omit<React.HTMLProps<'ul'>, 'as' | 'ref'>
>;

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

export type MenuGroupProps = Omit<ListGroupProps, 'listAs'>;

export type SubMenuProps = MergeProps<MenuProps, MenuItemProps & SubMenuOwnProps>;
