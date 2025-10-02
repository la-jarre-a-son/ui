import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  getFirstReferenceElement,
  getItemFullSize,
  getNextCursor,
  getNumberOfRows,
  HintSize,
  round,
} from './virtualGridUtils';

export type VirtualGridOptions = {
  /**c
   */
  listLength: number;
  /**
   * The number of items to display on the initial render
   */
  initialNumber?: number;
  /**
   * The number of non visible rows to render
   */
  offscreenRows?: number;
  /**
   * Function allowing to define the number of columns taken
   * by each item in our grid
   */
  hintSize?: HintSize;
  /**
   * The scrolled container element (default to document)
   * Can be an element or a query string to get the element
   */
  scrollContainer?: string | HTMLElement | null;
};

/**
 * A function for rendering an item by its `index`, passed in an `options` object as first argument.
 */
export type VirtualGridRenderItem = (options: {
  index: number;
  first: boolean;
  last: boolean;
  sizes: Sizes;
}) => React.ReactNode;

type Sizes = {
  containerWidth: number;
  containerHeight?: number;
  elementHeight: number;
  elementWidth: number;
  colPerRow: number;
  gap: number;
};

export function useVirtualGrid(options: VirtualGridOptions) {
  const { hintSize, listLength, scrollContainer, offscreenRows = 2, initialNumber = 10 } = options;

  const [containerEl, setContainerEl] = useState<HTMLElement | null>(null);

  const parentRef = useRef<HTMLElement | null>(null);
  const sizes = useRef<Sizes>({
    containerHeight: 0,
    containerWidth: 0,
    elementHeight: 0,
    elementWidth: 0,
    colPerRow: 1,
    gap: 0,
  });

  const [indexes, setIndexes] = useState(() => ({
    startRow: 0,
    startIndex: 0,
    // don't render more initial items that the list length
    endIndex: (listLength ? Math.min(initialNumber, listLength) : initialNumber) - 1,
  }));
  const { startIndex, endIndex, startRow } = indexes;

  // ref on the indexes used to verify if the
  // values changed
  const prevIndexes = useRef(indexes);

  /**
   * Calculate the start / end index of items to render
   * based on scroll position on items sizes
   * @param forceUpdate update the indexes even is the values hasnhas not changed
   */
  const computeRows = useCallback(
    function computeVirtualGridRows(forceUpdate = false) {
      const { elementHeight, colPerRow } = sizes.current;
      if (!colPerRow || !elementHeight) return;
      const containerOffsetTop = document.body.offsetTop || 0;
      const containerTop = parentRef.current?.getBoundingClientRect()?.top || 0;
      const scrollTop = Math.max(-containerTop + containerOffsetTop || 0, 0);
      const visibleHeight = window.innerHeight;
      const startRow = Math.max(0, Math.trunc(scrollTop / elementHeight) - offscreenRows);
      const visibleRows = Math.ceil(visibleHeight / elementHeight);
      const numberOfDisplayedRows = visibleRows + 2 * offscreenRows;

      const getCursor = getNextCursor(sizes.current.colPerRow, hintSize);
      const startIndex = getCursor(0, startRow);
      const endIndex = Math.min(listLength, getCursor(startIndex, numberOfDisplayedRows)) - 1;

      // saving the new indexes if they changed
      if (
        forceUpdate ||
        prevIndexes.current.startIndex !== startIndex ||
        prevIndexes.current.endIndex !== endIndex
      ) {
        const newIndexes = {
          startIndex,
          endIndex,
          startRow,
        };
        prevIndexes.current = newIndexes;
        setIndexes(newIndexes);
      }
    },
    [setIndexes, listLength, hintSize, offscreenRows]
  );

  /**
   * Measure and set the theorical root height based on the height
   * of a single reference grid element
   */
  const computeHeight = useCallback(() => {
    if (containerEl == null) return;

    const { elementHeight, colPerRow } = sizes.current;

    const numberOfRows = getNumberOfRows(listLength, colPerRow, hintSize);
    const totalSize = numberOfRows * elementHeight;
    const parent = containerEl?.parentElement;
    parentRef.current = parent;

    if (parent) {
      parent.style.minHeight = `${totalSize}px`;
      sizes.current.containerHeight = totalSize;
    }
  }, [containerEl, listLength, hintSize]);

  /**
   * Measure the reference sizes
   */
  const measureSizes = useCallback(() => {
    if (!containerEl) return null;

    const rect = containerEl.getBoundingClientRect();
    const firstEl = getFirstReferenceElement(containerEl);

    if (firstEl) {
      const computedGap = parseFloat(window.getComputedStyle(containerEl).gap);
      const gap = isNaN(computedGap) ? 0 : computedGap;
      const [height, width] = getItemFullSize(firstEl);
      const containerWidth = gap + rect.width;
      const elementHeight = gap + height;
      const elementWidth = gap + width;
      const colPerRow = Math.trunc(round(containerWidth / elementWidth));

      // saving sizes for later
      sizes.current = {
        containerWidth,
        elementHeight,
        elementWidth,
        colPerRow,
        gap,
      };

      // recompute the container height
      computeHeight();

      // recompute the indexes
      computeRows();
    }
  }, [containerEl, computeHeight, computeRows]);

  useLayoutEffect(() => {
    // use a resize observer to update the measured sizes
    const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      const { contentRect } = entries?.[0] || {};

      // we care only about the width on the container
      if (sizes.current?.containerWidth === contentRect.width) return;

      measureSizes();
    });

    if (containerEl) {
      observer.observe(containerEl);
    }
    return () => {
      if (containerEl) observer.unobserve(containerEl);
      observer.disconnect();
    };
  }, [containerEl, measureSizes]);

  useLayoutEffect(() => {
    // the scrollable element can be a custom one (default to document)
    const el =
      (typeof scrollContainer === 'string'
        ? document.querySelector(scrollContainer)
        : scrollContainer) || document;

    const compute = () => computeRows();

    el.addEventListener('scroll', compute, { passive: true });
    return () => {
      el.removeEventListener('scroll', compute);
    };
  }, [computeRows, scrollContainer]);

  useLayoutEffect(() => {
    computeHeight();
    computeRows();
  }, [computeHeight, computeRows]);

  const [renderChildren, containerStyle] = useMemo(() => {
    // item rendering function
    const render = (r: VirtualGridRenderItem) => {
      const visibleItems: React.ReactNode[] = [];
      for (let i = startIndex; i <= endIndex; i += 1) {
        visibleItems.push(
          r({
            index: i,
            first: i === startIndex,
            last: i === endIndex,
            sizes: sizes.current,
          })
        );
      }
      return visibleItems;
    };

    const containerOffset = startRow * sizes.current.elementHeight || 0;
    // don't translate passed the root height
    const clampedOffset = Math.min(sizes.current.containerHeight || 0, containerOffset);

    // style to apply to the container element
    const style: React.CSSProperties = {
      width: '100%',
      transform: `translateY(${clampedOffset}px)`,
    };

    return [render, style];
  }, [startIndex, endIndex, startRow]);

  return {
    setContainerEl,
    renderChildren,
    containerStyle,
    startIndex,
    endIndex,
    computeRows,
    computeAll: measureSizes,
  };
}

export default useVirtualGrid;
