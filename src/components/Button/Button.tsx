import React from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRef';

import styles from './Button.module.scss';

const cx = bindClassNames(styles);

/* Props */

export const ButtonSizes = ['sm', 'md', 'lg'] as const;
export const ButtonVariants = ['filled', 'outlined', 'ghost'] as const;
export const ButtonIntents = [
  'neutral',
  'primary',
  'secondary',
  'danger',
  'warning',
  'success',
] as const;

export type ButtonSize = (typeof ButtonSizes)[number];
export type ButtonVariant = (typeof ButtonVariants)[number];
export type ButtonIntent = (typeof ButtonIntents)[number];

type ButtonBaseProps = {
  /**
   * The button size (in teeshirt size)
   * */
  size?: ButtonSize;
  /**
   * The button stylistic variant:
   *
   * * `filled`: no borders, background filled with color
   * * `outlined`: colored borders, with transparent background
   * * `ghost`: no borders, with transparent background
   */
  variant?: ButtonVariant;
  /**
   * The semantic button intent
   */
  intent?: ButtonIntent;
  /**
   * Content on the left side of the button
   */
  left?: React.ReactNode;
  /**
   * Content on the right side of the button
   */
  right?: React.ReactNode;
  /**
   * Makes the button take the whole available width
   */
  block?: boolean;
  /**
   * Disables the button and its interactions
   */
  disabled?: boolean;
  /**
   * Makes the button radius perfectly round.
   */
  rounded?: boolean;
  /**
   * Makes the button neutral when not hover
   */
  hoverIntent?: boolean;
  /**
   * The content of the button.
   */
  children?: React.ReactNode;
};

type ClassicButtonProps = ButtonBaseProps & {
  /**
   * Specifies that the button is a single icon
   */
  icon?: false;
};

type ButtonIconProps = ButtonBaseProps & {
  icon: true;
  /**
   * The aria-label of the button (mandatory if icon is `true`)
   */
  'aria-label': string;
};

export type ButtonProps = ClassicButtonProps | ButtonIconProps;

/**
 * Renders a button with semantic intent and stylistic variant, with any element on the sides of it (e.g.: icons).
 */
export const Button = forwardRefWithAs<ButtonProps, 'button'>((props, ref) => {
  const {
    size = 'md',
    variant = 'filled',
    intent = 'primary',
    className,
    as,
    children,
    left,
    right,
    icon = false,
    rounded = false,
    block = false,
    hoverIntent,
    type: propType,
    ...otherProps
  } = props;

  const Element = as || 'button';
  const type = propType ?? Element === 'button' ? 'button' : undefined;

  return (
    <Element
      ref={ref}
      type={type}
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

export default Button;
