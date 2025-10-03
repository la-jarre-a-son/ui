import React, { useCallback, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';

import { extractThemeVariables } from '../../../.storybook/utils/Theming';

import moduleCss from '!!raw-loader!./Menu.module.scss?raw';
import themeVariablesScss from '!!raw-loader!../../theme/jar/variables/Menu.scss?raw';

import Button from '../Button';
import { CardHeader } from '../Card';
import Dot from '../Dot';
import Divider from '../Divider';
import Icon from '../Icon';
import Box from '../Box';
import Typography from '../Typography';

import { Menu, MenuGroup, MenuItem, MenuItemRadio, MenuItemCheckbox, SubMenu } from '.';

export default {
  title: 'components/Navigation/Menu',
  component: Menu,
  tags: ['autodocs'],
  subcomponents: {
    MenuItem,
    MenuItemCheckbox,
    MenuItemRadio,
    SubMenu,
    Box,
  },
  parameters: {
    theming: extractThemeVariables([moduleCss, themeVariablesScss], 'Menu'),
  },
} as Meta;

export const Default: StoryObj<typeof Menu> = {
  render: (props) => {
    return (
      <Menu trigger={<Button>open menu</Button>} {...props}>
        <MenuItem value="item1">Menu Item 1</MenuItem>
        <MenuGroup header="Category">
          <MenuItem value="item2">Menu Item 2</MenuItem>
          <MenuItem value="item3">Menu Item 3</MenuItem>
        </MenuGroup>
      </Menu>
    );
  },
  args: {
    open: undefined,
    value: '',
  },
};

Default.argTypes = {
  value: { control: { type: 'select', options: ['', 'item1', 'item2', 'item3'] } },
};

export const MenuButton = () => {
  return (
    <Menu trigger={<Button>open menu</Button>}>
      <MenuItem>View profile</MenuItem>
      <MenuItem>Switch to personal account</MenuItem>
      <MenuItem>Account settings</MenuItem>
      <Divider />
      <MenuItem>Company profile</MenuItem>
      <MenuItem right={<Dot intent="success" active />}>Organization #A</MenuItem>
      <MenuItem>Organization #B</MenuItem>
      <MenuItem>Organization #C</MenuItem>
      <Divider />
      <MenuItem>Switch theme</MenuItem>
      <MenuItem>Help center</MenuItem>
      <MenuItem>Contact support</MenuItem>
      <Divider />
      <MenuItem>Log out</MenuItem>
    </Menu>
  );
};

export const NavMenu = () => {
  return (
    <Menu trigger={<Button>Nav menu</Button>}>
      <MenuGroup header={'Page'}>
        <MenuItem as="a" href="/" selected aria-current="page">
          Menu Stories
        </MenuItem>
      </MenuGroup>
      <Divider />
      <MenuGroup header={'Programming languages'}>
        <MenuItem as="a" href="https://www.rust-lang.org/" target="_blank">
          Rust
        </MenuItem>
        <MenuItem as="a" href="https://www.typescriptlang.org/" target="_blank">
          Typescript
        </MenuItem>
        <MenuItem as="a" href="https://go.dev/" target="_blank">
          Go
        </MenuItem>
      </MenuGroup>
    </Menu>
  );
};

const options: Option[] = new Array(8).fill(undefined).map((_, i) => ({
  value: i.toString(),
  label: `Menu Option n°${i}`,
}));

type Option = {
  value: string;
  label: string;
};

export const MenuSelect = () => {
  const [selected, setSelected] = useState<string>();

  const selectedLabel = options.find((o) => o.value === selected)?.label || 'Select an option';

  return (
    <Menu value={selected} onChange={setSelected} trigger={<Button>{selectedLabel}</Button>}>
      {options.map((o) => (
        <MenuItem
          value={o.value}
          key={o.value}
          right={o.value === selected ? <Icon name="fi fi-rr-check" /> : null}
        >
          {o.label}
        </MenuItem>
      ))}
    </Menu>
  );
};

/**
 * @storyDesc [🛑 Experimental] Not ready for production
 */
export const NestedMenus = () => {
  return (
    <Menu trigger={<Button>open menu</Button>}>
      <MenuItem>View profile</MenuItem>
      <SubMenu text="Profile" right={<Icon name="fi fi-rr-star" />}>
        <MenuItem>Personal profile</MenuItem>
        <MenuItem>Company profile</MenuItem>
      </SubMenu>
      <SubMenu text="Organizations">
        <MenuItem>Organization #A</MenuItem>
        <MenuItem>Organization #B</MenuItem>
      </SubMenu>
      <SubMenu text="Actions">
        <MenuItem right={<Icon name="fi fi-rr-edit" />}>Edit</MenuItem>
        <MenuItem right={<Icon name="fi fi-rr-trash" />}>Delete</MenuItem>
        <MenuItem right={<Icon name="fi fi-rr-duplicate" />}>Duplicate</MenuItem>
      </SubMenu>
    </Menu>
  );
};

export const MenuHover = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), [setOpen]);
  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  return (
    <div onMouseEnter={handleOpen} onMouseLeave={handleClose} style={{ width: 'fit-content' }}>
      <Menu open={open} onClose={handleClose} onOpen={handleOpen} trigger={<span>TRIGGER</span>}>
        <CardHeader>
          <div>
            <Typography>Nicolas Cage</Typography>
            <Typography intent="subtle">La Jarre à Son</Typography>
          </div>
        </CardHeader>
        <Divider />
        <MenuGroup>
          <MenuItem>View profile</MenuItem>
          <MenuItem>Switch to personnal account</MenuItem>
          <MenuItem>Account settings</MenuItem>
        </MenuGroup>
        <Divider />
        <MenuGroup>
          <MenuItem>Company profile</MenuItem>
          <MenuItem>Organization #A</MenuItem>
          <MenuItem>Organization #B</MenuItem>
          <MenuItem>Organization #C</MenuItem>
        </MenuGroup>
        <Divider />
        <MenuGroup>
          <MenuItem>Switch theme</MenuItem>
          <MenuItem>Help center</MenuItem>
          <MenuItem>Contact support</MenuItem>
        </MenuGroup>
        <Divider />
        <MenuItem>Log out</MenuItem>
      </Menu>
    </div>
  );
};

