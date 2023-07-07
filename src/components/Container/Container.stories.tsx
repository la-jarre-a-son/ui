import React from 'react';
import { Meta, Story } from '@storybook/react';

import { extractThemeVariables } from '../../../.storybook/utils/Theming';

import moduleCss from '!!raw-loader!./Container.module.scss?raw';
import themeVariablesScss from '!!raw-loader!../../theme/jar/variables/Container.scss?raw';

import Box from '../Box';

import { Container, ContainerSizes } from '.';

export default {
  title: 'Components/Layout/Container',
  component: Container,
  tags: ['autodocs'],
  parameters: {
    theming: extractThemeVariables([moduleCss, themeVariablesScss], 'Container'),
    layout: 'fullscreen',
  },
} as Meta;

const Content: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <Box elevation={2} style={{ padding: '16px', marginTop: '16px', marginBottom: '16px' }}>
      {children}
    </Box>
  );
};

type StoryProps = React.ComponentProps<typeof Container>;

export const Default: Story<StoryProps> = (props) => {
  return (
    <>
      <Container {...props}>
        <Content />
      </Container>
    </>
  );
};

/**
 * @storyDesc You can specify the container max width with the `size` prop.
 */
export const Sizes = () => {
  return (
    <>
      {ContainerSizes.map((size) => (
        <Container key={size} size={size}>
          <Content>{size}</Content>
        </Container>
      ))}
    </>
  );
};

/**
 * @storyDesc The `align` props set the alignment of the content (`center` by default).
 */
export const Align = () => {
  return (
    <>
      <Container align="center" size="sm">
        <Content>center</Content>
      </Container>
      <Container align="left" size="sm">
        <Content>left</Content>
      </Container>
      <Container align="right" size="sm">
        <Content>right</Content>
      </Container>
    </>
  );
};
