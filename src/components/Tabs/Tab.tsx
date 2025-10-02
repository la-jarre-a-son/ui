import React, { useCallback } from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRef';

import { useId } from '../../hooks/useId';

import { useTabList } from './TabListContext';
import { useTabsActive } from './TabsProvider';

import type { ToggleButtonProps } from '../ToggleButton';
import { Button } from '../Button';

import styles from './Tabs.module.scss';

const cx = bindClassNames(styles);

/* Props */

export type TabProps = ToggleButtonProps;

/**
 * Renders a tab, and inherits from its parent state and stylistic props.
 *
 * Should be used in a TabList.
 */
export const Tab = forwardRefWithAs<TabProps, typeof Button>((props, ref) => {
  const {
    as,
    id,
    className,
    onClick,
    children,
    selected,
    direction,
    variant,
    size,
    ...otherProps
  } = props;

  const {
    selected: tabListSelected,
    onChange: tabListOnChange,
    variant: tabListVariant,
    size: tabListSize,
    direction: tabListDirection,
  } = useTabList() || {};

  const _variant = tabListVariant ?? variant;
  const _size = tabListSize ?? size;
  const _direction = tabListDirection ?? direction;

  const uid = useId(id);

  const { setActive, selectedTab } = useTabsActive();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) onClick(e);
      if (tabListOnChange) tabListOnChange(uid || '');
      if (setActive) setActive(uid || '');
    },
    [onClick, tabListOnChange, uid, setActive]
  );

  const isSelected =
    selected ?? (uid != null ? selectedTab === uid || tabListSelected === uid : false);

  return (
    <Button
      as={as}
      role="tab"
      ref={ref}
      id={uid}
      className={cx(
        'tab',
        _direction && `tab--${_direction}`,
        isSelected && 'tab--selected',
        className
      )}
      aria-selected={isSelected}
      selected={isSelected}
      onClick={handleClick}
      tabIndex={-1}
      variant={isSelected ? 'filled' : _variant}
      intent={isSelected ? 'primary' : 'neutral'}
      size={_size}
      {...otherProps}
    >
      {children}
    </Button>
  );
});

Tab.displayName = 'Tab';

export default Tab;
