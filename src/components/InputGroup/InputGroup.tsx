import React from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import { InputGroupProps } from './types';

import styles from './InputGroup.module.scss';

const cx = bindClassNames(styles);

/**
 * Wraps a set of inputs relative to each other.
 *
 * You can mix any elements wrapped with InputContainer, InputContainerLabel and Button.
 */
export const InputGroup = forwardRefWithAs<InputGroupProps, 'div'>((props, ref) => {
  const {
    className,
    as,
    children,
    direction = 'horizontal',
    stretch = false,
    block = false,
    ...otherProps
  } = props;

  const Element = as || 'div';

  return (
    <Element
      ref={ref}
      className={cx(
        'root',
        `--${direction}`,
        stretch && '--stretch',
        block && '--block',
        className
      )}
      {...otherProps}
    >
      {children}
    </Element>
  );
});

InputGroup.displayName = 'InputGroup';

export default InputGroup;
