import React from 'react';
import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import styles from './Grid.module.scss';
import { GridProps } from './types';

const cx = bindClassNames(styles);

/**
 * Wraps elements in a grid.
 */
export const Grid = forwardRefWithAs<GridProps, 'div'>((props, ref) => {
  const { children, as, className, gap, size, ...otherProps } = props;

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

Grid.defaultProps = {
  size: 'md',
};

export default Grid;
