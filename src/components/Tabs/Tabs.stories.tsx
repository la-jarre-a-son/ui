import React, { useState, useEffect } from 'react';
import { Meta, Story } from '@storybook/react';

import { extractThemeVariables } from '../../../.storybook/utils/Theming';

import moduleTabListCss from '!!raw-loader!./Tabs.module.scss?raw';
import themeVariablesScss from '!!raw-loader!../../theme/jar/variables/Tabs.scss?raw';

import Button from '../Button';
import Badge from '../Badge';
import Icon from '../Icon';
import Tooltip from '../Tooltip';
import Stack from '../Stack';

import { TabList, Tab, TabPanel, TabProvider } from '.';

export default {
  title: 'Components/Navigation/TabList',
  component: TabList,
  tags: ['autodocs'],
  subcomponents: {
    Tab,
    TabPanel,
    TabProvider,
  },
  parameters: {
    theming: extractThemeVariables([moduleTabListCss, themeVariablesScss], 'Tab'),
  },
} as Meta;

type StoryProps = React.ComponentProps<typeof TabList>;

export const Default: Story<StoryProps> = ({
  selected: initialSelected,
  onChange,
  ...otherProps
}) => {
  const [selected, setSelected] = useState<string | undefined>(initialSelected);

  useEffect(() => setSelected(initialSelected), [initialSelected]);

  const handleChange = (id: string) => {
    setSelected(id);
    if (onChange) onChange(id);
  };

  return (
    <TabList {...otherProps} selected={selected} onChange={handleChange}>
      <Tab
        id="0"
        right={
          <Badge intent="warning" size="md">
            2
          </Badge>
        }
      >
        Tab 0 with a badge
      </Tab>
      <Tab id="1">Tab 1</Tab>
      <Tab id="2">Tab 2</Tab>
      <Tab id="3" left={<Icon name="fa-solid fa-envelope" />}>
        Tab 3 with an icon and a long text
      </Tab>
      <Tab id="4">Tab 4</Tab>
      <Tab id="5">Tab 5</Tab>
      <Tab id="6">Tab 3</Tab>
      <Tab id="7">Tab 7</Tab>
      <Tab id="8">Tab 8</Tab>
      <Tab id="9">Last Tab</Tab>
    </TabList>
  );
};
Default.args = {
  'aria-label': 'tabs example',
  variant: 'filled',
  direction: 'horizontal',
  size: 'md',
  block: true,
  stretch: false,
  selected: '8',
};

/**
 * @storyDesc By default, the `TabList` as an horizontal orientation. You can change this with the `direction` prop.
 */
export const HorizontalTabs: Story<StoryProps> = ({ selected: initialSelected }) => {
  const [selected, setSelected] = useState(initialSelected);
  return (
    <div style={{ display: 'flex', gap: 32, flexDirection: 'column' }}>
      <TabList
        aria-label="tabs example"
        selected={selected}
        onChange={setSelected}
        variant="filled"
      >
        <Tab
          id="0"
          right={
            <Badge intent="warning" size="md">
              2
            </Badge>
          }
        >
          My Details
        </Tab>
        <Tab id="1">Profile</Tab>
        <Tab id="3">Password</Tab>
        <Tab id="4">Team</Tab>
        <Tab id="5">Plan</Tab>
        <Tab id="6">Billing</Tab>
        <Tab id="7" left={<Icon name="fa-solid fa-envelope" />}>
          Email
        </Tab>
      </TabList>
      <TabList
        aria-label="tabs example"
        selected={selected}
        onChange={setSelected}
        variant="outlined"
      >
        <Tab
          id="0"
          right={
            <Badge intent="warning" size="md">
              2
            </Badge>
          }
        >
          My Details
        </Tab>
        <Tab id="1">Profile</Tab>
        <Tab id="3">Password</Tab>
        <Tab id="4">Team</Tab>
        <Tab id="5">Plan</Tab>
        <Tab id="6">Billing</Tab>
        <Tab id="7" left={<Icon name="fa-solid fa-envelope" />}>
          Email
        </Tab>
      </TabList>
      <TabList aria-label="tabs example" selected={selected} onChange={setSelected} variant="ghost">
        <Tab
          id="0"
          right={
            <Badge intent="warning" size="md">
              2
            </Badge>
          }
        >
          My Details
        </Tab>
        <Tab id="1">Profile</Tab>
        <Tab id="3">Password</Tab>
        <Tab id="4">Team</Tab>
        <Tab id="5">Plan</Tab>
        <Tab id="6">Billing</Tab>
        <Tab id="7" left={<Icon name="fa-solid fa-envelope" />}>
          Email
        </Tab>
      </TabList>
    </div>
  );
};

