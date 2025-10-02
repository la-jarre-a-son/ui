import React from 'react';

import useIntersectionObserver, { OnIntersect } from './useIntersectionObserver';

export type OnIntersectOptions = IntersectionObserverInit & {
  onIntersect?: OnIntersect;
};

/**
 * Hook that observes the intersection change of the given element
 */
function useOnIntersect<T extends HTMLElement>(
  onIntersectChange?: (isIntersecting: boolean) => void,
  options?: OnIntersectOptions
) {
  const { onIntersect, ...opts } = options || {};
  const lastIntersect = React.useRef(false);

  const intersectionRef = useIntersectionObserver<T>((entry: IntersectionObserverEntry) => {
    if (onIntersect) onIntersect(entry);

    const intersecting = entry.isIntersecting;
    if (intersecting !== lastIntersect.current && onIntersectChange) {
      onIntersectChange(intersecting);
      lastIntersect.current = intersecting;
    }
  }, opts);

  return intersectionRef;
}

export default useOnIntersect;
