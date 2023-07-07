import React from 'react';
import { Input } from '../Input';
import { bindClassNames, forwardRefWithStatic } from '../../utils';

import { Icon } from '../Icon';

import styles from './Select.module.scss';
import { SelectTriggerProps } from './types';

const cx = bindClassNames(styles);

type SelectTriggerStatic = {
  ICON_OPEN: string;
  ICON_CLOSED: string;
};

/**
 * Trigger input for the Select component
 */
export const SelectTrigger = forwardRefWithStatic<
  HTMLInputElement,
  SelectTriggerProps,
  SelectTriggerStatic
>((props, ref) => {
  const { open, value, disabled, className, size, placeholder, containerProps, ...otherProps } =
    props;

  return (
    <Input
      disabled={disabled}
      size={size}
      containerProps={{
        focused: open,
        role: 'combobox',
        ...containerProps,
      }}
      right={
        <Icon
          name={open ? SelectTrigger.ICON_OPEN : SelectTrigger.ICON_CLOSED}
          aria-hidden="true"
        />
      }
      className={cx('root', className)}
      aria-haspopup="listbox"
      aria-placeholder={placeholder}
    >
      <input
        ref={ref}
        disabled={disabled}
        value={value}
        readOnly
        placeholder={placeholder}
        {...otherProps}
      />
    </Input>
  );
});

SelectTrigger.defaultProps = {
  value: '',
};

SelectTrigger.displayName = 'SelectTrigger';

SelectTrigger.ICON_OPEN = 'fa-solid fa-angle-up';
SelectTrigger.ICON_CLOSED = 'fa-solid fa-angle-down';

export default SelectTrigger;
