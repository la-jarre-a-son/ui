import React from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import { BadgeProps } from './types';

import styles from './Badge.module.scss';

const cx = bindClassNames(styles);

/**
 * Renders a pill with a text, and any elements on the sides of it (e.g. icons).
 */
export const Badge = forwardRefWithAs<BadgeProps, 'div'>((props, ref) => {
  const { intent, size, className, children, right, left, as, ...otherProps } = props;

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

Badge.defaultProps = {
  intent: 'neutral',
  size: 'md',
};

export default Badge;
