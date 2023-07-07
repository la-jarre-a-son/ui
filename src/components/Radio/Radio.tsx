import React from 'react';

import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';
import { bindClassNames } from '../../utils/classNames';

import { useRadioGroup } from '../RadioGroup/RadioGroupContext';

import { RadioProps } from './types';

import styles from './Radio.module.scss';

const cx = bindClassNames(styles);

/**
 * Renders a radio element as a decorated input element, and `onChange` callback with boolean value.
 *
 * When used inside a RadioGroup, the component inherits from the provided context, and automatically manages its `checked` state.
 *
 * > All props passed to it will be passed to the input element.
 * If you wan't to pass props specifically to the wrapper root element, use the `wrapperProps` prop.
 */
export const Radio = forwardRefWithAs<RadioProps, 'input'>(
  (
    {
      className,
      as: inputAs,
      disabled = false,
      checked,
      name,
      value,
      onChange,
      wrapperProps: { as, ...otherWrapperProps } = {},
      ...otherProps
    },
    ref
  ) => {
    const Element = as || 'div';
    const InputElement = inputAs || 'input';

    const { ...groupProps } = useRadioGroup() || {};

    const _name = groupProps?.name ?? name;
    const _checked =
      groupProps?.currentValue !== undefined ? groupProps?.currentValue === value : checked;

    const _disabled = groupProps?.disabled ?? disabled;
    const _onChange = groupProps?.onChange ?? onChange;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (_onChange) {
        _onChange(e.currentTarget.checked ? value || '' : '', e);
      }
    };

    return (
      <Element
        className={cx('root', className, _checked && '--checked', _disabled && '--disabled')}
        {...otherWrapperProps}
      >
        <InputElement
          className={cx('input')}
          ref={ref}
          type="radio"
          checked={_checked}
          disabled={_disabled}
          onChange={handleChange}
          name={_name}
          value={value}
          {...otherProps}
        />
        <div className={cx('wrapper')}>
          <span className={cx('dot')} />
        </div>
      </Element>
    );
  }
);

Radio.displayName = 'Radio';

export default Radio;
