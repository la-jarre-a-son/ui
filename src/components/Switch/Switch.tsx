import React from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';
import { PropsWithAs } from '../../utils/typeUtils';

import { Icon } from '../Icon';

import styles from './Switch.module.scss';

type SwitchStatic = {
  ICON_CHECKED: string;
  ICON_UNCHECKED: string;
};

const cx = bindClassNames(styles);

/* Props */

export type SwitchProps = {
  /**
   * Specifies that the switch is checked
   */
  checked?: boolean;
  /**
   * Disables the switch and all its interactions
   */
  disabled?: boolean;
  /**
   * Props to pass to the root container element.
   *
   * NOTE: rest of props are passed to the input element
   */
  wrapperProps?: PropsWithAs<React.ElementType, React.ComponentProps<'div'>>;
  /**
   * Callback when the switch state changes.
   *
   * First argument is the state as a `boolean`, second argument is the raw event of the input.
   */
  onChange?: (value: boolean, event?: React.ChangeEvent<HTMLInputElement>) => void;
};

/**
 * Renders a toggleable switch element as a decorated input element, and `onChange` callback with boolean value.
 *
 * > All props passed to it will be passed to the input element,
 * > use the `wrapperProps` prop to pass props specifically to the wrapper root element.
 */
export const Switch = forwardRefWithAs<SwitchProps, 'input', SwitchStatic>(
  (
    {
      className,
      as: inputAs,
      disabled = false,
      checked,
      onChange,
      wrapperProps: { as, ...otherWrapperProps } = {},
      ...otherProps
    },
    ref
  ) => {
    const Element = as || 'div';
    const InputElement = inputAs || 'input';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) onChange(e.currentTarget.checked, e);
    };

    return (
      <Element
        className={cx('root', className, checked && '--checked', disabled && '--disabled')}
        {...otherWrapperProps}
      >
        <InputElement
          className={cx('input')}
          ref={ref}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          {...otherProps}
        />
        <div className={cx('wrapper')}>
          <div className={cx('handle')}>
            <Icon
              aria-hidden="true"
              name={checked ? Switch.ICON_CHECKED : Switch.ICON_UNCHECKED}
              className={cx('icon')}
            />
          </div>
        </div>
      </Element>
    );
  }
);

Switch.ICON_UNCHECKED = 'fi fi-rr-cross';
Switch.ICON_CHECKED = 'fi fi-rr-check';

Switch.displayName = 'Switch';

export default Switch;
