import { InputProps as OriginalInputProps } from '../Input';
import React from 'react';
import { MergeProps } from '../../utils/typeUtils';
import { DropdownProps } from '../Dropdown/types';
import { ListNavOptions } from '../../utils';
import { DropdownList } from '../Dropdown';

type InputProps = Omit<OriginalInputProps, 'onChange' | 'ref'>;

export type SelectInputProps = {
  /**
   * The ref provided by the Select component
   */
  triggerRef: React.Ref<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * Specifies that the Select menu is open
   */
  open: boolean;
  /**
   * The current selected option
   */
  selectedOption?: SelectOptionType | null;
  /**
   * The selected value
   */
  value?: string | null;
  /**
   * Is the input disabled
   */
  disabled?: boolean;
  /**
   * The current placeholder
   */
  placeholder?: string;
  /**
   * The Dropdown onClose function
   */
  onClose: () => void;
  /**
   * All the props normally passed to the `SelectTrigger` input component
   */
  selectTriggerProps: SelectTriggerProps;
};

export type SelectOptionType = {
  /**
   * The value of the option
   */
  value: string | null;
  /**
   * The content of the option
   */
  label: string;
};

export type RenderSelectOptionProps<Option extends SelectOptionType = SelectOptionType> = {
  /**
   * The full option object
   */
  option: Option;
  /**
   * The index of the option, in the `options` passed to the Select component
   */
  index: number;
  /**
   * Specifies that the option is selected
   */
  selected: boolean;
  /**
   * Callback to be fired when the option state changes.
   */
  onChange?: (value: string | null) => void;
};

export type SelectProps = MergeProps<
  {
    /**
     * The current value of the select
     */
    value?: string | null;
    /**
     * The list of options in the select
     */
    options?: SelectOptionType[];
    /**
     * Callback fired when the selected option changes
     */
    onChange?: (value: string) => void;
    /**
     * A function to render the input trigger.
     *
     * Receives a `props` object containing with otther props a `selectedOption` and `value` if any.
     */
    renderInput?: (props: SelectInputProps) => React.ReactNode;
    /**
     * A render function for each option passed as `options`
     */
    children?: ((optionProps: RenderSelectOptionProps) => React.ReactNode) | React.ReactNode;
    /**
     * The placeholder text when no option is selected
     */
    placeholder?: string;
    /**
     * Props to pass to the Menu component
     */
    dropdownProps?: DropdownProps;
    /**
     * A ref to pass to the listbox element
     */
    listBoxRef?: React.Ref<HTMLElement>;
    /**
     * Keep the select opened on select
     */
    keepOpened?: boolean;
    /**
     * Option to pass to the list nav
     */
    navOptions?: ListNavOptions;
    /**
     * Props to pass to the `DropdownList` sub-component
     */
    listProps?: React.ComponentProps<typeof DropdownList>;
    /**
     * Placeholder text to display when no option is available
     */
    noOptionPlaceholder?: string;
  },
  InputProps
>;

export type SelectOptionProps = {
  /**
   * Specifies that the option is selected
   */
  selected?: boolean;
  /**
   * The option associated value
   */
  value?: string | null;
  /**
   * Specifies that the option is focused
   */
  focused?: boolean;
  /**
   * Callback fired when the option is selected
   */
  onSelect?: (value: string | null) => void;
};

export type SelectTriggerProps = MergeProps<
  {
    /**
     * The input value
     */
    value?: string;
    /**
     * Is the corresponding Select opened ?
     */
    open?: boolean;
  },
  InputProps
>;
