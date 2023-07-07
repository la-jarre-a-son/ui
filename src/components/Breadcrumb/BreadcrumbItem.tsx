import React from 'react';
import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import styles from './Breadcrumb.module.scss';
import { BreadcrumbItemProps } from './types';

const cx = bindClassNames(styles);

export const BreadcrumbItem = forwardRefWithAs<BreadcrumbItemProps, 'a'>((props, ref) => {
  const { as, className, children, current, ...otherProps } = props;

  const Element = as || 'a';

  return (
    <Element
      role="link"
      ref={ref}
      aria-current={current ? 'page' : undefined}
      className={cx('item', className)}
      tabIndex={0}
      {...otherProps}
    >
      {children}
    </Element>
  );
});

BreadcrumbItem.displayName = 'BreadcrumbItem';

export default BreadcrumbItem;
