import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useForkCallbackRef } from '../../utils/refUtils';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';
import useEvent from '../../utils/useEvent';

import { TabsProviderProps, TabsProviderState } from './types';

const defaultProviderValue: TabsProviderState = {
  setActive: () => undefined,
  bindIds: () => undefined,
};
const TabProviderContext = createContext<TabsProviderState>(defaultProviderValue);

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
export const TabProvider = forwardRefWithAs<TabsProviderProps, 'div'>((props, ref) => {
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
    <TabProviderContext.Provider value={state}>
      <Element ref={mergedRef} {...otherProps}>
        {typeof children === 'function' ? children(state) : children}
      </Element>
    </TabProviderContext.Provider>
  );
});

export function useTabsActive(): TabsProviderState {
  return useContext(TabProviderContext) || defaultProviderValue;
}

TabProvider.displayName = 'TabProvider';

export default TabProvider;
