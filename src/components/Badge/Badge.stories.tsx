import React, { KeyboardEventHandler, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { extractThemeVariables } from '../../../.storybook/utils/Theming';

import moduleCss from '!!raw-loader!./Badge.module.scss?raw';
import themeVariablesScss from '!!raw-loader!../../theme/jar/variables/Badge.scss?raw';

import { Input } from '../Input';
import Button from '../Button';
import Icon from '../Icon';
import Stack from '../Stack';

import { Badge, BadgeSizes, BadgeIntents } from '.';

const meta = {
  title: 'Components/Data/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    // theming: extractThemeVariables([moduleCss, themeVariablesScss], 'Badge'),
  },
} satisfies Meta<typeof Badge>;

export default meta;

export const Default: StoryObj<typeof Badge> = {
  render: ({ children, ...rest }) => <Badge {...rest}>{children}</Badge>,

  args: {
    children: 'Label',
    intent: 'primary',
    size: 'md',
  },
};

/**
 * @storyDesc You can pass an element to display on the left and right end of the badge with the `left` and `right` props.
 */
export const WithIcons: StoryObj<typeof Badge> = {
  ...Default,
  args: {
    children: 'With icons',
    intent: 'primary',
    size: 'md',
    left: <Icon name="fi fi-rr-angle-up" />,
    right: <Icon name="fi fi-rr-cross" />,
  },
};

export const IconOnly: StoryObj<typeof Badge> = {
  ...Default,
  args: {
    intent: 'primary',
    size: 'md',
    right: <Icon name="fi fi-rr-cross" />,
  },
};

export const InButton: StoryObj<typeof Badge> = {
  render: ({ children, size, ...rest }) => (
    <Button
      variant="filled"
      intent="neutral"
      right={
        <Badge {...rest} size={size}>
          {children}
        </Badge>
      }
      size={size}
    >
      Button with a badge
    </Button>
  ),
  args: {
    intent: 'primary',
    size: 'md',
    right: <Icon name="fi fi-rr-cross" />,
  },
};

export const InInput: StoryObj<typeof Badge> = {
  render: ({ size, ...rest }) => {
    const [value, setValue] = useState('');
    const [tags, setTags] = useState(['test']);

    const handleChange = (v: string) => {
      setValue(v);
    };

    const handleRemove = (index: number) => {
      setTags((t) => t.filter((_, i) => i !== index));
    };

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
      if (event.code === 'Enter') {
        setValue((v) => {
          setTags((t) => [...t, v]);
          return '';
        });
      }

      if (event.code === 'Backspace') {
        if (!value) {
          handleRemove(tags.length - 1);
        }
      }
    };

    return (
      <Input
        left={
          <Stack gap="sm" wrap style={{ maxWidth: '100%' }}>
            {tags.map((tag, index) => (
              <Badge
                as="button"
                onClick={() => handleRemove(index)}
                key={index}
                {...rest}
                size={size}
                right={<Icon name="fi fi-rr-cross" aria-label="Remove" />}
              >
                {tag}
              </Badge>
            ))}
          </Stack>
        }
        containerProps={{
          style: { flexWrap: 'wrap' },
        }}
        size={size}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        block
      />
    );
  },
  args: {
    intent: 'primary',
    size: 'md',
  },
};

/**
 * @storyDesc badges come in variety of `size` and `intent`.
 */
export const All = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${BadgeSizes.length}, 1fr)`,
      alignItems: 'center',
      gridGap: '8px',
    }}
  >
    {BadgeIntents.map((intent) =>
      BadgeSizes.map((size) => (
        <div key={`${size}--${intent}`}>
          <Badge size={size} intent={intent}>
            Label
          </Badge>
        </div>
      ))
    )}
  </div>
);

/**
 * @storyDesc Use the `as` prop to override the root element to use.
 * The `as` prop value can be an HTML element or a React component.
 */
export const AsProps = () => {
  return (
    <>
      <Badge as="span">span badge</Badge>
      <Badge as="a" href="https://reactjs.org/" target="_blank">
        link badge
      </Badge>
    </>
  );
};
