import React from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRef';

import styles from './Skeleton.module.scss';

const cx = bindClassNames(styles);

/* Props */

export type SkeletonShape = 'square' | 'rounded' | 'circle';

export type SkeletonProps = {
  /**
   * The height (in px) of the placeholder
   */
  height?: number | string;
  /**
   * The width (in px) of the placeholder
   */
  width?: number | string;
  /**
   * The shape of the placeholder
   */
  shape?: SkeletonShape;
  /**
   * Makes the placeholder background transparent to only apply animated opacity to its children.
   */
  transparent?: boolean;
};

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
