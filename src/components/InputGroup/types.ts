export const InputGroupDirections = ['horizontal', 'vertical'] as const;

export type InputGroupDirection = (typeof InputGroupDirections)[number];

export type InputGroupProps = {
  /**
   * The direction of the stacked input elements
   */
  direction?: InputGroupDirection;
  /**
   * Makes the inputs in group take all available space equally
   */
  stretch?: boolean;
  /**
   * Makes the group take the whole available width
   */
  block?: boolean;
  /**
   * The inputs in group - should be elements using InputContainer
   */
  children?: React.ReactNode;
};
