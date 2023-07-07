export type ModalStackRegister = {
  hideOnStack?: boolean;
  disableStacking?: boolean;
};

export type ModalStackItem = {
  rootEl: HTMLElement;
  hideOnStack?: boolean;
};

export type ModalStackProps = {
  /**
   * Content to provide a Modal Stack
   */
  children?: React.ReactNode;
  /**
   * Disables the modal stacking management
   */
  disableStacking?: boolean;
  /**
   * Specifies that the content should be aria hidden if another modal is stacked
   */
  hideOnStack?: boolean;
};
