import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { extractThemeVariables } from '../../../.storybook/utils/Theming';

import moduleCss from '!!raw-loader!./Box.module.scss?raw';
import themeVariablesScss from '!!raw-loader!../../theme/jar/variables/Box.scss?raw';

import Box from './Box';
import { BoxElevations } from '.';

export default {
  title: 'Components/Layout/Box',
  component: Box,
  tags: ['autodocs'],
  parameters: {
    theming: extractThemeVariables([moduleCss, themeVariablesScss], 'Box'),
  },
} as Meta;

const cardStyle: React.CSSProperties = {
  height: 160,
  width: 160,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  justifySelf: 'center',
};

const container: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
  gap: 32,
};

export const Default: StoryObj<typeof Box> = {
  render: ({ elevation, pad, ...rest }) => (
    <Box elevation={elevation} pad={pad} {...rest} style={cardStyle}>
      This is a box with an elevation of {elevation} and
      {pad ? ` a padding of size ${pad}` : ' no padding'}
    </Box>
  ),
  args: {
    elevation: 0,
    pad: undefined,
    outlined: false,
    hideOverflow: false,
  },
};

/**
 * @storyDesc The `Box` component come with a variety of possible shadows controlled with the `elevation` prop.
 */
export const Elevations = () => {
  return (
    <div style={container}>
      {BoxElevations.map((elevation) => (
        <Box key={elevation} elevation={elevation} style={cardStyle}>
          Elevation {elevation}
        </Box>
      ))}
    </div>
  );
};

/**
 * @storyDesc The `Box` can be outlined by using the boolean `outlined` prop.
 */
export const Outlined = () => {
  return (
    <div style={container}>
      <Box style={cardStyle}>No outline</Box>
      <Box outlined style={cardStyle}>
        Outlined
      </Box>
    </div>
  );
};
