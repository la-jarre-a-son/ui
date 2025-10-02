import React, { useState, useEffect } from 'react';
import { Meta, Story } from '@storybook/react';

import { extractThemeVariables } from '../../../.storybook/utils/Theming';

import moduleCss from '!!raw-loader!./InputContainer.module.scss?raw';
import themeVariablesScss from '!!raw-loader!../../theme/jar/variables/Input.scss?raw';

import Icon from '../Icon';

import { Input, InputContainer } from '.';

export default {
  title: 'Components/Form/Input/Text',
  component: Input,
  tags: ['autodocs'],
  subcomponents: {
    InputContainer,
  },
  parameters: {
    theming: extractThemeVariables([moduleCss, themeVariablesScss], 'InputContainer'),
  },
} as Meta;

type StoryProps = React.ComponentProps<typeof Input>;

const Template: Story<StoryProps> = ({ value: initialValue, ...rest }) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <Input {...rest} value={value} onChange={setValue} />;
};

export const Default = Template.bind({});
Default.args = {
  type: 'text',
  value: 'Text value',
  placeholder: 'Placeholder Value',
  error: '',
  left: <Icon name="fi fi-rr-at" />,
  right: <Icon name="fi fi-rr-search" />,
  disabled: false,
  size: 'md',
  block: false,
};

/**
 * @storyDesc If you provide anything as a children, this will be used instead of the default input.
 * This allow for any needed recomposition.
 */
export const CustomInput = () => {
  return (
    <Input right={<Icon name="fi fi-rr-disk" />}>
      <div style={{ width: '100%' }}>Choose a file</div>
      <input
        type="file"
        style={{
          opacity: 0,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
    </Input>
  );
};

/**
 * @storyDesc Setting the `error` boolean prop will display an error state.
 */
export const Error = () => {
  return <Input error />;
};

/**
 * @storyDesc Setting the `block` boolean props will make the input full width.
 */
export const Block = () => {
  return <Input block />;
};

/**
 * @storyDesc You can force the input to display his focused style by setting the  `focused` boolean props.
 */
export const Focused = () => {
  return <Input focused />;
};
