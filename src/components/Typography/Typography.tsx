import React from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import { TypographyProps } from './types';

import styles from './Typography.module.scss';

const cx = bindClassNames(styles);

/**
 * Wraps any content, with typographic styling.
 */
export const Typography = forwardRefWithAs<TypographyProps, 'div'>((props, ref) => {
  const { size, weight, className, children, as, align, intent, ...otherProps } = props;

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

Typography.defaultProps = {
  intent: 'inherit',
  weight: 'light',
  size: 'md',
};

Typography.displayName = 'Typography';

export default Typography;
