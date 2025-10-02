import React, { useMemo } from 'react';

import { MergeProps } from '../../utils/typeUtils';
import { attemptFocus } from '../../utils/focusUtils';
import { useForkRef } from '../../utils/refUtils';
import { forwardRefWithStatic } from '../../utils/forwardRefWithStatic';
import { useEvent } from '../../utils/useEvent';
import { useId } from '../../utils/useId';
import { useListNav, ListNavOptions } from '../../utils/useListNav';

import { Dropdown, DropdownList, DropdownTriggerInternal, DropdownProps } from '../Dropdown';
import { useFormField } from '../Form';
import { InputProps } from '../Input';
import { Typography } from '../Typography';

import SelectOption from './SelectOption';
import SelectTrigger, { SelectTriggerProps } from './SelectTrigger';
import { SelectContext } from './SelectContext';

type SelectStatic = {
  /**
   * Maximum height for the select dropdown
   */
  HEIGHT_LIMIT: number;
};

/* Props */

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
  Omit<InputProps, 'onChange' | 'ref'>
>;

/**
 * Renders an input to select a value among a list of items displayed on a temporary floating box.
 * This component make use of the `Menu` and as a result accept all of its props.
 */
export const Select = forwardRefWithStatic<HTMLInputElement, SelectProps, SelectStatic>(
  (props, ref) => {
    const {
      // Dropdown props
      keepOpened,
      listProps = {},
      navOptions = {},
      dropdownProps = {},
      noOptionPlaceholder = 'No option',
      // Input props
      value,
      options,
      disabled,
      children,
      onChange,
      className,
      renderInput,
      placeholder,
      'aria-label': ariaLabel,
      ...otherInputProps
    } = props;

    const selectedOption = useMemo(() => options?.find((o) => o.value === value), [options, value]);

    const { label, inputProps } = useFormField();
    const [inputRef, mergedInputRef] = useForkRef(ref);

    const listboxId = useId(listProps?.id);

    const listBoxRef = useListNav({
      itemQuerySelector: '[role="option"]',
      ...navOptions,
    });

    /**
     * The trigger element render function
     */
    const renderTrigger = ({ triggerRef, open, handleClose }: DropdownTriggerInternal) => {
      // props to pass to the Input component
      const selectTriggerProps = {
        ...otherInputProps,
        'aria-label': ariaLabel,
        placeholder: placeholder,
        disabled: disabled,
        className: className,
        ref: mergedInputRef,
        value: value ? selectedOption?.label : undefined,
        open: open,
        containerProps: {
          ref: triggerRef as React.RefObject<HTMLDivElement>,
          'aria-controls': listboxId,
          ...inputProps,
        },
      };

      return typeof renderInput === 'function' ? (
        renderInput({
          triggerRef,
          open,
          disabled,
          placeholder,
          onClose: handleClose,
          selectedOption,
          value,
          selectTriggerProps,
        })
      ) : (
        <SelectTrigger {...selectTriggerProps} />
      );
    };

    const handleChange = useEvent((v: string) => {
      if (onChange) onChange(v);
    });

    const contextValue = useMemo(
      () => ({
        onChange: handleChange,
        value,
        keepOpened,
        refocusTrigger: () => {
          if (inputRef.current) {
            setTimeout(() => {
              attemptFocus(inputRef.current);
            }, 0);
          }
        },
      }),
      [handleChange, value, keepOpened, inputRef]
    );

    return (
      <SelectContext.Provider value={contextValue}>
        <Dropdown
          closeOnTab
          disableFocusTrap
          matchWidth
          trigger={renderTrigger}
          limitHeight={Select.HEIGHT_LIMIT}
          {...dropdownProps}
        >
          <DropdownList
            role="listbox"
            as="ul"
            aria-label={ariaLabel || label}
            ref={listBoxRef}
            {...listProps}
            id={listboxId}
          >
            {React.isValidElement(children) ? (
              children
            ) : options?.length ? (
              options?.map((o, index) =>
                typeof children === 'function' ? (
                  children({
                    option: o,
                    index,
                    onChange,
                    selected: value === o.value,
                  })
                ) : (
                  <SelectOption
                    key={o.value}
                    value={o.value}
                    onSelect={onChange}
                    selected={value === o.value}
                  >
                    {o.label}
                  </SelectOption>
                )
              )
            ) : (
              <SelectOption tabIndex={undefined} interactive={false}>
                <Typography intent="placeholder">{noOptionPlaceholder}</Typography>
              </SelectOption>
            )}
          </DropdownList>
        </Dropdown>
      </SelectContext.Provider>
    );
  }
);

Select.displayName = 'Select';

Select.HEIGHT_LIMIT = 320;

export default Select;
