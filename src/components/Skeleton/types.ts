export type SkeletonShape = 'square' | 'rounded' | 'circle';

export type SkeletonProps = {
  /**
   * The height (in px) of the placeholder
   */
  height?: number | string;
  /**
   * The width (in px) of the placeholder
   */
  width?: number | string;
  /**
   * The shape of the placeholder
   */
  shape?: SkeletonShape;
  /**
   * Makes the placeholder background transparent to only apply animated opacity to its children.
   */
  transparent?: boolean;
};
