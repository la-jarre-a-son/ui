import React from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRef';

import styles from './Card.module.scss';

const cx = bindClassNames(styles);

/* Props */

export type CardThumbnailOverlayProps = {
  /**
   * Add interactive styles to the overlay
   */
  interactive?: boolean;
};

/**
 * Renders an overlay for card thumbnails, to highlight interactions or improve contrast.
 *
 * Must be used inside a CardThumbnail.
 */
export const CardThumbnailOverlay = forwardRefWithAs<CardThumbnailOverlayProps, 'div'>(
  (props, ref) => {
    const { children, as, className, interactive, ...otherProps } = props;

    const Element = as || 'div';

    return (
      <Element
        ref={ref}
        className={cx('thumbnailOverlay', interactive && '--thumbnailInteractive', className)}
        {...otherProps}
      >
        {children}
      </Element>
    );
  }
);

CardThumbnailOverlay.displayName = 'CardThumbnailOverlay';

export default CardThumbnailOverlay;
