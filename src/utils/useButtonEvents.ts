import useEvent from './useEvent';

type ButtonProps = {
  /**
   * The parent onKeyDown event
   */
  onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
  /**
   * The parent onClick event
   */
  onClick?: (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void;
  /**
   * Is the element disabled
   */
  disabled?: boolean;
  /**
   * Disable all the hook behaviour
   */
  disableBehaviour?: boolean;
};

/**
 * Hook managing commons props for element with button role
 */
export function useButtonEvents(props?: ButtonProps) {
  const { onKeyDown, onClick, disabled, disableBehaviour } = props || {};

  const handleKeyDown = useEvent((e: React.KeyboardEvent<HTMLElement>) => {
    if (onKeyDown) onKeyDown(e);
    if ((e.key === ' ' || e.key === 'Enter') && !disabled) {
      if (onClick) onClick(e);
    }

    if (e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
    }
  });

  const handleClick = useEvent((e: React.MouseEvent<HTMLElement>) => {
    if (onClick && !disabled) onClick(e);
  });

  if (disableBehaviour) {
    return {
      handleKeyDown: onKeyDown,
      handleClick: onClick,
    };
  }

  return {
    handleKeyDown,
    handleClick,
    tabIndex: disabled ? -1 : 0,
  };
}

export default useButtonEvents;
