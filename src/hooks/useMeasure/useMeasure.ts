import { useCallback, useLayoutEffect, useState } from 'react';
import useResizeObserver from '../useResizeObserver';

type Measure<T> = {
  dimension?: DOMRect | null;
  ref: React.Dispatch<T>;
  update: () => void;
  element?: T | null;
};

type MeasureOptions = {
  disabled?: boolean;
  resizeOberserOptions?: ResizeObserverOptions;
};

/**
 * Hook used to measure the size of an element
 */
export function useMeasure<T extends HTMLElement>(options?: MeasureOptions): Measure<T> {
  const { disabled, resizeOberserOptions = {} } = options || {};

  const [dimension, setDimension] = useState<DOMRect | null>(null);
  const [element, ref] = useState<T | null>(null);

  const update = () => {
    const rect = element ? element.getBoundingClientRect() : null;
    setDimension(rect);
  };

  const handleResize = useCallback((entries: ResizeObserverEntry[]) => {
    if (entries.length) {
      setDimension(entries[0].contentRect);
    }
  }, []);

  useResizeObserver<T>(element, handleResize, {
    ...resizeOberserOptions,
    disabled,
  });

  useLayoutEffect(update, [element]);

  return {
    ref,
    dimension,
    element,
    update,
  };
}

export default useMeasure;
