import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { extractThemeVariables } from '../../../.storybook/utils/Theming';

import moduleCss from '!!raw-loader!./Toolbar.module.scss?raw';
import themeVariablesScss from '!!raw-loader!../../theme/jar/variables/Toolbar.scss?raw';

import Button from '../Button';
import Container from '../Container';
import Icon from '../Icon';
import { Stack, StackSeparator } from '../Stack';
import Typography from '../Typography';

import { Toolbar } from '.';

export default {
  title: 'Components/Layout/Toolbar',
  component: Toolbar,
  tags: ['autodocs'],
  parameters: {
    theming: extractThemeVariables([moduleCss, themeVariablesScss], 'Toolbar'),
    docs: { inlineStories: false, iframeHeight: 400 },
    layout: 'fullscreen',
  },
} as Meta;

const content = Array(100)
  .fill('')
  .map((_, i) => `${i} - This is a very long content`);

export const Default: StoryObj<typeof Toolbar> = {
  render: (props) => (
    <>
      <Toolbar {...props}>
        <Container>
          <Stack align="center">
            <Button aria-label="menu" icon variant="ghost" intent="neutral">
              <Icon name="fa-solid fa-bars" />
            </Button>
            <Typography weight="bold">My App</Typography>
            <StackSeparator />
            <Button aria-label="menu" icon variant="ghost" intent="neutral">
              <Icon name="fa-solid fa-user" />
            </Button>
          </Stack>
        </Container>
      </Toolbar>
      <Container size="xl">
        {content.map((p, index) => (
          <p key={index}>{p}</p>
        ))}
      </Container>
    </>
  ),

  args: {
    position: 'sticky',
  },
};
