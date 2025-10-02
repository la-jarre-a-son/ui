import React, { useEffect, useRef, useState } from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRef';

import styles from './Card.module.scss';

type CardThumbnailStatics = {
  /**
   * Duration threshold in ms to disable transition if loading is fast
   */
  TRANSITION_THRESHOLD: number;
};

type LoadStatus = 'idle' | 'loading' | 'loaded' | 'error';

const cx = bindClassNames(styles);

/* Props */

export type CardThumbnailProps = {
  /**
   * The image url of the thumbnail
   */
  src?: string;
  /**
   * The alt text of the thumbnail
   */
  alt: string;
  /**
   * Props to pass to the image element
   */
  imgProps?: React.ComponentProps<'img'>;
};

/**
 * Renders a thumbnail in a card, with fallback to a placeholder if the image cannot be loaded.
 *
 * Must be used inside a Card or a CardThumbnailGrid component.
 */
export const CardThumbnail = forwardRefWithAs<CardThumbnailProps, 'div', CardThumbnailStatics>(
  (props, ref) => {
    const { as, className, children, src, alt, imgProps, ...otherProps } = props;
    const startLoadTime = useRef<number>(Date.now());

    const [status, setStatus] = useState<LoadStatus>('idle');
    const [skipTransition, setSkipTransition] = useState(false);

    const Element = as || 'div';

    useEffect(() => {
      // start loading after mount to skip image loading on server side
      setStatus('loading');
      startLoadTime.current = Date.now();
    }, [src]);

    const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
      setStatus('loaded');
      if (Date.now() - startLoadTime.current < CardThumbnail.TRANSITION_THRESHOLD) {
        setSkipTransition(true);
      }
      if (imgProps?.onLoad) imgProps?.onLoad(e);
    };

    const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
      if (imgProps?.onError) imgProps?.onError(e);
      setStatus('error');
    };

    return (
      <Element ref={ref} className={cx('thumbnail', className)} {...otherProps}>
        <div className={cx('thumbnailWrapper')}>
          {status !== 'idle' && (
            <img
              {...(imgProps || {})}
              alt={alt}
              src={src}
              onLoad={handleLoad}
              onError={handleError}
              className={cx(
                'thumbnailImage',
                imgProps?.className,
                status === 'loaded' && '--isLoaded',
                status === 'error' && '--hasError',
                skipTransition && '--skipTransition'
              )}
            />
          )}
          {(!src || status !== 'loaded') && (
            <div role="presentation" className={cx('thumbnailPlaceholder')} />
          )}
          {children}
        </div>
      </Element>
    );
  }
);

CardThumbnail.TRANSITION_THRESHOLD = 60;

CardThumbnail.displayName = 'CardThumbnail';

export default CardThumbnail;
