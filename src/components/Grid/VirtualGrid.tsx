import React from 'react';

import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';
import { MergeProps } from '../../utils/typeUtils';

import useVirtualGrid, { VirtualGridRenderItem, VirtualGridOptions } from './useVirtualGrid';
import Grid, { GridProps } from './Grid';

/* Props */

export type VirtualGridProps = MergeProps<
  {
    /**
     * A function to render an item, accepting an `options` object as the first argument.
     *
     * `options` contains the `index` of the item to render.
     */
    children: VirtualGridRenderItem;
    /**
     * Props to pass to the wrapper root element.
     */
    containerProps?: React.ComponentProps<'div'>;
  },
  GridProps & VirtualGridOptions
>;

/**
 * Wraps elements in a virtualized grid allowing to display very large number of items.
 *
 * The `VirtualGrid` component accepts all of the props of the `Grid` component.
 *
 * By default, the `VirtualGrid` manages each item as if they where 1 column width.
 * You can customize this behaviour with the `hintSize` prop, allowing to hint the component the number of columns taken by each particular item.
 *
 * This prop accepts a function that take the item index as a first argument and the total number of columns of a row as a second argument, and return the number of columns taken by this item.
 *
 * ```tsx
 * const hintSize = React.useCallback(
 *       (index: number, colPerRow: number) => {
 *           if (index === 0 && show) {
 *               return 3;
 *           }
 *           if (index % 5 === 0) return 2;
 *           if (index % 24 === 0) return colPerRow;
 *       },
 *       [show]
 *   );
 *
 * export const VirtualizedBasicGrid = () => {
 *   return (
 *       <VirtualGrid listLength={items.length} initialNumber={20} offscreenRows={5} hintSize={hintSize}>
 *           {({
 *              // the current item index
 *              index,
 *              // is the current item the first visible one
 *              first,
 *              // is the current item the last visible one
 *              last,
 *              // the internal sizes measured by the virtual grid
 *              sizes,
 *           }) => {
 *               const item = items[index];
 *               if (item == null) return null;
 *               return <MemoItem key={item}>{item}</MemoItem>;
 *           }}
 *       </VirtualGrid>
 *   );
 *};
 *```
 */
export const VirtualGrid = forwardRefWithAs<VirtualGridProps, 'div'>((props, ref) => {
  const {
    scrollContainer,
    containerProps,
    initialNumber,
    offscreenRows,
    listLength,
    children,
    hintSize,
    ...gridProps
  } = props;

  const { containerStyle, renderChildren, setContainerEl } = useVirtualGrid({
    scrollContainer,
    initialNumber,
    offscreenRows,
    listLength,
    hintSize,
  });

  return (
    <div ref={ref} {...(containerProps || {})}>
      <Grid
        {...(gridProps || {})}
        style={{
          ...(gridProps?.style || {}),
          ...containerStyle,
        }}
        ref={setContainerEl}
      >
        {renderChildren(children)}
      </Grid>
    </div>
  );
});

VirtualGrid.displayName = 'VirtualGrid';

export default VirtualGrid;
