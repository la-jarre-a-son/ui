import React, { forwardRef } from 'react';
import { Meta, Story } from '@storybook/react-webpack5';

import { extractThemeVariables } from '../../../.storybook/utils/Theming';

import moduleCss from '!!raw-loader!./Stack.module.scss?raw';
import themeVariablesScss from '!!raw-loader!../../theme/jar/variables/Stack.scss?raw';

import { Stack, StackSeparator } from '.';

export default {
  title: 'Components/Layout/Stack',
  component: Stack,
  tags: ['autodocs'],
  subcomponents: {
    Separator: StackSeparator,
  },
  parameters: {
    theming: extractThemeVariables([moduleCss, themeVariablesScss], 'Stack'),
  },
} as Meta;

const Item = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} {...props} style={{ height: 50, minWidth: 80, backgroundColor: 'lightblue' }} />
  );
});

Item.displayName = 'Item';

type StoryProps = React.ComponentProps<typeof Stack>;

const Template: Story<StoryProps> = (props) => {
  return (
    <Stack {...props}>
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </Stack>
  );
};

export const Default = Template.bind({});
Default.args = {
  gap: 'md',
  wrap: true,
  block: true,
  align: 'start',
  direction: 'horizontal',
};

/**
 * @storyDesc the `Separator` component, accessibly can be use to add a growing separator.
 * If used inline, this component will add a growing div with a separator role. If used wrapping a child, it will add a style to the child to make it grow.
 */
export const Separator = () => {
  return (
    <>
      <p>Inline separator</p>
      <Stack gap="sm" wrap block>
        <Item />
        <Item />
        <Item />
        <StackSeparator />
        <Item />
        <Item />
        <Item />
      </Stack>
      <p>Wrapped separator</p>
      <Stack gap="sm" wrap block>
        <Item />
        <Item />
        <Item />
        <StackSeparator>
          <Item />
        </StackSeparator>
        <Item />
        <Item />
        <Item />
      </Stack>
    </>
  );
};
