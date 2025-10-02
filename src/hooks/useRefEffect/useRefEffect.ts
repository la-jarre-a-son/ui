import React, { useCallback, useEffect, useRef } from 'react';
import useEvent from '../useEvent';

export type RefEffetCallbackRef<T extends HTMLElement> = ((nodeEl: T | null) => void) & {
  nodeEl?: T | null;
};

export type RefEffect<T extends HTMLElement> = (el: T) => (() => void) | void;

/**
 * Hook that allow to manage a callback ref with an effect-like api
 */
export function useRefEffect<T extends HTMLElement>(
  func: RefEffect<T>,
  deps: React.DependencyList
) {
  const cleanup = useRef<(() => void) | null>();

  const effect = useEvent(func);

  const callback: RefEffetCallbackRef<T> = useCallback((nodeEl: T | null) => {
    callback.nodeEl = nodeEl;

    if (cleanup.current) cleanup.current();

    if (nodeEl != null) {
      cleanup.current = effect(nodeEl) || null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    return () => {
      if (cleanup.current) cleanup.current();
    };
  }, []);

  return callback;
}

export default useRefEffect;
