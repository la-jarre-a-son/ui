import React, { useState, useRef, useEffect } from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import Icon from '../Icon';

import { AvatarProps } from './types';

import styles from './Avatar.module.scss';

const cx = bindClassNames(styles);

type AvatarStatics = {
  ICON_USER: string;
  AVATAR_TRANSITION_THRESHOLD: number;
};

type LoadStatus = 'idle' | 'loading' | 'loaded' | 'error';

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
    if (Date.now() - startLoadTime.current < Avatar.AVATAR_TRANSITION_THRESHOLD) {
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

Avatar.ICON_USER = 'fa-regular fa-user';
Avatar.AVATAR_TRANSITION_THRESHOLD = 60; // in milliseconds

Avatar.displayName = 'Avatar';

Avatar.defaultProps = {};

export default Avatar;
