import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';
import { useForkCallbackRef } from '../../utils/refUtils';
import useEvent from '../../utils/useEvent';

export type TabsProviderState = {
  selectedTab?: string;
  selectedPanel?: string;
  setActive: (id: string) => void;
  bindIds: () => void;
};

export type TabsProviderProps = {
  /**
   * Specifies the index of the tab selected by default
   */
  defaultSelected?: number;
  /**
   * Content that will use the TabsProvider context,
   * or a render function that receives the state of the provided context
   */
  children: React.ReactNode | ((providerState: TabsProviderState) => React.ReactNode);
};

const defaultProviderValue: TabsProviderState = {
  setActive: () => undefined,
  bindIds: () => undefined,
};
const TabsProviderContext = createContext<TabsProviderState>(defaultProviderValue);

/**
 * Query by the given role on the given element
 */
function queryByRole(element: HTMLElement, role: string): HTMLElement[] {
  const els: HTMLElement[] = [];
  element.querySelectorAll(`[role="${role}"]`)?.forEach((el) => {
    els.push(el as HTMLElement);
  });
  return els;
}

/**
 * Provides a navigation context for TabList and TabPanel to be in sync, and accessible with correct aria attributes.
 */
export const TabsProvider = forwardRefWithAs<TabsProviderProps, 'div'>((props, ref) => {
  const { children, as, defaultSelected, ...otherProps } = props;

  const [rootEl, mergedRef] = useForkCallbackRef(ref);
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>();
  const tabIds = useRef<string[]>([]);
  const panelIds = useRef<string[]>([]);

  /**
   * The the tabs with their panels
   */
  const bindIds = useEvent(() => {
    if (rootEl) {
      const tabs = queryByRole(rootEl, 'tab');
      const panels = queryByRole(rootEl, 'tabpanel');

      tabIds.current = [];
      panelIds.current = [];

      for (let index = 0; index < tabs.length; index++) {
        const tab = tabs[index];
        const panel = panels[index];
        const tabId = tab?.getAttribute('id');
        const panelId = panel?.getAttribute('id');
        if (panelId && tab) {
          tab.setAttribute('aria-controls', panelId);
          panelIds.current.push(panelId);
        }
        if (tabId && panel) {
          panel.setAttribute('aria-labelledby', tabId);
          tabIds.current.push(tabId);
        }
      }
    }
  });

  useEffect(() => {
    if (rootEl) {
      bindIds();
      setSelectedIndex(defaultSelected || 0);
    }
  }, [rootEl, setSelectedIndex, bindIds, defaultSelected]);

  const setActive = useCallback(
    (id: string) => {
      const tabIndex = tabIds.current.indexOf(id);
      if (tabIndex !== -1) {
        setSelectedIndex(tabIndex);
      }
    },
    [setSelectedIndex]
  );

  const state = useMemo(
    () => ({
      selectedTab: selectedIndex != null ? tabIds.current?.[selectedIndex] || undefined : undefined,
      selectedPanel:
        selectedIndex != null ? panelIds.current?.[selectedIndex] || undefined : undefined,
      setActive,
      bindIds,
    }),
    [setActive, bindIds, selectedIndex]
  );

  const Element = as || 'div';

  return (
    <TabsProviderContext.Provider value={state}>
      <Element ref={mergedRef} {...otherProps}>
        {typeof children === 'function' ? children(state) : children}
      </Element>
    </TabsProviderContext.Provider>
  );
});

export function useTabsActive(): TabsProviderState {
  return useContext(TabsProviderContext) || defaultProviderValue;
}

TabsProvider.displayName = 'TabsProvider';

export default TabsProvider;
