import React, { useMemo, useRef } from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRef';
import { useMergeRef } from '../../utils/refUtils';
import { MergeProps } from '../../utils/typeUtils';
import { getFirstFocusableDescendant } from '../../utils/focusUtils';

import { useRefEffect } from '../../hooks/useRefEffect';
import { useListNav } from '../../hooks/useListNav';
import { useAutoScroll } from '../../hooks/useAutoScroll';

import { ButtonGroup, ButtonGroupProps } from '../ButtonGroup';

import { TabListContext, TabsVariant, TabsSize } from './TabListContext';

import styles from './Tabs.module.scss';

const cx = bindClassNames(styles);

/* Props */

export type TabListProps = MergeProps<
  {
    /**
     * The currently selected tab id
     */
    selected?: string;
    /**
     * Callback fired when the selected tab changes
     */
    onChange?: (id: string) => void;
    /**
     * The stylistic variant of the list and nested tabs
     */
    variant?: TabsVariant;
    /**
     * The size of the list and nested tabs
     */
    size?: TabsSize;
    /**
     * Adds a border to the bottom/left depending on direction
     */
    bordered?: boolean;
    /**
     * Mandatory aria label for accesibility
     */
    'aria-label': string;
    /**
     * The items in the list - should be Tab elements
     */
    children?: React.ReactNode;
  },
  ButtonGroupProps
>;

/**
 * Wraps a list of navigation tabs, with accessibility role `tablist`.
 *
 * Provides a context, with a `selected`, `onChange` and stylistic props to manage the selected tab state
 * and rendering of children.
 */
export const TabList = forwardRefWithAs<TabListProps, typeof ButtonGroup>((props, ref) => {
  const {
    as,
    size = 'md',
    variant,
    bordered,
    selected,
    onChange,
    children,
    direction = 'horizontal',
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

export default TabList;
