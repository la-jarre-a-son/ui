import React, { forwardRef, useState } from 'react';
import { Meta } from '@storybook/react-webpack5';

import { VirtualGrid } from '.';

export default {
  title: 'Components/Layout/VirtualGrid',
  component: VirtualGrid,
  tags: ['autodocs'],
  parameters: {
    docs: { inlineStories: false, iframeHeight: 400 },
  },
} as Meta;

const ITEM_SIZE = 200;
const items = new Array(100000).fill(undefined).map((_, i) => i);

const Item = forwardRef<HTMLDivElement, { children: React.ReactNode; style?: React.CSSProperties }>(
  ({ children, style, ...other }, ref) => {
    return (
      <div
        {...other}
        ref={ref}
        style={{
          backgroundColor: 'lightblue',
          height: ITEM_SIZE,
          border: 'solid 6px white',
          overflow: 'hidden',
          padding: 20,
          ...style,
        }}
      >
        {children}
      </div>
    );
  }
);
Item.displayName = 'Item';

const MemoItem = React.memo(Item);

export const Default = () => {
  return (
    <VirtualGrid listLength={items.length} initialNumber={20} offscreenRows={5}>
      {({ index }) => {
        const item = items[index];
        return <MemoItem key={item}>{item}</MemoItem>;
      }}
    </VirtualGrid>
  );
};

const hintSize = (index: number, colPerRow: number) => {
  // every 3 lines we have a full-columns item
  if (index % (3 * colPerRow + 1) === 0) return colPerRow;
};

/**
 * @storyDesc In some cases, we may have rows containing items of multiple columns.
 * This will broke the virtual grid unless we hint the grid about the size of each item.
 * For this purpose, we can pass a `hinSize` function prop the the `VirtualGrid`.
 *
 * This function will be called for each item of the grid.
 * It take the index of the item as a first argument and the total number of columns of the grid as a second argument, and return the number of columns taken by the item of current index.
 *
 * > Each items that are not of size 1 column must be flagged with the `data-skip` attribute, so that they are not used as reference element to measure the size of a column.
 */
export const VirtualizedFuckedUpGrid = () => {
  return (
    <VirtualGrid listLength={items.length} initialNumber={20} hintSize={hintSize}>
      {({ index, sizes }) => {
        const item = items[index];
        if (item == null) return null;

        if (index % (3 * sizes.colPerRow + 1) === 0) {
          return (
            <MemoItem data-skip style={{ gridColumn: '1 / -1' }} key={index}>
              {item}
            </MemoItem>
          );
        }
        return <MemoItem key={item}>{item}</MemoItem>;
      }}
    </VirtualGrid>
  );
};

/**
 * @storyDesc By default, the `VirtualGrid` will use the scroll on the `document` for his behaviour.
 * It is however possible to pass a custom scrolled element with the `scrollContainer` prop if the Grid is on another scrollable container.
 *
 * This prop can accept an `HTMLElement` or a [query selector string](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) pointing to a specific element.
 */
export const CustomScrolledElement = () => {
  const [scrolledEl, setScrolledEl] = useState<HTMLDivElement | null>(null);
  return (
    <div ref={setScrolledEl} style={{ maxHeight: 200, overflowY: 'auto' }}>
      <VirtualGrid
        listLength={items.length}
        initialNumber={20}
        offscreenRows={5}
        scrollContainer={scrolledEl}
      >
        {({ index }) => {
          const item = items[index];
          return <MemoItem key={item}>{item}</MemoItem>;
        }}
      </VirtualGrid>
    </div>
  );
};
