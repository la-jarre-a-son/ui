import React from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import { IconProps } from './types';

import styles from './Icon.module.scss';

const cx = bindClassNames(styles);

type IconStatics = {
  IconComponent: React.ElementType;
};

/**
 * Renders an icon with icon classes and standardized styling
 */
export const Icon = forwardRefWithAs<IconProps, 'i', IconStatics>((props, ref) => {
  const { name, intent, size, spin, className, as, ...otherProps } = props;

  const Element = as || Icon.IconComponent;

  return (
    <Element
      ref={ref}
      role="img"
      className={cx(
        'root',
        intent && `--${intent}`,
        size && `--${size}`,
        spin && `--spin`,
        name,
        className
      )}
      aria-hidden={otherProps?.['aria-label'] ? 'false' : 'true'}
      name={Element !== 'i' ? name : undefined}
      {...otherProps}
    />
  );
});

Icon.IconComponent = 'i';

Icon.displayName = 'Icon';

Icon.defaultProps = {
  intent: 'inherit',
  size: 'auto',
};

export default Icon;
