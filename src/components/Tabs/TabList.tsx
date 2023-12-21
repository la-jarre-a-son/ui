import React, { useMemo, useRef } from 'react';

import { bindClassNames } from '../../utils/classNames';
import { useMergeRef } from '../../utils/refUtils';
import useRefEffect from '../../utils/useRefEffect';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';
import { getFirstFocusableDescendant } from '../../utils/focusUtils';
import useListNav from '../../utils/useListNav';
import useAutoScroll from '../../utils/useAutoScroll';

import ButtonGroup from '../ButtonGroup';

import { TabListProps } from './types';
import { TabListContext } from './TabListContext';

import styles from './Tabs.module.scss';

const cx = bindClassNames(styles);

/**
 * Wraps a list of navigation tabs, with accessibility role `tablist`.
 *
 * Provides a context, with a `selected`, `onChange` and stylistic props to manage the selected tab state
 * and rendering of children.
 */
export const TabList = forwardRefWithAs<TabListProps, typeof ButtonGroup>((props, ref) => {
  const {
    as,
    size,
    variant,
    bordered,
    selected,
    onChange,
    children,
    direction,
    className,
    ...otherProps
  } = props;

  const containerRef = useRef<HTMLElement>();

  const listBoxRef = useListNav({
    direction,
    itemQuerySelector: '[role="tab"]',
  });

  const rootRef = useRefEffect((rootEl: HTMLElement) => {
    containerRef.current = rootEl;
    // make the first tab focusable
    const firstChild = getFirstFocusableDescendant(rootEl, true);
    if (firstChild) {
      firstChild.setAttribute('tabindex', '0');
    }
  }, []);

  const mergedRef = useMergeRef(ref, listBoxRef, rootRef);

  useAutoScroll(containerRef.current);

  const contextValue = useMemo(
    () => ({
      selected,
      variant,
      direction,
      size,
      onChange: (id: string) => {
        if (onChange) onChange(id);
      },
    }),
    [variant, selected, onChange, direction, size]
  );

  return (
    <TabListContext.Provider value={contextValue}>
      <ButtonGroup
        as={as}
        aria-orientation={direction}
        direction={direction}
        role="tablist"
        ref={mergedRef}
        className={cx('root', direction && `--${direction}`, bordered && '--bordered', className)}
        {...otherProps}
      >
        {children}
      </ButtonGroup>
    </TabListContext.Provider>
  );
});

TabList.displayName = 'TabList';

TabList.defaultProps = {
  size: 'md',
  direction: 'horizontal',
};

export default TabList;
