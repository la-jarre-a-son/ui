export const BoxElevations = [0, 1, 2, 3] as const;
export const BoxPads = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export type BoxElevation = (typeof BoxElevations)[number];
export type BoxPad = (typeof BoxPads)[number];

export type BoxProps = {
  /**
   * The Box elevation (a depth index starting at 0)
   */
  elevation?: BoxElevation;
  /**
   * The Box padggin (in teeshirt size)
   */
  pad?: BoxPad;
  /**
   * Hides overflowing content of the card
   */
  hideOverflow?: boolean;
  /**
   * Display the Box with a border
   */
  outlined?: boolean;
};