export const MenuRadio = () => {
  const [value, setValue] = useState<string>();
  return (
    <>
      <p>{`Selected value: ${value || ''}`}</p>
      <Menu trigger={<Button>Sort by</Button>} value={value} onChange={setValue}>
        <MenuItemRadio value="1">choice 1</MenuItemRadio>
        <MenuItemRadio value="2">choice 2</MenuItemRadio>
        <MenuItemRadio value="3">choice 3</MenuItemRadio>
      </Menu>
    </>
  );
};

export const MenuCheckbox = () => {
  const [value, setValue] = useState<string[]>([]);
  return (
    <>
      <p>{`Selected values: ${value.join(', ')}`}</p>
      <Menu trigger={<Button>Select some values</Button>} value={value} onChange={setValue}>
        <MenuItemCheckbox value="1">choice 1</MenuItemCheckbox>
        <MenuItemCheckbox value="2">choice 2</MenuItemCheckbox>
        <MenuItemCheckbox value="3">choice 3</MenuItemCheckbox>
      </Menu>
    </>
  );
};

export const MenuSwitch = () => {
  const [value, setValue] = useState<string[]>([]);
  return (
    <>
      <p>{`Selected values: ${value.join(', ')}`}</p>
      <Menu trigger={<Button>Select some values</Button>} value={value} onChange={setValue}>
        <MenuItemCheckbox value="1" variant="switch">
          choice 1
        </MenuItemCheckbox>
        <MenuItemCheckbox value="2" variant="switch">
          choice 2
        </MenuItemCheckbox>
        <MenuItemCheckbox value="3" variant="switch">
          choice 3
        </MenuItemCheckbox>
      </Menu>
    </>
  );
};

export const MenuMixed = () => {
  const [enable, setEnable] = useState(false);
  const [lang, setLang] = useState<string>('EN');

  const bindLang = (l: string) => ({
    onClick: () => setLang(l),
    checked: l === lang,
  });

  return (
    <Menu trigger={<Button>menu</Button>}>
      <MenuGroup header="Navigation">
        <MenuItem left={<Icon name="fi fi-rr-user" />}>Profile</MenuItem>
        <MenuItem left={<Icon name="fi fi-rr-file" />}>Account</MenuItem>
      </MenuGroup>
      <Divider />
      <MenuGroup header="Theme">
        <MenuItemCheckbox checked={enable} variant="switch" onClick={() => setEnable((p) => !p)}>
          Dark mode
        </MenuItemCheckbox>
      </MenuGroup>
      <Divider />
      <MenuGroup header="Language">
        <MenuItemRadio {...bindLang('FR')}>FR</MenuItemRadio>
        <MenuItemRadio {...bindLang('EN')}>EN</MenuItemRadio>
        <MenuItemRadio {...bindLang('IT')}>IT</MenuItemRadio>
      </MenuGroup>
    </Menu>
  );
};
