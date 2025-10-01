export const DotSizes = ['sm', 'md', 'lg'] as const;
export const DotIntents = [
  'neutral',
  'primary',
  'secondary',
  'error',
  'warning',
  'success',
] as const;

export type DotSize = (typeof DotSizes)[number];
export type DotIntent = (typeof DotIntents)[number];

export type DotProps = {
  /**
   * The Dot semantic intent
   */
  intent?: DotIntent;
  /**
   * The Dot size (in teeshirt size)
   * */
  size?: DotSize;
  /**
   * Displays an animated outline around dot - defaults to `false`
   */
  active?: boolean;
};
