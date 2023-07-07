import React from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import { ButtonProps } from './types';

import styles from './Button.module.scss';

const cx = bindClassNames(styles);

/**
 * Renders a button with semantic intent and stylistic variant, with any element on the sides of it (e.g.: icons).
 */
export const Button = forwardRefWithAs<ButtonProps, 'button'>((props, ref) => {
  const {
    size,
    variant,
    intent,
    className,
    as,
    children,
    left,
    right,
    icon,
    rounded,
    block,
    hoverIntent,
    ...otherProps
  } = props;

  const Element = as || 'button';

  return (
    <Element
      ref={ref}
      className={cx(
        'root',
        icon && `--icon`,
        rounded && `--rounded`,
        size && `--${size}`,
        variant && `--${variant}`,
        intent && `--${intent}`,
        block && '--block',
        hoverIntent && '--hoverIntent',
        className
      )}
      {...otherProps}
    >
      {left}
      {typeof children === 'string' ? <span className={cx('label')}>{children}</span> : children}
      {right}
    </Element>
  );
});

Button.displayName = 'Button';

Button.defaultProps = {
  size: 'md',
  variant: 'filled',
  intent: 'primary',
  icon: false,
  rounded: false,
  block: false,
  type: 'button',
};

export default Button;
