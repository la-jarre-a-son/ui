import React from 'react';
import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import styles from './Breadcrumb.module.scss';
import { BreadcrumbProps } from './types';

const cx = bindClassNames(styles);

/**
 * Renders a list of links that reflects the current page hierarchy, and provides navigation to parent elements.
 */
export const Breadcrumb = forwardRefWithAs<BreadcrumbProps, 'nav'>((props, ref) => {
  const { children, as, className, label, ...otherProps } = props;

  const Element = as || 'nav';

  return (
    <Element ref={ref} className={cx('root', className)} aria-label={label} {...otherProps}>
      <ol>
        {React.Children.toArray(children).map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ol>
    </Element>
  );
});

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;
