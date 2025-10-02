import React from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import styles from './Badge.module.scss';

const cx = bindClassNames(styles);

/* Props */

export const BadgeSizes = ['sm', 'md', 'lg'] as const;
export const BadgeIntents = [
  'neutral',
  'primary',
  'secondary',
  'error',
  'warning',
  'success',
] as const;

export type BadgeSize = (typeof BadgeSizes)[number];

export type BadgeIntent = (typeof BadgeIntents)[number];

export interface BadgeProps {
  /**
   * The badge semantic intent
   */
  intent?: BadgeIntent;
  /**
   * The badge size (in teeshirt size)
   */
  size?: BadgeSize;
  /**
   * Content on the left side of the badge
   */
  left?: React.ReactNode;
  /**
   * Content on the right side of the badge
   */
  right?: React.ReactNode;
  /**
   * The content of the badge
   */
  children?: React.ReactNode;
}

/**
 * Renders a pill with a text, and any elements on the sides of it (e.g. icons).
 */
export const Badge = forwardRefWithAs<BadgeProps, 'div'>((props, ref) => {
  const {
    intent = 'neutral',
    size = 'md',
    className,
    children,
    right,
    left,
    as,
    ...otherProps
  } = props;

  const Element = as || 'div';

  return (
    <Element
      ref={ref}
      className={cx('root', intent && `--${intent}`, size && `--${size}`, className)}
      {...otherProps}
    >
      {left}
      {children && <div className={cx('label')}>{children}</div>}
      {right}
    </Element>
  );
});

Badge.displayName = 'Badge';

export default Badge;
