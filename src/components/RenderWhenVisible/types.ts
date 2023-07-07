import React from 'react';

export type RenderWhenVisibleProps = {
  /**
   * The fallback element to render when out of the viewport
   */
  placeholder: React.ReactNode | ((rect: DOMRect | null) => React.ReactNode);
  /**
   * The content to render when in viewport
   */
  children?: React.ReactNode;
};
