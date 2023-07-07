import { useEffect, useState } from 'react';

/**
 * Function that test if the current platform support the match media api
 */
export const supportMatchMedia = () =>
  typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined';

/**
 * Remove the '@media' from the given media query string
 * @param queryParam the query param string
 */
export const getQuery = (queryParam: string): string => queryParam.replace(/^@media( ?)/m, '');

/**
 * Manage the registration of a media query event listener for the given media query string
 * and change handler
 */
export function registerQuery(queryParam: string, onChange: (e: MediaQueryListEvent) => void) {
  if (!supportMatchMedia()) {
    return () => undefined;
  }

  const query = getQuery(queryParam);
  const queryList = window.matchMedia(query);

  queryList.addEventListener('change', onChange);

  return () => {
    queryList.removeEventListener('change', onChange);
  };
}

/**
 * Hook used to test a query param in JS
 */
export function useMediaQuery(queryParam: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (supportMatchMedia()) {
      const query = getQuery(queryParam);
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    function isMatching(e: MediaQueryListEvent) {
      setMatches(e.matches);
    }

    return registerQuery(queryParam, isMatching);
  }, [queryParam, setMatches]);

  return matches;
}

export default useMediaQuery;
