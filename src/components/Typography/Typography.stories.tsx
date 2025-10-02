import React from 'react';
import { Meta, Story } from '@storybook/react';

import { extractThemeVariables } from '../../../.storybook/utils/Theming';

import moduleCss from '!!raw-loader!./Typography.module.scss?raw';
import themeVariablesScss from '!!raw-loader!../../theme/jar/partials/_typography.scss?raw';

import { Typography, TypographySizes, TypographyWeights } from '.';

export default {
  title: 'Components/Data/Typography',
  component: Typography,
  tags: ['autodocs'],
  parameters: {
    theming: extractThemeVariables([moduleCss, themeVariablesScss], 'Typography'),
  },
} as Meta;

const content =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

type StoryProps = React.ComponentProps<typeof Typography>;

const Template: Story<StoryProps> = ({ children, ...rest }) => (
  <Typography {...rest}>{children}</Typography>
);

export const Default = Template.bind({});
Default.args = {
  children: content,
  variant: 'text',
  size: 'md',
};

export const All = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${TypographyWeights.length}, 1fr)`,
      alignItems: 'center',
      gridGap: '8px',
    }}
  >
    {TypographySizes.map((size) =>
      TypographyWeights.map((weight) => (
        <div key={`${size}`}>
          <Default size={size} weight={weight}>
            Text Style {size}
            <br />
            {weight}
          </Default>
        </div>
      ))
    )}
  </div>
);

export const AsProps = () => {
  return (
    <>
      <Typography as="div">DIV Typography</Typography>
      <Typography as="a" href="https://reactjs.org/" target="_blank">
        link badge
      </Typography>
    </>
  );
};

/**
 * @storyDesc The text alignment can be set with the `align` props.
 */
export const TextAlign = () => {
  return (
    <>
      <Typography align="start">Start</Typography>
      <Typography align="center">Center</Typography>
      <Typography align="end">End</Typography>
    </>
  );
};

/**
 * @storyDesc You can change the color of the text with the `intent` prop.
 */
export const Intent = () => {
  return (
    <>
      <Typography intent="default">Default intent</Typography>
      <Typography intent="subtle">Subtle intent</Typography>
      <Typography intent="placeholder">Placeholder intent</Typography>
      <Typography intent="error">Error intent</Typography>
      <Typography intent="inherit">Inherit intent</Typography>
      <div style={{ backgroundColor: '#fff' }}>
        <Typography intent="contrast">Contrast intent</Typography>
      </div>
    </>
  );
};
