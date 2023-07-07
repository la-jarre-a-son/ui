import React from 'react';
import useId from '../../utils/useId';
import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';
import { useMergeRef } from '../../utils/refUtils';
import useListNav from '../../utils/useListNav';

import { TreeViewContext } from './TreeViewContext';
import TreeViewItem from './TreeViewItem';

import { TreeViewProps } from './types';

import styles from './TreeView.module.scss';

const cx = bindClassNames(styles);

/**
 * Provides an TreeView context and wraps a hierarchical list of collapsible items, with multiple depth.
 */
export const TreeView = forwardRefWithAs<TreeViewProps, 'nav'>((props, ref) => {
  const { children, as, className, id, ...otherProps } = props;

  const parentId = useId(id);

  const Element = as || 'nav';

  const ownRef = useListNav({
    itemQuerySelector: '[role="treeitem"]',
  });
  const mergedRef = useMergeRef(ownRef, ref);

  let firstFound = false;

  return (
    <TreeViewContext.Provider value={{ depth: 0, parentId }}>
      <Element ref={mergedRef} className={cx('root', className)} {...otherProps}>
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
