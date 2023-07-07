import React, { useEffect, useRef } from 'react';
import useEvent from './useEvent';

type UsePopoverOptions = {
  triggerEl?: HTMLElement | null;
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  triggerKeys?: string[];
};

const defaultKeys = [' ', 'ArrowDown', 'ArrowUp'];
const NOP = () => undefined;

/**
 * Hook that manage an opening state binded to a trigger element
 */
export function usePopoverTrigger({
  onOpen = NOP,
  onClose = NOP,
  open: openProp,
  triggerEl,
  triggerKeys = defaultKeys,
}: UsePopoverOptions = {}) {
  const [innerOpen, setInnerOpen] = React.useState(false);
  const open = openProp ?? innerOpen;

  // copy the open param in a ref for non-reactive usage
  const openCopy = useRef(open);
  useEffect(() => {
    openCopy.current = open;
  });

  const handleToggle = useEvent(() => {
    if (open && onClose) {
      onClose();
    } else if (onOpen) {
      onOpen();
    }
    setInnerOpen((p) => !p);
  });

  const handleClose = useEvent(() => {
    setInnerOpen(false);
    if (onClose) onClose();
  });

  const handleOpen = useEvent(() => {
    setInnerOpen((p) => !p);
    if (onOpen) onOpen();
  });

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (triggerKeys.includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        handleToggle();
      }
    }
    function handleClick(e: MouseEvent) {
      e.preventDefault();
      e.stopPropagation();
      handleToggle();
    }
    if (triggerEl) {
      triggerEl.addEventListener('keydown', handleKeyDown);
      triggerEl.addEventListener('click', handleClick);
    }
    return () => {
      if (triggerEl) {
        triggerEl.removeEventListener('keydown', handleKeyDown);
        triggerEl.removeEventListener('click', handleClick);
      }
    };
  }, [triggerEl, triggerKeys, handleToggle]);

  useEffect(() => {
    if (triggerEl) {
      triggerEl.setAttribute('aria-haspopup', 'true');
      triggerEl.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
  }, [triggerEl, open, handleOpen]);

  return {
    handleToggle,
    handleOpen,
    handleClose,
    open,
  };
}

export default usePopoverTrigger;
