import React from 'react';

export type BreadcrumbSeparator = 'chevron' | 'slash';

export type BreadcrumbItemProps = {
  /**
   * Set the element as the current item (current page)
   */
  current?: boolean;
};

export type BreadcrumbProps = {
  /**
   * The aria label for the breadcrumb
   */
  label?: string;
  /**
   * The breadcrumb items - should be BreadcrumbItem elements
   */
  children?: React.ReactNode;
};
