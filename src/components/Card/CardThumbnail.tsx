import React, { useState } from 'react';
import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import styles from './Card.module.scss';
import { CardThumbnailProps } from './types';

const cx = bindClassNames(styles);

/**
 * Renders a thumbnail in a card, with fallback to a placeholder if the image cannot be loaded.
 *
 * Must be used inside a Card or a CardThumbnailGrid component.
 */
export const CardThumbnail = forwardRefWithAs<CardThumbnailProps, 'div'>((props, ref) => {
  const { as, className, children, src, alt, imgProps, ...otherProps } = props;

  const Element = as || 'div';

  const [hasError, setHasError] = useState(false);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (imgProps?.onError) imgProps?.onError(e);
    setHasError(true);
  };

  return (
    <Element ref={ref} className={cx('thumbnail', className)} {...otherProps}>
      <div className={cx('thumbnailWrapper')}>
        <img
          {...(imgProps || {})}
          alt={alt}
          src={src}
          onError={handleError}
          className={cx(imgProps?.className, hasError && '--hasError')}
        />
        {(!src || hasError) && <div role="presentation" className={cx('thumbnailPlaceholder')} />}
        {children}
      </div>
    </Element>
  );
});

CardThumbnail.displayName = 'CardThumbnail';

CardThumbnail.defaultProps = {};

export default CardThumbnail;
