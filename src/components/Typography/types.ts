import React from 'react';

export const TypographyWeights = ['light', 'regular', 'bold'] as const;
export const TypographySizes = ['lg', 'md', 'sm'] as const;

export type TypographyWeight = (typeof TypographyWeights)[number];
export type TypographySize = (typeof TypographySizes)[number];
export type TypographyAlign = 'center' | 'start' | 'end';
export type TypographyIntent =
  | 'default'
  | 'subtle'
  | 'contrast'
  | 'placeholder'
  | 'inherit'
  | 'error';

export type TypographyProps = {
  /*
   * The text size
   */
  size?: TypographySize;
  /**
   * The text alignment
   */
  align?: TypographyAlign;
  /**
   * The text weight
   */
  weight?: TypographyWeight;
  /**
   * The text intent color
   */
  intent?: TypographyIntent;
  /**
   * The content to style
   */
  children?: React.ReactNode;
};
