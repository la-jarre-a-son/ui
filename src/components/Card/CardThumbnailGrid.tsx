import React from 'react';

import { forwardRefWithAs, bindClassNames } from '../../utils';

import styles from './Card.module.scss';

const cx = bindClassNames(styles);

/* Props */

export type CardThumbnailGridProps = {
  /**
   * content of the card thumbnail grid
   */
  children?: React.ReactNode;
};

/**
 * Wraps multiple thumbnails of a Card in an organized grid.
 *
 * It can have 3 children (1 main thumbnail, and 2 other smaller thumbnails).
 *
 * Must be used inside a Card component, and should contain CardThumbnail elements.
 */
export const CardThumbnailGrid = forwardRefWithAs<CardThumbnailGridProps, 'div'>((props, ref) => {
  const { children, as, className, ...otherProps } = props;

  const Element = as || 'div';

  const slicedChildren = Array.isArray(children) ? children.slice(0, 3) : children;

  return (
    <Element ref={ref} className={cx('thumbnailGrid', className)} {...otherProps}>
      {slicedChildren}
    </Element>
  );
});

CardThumbnailGrid.displayName = 'CardThumbnailGrid';

export default CardThumbnailGrid;
