import React, { useState } from 'react';

import { ModalContainerProps } from './types';
import { ModalContainerContext } from './ModalContainerContext';

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
