import React from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRef';

import styles from './Typography.module.scss';

const cx = bindClassNames(styles);

/* Props */

export const TypographyWeights = ['light', 'regular', 'bold'] as const;
export const TypographySizes = ['lg', 'md', 'sm'] as const;

export type TypographyWeight = (typeof TypographyWeights)[number];
export type TypographySize = (typeof TypographySizes)[number];
export type TypographyAlign = 'center' | 'start' | 'end';
export type TypographyIntent =
  | 'default'
  | 'subtle'
  | 'contrast'
  | 'placeholder'
  | 'inherit'
  | 'error';

export type TypographyProps = {
  /*
   * The text size
   */
  size?: TypographySize;
  /**
   * The text alignment
   */
  align?: TypographyAlign;
  /**
   * The text weight
   */
  weight?: TypographyWeight;
  /**
   * The text intent color
   */
  intent?: TypographyIntent;
  /**
   * The content to style
   */
  children?: React.ReactNode;
};

/**
 * Wraps any content, with typographic styling.
 */
export const Typography = forwardRefWithAs<TypographyProps, 'div'>((props, ref) => {
  const {
    className,
    children,
    as,
    align,
    size = 'md',
    weight = 'light',
    intent = 'inherit',
    ...otherProps
  } = props;

  const Element = as || 'div';

  return (
    <Element
      ref={ref}
      className={cx('root', `${size}--${weight}`, align && `--${align}`, intent && `--${intent}`, [
        className,
      ])}
      {...otherProps}
    >
      {children}
    </Element>
  );
});

Typography.displayName = 'Typography';

export default Typography;
