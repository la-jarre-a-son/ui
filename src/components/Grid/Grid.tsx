import React from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import styles from './Grid.module.scss';

const cx = bindClassNames(styles);

/* Props */

export const GridSizes = ['sm', 'md', 'lg'] as const;
export const GridGaps = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export type GridGap = (typeof GridGaps)[number];
export type GridSize = (typeof GridSizes)[number];

export type GridProps = {
  /**
   * The space between items, as a space multiplier
   */
  gap?: GridGap;
  /**
   * The minimum width of each column (in teeshirt size).
   */
  size?: GridSize;
  /**
   * The grid items.
   */
  children?: React.ReactNode;
};

/**
 * Wraps elements in a grid.
 */
export const Grid = forwardRefWithAs<GridProps, 'div'>((props, ref) => {
  const { children, as, className, gap, size = 'md', ...otherProps } = props;

  const Element = as || 'div';

  return (
    <Element
      ref={ref}
      className={cx('root', gap && `--gap-${gap}`, size && `col--${size}`, className)}
      {...otherProps}
    >
      {children}
    </Element>
  );
});

Grid.displayName = 'Grid';

export default Grid;
