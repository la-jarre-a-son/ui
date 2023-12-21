import React from 'react';
import { Meta, Story } from '@storybook/react';

import { List, ListItem } from '.';

export default {
  title: 'components/Data/List/ListItem',
  component: ListItem,
  tags: ['autodocs'],
} as Meta;

type StoryProps = React.ComponentProps<typeof ListItem>;

const Template: Story<StoryProps> = ({ children, ...props }) => (
  <List>
    <ListItem {...props}>{children}</ListItem>
  </List>
);
export const Default = Template.bind({});
Default.args = {
  children: 'List Item',
  selected: false,
  disabled: false,
  interactive: false,
  focused: false,
};
