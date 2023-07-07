import React from 'react';

import useId from '../../utils/useId';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import { TabPanelProps } from './types';
import { useTabsActive } from './TabProvider';

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
