import React from 'react';

export type StateButtonStatus = null | 'success' | 'error' | 'pending';

export type StateButtonProps = {
  /**
   * Callback fired on button click
   *
   * If the handler returns a Promise, the button will automatically handle its state.
   */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void | Promise<unknown>;
  /**
   * A promise to give the button a state
   */
  promise?: Promise<unknown>;
  /**
   * Specifies that the button is in pending state
   */
  loading?: boolean;
  /**
   * Disables the button and its interactions
   */
  disabled?: boolean;
  /**
   * Content on the left of the button
   */
  left?: React.ReactNode;
  /**
   * Content on the right of the button
   */
  right?: React.ReactNode;
  /**
   * Content of the button
   */
  children: React.ReactNode;
  /**
   * Icon classname when status is pending
   */
  iconPending?: string;
  /**
   * Icon classname when status is success
   */
  iconSuccess?: string;
  /**
   * Icon classname when status is error
   */
  iconError?: string;
};
