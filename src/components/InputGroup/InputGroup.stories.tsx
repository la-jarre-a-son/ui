import React, { useState, useEffect } from 'react';
import { Meta, Story } from '@storybook/react';

import { extractThemeVariables } from '../../../.storybook/utils/Theming';

import moduleCss from '!!raw-loader!./InputGroup.module.scss?raw';

import Button from '../Button';
import Icon from '../Icon';
import { FormField } from '../Form';
import { InputContainerLabel, Input } from '../Input';
import Tooltip from '../Tooltip';
import Stack from '../Stack';

import { InputGroup } from '.';

export default {
  title: 'components/Form/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  subcomponents: {
    InputContainerLabel,
  },
  parameters: {
    theming: extractThemeVariables(moduleCss, 'InputGroup'),
  },
} as Meta;

type StoryProps = React.ComponentProps<typeof InputGroup>;

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

const Template: Story<StoryProps> = ({ ...rest }) => (
  <FormField label="Website URL">
    <InputGroup {...rest}>
      <InputContainerLabel>
        <Icon name="fa-solid fa-check" />
        <span>https://</span>
      </InputContainerLabel>
      <ControlledInput value="ljas.fr" />
      <Tooltip content="blabla blabla bla bla blablabla">
        <InputContainerLabel>
          <Icon name="fa-solid fa-circle-info" aria-label="info" />
        </InputContainerLabel>
      </Tooltip>
      <Button size="md">Verify</Button>
    </InputGroup>
  </FormField>
);

export const Default = Template.bind({});
Default.args = {
  direction: 'horizontal',
  stretch: false,
  block: false,
};

/**
 * @storyDesc Use the `as` prop to implement the needed ui pattern, like, for example, a fieldset.
 */
export const FieldSet = () => {
  return (
    <InputGroup as="fieldset">
      <InputContainerLabel as="legend">My Legend</InputContainerLabel>
      <Input aria-label="Input A" placeholder="Input A" />
      <Input aria-label="Input B" placeholder="Input B" />
      <Button size="md">Submit</Button>
    </InputGroup>
  );
};

/**
 * @storyDesc You can change the input sizes in the Inputgroup
 */
export const InputSizes = () => {
  return (
    <Stack direction="vertical" gap="md">
      <FormField label="Website URL">
        <InputGroup>
          <InputContainerLabel size="sm">
            <span>https://</span>
          </InputContainerLabel>
          <ControlledInput value="ljas.fr" size="sm" />
          <Button size="sm">Verify</Button>
        </InputGroup>
      </FormField>

      <FormField label="BIG SEARCH">
        <InputGroup block>
          <InputContainerLabel size="lg">
            <Icon name="fa-solid fa-search" />
          </InputContainerLabel>
          <ControlledInput value="Cassettes" size="lg" block />
          <Button size="lg" style={{ flexShrink: 0 }}>
            Search
          </Button>
        </InputGroup>
      </FormField>
    </Stack>
  );
};
