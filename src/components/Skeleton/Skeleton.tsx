import React from 'react';
import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import styles from './Skeleton.module.scss';
import { SkeletonProps } from './types';

const cx = bindClassNames(styles);

/**
 * Renders a placeholder component for loading states.
 */
export const Skeleton = forwardRefWithAs<SkeletonProps, 'div'>((props, ref) => {
  const { as, className, width, height, style, shape, transparent, ...otherProps } = props;

  const Element = as || 'div';

  return (
    <Element
      aria-hidden="true"
      style={{
        ...(style || {}),
        minWidth: width,
        minHeight: height,
      }}
      ref={ref}
      className={cx('root', className, shape && `--${shape}`, transparent && '--transparent')}
      {...otherProps}
    />
  );
});

Skeleton.displayName = 'Skeleton';

export default Skeleton;
