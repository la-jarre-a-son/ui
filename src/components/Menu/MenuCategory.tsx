import React, { forwardRef } from 'react';
import Typography from '../Typography';

import { ListItem } from '../List';

/**
 * Renders a menu separator for splitting item into categories.
 *
 * To be used inside a `<Menu>` or `<SubMenu>` component.
 *
 * @deprecated Use MenuGroup instead
 */
export const MenuCategory = forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<'li'>>(
  (props, ref) => {
    const { children, className, ...otherProps } = props;

    return (
      <ListItem role="separator" ref={ref} className={className} {...otherProps}>
        <Typography as="span" intent="subtle" size="md" weight="bold">
          {children}
        </Typography>
      </ListItem>
    );
  }
);

MenuCategory.displayName = 'MenuCategory';

export default MenuCategory;
