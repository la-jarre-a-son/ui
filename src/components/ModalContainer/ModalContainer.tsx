import React, { useState } from 'react';

import { ModalContainerContext } from './ModalContainerContext';

/* Props */

export type ModalContainerProps = {
  /**
   * The modal header content
   */
  children?: React.ReactNode;
};

/**
 * Provides a state context to define the container of modals (or similar components like Drawers);
 */
export const ModalContainer: React.FC<ModalContainerProps> = ({ children }) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  return (
    <ModalContainerContext.Provider value={{ container: ref }}>
      {children}
      <div ref={setRef}></div>
    </ModalContainerContext.Provider>
  );
};

ModalContainer.displayName = 'ModalContainer';

export default ModalContainer;
