import React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';

import moduleCss from '!!raw-loader!./Avatar.module.scss?raw';
import { extractThemeVariables } from '../../../.storybook/utils/Theming';

import themeVariablesScss from '!!raw-loader!../../theme/jar/variables/Avatar.scss?raw';

import { Avatar, AvatarSizes, AvatarShapes } from '.';

import imageSrc from '../../../public/placeholderImage.svg';

const meta = {
  title: 'Components/Data/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    theming: extractThemeVariables([moduleCss, themeVariablesScss], 'Avatar'),
  },
} satisfies Meta<typeof Avatar>;

export default meta;

export const Default: StoryObj<typeof Avatar> = {
  render: ({ children, ...rest }) => <Avatar {...rest}>{children}</Avatar>,

  args: {
    alt: 'Alt name',
    shape: 'round',
    size: 'md',
    image: imageSrc,
    children: '',
    online: false,
    outlined: false,
  },
};

export const WithLabel: StoryObj<typeof Avatar> = {
  ...Default,
  args: {
    alt: 'Rémi Jarasson',
    shape: 'round',
    size: 'md',
    children: 'RJ',
  },
};

/**
 * @storyDesc The avatar come in two shapes and different sizes.
 */
export const All = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${AvatarSizes.length}, 1fr)`,
      alignItems: 'center',
      gridGap: '8px',
    }}
  >
    {AvatarShapes.map((shape) =>
      AvatarSizes.map((size) => (
        <div key={`${size}--${shape}`}>
          <Avatar alt="Alt name" size={size} shape={shape} image={Default.args?.image || ''} />
        </div>
      ))
    )}
    {AvatarShapes.map((shape) =>
      AvatarSizes.map((size) => (
        <div key={`${size}--${shape}`}>
          <Avatar
            alt="Alt name"
            size={size}
            shape={shape}
            image={Default.args?.image || ''}
            outlined
          />
        </div>
      ))
    )}
    {AvatarShapes.map((shape) =>
      AvatarSizes.map((size) => (
        <div key={`${size}--${shape}`}>
          <Avatar
            alt="Alt name"
            size={size}
            shape={shape}
            image={Default.args?.image || ''}
            online
          />
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
      <Avatar alt="image" as="span" image={Default.args?.image || ''} outlined />
      <Avatar
        alt="image"
        as="a"
        href="https://reactjs.org/"
        target="_blank"
        image={Default.args?.image || ''}
        outlined
      />
      <Avatar
        alt="image"
        as="button"
        onClick={() => alert('clicked')}
        image={Default.args?.image || ''}
        outlined
      />
    </>
  );
};
