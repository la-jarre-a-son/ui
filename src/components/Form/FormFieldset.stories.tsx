import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';

import { extractThemeVariables } from '../../../.storybook/utils/Theming';

import moduleCss from '!!raw-loader!./FormFieldset.module.scss?raw';
import themeVariablesScss from '!!raw-loader!../../theme/jar/variables/Form.scss?raw';

import { FormControlLabel } from '.';
import RadioGroup from '../RadioGroup';
import Radio from '../Radio';

import { FormFieldset } from '.';

export default {
  title: 'Components/Form/FormFieldset',
  component: FormFieldset,
  tags: ['autodocs'],
  parameters: {
    theming: extractThemeVariables([moduleCss, themeVariablesScss], 'FormFieldset'),
  },
} as Meta;

export const Default: StoryObj<typeof FormFieldset> = {
  render: ({ ...otherProps }) => {
    const [values, setValues] = useState<Record<string, string>>({});

    const handleChange = (name: string) => (v: string) => {
      setValues((p) => ({
        ...p,
        [name]: v,
      }));
    };

    return (
      <>
        <FormFieldset {...otherProps}>
          <RadioGroup
            value={values.subscription}
            name={'subscription'}
            onChange={handleChange('subscription')}
          >
            <FormControlLabel
              key={'free'}
              label={'Free Subscription'}
              hint="You will just have minimal features"
            >
              <Radio value={'free'} />
            </FormControlLabel>
            <FormControlLabel
              key={'premium'}
              label={'Premium Subscription'}
              hint="You will have a lot more features"
            >
              <Radio value={'premium'} />
            </FormControlLabel>
          </RadioGroup>
        </FormFieldset>
        <FormFieldset {...otherProps}>
          <RadioGroup value={values.choice} name={'choice'} onChange={handleChange('choice')}>
            {['A', 'B', 'C'].map((value) => (
              <FormControlLabel key={value} label={`Choice ${value}`}>
                <Radio value={value} />
              </FormControlLabel>
            ))}
          </RadioGroup>
        </FormFieldset>
      </>
    );
  },

  args: {
    label: 'Subscription',
  },
};
