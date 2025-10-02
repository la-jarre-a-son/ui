import React from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRef';
import { MergeProps } from '../../utils/typeUtils';

import { Box, BoxProps } from '../Box';

import styles from './Card.module.scss';

const cx = bindClassNames(styles);

/* Props */

export type CardProps = MergeProps<
  {
    /**
     * Is the card interactive
     */
    interactive?: boolean;
    /**
     * Is the card selected
     */
    selected?: boolean;
    /**
     * Remove all the horizontal padding on child components
     */
    disableGutter?: boolean;
  },
  BoxProps
>;

/**
 * Renders a box used to display a group of organized content.
 *
 * This component make use of the `Box` and accept all of its props.
 *
 * Use it with his sub components to compose the needed card layout.
 *
 * > ⚠️ You may need to think about accessibility when composing your card.
 * - Beware to not nest interactive elements.
 * - Beware that if the whole card is a link, all the content will be read by the screenreader as the link description.
 */
export const Card = forwardRefWithAs<CardProps, 'div'>((props, ref) => {
  const {
    className,
    children,
    outlined,
    elevation = 0,
    selected,
    interactive,
    disableGutter,
    ...otherProps
  } = props;

  return (
    <Box
      ref={ref}
      className={cx(
        styles.root,
        selected && '--selected',
        interactive && '--interactive',
        disableGutter && '--disableGutter',
        outlined && '--outlined',
        className
      )}
      outlined={outlined}
      elevation={elevation}
      {...otherProps}
    >
      {children}
    </Box>
  );
});

Card.displayName = 'Card';

export default Card;
