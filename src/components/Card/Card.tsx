import React from 'react';

import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';
import { bindClassNames } from '../../utils/classNames';

import Box from '../Box';

import { CardProps } from './types';
import styles from './Card.module.scss';

const cx = bindClassNames(styles);

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
    elevation,
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

Card.defaultProps = {
  elevation: 0,
  outlined: false,
  hideOverflow: false,
};

export default Card;
