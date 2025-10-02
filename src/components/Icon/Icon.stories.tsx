import React from 'react';
import { Meta, Story } from '@storybook/react';
import { extractThemeVariables } from '../../../.storybook/utils/Theming';

import moduleCss from '!!raw-loader!./Icon.module.scss?raw';
import themeVariablesScss from '!!raw-loader!../../theme/jar/variables/Icon.scss?raw';

import { Icon, IconSizes, IconIntents } from '.';
import Typography from '../Typography';

export default {
  title: 'Components/Data/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    theming: extractThemeVariables([moduleCss, themeVariablesScss], 'Icon'),
  },
} as Meta;

type StoryProps = React.ComponentProps<typeof Icon>;

const Template: Story<StoryProps> = ({ children, ...rest }) => <Icon {...rest}>{children}</Icon>;

export const Default = Template.bind({});
Default.args = {
  intent: 'default',
  size: 'md',
  name: 'fi fi-rr-home',
  spin: false,
};

/**
 * @storyDesc Icons come in variety of `size` and `intent`.
 */
export const All = () => (
  <div
    style={{
      color: 'magenta',
      fontSize: '12px',
      display: 'grid',
      gridTemplateColumns: `repeat(${IconSizes.length}, 1fr)`,
      alignItems: 'center',
      gridGap: '8px',
    }}
  >
    {IconIntents.map((intent) =>
      IconSizes.map((size) => (
        <div key={`${size}--${intent}`}>
          <Icon size={size} intent={intent} name="fi fi-rr-home" />
        </div>
      ))
    )}
  </div>
);

/**
 * @storyDesc FontAwesome icons are not always squares, and can be rectangles up to a 1.25 ratio (5/4). So the Icon component takes this into consideration, and its container is always bigger with inner margins to compensate for the icon shape.
 */

const IconShapeStyle = { backgroundColor: 'rgba(127,127,127, 0.3)' };

export const Shapes = () => {
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Icon size="lg" name="fi fi-rr-circle" style={IconShapeStyle} />
      <Icon size="lg" name="fi fi-rr-file" style={IconShapeStyle} />
      <Icon size="lg" name="fi fi-rr-envelope" style={IconShapeStyle} />
      <Icon size="lg" name="fi fi-rr-caret-up" style={IconShapeStyle} />
      <Icon size="lg" name="fi fi-rr-caret-down" style={IconShapeStyle} />
      <Icon size="lg" name="fi fi-rr-plus" style={IconShapeStyle} />
      <Icon size="lg" name="fi fi-rr-minus" style={IconShapeStyle} />
      <Icon size="lg" name="fi fi-rr-menu-dots-vertical" style={IconShapeStyle} />
      <Icon size="lg" name="fi fi-rr-heart" style={IconShapeStyle} />
      <Icon size="lg" name="fi fi-rr-star" style={IconShapeStyle} />
      <Icon size="lg" name="fi fi-rr-upload" style={IconShapeStyle} />
      <Icon size="lg" name="fi fi-rr-download" style={IconShapeStyle} />
      <Icon size="lg" name="fi fi-rr-link" style={IconShapeStyle} />
      <Icon size="lg" name="fi fi-rr-city" style={IconShapeStyle} />
      <Icon size="lg" name="fi fi-rr-school" style={IconShapeStyle} />
    </div>
  );
};

/**
 * @storyDesc You can specify size `auto` to inherit from parent font-size. Icon container will be bigger  125% - 1.25em) to compensate the FontAwesome icon shape, but its size will be the same as an adjacent text.
 */
export const AutoSize = () => {
  return (
    <Typography size="lg">
      <Icon size="auto" name="fi fi-rr-circle" />
      &nbsp;This is a text&nbsp;
      <Icon size="auto" name="fi fi-rr-home" />
    </Typography>
  );
};

/**
 * @storyDesc Use the `as` prop to override the root element to use.
 * The `as` prop value can be an HTML element or a React component.
 */
export const AsProps = () => {
  return (
    <>
      <Icon as="span" name="fi fi-rr-circle" />
      <Icon as="a" href="https://reactjs.org/" target="_blank" name="fi fi-rr-link" />
    </>
  );
};
