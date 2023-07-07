import React from 'react';
import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import { CardContentProps } from './types';

import styles from './Card.module.scss';

const cx = bindClassNames(styles);

/**
 * Wraps the content of a card.
 *
 * Must be used inside a Card component.
 */
export const CardContent = forwardRefWithAs<CardContentProps, 'div'>((props, ref) => {
  const { children, as, className, ...otherProps } = props;

  const Element = as || 'div';

  return (
    <Element ref={ref} className={cx('content', className)} {...otherProps}>
      {children}
    </Element>
  );
});

CardContent.displayName = 'CardContent';

export default CardContent;
