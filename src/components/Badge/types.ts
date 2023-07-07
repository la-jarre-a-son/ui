import React from 'react';

export const BadgeSizes = ['sm', 'md', 'lg'] as const;
export const BadgeIntents = [
  'neutral',
  'primary',
  'secondary',
  'error',
  'warning',
  'success',
] as const;

export type BadgeSize = (typeof BadgeSizes)[number];

export type BadgeIntent = (typeof BadgeIntents)[number];

export interface BadgeClasses {
  root: string;
  label: string;
}

export type BadgeClassKey = keyof BadgeClasses;

export interface BadgeProps {
  /**
   * The badge semantic intent
   */
  intent?: BadgeIntent;
  /**
   * The badge size (in teeshirt size)
   */
  size?: BadgeSize;
  /**
   * Content on the left side of the badge
   */
  left?: React.ReactNode;
  /**
   * Content on the right side of the badge
   */
  right?: React.ReactNode;
  /**
   * The content of the badge
   */
  children?: React.ReactNode;
}
