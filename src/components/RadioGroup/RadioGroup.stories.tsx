import React, { useState, useEffect } from 'react';
import { Meta, Story } from '@storybook/react';

import { FormControlLabel } from '../Form';
import Radio from '../Radio';

import { RadioGroup } from '.';

export default {
  title: 'Components/Form/Radio/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
} as Meta;

type StoryProps = React.ComponentProps<typeof RadioGroup>;

const Template: Story<StoryProps> = ({ name, disabled, value: initialValue, onChange }) => {
  const [currentValue, setCurrentValue] = useState(initialValue);

  useEffect(() => {
    setCurrentValue(initialValue);
  }, [initialValue]);

  const handleChange = (value: string) => {
    setCurrentValue(value);

    if (onChange) {
      onChange(value);
    }
  };

  return (
    <RadioGroup value={currentValue} name={name} onChange={handleChange} disabled={disabled}>
      {['A', 'B', 'C'].map((value) => (
        <FormControlLabel key={value} label={`Choice ${value}`} disabled={disabled}>
          <Radio value={value} />
        </FormControlLabel>
      ))}
    </RadioGroup>
  );
};

export const Default = Template.bind({});
Default.args = {
  name: 'default',
  value: 'A',
  disabled: false,
  onChange: (value: string) => console.log(value),
};

/**
 * @storyDesc use fieldsets to label a `RadioGroup`
 */
export const Multiple = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <fieldset>
      <legend>list 1</legend>
      <Default name="list1" value="A" />
    </fieldset>
    <fieldset>
      <legend>list 2</legend>
      <Default name="list2" value="B" />
    </fieldset>
  </div>
);
