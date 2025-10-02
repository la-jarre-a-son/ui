import React, { forwardRef } from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';
import { MergeProps } from '../../utils/typeUtils';

import List from '../List';
import Box from '../Box';

import styles from './Dropdown.module.scss';

const cx = bindClassNames(styles);

/* Props */

type DivListProps = MergeProps<
  {
    children?: React.ReactNode;
    listAs?: React.ElementType;
  },
  Omit<React.ComponentProps<typeof List>, 'children' | 'as'>
>;

export type DropdownListProps = MergeProps<
  React.ComponentProps<typeof List>,
  React.ComponentProps<typeof Box>
>;

/**
 * Wrapper around List component that define a 'div' default as prop
 */
const DivList = forwardRef<HTMLDivElement, DivListProps>(({ children, listAs, ...props }, ref) => {
  return (
    <List ref={ref} {...props} as={listAs || 'div'}>
      {children}
    </List>
  );
});

DivList.displayName = 'DropdownDivList';

export const DropdownList = forwardRefWithAs<DropdownListProps, 'div'>((props, ref) => {
  const {
    children,
    className,
    tabIndex = -1,
    as,
    elevation = 1,
    outlined = true,
    ...otherProps
  } = props;

  return (
    <Box
      as={DivList}
      listAs={as}
      ref={ref}
      tabIndex={tabIndex}
      className={cx('list', className)}
      elevation={elevation}
      outlined={outlined}
      {...otherProps}
    >
      {children}
    </Box>
  );
});

DropdownList.displayName = 'DropdownList';

export default DropdownList;
