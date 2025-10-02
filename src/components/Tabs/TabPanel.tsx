import React from 'react';

import { forwardRefWithAs } from '../../utils/forwardRef';

import { useId } from '../../hooks/useId';

import { useTabsActive } from './TabsProvider';

/* Props */

export type TabPanelProps = {
  /**
   * Specifies that the panel is selected
   */
  selected?: boolean;
  /**
   * Content of the panel - rendered only when corresponding tab is selected
   */
  children?: React.ReactNode;
};

/**
 * Wraps a content to be conditionally rendered when its associated Tab is selected.
 *
 * To be used inside a TabProvider.
 */
export const TabPanel = forwardRefWithAs<TabPanelProps, 'div'>((props, ref) => {
  const { children, as, className, selected, id, ...otherProps } = props;

  const uid = useId(id);
  const { selectedPanel } = useTabsActive();
  const isActive = selected ?? selectedPanel === uid;

  const Element = as || 'div';

  return (
    <Element
      ref={ref}
      hidden={!isActive}
      role="tabpanel"
      className={className}
      id={uid}
      {...otherProps}
    >
      {isActive && children}
    </Element>
  );
});

TabPanel.displayName = 'TabPanel';

export default TabPanel;
