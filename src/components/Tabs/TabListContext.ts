import { createContext, useContext } from 'react';

import { TabListContextState } from './types';

export const TabListContext = createContext<TabListContextState>({});

export function useTabListContext() {
  return useContext(TabListContext);
}
