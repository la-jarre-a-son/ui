import React from 'react';
import { Meta, Story } from '@storybook/react';

import { extractThemeVariables } from '../../../.storybook/utils/Theming';

import moduleCss from '!!raw-loader!./ButtonGroup.module.scss?raw';
import themeVariablesScss from '!!raw-loader!../../theme/jar/variables/ButtonGroup.scss?raw';

import Button from '../Button';
import Icon from '../Icon';
import { Menu, MenuItem } from '../Menu';
import StateButton from '../StateButton';
import Divider from '../Divider';

import { ButtonGroup } from '.';

export default {
  title: 'components/Button/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  parameters: {
    theming: extractThemeVariables([moduleCss, themeVariablesScss], 'ButtonGroup'),
  },
} as Meta;

type StoryProps = React.ComponentProps<typeof ButtonGroup>;

const randomPromiseClickHandler = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve('Success');
      } else {
        reject(new Error('Failed'));
      }
    }, 2000);
  });
};

const Template: Story<StoryProps> = (props) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
    }}
  >
    <ButtonGroup {...props}>
      <Button variant="outlined">Button</Button>
      <Button variant="outlined">Long text Button</Button>
      <Button variant="outlined">Button</Button>
      <Button variant="outlined">Button</Button>
    </ButtonGroup>
    <ButtonGroup {...props}>
      <Button variant="filled">Button</Button>
      <Button variant="filled">Long text Button</Button>
      <Button variant="filled">Button</Button>
      <Button variant="filled">Button</Button>
    </ButtonGroup>
    <ButtonGroup {...props}>
      <Button variant="ghost">Button</Button>
      <Button variant="ghost">Button</Button>
      <Button variant="ghost">Button</Button>
      <Button variant="ghost">Button</Button>
    </ButtonGroup>
    <ButtonGroup {...props}>
      <StateButton onClick={randomPromiseClickHandler} variant="filled">
        Button
      </StateButton>
      <StateButton onClick={randomPromiseClickHandler} variant="filled">
        Long text Button
      </StateButton>
      <StateButton onClick={randomPromiseClickHandler} variant="filled">
        Button
      </StateButton>
      <StateButton onClick={randomPromiseClickHandler} variant="filled">
        Button
      </StateButton>
    </ButtonGroup>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  direction: 'horizontal',
  stretch: false,
  block: false,
};

export const CreateButtonExample = () => {
  return (
    <ButtonGroup>
      <Button left={<Icon name="fa-solid fa-cloud-arrow-up" />}>Upload 3D model</Button>
      <Menu
        trigger={
          <Button>
            <Icon name="fa-solid fa-plus" />
          </Button>
        }
      >
        <MenuItem>Create project</MenuItem>
        <MenuItem>Create folder</MenuItem>
        <Divider />
        <MenuItem>Create 3D material</MenuItem>
        <MenuItem>Upload 3D model</MenuItem>
      </Menu>
    </ButtonGroup>
  );
};
