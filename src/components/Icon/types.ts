export const IconSizes = ['auto', 'lg', 'md', 'sm'] as const;
export const IconIntents = [
  'default',
  'subtle',
  'contrast',
  'neutral',
  'primary',
  'danger',
  'warning',
  'success',
  'inherit',
] as const;

export type IconSize = (typeof IconSizes)[number];

export type IconIntent = (typeof IconIntents)[number];

export interface IconProps {
  /**
   * The Icon name
   */
  name: string;
  /**
   * The Icon semantic intent
   */
  intent?: IconIntent;
  /**
   * The Icon size (in teeshirt size)
   */
  size?: IconSize;
  /**
   * Make the icon spin (clockwise)
   */
  spin?: boolean;
}
