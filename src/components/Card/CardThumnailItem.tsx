import React from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRef';

import styles from './Card.module.scss';

const cx = bindClassNames(styles);

/* Props */

export type CardThumbnailItemPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'center';

export type CardThumbnailItemProps = {
  /**
   * The position of the thumbnail item container
   */
  position: CardThumbnailItemPosition;
};

/**
 * Wraps content in a CardThumbnail with specific anchor placements relative to the thumbnail.
 *
 * Must be used inside a CardThumbnail.
 */
export const CardThumbnailItem = forwardRefWithAs<CardThumbnailItemProps, 'div'>((props, ref) => {
  const { children, as, className, position = 'center', ...otherProps } = props;

  const Element = as || 'div';

  return (
    <Element
      ref={ref}
      className={cx('thumbnailItem', position && `--${position}`, className)}
      {...otherProps}
    >
      {children}
    </Element>
  );
});

CardThumbnailItem.displayName = 'CardThumbnailItem';

export default CardThumbnailItem;
