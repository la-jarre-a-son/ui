import React from 'react';

import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';
import { bindClassNames } from '../../utils/classNames';

import styles from './Divider.module.scss';

const cx = bindClassNames(styles);

/* Props */

export const DividerAlignments = ['left', 'center', 'right'] as const;

export type DividerAlign = (typeof DividerAlignments)[number];

export type DividerProps = {
  /**
   * Specifies how the elements should be aligned
   */
  align?: DividerAlign;
};

/**
 * Renders an horizontal line, used as a separator in lists.
 *
 * It can take children in order to display them inside the horizontal line.
 */
export const Divider = forwardRefWithAs<DividerProps, 'hr'>((props, ref) => {
  const { className, as, children, align = 'center', ...otherProps } = props;

  const Element = as ?? (children ? 'div' : 'hr');

  return (
    <Element
      ref={ref}
      role="separator"
      aria-orientation="horizontal"
      className={cx('root', !!children && '--wrap', !!children && align && `--${align}`, className)}
      {...otherProps}
    >
      {children}
    </Element>
  );
});

Divider.displayName = 'Divider';

export default Divider;
