import React from 'react';

export type ListItemProps = {
  /**
   * Content on the left of the item
   */
  left?: React.ReactNode;
  /**
   * Content on the right of the item
   */
  right?: React.ReactNode;
  /**
   * Specifies that the item is selected
   */
  selected?: boolean;
  /**
   * Disables the item and its interactions
   */
  disabled?: boolean;
  /**
   * Specifies that the item has interactions and associated states
   */
  interactive?: boolean;
  /**
   * Specifies that the item is focused
   */
  focused?: boolean;
  /**
   * Props to pass to the left container element
   */
  leftContainerProps?: React.ComponentProps<'div'>;
  /**
   * Props to pass to the right container element
   */
  rightContainerProps?: React.ComponentProps<'div'>;
  /**
   * Content of the item
   */
  children?: React.ReactNode;
};

export type ListProps = {
  /**
   * Content of the list
   */
  children?: React.ReactNode;
};

export type ListGroupProps = React.ComponentPropsWithoutRef<'li'> & {
  /**
   * Optional header for the section
   */
  header?: React.ReactNode;
  /**
   * Sublist as prop
   */
  listAs?: React.ElementType;
};
