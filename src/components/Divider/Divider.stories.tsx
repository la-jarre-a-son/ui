import React from 'react';
import { Meta, Story } from '@storybook/react';

import { extractThemeVariables } from '../../../.storybook/utils/Theming';

import moduleCss from '!!raw-loader!./Divider.module.scss?raw';
import themeVariablesScss from '!!raw-loader!../../theme/jar/variables/Divider.scss?raw';

import { Button } from '../Button';
import { Divider, DividerContent } from '.';

export default {
  title: 'components/Layout/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    theming: extractThemeVariables([moduleCss, themeVariablesScss], 'Divider'),
  },
} as Meta;

type StoryProps = React.ComponentProps<typeof Divider>;

const Template: Story<StoryProps> = ({ children, ...rest }) => (
  <Divider {...rest}>{children}</Divider>
);

export const Default = Template.bind({});
Default.args = {
  children: null,
};

/**
 * @storyDesc You can pass an element to display inside the `Divider`. Use `contentPosition` props to change it position.
 */
export const DividerWithContent = Template.bind({});
DividerWithContent.args = {
  align: 'center',
  children: (
    <DividerContent>
      <Button variant="ghost">Load more</Button>
    </DividerContent>
  ),
};
