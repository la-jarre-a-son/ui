import { ListItemProps } from '../List';
import React from 'react';
import { MergeProps } from '../../utils/typeUtils';

export type TreeViewProps = {
  /**
   * Mandatory aria label
   */
  'aria-label': string;
  /**
   * Makes List header sticky to top
   */
  sticky?: boolean;
  /**
   * The tree view content - should contain TreeViewItem elements
   */
  children?: React.ReactNode;
};

export type TreeViewItemProps = MergeProps<
  {
    /**
     * The item title
     */
    title?: string;
    /**
     * Specifies that the sub group is opened by default when uncontrolled
     */
    defaultOpen?: boolean;
    /**
     * Specifies that the sub group is opened when controlled externally
     */
    open?: boolean;
    /**
     * Specifies that the item disabled
     */
    disabled?: boolean;
    /**
     * Specifies that the item targets the current page (for navigation purpose)
     */
    current?: boolean;
    /**
     * Content on the left of item
     */
    left?: React.ReactNode;
    /**
     * The item content
     */
    children?: React.ReactNode;
    /**
     * Callback when item is opened when controlled externally
     */
    onClick?: (e: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLLIElement>) => void;
    /**
     * Callback when item is opened when controlled externally
     */
    onOpen?: (e: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLLIElement>) => void;
    /**
     * Callback when item is closed when controlled externally
     */
    onClose?: (e: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLLIElement>) => void;
  } & ListItemProps
>;
