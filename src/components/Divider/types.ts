export const DividerAligns = ['left', 'center', 'right'] as const;

export type DividerAlign = (typeof DividerAligns)[number];

export type DividerProps = {
  /**
   * Specifies how the elements should be aligned
   */
  align?: DividerAlign;
};
