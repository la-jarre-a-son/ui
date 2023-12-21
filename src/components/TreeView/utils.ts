import React from 'react';

export function hasCurrentChildren(children: React.ReactNode, type: unknown) {
  let hasCurrent = false;
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === type) {
      if (child.props.current) {
        hasCurrent = true;
      }
      if (!hasCurrent && child.props.children && child.props.children.length) {
        hasCurrent = hasCurrent || hasCurrentChildren(child.props.children, type);
      }
    }
  });

  return hasCurrent;
}
