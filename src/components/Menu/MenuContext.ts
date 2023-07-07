import { createContext, useContext } from 'react';

type MenuState = {
  onChange: (v: string | string[]) => void;
  value?: string | string[];
  keepOpened?: boolean;
};

export const MenuContext = createContext<MenuState>({
  onChange: () => undefined,
});

export function useMenu() {
  return useContext(MenuContext);
}
