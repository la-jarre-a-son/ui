import React, { useState, useEffect } from 'react';
import { Meta, Story } from '@storybook/react-webpack5';

import { extractThemeVariables } from '../../../.storybook/utils/Theming';

import moduleCss from '!!raw-loader!./Select.module.scss?raw';

import { FormField } from '../Form';
import Button from '../Button';
import Icon from '../Icon';
import { InputContainerLabel, Input } from '../Input';
import InputGroup from '../InputGroup';

import { Select, SelectOption, SelectTrigger } from '.';
import Divider from '../Divider';
import Checkbox from '../Checkbox';

export default {
  title: 'Components/Form/Select',
  component: Select,
  tags: ['autodocs'],
  subcomponents: {
    SelectOption,
  },
  parameters: {
    theming: extractThemeVariables(moduleCss, 'Select'),
  },
} as Meta;

type User = {
  image: string;
  value: string;
  label: string;
};

function user(label: string, value: number): User {
  return {
    image: `https://avatars.dicebear.com/api/miniavs/${label}.svg?background=%231CAAD9`,
    value: value.toString(),
    label,
  };
}

const options: User[] = [
  'Lleyton Hutton',
  'Inaaya Blaese',
  'Priyanka Stein',
  'Valentina Pearson',
  'Caitlan Atherton',
  'Petra Cole',
  'Shamima Gardiner',
  'Nabila Owens',
  'Hanifa Cabrera',
  'Gabriel Southern',
].map((name, i) => user(name, i));

type StoryProps = React.ComponentProps<typeof Select>;

const Template: Story<StoryProps> = ({ value, onChange, options, ...props }) => {
  const [user, setUser] = useState<string | undefined>(value || undefined);

  useEffect(() => {
    setUser(value || undefined);
  }, [value]);

  const handleChange = (newValue: string) => {
    setUser(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <>
      <FormField label="User">
        <Select value={user} onChange={handleChange} options={options} {...props} />
      </FormField>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  value: '',
  options,
  placeholder: 'Choose a user',
  disabled: false,
  block: false,
  error: '',
};

/**
 * @storyDesc Pass a renderInput function to customize how the select will be rendered.
 * It will receive some props for accessibility and handling trigger event, as well as the `selectedOption` and a `value` if an option is selected
 */
export const RenderInput = () => {
  const [user, setUser] = useState<string | undefined>();
  return (
    <Select
      value={user}
      onChange={setUser}
      options={options}
      renderInput={({ selectedOption, value, triggerRef, open }) => (
        <Button
          ref={triggerRef}
          left={
            <Icon
              name="fi fi-rr-angle-down"
              style={{
                transition: 'transform 200ms',
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          }
          right={value ? <Icon name="fi fi-rr-pencil" /> : ''}
        >
          {selectedOption?.label || 'Select user'}
        </Button>
      )}
    />
  );
};

/**
 * @storyDesc Pass a render function as a child of the `Select` to customize the way each option get rendered.
 * The function will receive as argument an object with an index property, and all the props normally passed to the current rendered option.
 */
export const RenderFunctionAsChild = () => {
  const [user, setUser] = useState<string | null>(null);

  return (
    <FormField label="User">
      <Select
        value={user}
        onChange={setUser}
        options={options}
        keepOpened
        renderInput={({ selectedOption, selectTriggerProps }) => {
          const val = selectedOption ? `You have selected ${selectedOption.label}` : '';
          return <SelectTrigger {...selectTriggerProps} placeholder="Choose a user" value={val} />;
        }}
      >
        {({ index, ...props }) => {
          const o = options[index];
          return (
            <SelectOption
              left={
                <>
                  <Icon name="fi fi-rr-user" />
                </>
              }
              key={o.value}
              value={o.value}
              onSelect={setUser}
              {...props}
            >
              {o.label}
            </SelectOption>
          );
        }}
      </Select>
    </FormField>
  );
};

/**
 * @storyDesc To allow selecting no option, add an empty option with `value === ''` or `value === null`.
 * The placeholder will be displayed in the input if the empty option has an empty label, otherwise the label will be displayed.
 */
export const AllowEmpty = () => {
  const [user, setUser] = useState<string | null>(null);

  return (
    <FormField label="Optional User">
      <Select
        value={user}
        onChange={setUser}
        options={[{ value: null, label: '-- Choose a user --' }, ...options]}
        placeholder="Choose a user"
      />
    </FormField>
  );
};

/**
 * @storyDesc The `Select` can be composed like any other input component.
 */
export const SelectInInputGroup = () => {
  const [user, setUser] = useState<string | undefined>();
  return (
    <FormField label="User">
      <InputGroup>
        <InputContainerLabel>Select a user</InputContainerLabel>
        <Select value={user} onChange={setUser} options={options} placeholder="Choose a user" />
      </InputGroup>
    </FormField>
  );
};

/**
 * @storyDesc > Advanced usage
 * You can pass any React node as a child for a fully controlled override
 */
export const CustomChildren = () => {
  const [user, setUser] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  const filtered = options.filter((o) =>
    o.label.toUpperCase().includes(search.toLocaleUpperCase())
  );

  const handleSelect = (v: string) => {
    setUser((p) => (p.includes(v) ? p.filter((val) => val !== v) : [...p, v]));
  };

  const selectedUsers = options.filter((o) => user.includes(o.value)).length;

  return (
    <FormField label="User">
      <Select
        dropdownProps={{
          // custom height limit
          limitHeight: 384,
          // reinit the filter on open
          onOpen: () => {
            setSearch('');
          },
          disableAutoFocus: true,
        }}
        placeholder="Choose a user"
        navOptions={{
          itemQuerySelector: '[role="option"], input',
          disableSearchNav: true,
        }}
        options={options}
        renderInput={({ selectTriggerProps }) => (
          <SelectTrigger
            {...selectTriggerProps}
            value={selectedUsers ? `${selectedUsers} users selected` : undefined}
          />
        )}
        listProps={{
          style: { display: 'flex', flexDirection: 'column' },
          as: 'div',
        }}
        keepOpened
      >
        <>
          <div>
            <div style={{ padding: 12 }}>
              <Input
                placeholder="Search"
                block
                aria-label="Search"
                left={<Icon name="fi fi-rr-search" />}
                onChange={setSearch}
                autoFocus
              />
            </div>
            <Divider />
          </div>
          <ul style={{ overflowY: 'scroll', flexGrow: 1 }}>
            {filtered.map((o) => (
              <SelectOption
                key={o.value}
                value={o.value}
                onSelect={() => handleSelect(o.value)}
                selected={user.includes(o.value)}
                left={<Checkbox as="span" checked={user.includes(o.value)} />}
              >
                {o.label}
              </SelectOption>
            ))}
          </ul>
        </>
      </Select>
    </FormField>
  );
};
