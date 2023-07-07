import React, { useState, useEffect } from 'react';
import { Meta, Story } from '@storybook/react';

import { extractThemeVariables } from '../../../.storybook/utils/Theming';

import moduleCss from '!!raw-loader!./Checkbox.module.scss?raw';
import themeVariablesScss from '!!raw-loader!../../theme/jar/variables/Checkbox.scss?raw';

import { Checkbox } from '.';

export default {
  title: 'components/Form/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],

  parameters: {
    theming: extractThemeVariables([moduleCss, themeVariablesScss], 'Checkbox'),
  },
} as Meta;

type StoryProps = React.ComponentProps<typeof Checkbox>;

const Template: Story<StoryProps> = ({
  checked: initialChecked,
  indeterminate: initialIndeterminate,
  onChange,
  ...rest
}) => {
  const [checked, setChecked] = useState(initialChecked);
  const [indeterminate, setIndeterminate] = useState(initialIndeterminate);

  useEffect(() => {
    setChecked(initialChecked);
  }, [initialChecked]);

  useEffect(() => {
    setIndeterminate(initialIndeterminate);
  }, [initialIndeterminate]);

  const handleChange = (checked: boolean) => {
    setIndeterminate(false);
    setChecked(checked);

    if (onChange) {
      onChange(checked);
    }
  };

  return (
    <label>
      <Checkbox {...rest} checked={checked} indeterminate={indeterminate} onChange={handleChange} />
      value is {checked ? 'checked' : indeterminate ? 'indeterminate' : 'not checked'}
    </label>
  );
};

export const Default = Template.bind({});
Default.args = {
  checked: false,
  disabled: false,
  indeterminate: false,
  tabIndex: 1,
};

/**
 * @storyDesc The `indeterminate` prop can change the checkbox style.
 */
export const Indeterminate = () => {
  return <Checkbox indeterminate checked />;
};

/**
 * @storyDesc Use the `as` prop to override the root element to use.
 * You can override obth the wrapper and input element
 */
export const AsProps = () => {
  return (
    <>
      <Checkbox wrapperProps={{ as: 'span' }} checked onChange={(checked) => alert(checked)} />
      <Checkbox wrapperProps={{ as: 'a' }} checked onChange={(checked) => alert(checked)} />
      <Checkbox as="span" />
      <Checkbox as="span" checked />
    </>
  );
};
