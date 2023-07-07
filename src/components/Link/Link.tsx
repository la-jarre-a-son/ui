import React, { useCallback } from 'react';
import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import { LinkProps } from './types';

import styles from './Link.module.scss';

const cx = bindClassNames(styles);

/**
 * Renders a styled Anchor element with additional feature to disable interations
 */
export const Link = forwardRefWithAs<LinkProps, 'a'>((props, ref) => {
  const {
    children,
    as,
    className,
    intent,
    underlined,
    disabled,
    onClick,
    tabIndex,
    ...otherProps
  } = props;

  const Element = as || 'a';

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        e.preventDefault();
      } else if (onClick) {
        onClick(e);
      }
    },
    [disabled, onClick]
  );

  return (
    <Element
      ref={ref}
      className={cx(
        'root',
        intent && `--${intent}`,
        underlined && '--underlined',
        disabled && '--disabled',
        className
      )}
      onClick={handleClick}
      tabIndex={disabled ? -1 : tabIndex}
      aria-disabled={disabled}
      {...otherProps}
    >
      {children}
    </Element>
  );
});

Link.displayName = 'Link';

Link.defaultProps = {
  intent: 'primary',
};

export default Link;
