import React from 'react';
import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import styles from './Card.module.scss';
import { CardThumbnailItemProps } from './types';

const cx = bindClassNames(styles);

/**
 * Wraps content in a CardThumbnail with specific anchor placements relative to the thumbnail.
 *
 * Must be used inside a CardThumbnail.
 */
export const CardThumbnailItem = forwardRefWithAs<CardThumbnailItemProps, 'div'>((props, ref) => {
  const { children, as, className, position, ...otherProps } = props;

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

CardThumbnailItem.defaultProps = {
  position: 'center',
};

export default CardThumbnailItem;
