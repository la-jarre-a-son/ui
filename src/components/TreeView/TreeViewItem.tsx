import React, { useEffect, useMemo, useRef, useState } from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';
import useId from '../../utils/useId';
import useEvent from '../../utils/useEvent';
import { useForkRef } from '../../utils/refUtils';
import { attemptFocus } from '../../utils/focusUtils';

import Collapse from '../Collapse';
import Icon from '../Icon';
import { ListItem } from '../List';

import { TreeViewContext, useTreeView } from './TreeViewContext';

import { TreeViewItemProps } from './types';
import { hasCurrentChildren } from './utils';

import styles from './TreeView.module.scss';

const cx = bindClassNames(styles);

type TreeViewStatic = {
  ICON_OPEN: string;
  ICON_CLOSED: string;
};

/**
 * Renders an item in a tree view, with interactions, and a collapsible subgroup if `children` are provided.
 *
 * Provides a new TreeViewList context for the collapsible subgroup.
 *
 * To be used in a TreeView context.
 */
export const TreeViewItem = forwardRefWithAs<TreeViewItemProps, 'a', TreeViewStatic>(
  (props, ref) => {
    const {
      as,
      id,
      className,
      title,
      right,
      style,
      current,
      selected,
      onClick,
      onOpen,
      onClose,
      children,
      disabled,
      defaultOpen,
      open: originalOpen,
      ...otherProps
    } = props;

    const { depth = 0 } = useTreeView() || {};
    const [open, setOpen] = useState(disabled ? false : defaultOpen);
    const rootId = useId(id);
    const [itemRef, mergedRef] = useForkRef(ref);

    // Block navigation when transition out so we don't
    // focus an element that will be unmounted soon
    const blocknav = useRef(false);

    const _open = originalOpen ?? open;

    const itemStyle = {
      ...style,
      '--TreeView_depth': depth,
    };

    /**
     * Toogle the content on click
     */
    const handleClick = useEvent((e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!disabled) {
        if (_open) {
          blocknav.current = true;
          setOpen(false);
          if (onClose) onClose(e);
        } else {
          setOpen(true);
          if (onOpen) onOpen(e);
        }
        if (onClick) onClick(e);
      }
    });

    /**
     *  prevent navigation down when transitionning the content
     */
    const handlePreventNavDown = useEvent((e: React.KeyboardEvent<HTMLLIElement>) => {
      if (e.key === 'ArrowDown' && blocknav.current) {
        e.stopPropagation();
      }
    });

    /**
     * Handle ArrowLeft/ArrowRight navigation
     */
    const handleKeyDown = useEvent((e: React.KeyboardEvent<HTMLLIElement>) => {
      if (e.key === 'ArrowLeft') {
        if (_open) {
          e.stopPropagation();

          // close the item on arrow left if currently focusing it
          if (itemRef.current === e.target) {
            blocknav.current = true;
            setOpen(false);
            if (onClose) onClose(e);
          }

          // refocus the root item on arrow left
          attemptFocus(itemRef.current, true);
        }
      } else if (e.key === 'ArrowRight') {
        e.stopPropagation();

        // open the content on ArrowRight
        if (!_open && !disabled) {
          setOpen(true);
          if (onOpen) onOpen(e);
        }
      } else if (e.key === 'Enter' || e.code === 'Space') {
        e.stopPropagation();
        if (onClick) onClick(e);
      }
    });

    /**
     * Release the blocked nav on transition end
     */
    const handleTransitionEnd = useEvent(() => {
      blocknav.current = false;
    });

    const contextState = useMemo(() => ({ depth: depth + 1, parentId: rootId }), [depth, rootId]);

    useEffect(() => {
      const hasCurrent = hasCurrentChildren(children, TreeViewItem);
      setOpen((open) => open || hasCurrent);
    }, [children]);

    if (children && typeof children !== 'string') {
      return (
        <TreeViewContext.Provider value={contextState}>
          <li role="none" onKeyDown={handleKeyDown} onKeyDownCapture={handlePreventNavDown}>
            <ListItem
              className={cx('group', className)}
              style={itemStyle}
              tabIndex={-1}
              {...otherProps}
              as={as || 'a'}
              disabled={disabled}
              id={rootId}
              interactive
              onClick={handleClick}
              ref={mergedRef}
              role="treeitem"
              selected={selected}
              right={
                <>
                  {right}
                  <Icon
                    aria-hidden="true"
                    name={open ? TreeViewItem.ICON_OPEN : TreeViewItem.ICON_CLOSED}
                  />
                </>
              }
            >
              {title}
            </ListItem>
            <Collapse
              className={cx('collapse')}
              open={_open}
              role="none"
              wrapperProps={{ role: 'none' }}
              onTransitionEnd={handleTransitionEnd}
            >
              <ul aria-owns={rootId} role="group">
                {children}
              </ul>
            </Collapse>
          </li>
        </TreeViewContext.Provider>
      );
    }

    return (
      <li role="none" onKeyDown={handleKeyDown} onKeyDownCapture={handlePreventNavDown}>
        <ListItem
          className={cx('item', className)}
          style={itemStyle}
          tabIndex={-1}
          selected={current || selected}
          aria-current={current ? 'page' : undefined}
          {...otherProps}
          as={as || 'a'}
          disabled={disabled}
          interactive
          onClick={onClick}
          ref={ref}
          role="treeitem"
        >
          {title}
        </ListItem>
      </li>
    );
  }
);

TreeViewItem.ICON_CLOSED = 'fa-solid fa-chevron-right';
TreeViewItem.ICON_OPEN = 'fa-solid fa-chevron-down';

TreeViewItem.displayName = 'TreeViewItem';

export default TreeViewItem;
