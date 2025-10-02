import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { extractThemeVariables } from '../../../.storybook/utils/Theming';

import moduleCss from '!!raw-loader!./StateButton.module.scss?raw';
import themeVariablesScss from '!!raw-loader!../../theme/jar/variables/StateButton.scss?raw';

import Icon from '../Icon';

import { StateButton } from '.';

export default {
  title: 'Components/Button/StateButton',
  component: StateButton,
  tags: ['autodocs'],
  parameters: {
    theming: extractThemeVariables([moduleCss, themeVariablesScss], 'StateButton'),
  },
} as Meta;

const TIMEOUT_DELAY = 2000;

const randomPromiseClickHandler = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve('Success');
      } else {
        reject(new Error('Failed'));
      }
    }, TIMEOUT_DELAY);
  });
};

export const Default: StoryObj<typeof StateButton> = {
  render: ({ children, promise, ...rest }) => (
    <StateButton {...rest} promise={promise ? randomPromiseClickHandler() : undefined}>
      {children}
    </StateButton>
  ),
  args: {
    children: 'StateButton CTA',
    variant: 'filled',
    intent: 'primary',
    size: 'md',
    disabled: false,
    left: <Icon name="fi fi-rr-circle" />,
    right: <Icon name="fi fi-rr-check" />,
    onClick: randomPromiseClickHandler,
    loading: false,
  },
};

/**
 * @storyDesc Icons for each feedback state can be customized
 *
 */
export const CustomIcons: StoryObj<typeof StateButton> = {
  ...Default,
  args: {
    ...Default.args,
    iconPending: 'fi fi-rr-hourglass',
    iconSuccess: 'fi fi-rr-disk',
    iconError: 'fi fi-rr-triangle-warning',
  },
};

export const AsProps = () => {
  return (
    <>
      <StateButton onClick={randomPromiseClickHandler} as="span">
        StateButton as span ??
      </StateButton>
      <StateButton
        onClick={randomPromiseClickHandler}
        as="a"
        href="https://reactjs.org/"
        target="_blank"
      >
        StateButton as anchor
      </StateButton>
      <StateButton onClick={randomPromiseClickHandler} as="button">
        StateButton as button
      </StateButton>
    </>
  );
};
