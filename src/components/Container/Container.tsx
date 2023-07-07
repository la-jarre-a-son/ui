import React from 'react';
import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import styles from './Container.module.scss';
import { ContainerProps } from './types';

const cx = bindClassNames(styles);

/**
 * Wraps any element to keep it contained within a limited width.
 *
 * It ensures that the content keeps a predictable width even on wide screens.
 */
export const Container = forwardRefWithAs<ContainerProps, 'div'>((props, ref) => {
  const { children, as, className, size, align, ...otherProps } = props;

  const Element = as || 'div';

  return (
    <Element
      ref={ref}
      className={cx('root', size && `--${size}`, align && `--${align}`, className)}
      {...otherProps}
    >
      {children}
    </Element>
  );
});

Container.displayName = 'Container';

Container.defaultProps = {
  size: 'xl',
  align: 'center',
};

export default Container;
