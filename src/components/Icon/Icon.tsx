import React from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import styles from './Icon.module.scss';

const cx = bindClassNames(styles);

type IconStatics = {
  IconComponent: React.ElementType;
};

/* Props */

export const IconSizes = ['auto', 'lg', 'md', 'sm'] as const;
export const IconIntents = [
  'default',
  'subtle',
  'contrast',
  'neutral',
  'primary',
  'secondary',
  'danger',
  'warning',
  'success',
  'inherit',
] as const;

export type IconSize = (typeof IconSizes)[number];

export type IconIntent = (typeof IconIntents)[number];

export interface IconProps {
  /**
   * The Icon name
   */
  name: string;
  /**
   * The Icon semantic intent
   */
  intent?: IconIntent;
  /**
   * The Icon size (in teeshirt size)
   */
  size?: IconSize;
  /**
   * Make the icon spin (clockwise)
   */
  spin?: boolean;
}

/**
 * Renders an icon with icon classes and standardized styling
 */
export const Icon = forwardRefWithAs<IconProps, 'i', IconStatics>((props, ref) => {
  const { name, intent = 'inherit', size = 'auto', spin, className, as, ...otherProps } = props;

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

export default Icon;
