import React, { useEffect } from 'react';

type Observe = (el: HTMLElement, onIntersect: OnIntersect) => () => void;
export type OnIntersect = (entry: IntersectionObserverEntry) => void;

export const IntersectionContext = React.createContext<Observe | null>(null);

type SharedObserverProps = IntersectionObserverInit & { children?: React.ReactNode };

/**
 * Provides a single intersection observer for multiple children
 */
export const SharedObserver: React.FC<SharedObserverProps> = ({ children, ...init }) => {
  const observerRef = React.useRef<IntersectionObserver | null>(null);
  const observers = React.useRef<WeakMap<HTMLElement, OnIntersect>>(new WeakMap());

  // eslint-disable-next-line no-undef
  const initCopy = React.useRef<IntersectionObserverInit>(init);

  useEffect(
    () => () => {
      if (observerRef.current) observerRef.current.disconnect();
    },
    []
  );

  const observe: Observe = React.useCallback((el, onIntersect) => {
    // create the observe if does not already exist
    // when trying to register
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          for (let index = 0; index < entries.length; index++) {
            const entry = entries[index];
            const callback = observers.current.get(entry.target as HTMLElement);
            if (callback) callback(entry);
          }
        },
        {
          threshold: [0, 0],
          ...initCopy.current,
        }
      );
    }

    // register the given item
    if (!observers.current.get(el)) {
      observers.current.set(el, onIntersect);
      if (observerRef.current) observerRef.current.observe(el);
    }
    return () => {
      observers.current.delete(el);
      observerRef.current?.unobserve(el);
    };
  }, []);

  return <IntersectionContext.Provider value={observe}>{children}</IntersectionContext.Provider>;
};

/**
 * Hook to connect to the shared observer context
 */
export function useSharedObserver(): Observe | null {
  return React.useContext(IntersectionContext) || null;
}

export default SharedObserver;
