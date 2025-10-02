import { useEffect, useRef } from 'react';
import disableROError from '../../utils/disableROError';

disableROError();

export type UseResizeObserverCallback = (
  entries: ResizeObserverEntry[],
  observer: ResizeObserver
) => void;

export type UseResizeObserverOptions = {
  disabled?: boolean;
} & ResizeObserverOptions;

/**
 * Hook to manage the creation of a resize observer
 */
export function useResizeObserver<T extends HTMLElement>(
  targetEl: T | undefined | null,
  callback: UseResizeObserverCallback,
  options: UseResizeObserverOptions = {}
) {
  const { disabled, ...opt } = options;

  const observer = useRef<ResizeObserver | null>(null);

  // non reactive options
  const optionsCopy = useRef(opt);
  useEffect(() => {
    optionsCopy.current = opt;
  });

  useEffect(() => {
    if (targetEl && !disabled) {
      observer.current = new ResizeObserver((entries, obs) => {
        if (callback) callback(entries, obs);
      });
      observer.current.observe(targetEl, optionsCopy.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [targetEl, callback, disabled]);
}

export default useResizeObserver;
