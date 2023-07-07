import React, { useState } from 'react';
import { Meta } from '@storybook/react';

import ContextMenu from './ContextMenu';
import { MenuItem } from '../Menu';
import Card, { CardHeader } from '../Card';

export default {
  title: 'Components/Layout/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
} as Meta;

export const DefaultStory = () => {
  return (
    <ContextMenu>
      <MenuItem value="item1">Menu Item 1</MenuItem>
      <MenuItem value="item2">Menu Item 2</MenuItem>
      <MenuItem value="item3">Menu Item 3</MenuItem>
    </ContextMenu>
  );
};

/**
 * @storyDesc You can attach the contextual menu to a specific element by using the `triggerEl` prop.
 */
export const TargetElement = () => {
  const [el, setRef] = useState<HTMLDivElement | null>(null);
  return (
    <>
      <Card outlined interactive ref={setRef}>
        <CardHeader>Element with context menu</CardHeader>
      </Card>
      <ContextMenu triggerEl={el}>
        <MenuItem value="item1">Menu Item 1</MenuItem>
        <MenuItem value="item2">Menu Item 2</MenuItem>
        <MenuItem value="item3">Menu Item 3</MenuItem>
      </ContextMenu>
    </>
  );
};
