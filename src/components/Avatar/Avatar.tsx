import React, { useState, useRef, useEffect } from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRef';

import { Icon } from '../Icon';

import styles from './Avatar.module.scss';

type AvatarStatics = {
  /**
   * Icon when Avatar is not loaded
   */
  ICON_USER: string;
  /**
   * Duration threshold in ms to disable transition if loading is fast
   */
  TRANSITION_THRESHOLD: number;
};

type LoadStatus = 'idle' | 'loading' | 'loaded' | 'error';

const cx = bindClassNames(styles);

/* Props */

export const AvatarSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export const AvatarShapes = ['round', 'square'] as const;

export type AvatarSize = (typeof AvatarSizes)[number];

export type AvatarShape = (typeof AvatarShapes)[number];

type AvatarBaseProps = {
  /**
   * The avatar size (in teeshirt size)
   * */
  size?: AvatarSize;
  /**
   * The avatar shape
   */
  shape?: AvatarShape;
  /**
   * Displays an outline around avatar - defaults to `false`
   */
  outlined?: boolean;
  /**
   * Displays an outline around avatar to indicate online status - defaults to `false`
   */
  online?: boolean;
  /**
   * The image on load callback
   */
  onLoad?: React.ReactEventHandler<HTMLImageElement>;
  /**
   * The image on load callback
   */
  onError?: React.ReactEventHandler<HTMLImageElement>;
  /**
   * The label / initials of avatar (displayed when no image / not loaded)
   */
  children?: React.ReactNode;
};

type AvatarWithoutImageProps = {
  image?: undefined;
  alt?: undefined;
} & AvatarBaseProps;

type AvatarWithImageProps = {
  /**
   * The image url of avatar image
   */
  image: string;
  /**
   *  The alt text for avatar image
   */
  alt: string;
} & AvatarBaseProps;

export type AvatarProps = AvatarWithoutImageProps | AvatarWithImageProps;

/**
 * Renders an User avatar, round or square, with an image or a text (user initials).
 */
export const Avatar = forwardRefWithAs<AvatarProps, 'div', AvatarStatics>((props, ref) => {
  const {
    as,
    alt,
    image,
    onLoad,
    onError,
    children,
    className,
    size,
    shape,
    outlined,
    online,
    ...otherProps
  } = props;
  const startLoadTime = useRef<number>(Date.now());
  const Element = as || 'div';

  const [status, setStatus] = useState<LoadStatus>('idle');
  const [skipTransition, setSkipTransition] = useState(false);

  useEffect(() => {
    // start loading after mount to skip image loading on server side
    setStatus('loading');
    startLoadTime.current = Date.now();
  }, [image]);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setStatus('loaded');
    if (Date.now() - startLoadTime.current < Avatar.TRANSITION_THRESHOLD) {
      setSkipTransition(true);
    }
    if (onLoad) onLoad(e);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setStatus('error');
    if (onError) onError(e);
  };

  return (
    <Element
      ref={ref}
      className={cx(
        'root',
        size && `--${size}`,
        shape && `--${shape}`,
        outlined && `--outlined`,
        online && `--online`,
        status === 'loaded' && '--isLoaded',
        status === 'error' && '--hasError',
        skipTransition && '--skipTransition',
        className
      )}
      {...otherProps}
    >
      {children ||
        (status !== 'loaded' ? (
          <Icon className={cx('icon')} name={Avatar.ICON_USER} intent="subtle" />
        ) : null)}
      {status !== 'idle' && image && (
        <img
          className={cx('image')}
          src={image}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </Element>
  );
});

Avatar.ICON_USER = 'fi fi-rr-user';
Avatar.TRANSITION_THRESHOLD = 60; // in milliseconds

Avatar.displayName = 'Avatar';

export default Avatar;
