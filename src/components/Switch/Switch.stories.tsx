import React, { useState, useEffect } from 'react';
import { Meta, Story } from '@storybook/react-webpack5';

import { extractThemeVariables } from '../../../.storybook/utils/Theming';

import moduleCss from '!!raw-loader!./Switch.module.scss?raw';
import themeVariablesScss from '!!raw-loader!../../theme/jar/variables/Switch.scss?raw';

import { Switch } from '.';

export default {
  title: 'components/Form/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    theming: extractThemeVariables([moduleCss, themeVariablesScss], 'Switch'),
  },
} as Meta;

type StoryProps = React.ComponentProps<typeof Switch>;

const Template: Story<StoryProps> = ({ checked: initialValue, onChange, ...rest }) => {
  const [checked, setChecked] = useState(initialValue);

  useEffect(() => {
    setChecked(initialValue);
  }, [initialValue]);

  const handleChange = (checked: boolean) => {
    setChecked(checked);

    if (onChange) {
      onChange(checked);
    }
  };

  return (
    <label>
      <Switch {...rest} checked={checked} onChange={handleChange} />
      value is {checked ? 'enabled' : 'disabled'}
    </label>
  );
};

export const Default = Template.bind({});
Default.args = {
  checked: false,
  disabled: false,
  tabIndex: 1,
};

export const AsProps = () => {
  return (
    <>
      <Switch wrapperProps={{ as: 'span' }} onChange={(checked) => alert(checked)} />
      <Switch wrapperProps={{ as: 'a' }} checked onChange={(checked) => alert(checked)} />
      <Switch as="span" />
      <Switch checked as="span" />
    </>
  );
};
