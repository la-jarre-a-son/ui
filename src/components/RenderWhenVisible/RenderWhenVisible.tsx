import React, { useState } from 'react';
import { useOnIntersect } from '../SharedObserver';

import { RenderWhenVisibleProps } from './types';

/**
 * Renders the children when entering the viewport
 *
 * You can use this component as a child of a `SharedObserver` component for better performance when managing lots of observers.
 */
export const RenderWhenVisible: React.FC<RenderWhenVisibleProps> = ({ children, placeholder }) => {
  const rectRef = React.useRef<DOMRect | null>(null);

  const [visible, setVisible] = useState(false);
  const intersectionRef = useOnIntersect(setVisible);

  let displayedElement = children;
  if (!visible) {
    displayedElement =
      typeof placeholder === 'function' ? placeholder(rectRef.current) : placeholder;
  }

  return React.isValidElement(displayedElement)
    ? React.cloneElement<React.ComponentPropsWithRef<React.ElementType>>(displayedElement, {
        ref: intersectionRef,
      })
    : null;
};

export default RenderWhenVisible;
