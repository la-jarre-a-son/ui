import React from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRef';

import styles from './Breadcrumb.module.scss';

const cx = bindClassNames(styles);

/* Props */

export type BreadcrumbItemProps = {
  /**
   * Set the element as the current item (current page)
   */
  current?: boolean;
};

/**
 * Renders a single item (a link by default) in a Breadcrumb component
 */
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