export const VerticalTabs: Story<{ selected: string }> = ({ selected: initialSelected }) => {
  const [selected, setSelected] = useState(initialSelected);
  return (
    <div style={{ display: 'flex', gap: 32, overflow: 'hidden', height: '200px' }}>
      <TabList
        aria-label="tabs example"
        direction="vertical"
        selected={selected}
        onChange={setSelected}
        variant="ghost"
      >
        <Tab
          id="0"
          right={
            <Badge intent="warning" size="md">
              2
            </Badge>
          }
        >
          My Details
        </Tab>
        <Tab id="1">Profile</Tab>
        <Tab id="3">Password</Tab>
        <Tab id="4">Team</Tab>
        <Tab id="5">Plan</Tab>
        <Tab id="6">Billing</Tab>
        <Tab id="7" left={<Icon name="fa-solid fa-envelope" />}>
          Email
        </Tab>
      </TabList>
      <TabList
        aria-label="tabs example"
        direction="vertical"
        selected={selected}
        onChange={setSelected}
        variant="outlined"
      >
        <Tab
          id="0"
          right={
            <Badge intent="warning" size="md">
              2
            </Badge>
          }
        >
          My Details
        </Tab>
        <Tab id="1">Profile</Tab>
        <Tab id="3">Password</Tab>
        <Tab id="4">Team</Tab>
        <Tab id="5">Plan</Tab>
        <Tab id="6">Billing</Tab>
        <Tab id="7" left={<Icon name="fa-solid fa-envelope" />}>
          Email
        </Tab>
      </TabList>
      <TabList
        aria-label="tabs example"
        direction="vertical"
        selected={selected}
        onChange={setSelected}
        variant="filled"
      >
        <Tab
          id="0"
          right={
            <Badge intent="warning" size="md">
              2
            </Badge>
          }
        >
          My Details
        </Tab>
        <Tab id="1">Profile</Tab>
        <Tab id="3">Password</Tab>
        <Tab id="4">Team</Tab>
        <Tab id="5">Plan</Tab>
        <Tab id="6">Billing</Tab>
        <Tab id="7" left={<Icon name="fa-solid fa-envelope" />}>
          Email
        </Tab>
      </TabList>
    </div>
  );
};

VerticalTabs.args = {
  selected: '6',
};

/**
 * @storyDesc Use the `stretch` prop to have the tab having same width.
 */
export const StretchTabs = () => {
  const [selected, setSelected] = useState('0');
  return (
    <div style={{ display: 'flex', gap: 32, flexDirection: 'column' }}>
      <TabList
        aria-label="tabs example"
        stretch
        selected={selected}
        onChange={setSelected}
        variant="ghost"
      >
        <Tab
          id="0"
          right={
            <Badge intent="warning" size="md">
              2
            </Badge>
          }
        >
          My Details
        </Tab>
        <Tab id="1">Profile</Tab>
        <Tab id="3">Password</Tab>
        <Tab id="4">Team</Tab>
        <Tab id="5">Plan</Tab>
        <Tab id="6">Billing</Tab>
        <Tab id="7" left={<Icon name="fa-solid fa-envelope" />}>
          Email
        </Tab>
      </TabList>
      <TabList
        aria-label="tabs example"
        stretch
        selected={selected}
        onChange={setSelected}
        variant="ghost"
      >
        <Tab
          id="0"
          right={
            <Badge intent="warning" size="md">
              2
            </Badge>
          }
        >
          My Details
        </Tab>
        <Tab id="1">Profile</Tab>
        <Tab id="3">Password</Tab>
        <Tab id="4">Team</Tab>
      </TabList>
      <TabList
        aria-label="tabs example"
        stretch
        selected={selected}
        onChange={setSelected}
        variant="filled"
      >
        <Tab
          id="0"
          right={
            <Badge intent="warning" size="md">
              2
            </Badge>
          }
        >
          My Details
        </Tab>
        <Tab id="1">Profile</Tab>
      </TabList>
    </div>
  );
};

/**
 * @storyDesc You can composed the `Tab` with other components.
 */
export const TabsComposed = () => {
  const [selected, setSelected] = useState('0');

  return (
    <TabList
      selected={selected}
      onChange={setSelected}
      aria-label="tabs composed example"
      variant="filled"
    >
      <Tooltip content="My favorites">
        <Tab id="0">
          <Icon name="fa-solid fa-star" />
        </Tab>
      </Tooltip>
      <Tooltip content="My messages">
        <Tab id="1">
          <Icon name="fa-solid fa-envelope" />
        </Tab>
      </Tooltip>
      <Tooltip content="My messages">
        <Tab id="3">
          <Icon name="fa-solid fa-cog" />
        </Tab>
      </Tooltip>
    </TabList>
  );
};

const content =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
const content2 =
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?';

/**
 * @storyDesc Using tabs for a tab/panel pattern, you can use the `TabProvider` component to automatically link tabs with their panels and manage the selection state.
 */
export const AccessiblePanels = () => {
  return (
    <TabProvider>
      <TabList aria-label="tabs example" variant="filled">
        <Tab
          right={
            <Badge intent="warning" size="md">
              2
            </Badge>
          }
        >
          My Details
        </Tab>
        <Tab>Profile</Tab>
      </TabList>
      <TabPanel style={{ padding: '28px 8px' }}>{content}</TabPanel>
      <TabPanel style={{ padding: '28px 8px' }}>{content2}</TabPanel>
    </TabProvider>
  );
};

/**
 * @storyDesc Linking between tabs and panels with the `TabProvider` is done only once on first mount.
 * In case you need to dynamically add more tabs/panel, you need to use the `bindIds` function exposed by the `TabProvider` to force a new linking.
 */
export const DynamicAccessiblePanels = () => {
  const [tabNumber, setTabNumber] = useState(3);

  const iterator = new Array(tabNumber).fill(undefined).map((_, i) => i);

  return (
    <TabProvider>
      {({ bindIds }) => (
        <>
          <Stack style={{ margin: '16px 0' }}>
            <Button
              type="button"
              intent="success"
              onClick={() => {
                setTabNumber((p) => p + 1);

                // We need to call the bindIds function after a new tab has been
                // rendered to make sure ids are bound with his panel
                setTimeout(bindIds, 0);
              }}
            >
              Add a tab
            </Button>
            <TabList aria-label="tabs example" variant="filled">
              {iterator.map((i) => (
                <Tab key={i}>{`Tab n°${i}`}</Tab>
              ))}
            </TabList>
          </Stack>
          {iterator.map((i) => (
            <TabPanel key={i}>{`Panel content n°${i}`}</TabPanel>
          ))}
        </>
      )}
    </TabProvider>
  );
};
