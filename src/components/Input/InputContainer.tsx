import React from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import Icon from '../Icon';

import styles from './InputContainer.module.scss';

type InputContainerStatic = {
  /**
   * Icon when input has errors
   */
  ICON_ERROR: string;
};

const cx = bindClassNames(styles);

/* Props */

export const InputSizes = ['sm', 'md', 'lg'] as const;

export type InputSize = (typeof InputSizes)[number];

export type InputContainerProps = {
  /**
   * Specifies that the wrapped input is disabled
   */
  disabled?: boolean;
  /**
   * Specifies that the wrapped input has error
   */
  error?: string | null | boolean;
  /**
   * Content to the left of the wrapped input
   */
  left?: React.ReactNode;
  /**
   * Content to the right of the wrapped input
   */
  right?: React.ReactNode;
  /**
   * Specifies that the wrapped input is focused.
   *
   * NOTE: it does not focus the input itself.
   */
  focused?: boolean;
  /**
   * Makes the container take the whole available width
   */
  block?: boolean;
  /**
   * The input size (in teeshirt size)
   * */
  size?: InputSize;
  /**
   * The wrapped input
   */
  children?: React.ReactNode;
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
      size = 'md',
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

export default InputContainer;
