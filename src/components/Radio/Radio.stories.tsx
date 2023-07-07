import React, { useState, useEffect } from 'react';
import { Meta, Story } from '@storybook/react';

import { extractThemeVariables } from '../../../.storybook/utils/Theming';

import moduleCss from '!!raw-loader!./Radio.module.scss?raw';
import themeVariablesScss from '!!raw-loader!../../theme/jar/variables/Radio.scss?raw';

import { Radio } from '.';

export default {
  title: 'components/Form/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: {
    theming: extractThemeVariables([moduleCss, themeVariablesScss], 'Radio'),
  },
} as Meta;

type StoryProps = React.ComponentProps<typeof Radio>;

const Template: Story<StoryProps> = ({ value: initialValue, onChange, ...rest }) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (value: string) => {
    setValue(value);

    if (onChange) {
      onChange(value);
    }
  };

  return (
    <label>
      <Radio {...rest} name="default" value="a" checked={value === 'a'} onChange={handleChange} />
      <Radio {...rest} name="default" value="b" checked={value === 'b'} onChange={handleChange} />
      value is {value}
    </label>
  );
};

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  value: 'a',
};

/**
 * @storyDesc You can change the input element to use with the `as` prop.
 * You can also change the wrapper element to use by passing a `as` prop to the `wrapperProps`.
 */
export const AsProp = () => {
  return (
    <>
      <Radio wrapperProps={{ as: 'a', href: '/' }} />
      <Radio as="span" />
      <Radio as="span" checked />
    </>
  );
};
