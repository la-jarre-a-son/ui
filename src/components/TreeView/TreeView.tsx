import React, { useRef } from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRef';
import { useMergeRef } from '../../utils/refUtils';

import { useId } from '../../hooks/useId';
import { useListNav } from '../../hooks/useListNav';
import { useAutoScroll } from '../../hooks/useAutoScroll';

import { TreeViewContext } from './TreeViewContext';
import { TreeViewItem } from './TreeViewItem';

import styles from './TreeView.module.scss';

const cx = bindClassNames(styles);

/* Props */

export type TreeViewProps = {
  /**
   * Mandatory aria label
   */
  'aria-label': string;
  /**
   * Makes List header sticky to top
   */
  sticky?: boolean;
  /**
   * The tree view content - should contain TreeViewItem elements
   */
  children?: React.ReactNode;
};

/**
 * Provides an TreeView context and wraps a hierarchical list of collapsible items, with multiple depth.
 */
export const TreeView = forwardRefWithAs<TreeViewProps, 'nav'>((props, ref) => {
  const { children, as, className, id, sticky, ...otherProps } = props;

  const containerRef = useRef<HTMLElement>(null);
  const parentId = useId(id);

  const Element = as || 'nav';

  const ownRef = useListNav({
    itemQuerySelector: '[role="treeitem"]',
  });
  const mergedRef = useMergeRef(ownRef, ref, containerRef);

  useAutoScroll(containerRef.current, {
    targetQuerySelector: '[aria-current=page]',
    delayScroll: 250, // compensate for collapse transition delay
  });

  let firstFound = false;

  return (
    <TreeViewContext.Provider value={{ depth: 0, parentId }}>
      <Element
        ref={mergedRef}
        className={cx('root', sticky && '--sticky', className)}
        {...otherProps}
      >
        <ul role="tree" id={parentId}>
          {React.Children.map(children, (c) => {
            // setting tabIndex 0 to the first TreeViewItem
            if (React.isValidElement(c) && c.type === TreeViewItem && !firstFound) {
              firstFound = true;
              return React.cloneElement<React.ComponentPropsWithRef<React.ElementType>>(c, {
                tabIndex: 0,
              });
            }
            return c;
          })}
        </ul>
      </Element>
    </TreeViewContext.Provider>
  );
});

TreeView.displayName = 'TreeView';

export default TreeView;
