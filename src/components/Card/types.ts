import React from 'react';
import { BoxProps } from '../Box';
import { MergeProps } from '../../utils/typeUtils';

export type CardThumbnailPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'center';

export type CardProps = MergeProps<
  {
    /**
     * Is the card interactive
     */
    interactive?: boolean;
    /**
     * Is the card selected
     */
    selected?: boolean;
    /**
     * Remove all the horizontal padding on child components
     */
    disableGutter?: boolean;
  },
  BoxProps
>;

export type CardThumbnailProps = {
  /**
   * The image url of the thumbnail
   */
  src?: string;
  /**
   * The alt text of the thumbnail
   */
  alt: string;
  /**
   * Props to pass to the image element
   */
  imgProps?: React.ComponentProps<'img'>;
};

export type CardThumbnailItemProps = {
  /**
   * The position of the thumbnail item container
   */
  position: CardThumbnailPosition;
};

export type CardHeaderProps = {
  /**
   * Content on the left of the header
   */
  left?: React.ReactNode;

  /**
   * Content on the right of the header
   */
  right?: React.ReactNode;
};

export type CardThumbnailGridProps = {
  /**
   * content of the card thumbnail grid
   */
  children?: React.ReactNode;
};

export type CardContentProps = {
  /**
   * content of the card
   */
  children?: React.ReactNode;
};

export type CardThumbnailOverlayProps = {
  /**
   * Add interactive styles to the overlay
   */
  interactive?: boolean;
};
