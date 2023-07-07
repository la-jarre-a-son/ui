import { createContext, useContext } from 'react';

export type TreeViewContextState = {
  depth?: number;
  parentId?: string;
};

export const TreeViewContext = createContext<TreeViewContextState>({});

export function useTreeView() {
  return useContext(TreeViewContext);
}
