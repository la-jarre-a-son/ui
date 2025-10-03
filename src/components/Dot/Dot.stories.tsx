import React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';

import moduleCss from '!!raw-loader!./Dot.module.scss?raw';
import { extractThemeVariables } from '../../../.storybook/utils/Theming';

import themeVariablesScss from '!!raw-loader!../../theme/jar/variables/Dot.scss?raw';

import { Dot, DotSizes, DotIntents } from '.';

export default {
  title: 'Components/Data/Dot',
  component: Dot,
  tags: ['autodocs'],
  parameters: {
    theming: extractThemeVariables([moduleCss, themeVariablesScss], 'Dot'),
  },
} as Meta;

export const Default: StoryObj<typeof Dot> = {
  render: ({ children, ...rest }) => <Dot {...rest}>{children}</Dot>,

  args: {
    intent: 'success',
    size: 'md',
    active: false,
  },
};

/**
 * @storyDesc The Dot come in two shapes and different sizes.
 */
export const All = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${DotSizes.length}, 1fr)`,
      alignItems: 'center',
      gridGap: '8px',
    }}
  >
    {DotIntents.map((intent) =>
      DotSizes.map((size) => (
        <div key={`${size}--${intent}`}>
          <Dot size={size} intent={intent} active />
        </div>
      ))
    )}
  </div>
);
/**
 * @storyDesc You can use the `as` prop to override the root element to use.
 */
export const AsProps = () => {
  return (
    <>
      <Dot as="div" />
      <Dot as="a" href="https://reactjs.org/" target="_blank" />
      <Dot as="button" onClick={() => alert('clicked')} />
    </>
  );
};
