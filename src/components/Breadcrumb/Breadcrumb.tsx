import React from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRef';

import styles from './Breadcrumb.module.scss';

const cx = bindClassNames(styles);

/* Props */

export const BreadcrumbSeparators = ['none', 'chevron', 'slash', 'backslash'] as const;

export type BreadcrumbSeparator = (typeof BreadcrumbSeparators)[number];

export type BreadcrumbProps = {
  /**
   * The aria label for the breadcrumb
   */
  label?: string;
  /**
   * The style of separator to use
   */
  separator?: BreadcrumbSeparator,
  /**
   * The breadcrumb items - should be BreadcrumbItem elements
   */
  children?: React.ReactNode;
};

/**
 * Renders a list of links that reflects the current page hierarchy, and provides navigation to parent elements.
 */
export const Breadcrumb = forwardRefWithAs<BreadcrumbProps, 'nav'>((props, ref) => {
  const { children, as, className, label, separator = 'chevron', ...otherProps } = props;

  const Element = as || 'nav';

  return (
    <Element
      ref={ref}
      className={cx('root', className, separator && `--${separator}`)}
      aria-label={label}
      {...otherProps}
    >
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
