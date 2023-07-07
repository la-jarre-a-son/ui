import React, { useState, useEffect } from 'react';
import { Meta, Story } from '@storybook/react';

import { extractThemeVariables } from '../../../.storybook/utils/Theming';

import moduleCss from '!!raw-loader!./FormField.module.scss?raw';
import themeVariablesScss from '!!raw-loader!../../theme/jar/variables/Form.scss?raw';

import Button from '../Button';
import { InputContainerLabel, Input } from '../Input';
import InputGroup from '../InputGroup';
import Select from '../Select';
import Slider from '../Slider';
import { FormControlLabel } from '../Form';
import Checkbox from '../Checkbox';
import RadioGroup from '../RadioGroup';
import Radio from '../Radio';

import { FormField, FieldContainer, FieldHint, FieldLabel } from '.';

export default {
  title: 'Components/Form/FormField',
  component: FormField,
  tags: ['autodocs'],
  subcomponents: {
    FieldContainer,
    FieldHint,
    FieldLabel,
  },
  parameters: {
    theming: extractThemeVariables([moduleCss, themeVariablesScss], 'FormField'),
  },
} as Meta;

type StoryProps = React.ComponentProps<typeof FormField>;

const ControlledInput: React.FC<Omit<React.ComponentProps<typeof Input>, 'onChange'>> = ({
  value: initialValue,
  ...rest
}) => {
  const [value, setValue] = useState(initialValue || '');

  useEffect(() => {
    setValue(initialValue || '');
  }, [initialValue]);

  return <Input {...rest} value={value} onChange={setValue} />;
};

const Template: Story<StoryProps> = ({ error, ...props }) => (
  <FormField {...props} error={error}>
    <ControlledInput error={error} />
  </FormField>
);

const formStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 26,
  alignItems: 'stretch',
  maxWidth: 400,
};

const roles = [
  {
    value: 'DEV',
    label: 'Developper',
  },
  {
    value: 'SCM',
    label: 'Scrum master',
  },
  {
    value: 'DS',
    label: 'Designer',
  },
  {
    value: 'MAN',
    label: 'Manager',
  },
];

export const Default = Template.bind({});
Default.args = {
  label: 'Field Name',
  error: '',
  hint: '',
  hideLabel: false,
};

export const FormExample = () => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [numerics, setNumerics] = useState<Record<string, number>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (name: string) => (v: string) => {
    setValues((p) => ({
      ...p,
      [name]: v,
    }));
  };

  const handleNumericChange = (name: string) => (v: number | number[] | boolean) => {
    setNumerics((p) => ({
      ...p,
      [name]: Array.isArray(v) ? Number(v[0]) : Number(v),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = ['firstname', 'lastname', 'website', 'email', 'role', 'seats', 'newsletter'].reduce(
      (acc, val) => {
        if (!values[val]) {
          acc[val] = 'This field is required';
        }
        return acc;
      },
      {} as Record<string, string>
    );
    setErrors(err);
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <FormField label="First name" error={errors.firstname}>
        <Input onChange={handleChange('firstname')} value={values.firsname} />
      </FormField>
      <FormField label="Last name" error={errors.lastname}>
        <Input onChange={handleChange('lastname')} value={values.lastname} />
      </FormField>
      <FormField label="Web site" error={errors.website}>
        <InputGroup block>
          <InputContainerLabel>https://</InputContainerLabel>
          <Input onChange={handleChange('website')} value={values.website} block />
        </InputGroup>
      </FormField>
      <FormField
        label="Email"
        error={errors.email}
        hint="You will receive an email with a link to validate your address to activate your account"
      >
        <InputGroup block>
          <Input onChange={handleChange('email')} type="email" value={values.email} block />
          <InputContainerLabel>@gmail.com</InputContainerLabel>
        </InputGroup>
      </FormField>
      <FormField label="Role" error={errors.role}>
        <Select
          onChange={handleChange('role')}
          value={values.role}
          options={roles}
          placeholder="Choose a role"
        />
      </FormField>
      <FormField label="Seats" error={errors.seats}>
        <Slider
          value={numerics.seats}
          min={0}
          max={3}
          onChange={handleNumericChange('seats')}
          marks={1}
          valueText={`${numerics.seats || 0} / 3`}
        />
      </FormField>
      <FormField label="Subscription" error={errors.seats}>
        <div>
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
        </div>
      </FormField>
      <FormControlLabel
        label="Newsletter"
        hint="Fill in your e-mail address in order to stay tuned about our promotions and new products!"
        error={errors.newsletter}
      >
        <Checkbox checked={!!numerics.newsletter} onChange={handleNumericChange('newsletter')} />
      </FormControlLabel>

      <Button type="submit">Submit</Button>
    </form>
  );
};

/**
 * @storyDesc Add a ghint desceription with the `hint` prop.
 */
export const Hint = () => {
  return (
    <FormField label="Field with hint" hint="With an hint text">
      <Input />
    </FormField>
  );
};

/**
 * @storyDesc Just pass a string to the `error` props of the `FormField` component to put all of the sub components in their error state.
 */
export const ErrorState = () => {
  return (
    <FormField label="Error field" error="Oups" hint="With an hint text">
      <Input />
    </FormField>
  );
};

/**
 * @storyDesc For accessibility purpose, the `label` prop is mandatory.
 * However, you may sometime wan't to make it not visible by using the `hideLabel` prop.
 */
export const HiddenLabel = () => {
  return (
    <FormField label="mandatory label" hideLabel>
      <Input placeholder="The label in not visible" />
    </FormField>
  );
};

/**
 * @storyDesc All the passed props will be forwarded to the `FieldContainer` root component.
 * You can also pass some props to the `FieldLabel` and `FieldHint` sub-components with the `fieldLAbelProps` and `fieldHintProps` props.
 *
 * Alternatively, you can also recompose your own field by directly using each `FormField` sub-component.
 */
export const OverrideAndRecomposition = () => {
  return (
    <>
      <FormField
        hint="with an hint"
        label="Sub components override"
        style={{
          backgroundColor: 'lightblue',
          padding: 8,
        }}
        fieldLabelProp={{
          style: { backgroundColor: 'lightcoral' },
        }}
        fieldHintProps={{
          style: {
            backgroundColor: 'yellow',
          },
        }}
      >
        <Input />
      </FormField>
      <br />
      <FieldContainer
        style={{
          backgroundColor: 'lightblue',
          padding: 8,
        }}
      >
        <FieldLabel style={{ backgroundColor: 'lightcoral' }}>Recomposed field</FieldLabel>
        <Input />
        <FieldHint style={{ backgroundColor: 'yellow' }} hint="With an hint" />
      </FieldContainer>
    </>
  );
};
