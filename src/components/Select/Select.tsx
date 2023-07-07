import React, { useMemo } from 'react';

import { Dropdown, DropdownList, useFormField, DropdownTriggerInternal, Typography } from '../';
import {
  attemptFocus,
  forwardRefWithStatic,
  useEvent,
  useForkRef,
  useId,
  useListNav,
} from '../../utils';

import { SelectProps } from './types';
import SelectOption from './SelectOption';
import SelectTrigger from './SelectTrigger';
import { SelectContext } from './SelectContext';

type SelectStatic = {
  HEIGHT_LIMIT: number;
};

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
