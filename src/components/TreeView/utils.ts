import React from 'react';

export function hasCurrentChildren(children: React.ReactNode, type: unknown) {
  let hasCurrent = false;
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === type && (child.props as React.ComponentProps<any>).current) {
        hasCurrent = true;
      }

      if (!hasCurrent && (child.props as React.ComponentProps<any>).children) {
        hasCurrent = hasCurrent || hasCurrentChildren((child.props as React.ComponentProps<any>).children, type);
      }
    }
  });

  return hasCurrent;
}
