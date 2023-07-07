import React from 'react';

export const LinkIntents = ['primary', 'destructive'] as const;

export type LinkIntent = (typeof LinkIntents)[number];

export type LinkProps = {
  /**
   * The semantic link intent
   */
  intent?: LinkIntent;
  /**
   * If `true`, makes the link underlined
   */
  underlined?: boolean;
  /**
   * Disables the link and its interactions
   */
  disabled?: boolean;
  /**
   * The content of the link
   */
  children?: React.ReactNode;
};
