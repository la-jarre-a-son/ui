import React, { useState, useEffect } from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';

import { extractThemeVariables } from '../../../.storybook/utils/Theming';

import moduleCss from '!!raw-loader!./FormControlLabel.module.scss?raw';
import themeVariablesScss from '!!raw-loader!../../theme/jar/variables/Form.scss?raw';

import Checkbox from '../Checkbox';
import Radio from '../Radio';
import Switch from '../Switch';

import { FormControlLabel } from '.';

export default {
  title: 'Components/Form/FormControlLabel',
  component: FormControlLabel,
  tags: ['autodocs'],
  argTypes: {
    Component: { table: { disable: true } },
    value: { table: { disable: true } },
  },
  parameters: {
    theming: extractThemeVariables([moduleCss, themeVariablesScss], 'FormControlLabel'),
  },
} as Meta;

type ControllableComponent = typeof Switch | typeof Radio | typeof Checkbox;

const ControlledElement: React.FC<
  Omit<React.ComponentProps<ControllableComponent>, 'onChange'> & {
    Component: ControllableComponent;
  }
> = ({ Component, checked: initialChecked, value, ...rest }) => {
  const [checked, setChecked] = useState<boolean | string>(initialChecked || false);

  useEffect(() => {
    setChecked(initialChecked || false);
  }, [initialChecked]);

  const handleChange = (checked: boolean | string) => {
    if (typeof checked === 'string' && checked === value) {
      setChecked(true);
    }
    setChecked(checked || false);
  };

  return <Component {...rest} value={value} checked={!!checked} onChange={handleChange} />;
};

const renderTemplate =
  (Component: ControllableComponent) =>
  // eslint-disable-next-line react/display-name
  ({ value, checked, disabled, label, ...props }: React.ComponentProps<ControllableComponent>) => (
    <FormControlLabel label={label} {...props} disabled={disabled}>
      <ControlledElement
        Component={Component}
        value={value}
        checked={checked}
        disabled={disabled}
      />
    </FormControlLabel>
  );

export const WithCheckbox: StoryObj<typeof FormControlLabel> = {
  render: renderTemplate(Checkbox),
  args: {
    label: 'Remember Me',
    hint: 'Save my login details for next time.',
  },
};

export const WithRadio: StoryObj<typeof FormControlLabel> = {
  render: renderTemplate(Radio),
  args: {
    value: 'remember',
    label: 'Remember Me',
    hint: 'Save my login details for next time.',
  },
};

export const WithSwitch: StoryObj<typeof FormControlLabel> = {
  render: renderTemplate(Switch),
  args: {
    label: 'Remember Me',
    hint: 'Save my login details for next time.',
  },
};

export const Reverse: StoryObj<typeof FormControlLabel> = {
  render: renderTemplate(Switch),
  args: {
    label: 'Do you like it ?',
    hint: 'This is a great way to preset switches',
    reverse: true,
  },
};
