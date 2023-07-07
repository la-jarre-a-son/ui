import React, { forwardRef } from 'react';

import List from '../List/List';
import Box from '../Box';
import { MergeProps, forwardRefWithAs, bindClassNames } from '../../utils';

import styles from './Dropdown.module.scss';

const cx = bindClassNames(styles);

type ListProps = MergeProps<
  {
    children?: React.ReactNode;
    listAs?: React.ElementType;
  },
  Omit<React.ComponentProps<typeof List>, 'children'>
>;

/**
 * Wrapper arround List component that define a 'div' default as prop
 */
const DivList = forwardRef<HTMLDivElement, ListProps>(({ children, listAs, ...props }, ref) => {
  return (
    <List ref={ref} {...props} as={listAs || 'div'}>
      {children}
    </List>
  );
});

DivList.displayName = 'List';

export const DropdownList = forwardRefWithAs<React.ComponentProps<typeof Box>, 'div'>(
  (props, ref) => {
    const { children, className, tabIndex = -1, as, ...otherProps } = props;

    return (
      <Box
        as={DivList}
        listAs={as}
        ref={ref}
        tabIndex={tabIndex}
        className={cx('list', className)}
        {...otherProps}
      >
        {children}
      </Box>
    );
  }
);

DropdownList.displayName = 'DropdownList';

DropdownList.defaultProps = {
  elevation: 1,
  outlined: true,
};

export default DropdownList;
