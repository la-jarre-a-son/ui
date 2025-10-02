import { createContext, useContext } from 'react';

import type { StackDirection } from '../Stack';
import type { ButtonSize, ButtonVariant } from '../Button';

export type TabsVariant = ButtonVariant;

export type TabsSize = ButtonSize;

export type TabListContextState = {
  selected?: string;
  variant?: TabsVariant;
  direction?: StackDirection;
  size?: TabsSize;
  onChange?: (id: string) => void;
};

export const TabListContext = createContext<TabListContextState>({});

export function useTabList() {
  return useContext(TabListContext);
}
