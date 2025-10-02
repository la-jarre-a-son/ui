import React from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';
import Icon from '../Icon';

import { InputContainerProps } from './types';

import styles from './InputContainer.module.scss';

const cx = bindClassNames(styles);

type InputContainerStatic = {
  ICON_ERROR: string;
};

/**
 * Renders the container for an input.
 *
 * Should be used to decorate inputs with stylistic variants and states.
 */
export const InputContainer = forwardRefWithAs<InputContainerProps, 'div', InputContainerStatic>(
  (props, ref) => {
    const {
      className,
      as,
      error,
      children,
      block,
      size,
      left,
      right,
      disabled,
      focused,
      ...otherProps
    } = props;

    const Element = as || 'div';

    return (
      <Element
        ref={ref}
        className={cx(
          'root',
          size && `--${size}`,
          {
            '--hasError': !!error,
            '--isDisabled': !!disabled,
            '--focused': focused,
            '--block': block,
          },
          className
        )}
        {...otherProps}
      >
        {left}
        {children}
        {right}
        {!!error && <Icon className={cx('errorIcon')} name={InputContainer.ICON_ERROR} />}
      </Element>
    );
  }
);

InputContainer.ICON_ERROR = 'fi fi-rr-exclamation';

InputContainer.displayName = 'InputContainer';

InputContainer.defaultProps = {
  size: 'md',
  block: false,
};

export default InputContainer;
