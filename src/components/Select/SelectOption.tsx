import React from 'react';

import { useEvent, bindClassNames, forwardRefWithAs } from '../../utils';

import { ListItem } from '../List';
import Icon from '../Icon';

import { SelectOptionProps } from './types';
import useOptionEvents from './useOptionEvents';

import styles from './Select.module.scss';

const cx = bindClassNames(styles);

type SelectOptionStatics = {
  ICON_SELECTED: string;
};

/**
 * Renders an option for a list of selectable options.
 *
 * To be used inside a Select component, by the `children` rendre function
 */
export const SelectOption = forwardRefWithAs<
  SelectOptionProps,
  typeof ListItem,
  SelectOptionStatics
>((props, ref) => {
  const {
    as,
    value,
    label,
    onClick,
    onSelect,
    children,
    selected,
    onKeyDown,
    className,
    ...otherProps
  } = props;

  const onChange = useEvent(() => {
    if (onSelect && value !== undefined) {
      onSelect(value);
    }
  });

  const { handleKeyDown, handleClick } = useOptionEvents({
    onChange,
    onKeyDown,
    onClick,
  });

  return (
    <ListItem
      aria-label={label}
      ref={ref}
      tabIndex={-1}
      className={cx('option', className)}
      as={as || 'li'}
      role="option"
      interactive
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      selected={selected}
      right={selected && <Icon name={SelectOption.ICON_SELECTED} />}
      {...otherProps}
    >
      {children}
    </ListItem>
  );
});

SelectOption.ICON_SELECTED = 'fa-solid fa-check';

SelectOption.displayName = 'SelectOption';

export default React.memo(SelectOption);
