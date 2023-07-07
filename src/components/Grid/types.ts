import React from 'react';
import { MergeProps } from '../../utils/typeUtils';
import { RenderItem, VirtualGridOptions } from './useVirtualGrid';

export const GridSizes = ['sm', 'md', 'lg'] as const;
export const GridGaps = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export type GridGap = (typeof GridGaps)[number];
export type GridSize = (typeof GridSizes)[number];

export type GridProps = {
  /**
   * The space between items, as a space multiplier
   */
  gap?: GridGap;
  /**
   * The minimum width of each column (in teeshirt size).
   */
  size?: GridSize;
  /**
   * The grid items.
   */
  children?: React.ReactNode;
};

export type VirtualGridProps = MergeProps<
  {
    /**
     * A function to render an item, accepting an `options` object as the first argument.
     *
     * `options` contains the `index` of the item to render.
     */
    children: RenderItem;
    /**
     * Props to pass to the wrapper root element.
     */
    containerProps?: React.ComponentProps<'div'>;
  },
  GridProps & VirtualGridOptions
>;
