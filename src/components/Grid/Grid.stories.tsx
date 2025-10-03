import React from 'react';
import { Meta, Story } from '@storybook/react-webpack5';

import { extractThemeVariables } from '../../../.storybook/utils/Theming';

import moduleCss from '!!raw-loader!./Grid.module.scss?raw';
import themeVariablesScss from '!!raw-loader!../../theme/jar/variables/Grid.scss?raw';

import { Card, CardHeader, CardThumbnail } from '../Card';

import { Grid } from '.';

export default {
  title: 'Components/Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  parameters: {
    theming: extractThemeVariables([moduleCss, themeVariablesScss], 'Grid'),
  },
} as Meta;

const Item = () => {
  return (
    <div
      style={{
        backgroundColor: 'lightblue',
        border: '1px solid blue',
        width: '100%',
        paddingTop: '33%',
      }}
    />
  );
};

type StoryProps = React.ComponentProps<typeof Grid>;

export const Default: Story<StoryProps> = (props) => {
  return (
    <Grid {...props}>
      {new Array(6).fill(undefined).map((_, i) => (
        <Item key={i} />
      ))}
    </Grid>
  );
};
Default.args = {
  gap: 'md',
};

export const CardGrid = () => {
  return (
    <Grid gap="md">
      {new Array(6).fill(undefined).map((_, i) => (
        <Card key={i}>
          <CardThumbnail alt="no img" />
          <CardHeader>{`Card n°${i}`}</CardHeader>
        </Card>
      ))}
    </Grid>
  );
};
