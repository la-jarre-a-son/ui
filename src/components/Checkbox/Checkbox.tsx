import React, { useEffect } from 'react';

import { bindClassNames, forwardRefWithAs, useForkRef } from '../../utils';

import Icon from '../Icon';
import { CheckboxProps } from './types';

import styles from './Checkbox.module.scss';

const cx = bindClassNames(styles);

type CheckboxStatic = {
  ICON_CHECKED: string;
  ICON_INDETERMINATE: string;
};

/**
 * Renders a checkbox element as a decorated input element, and `onChange` callback with boolean value.
 *
 * Checked state takes priority over the Indeterminate state.
 *
 * > All props passed to it will be passed to the input element,
 * > use the `wrapperProps` prop to pass props specifically to the wrapper root element.
 */
export const Checkbox = forwardRefWithAs<CheckboxProps, 'input', CheckboxStatic>((props, ref) => {
  const {
    className,
    as: inputAs,
    disabled,
    checked,
    indeterminate,
    onChange,
    wrapperProps: { as, ...otherWrapperProps } = {},
    ...otherProps
  } = props;

  const Element = as || 'div';
  const InputElement = inputAs || 'input';

  const [ownRef, mergedRef] = useForkRef(ref);

  useEffect(() => {
    if (ownRef.current && ownRef.current.indeterminate !== undefined) {
      if (!checked && indeterminate) {
        ownRef.current.indeterminate = true;
      } else {
        ownRef.current.indeterminate = false;
      }
    }
  }, [checked, indeterminate, ownRef]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.currentTarget.checked, e);
    }
  };

  return (
    <Element
      className={cx(
        'root',
        {
          '--indeterminate': indeterminate,
          '--checked': checked,
          '--disabled': disabled,
        },
        className
      )}
      {...otherWrapperProps}
    >
      <InputElement
        className={cx('input')}
        ref={mergedRef}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        {...otherProps}
      />
      <div className={cx('wrapper')}>
        <Icon
          className={cx('icon')}
          name={indeterminate ? Checkbox.ICON_INDETERMINATE : Checkbox.ICON_CHECKED}
        />
      </div>
    </Element>
  );
});

Checkbox.ICON_CHECKED = 'fi fi-rr-check';
Checkbox.ICON_INDETERMINATE = 'fi fi-rr-minus';

Checkbox.displayName = 'Checkbox';

Checkbox.defaultProps = {
  indeterminate: false,
  disabled: false,
};

export default Checkbox;
