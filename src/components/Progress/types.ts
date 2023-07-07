export type LinearProgressProps = {
  /**
   * The current value of progress
   */
  value?: number;
  /**
   * The minimum value that represents the start of progress
   */
  min?: number;
  /**
   * The maximum vlaue that represents the end of progress
   */
  max?: number;
  /**
   * The text for the current value of progress
   */
  valueText?: string;
  /**
   * Makes the progress animated indefinitely
   */
  indeterminate?: boolean;
};
