import React, { useRef } from 'react';

import { ModalContainerProps } from './types';
import { ModalContainerContext } from './ModalContainerContext';

/**
 * Provides a state context to define the container of modals (or similar components like Drawers);
 */
export const ModalContainer: React.FC<ModalContainerProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <ModalContainerContext.Provider value={containerRef.current}>
      {children}
      <div ref={containerRef}></div>
    </ModalContainerContext.Provider>
  );
};

ModalContainer.displayName = 'ModalContainer';

export default ModalContainer;
