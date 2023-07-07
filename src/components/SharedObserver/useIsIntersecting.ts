import React from 'react';
import useOnIntersect, { OnIntersectOptions } from './useOnIntersect';

/**
 * Hook that observes the intersection of the given element and save
 * the result in a state variable
 * @deprecated Use the new 'useOnIntersect' hook instead.
 */
function useIsIntersecting<T extends HTMLElement>(options?: OnIntersectOptions) {
  const [isIntersecting, setIsIntersecting] = React.useState(false);

  const intersectionRef = useOnIntersect<T>(setIsIntersecting, options);

  return [isIntersecting, intersectionRef];
}

export default useIsIntersecting;
