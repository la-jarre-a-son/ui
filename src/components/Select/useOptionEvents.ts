import React from 'react';
import useEvent from '../../utils/useEvent';
import { useDropdown } from '../Dropdown/DropdownContext';
import { useSelect } from './SelectContext';

type OptionEvents = {
  /**
   * The onChange callback to call when selecting an item
   */
  onChange?: () => void;
  /**
   * The parent onKeyDown event
   */
  onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
  /**
   * The parent onClick event
   */
  onClick?: (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void;
};

/**
 * Basic event interaction for a select option item
 */
export function useOptionEvents(options?: OptionEvents) {
  const { onKeyDown, onClick, onChange } = options || {};

  const closeDropdown = useDropdown();
  const { refocusTrigger, keepOpened } = useSelect();

  const handleKeyDown = useEvent((e: React.KeyboardEvent<HTMLElement>) => {
    if (onKeyDown) onKeyDown(e);

    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();

      if (onClick) onClick(e);
      if (!keepOpened && closeDropdown) {
        closeDropdown({
          bubble: true,
          refocus: true,
        });
        refocusTrigger();
      }
      if (onChange) onChange();
    }
  });

  const handleClick = useEvent((e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (onClick) onClick(e);
    if (!keepOpened && closeDropdown) {
      closeDropdown({
        bubble: true,
      });
      refocusTrigger();
    }
    if (onChange) onChange();
  });

  return {
    handleKeyDown,
    handleClick,
  };
}

export default useOptionEvents;
