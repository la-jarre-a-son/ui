import React from 'react';
import { Meta } from '@storybook/react';

import { extractThemeVariables } from '../../../.storybook/utils/Theming';

import moduleCss from '!!raw-loader!./Breadcrumb.module.scss?raw';
import themeVariablesScss from '!!raw-loader!../../theme/jar/variables/Breadcrumb.scss?raw';

import Icon from '../Icon';
import { Menu, MenuItem } from '../Menu';

import { Breadcrumb, BreadcrumbItem } from '.';

export default {
  title: 'Components/Navigation/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  subcomponents: {
    BreadcrumbItem,
  },
  parameters: {
    theming: extractThemeVariables([moduleCss, themeVariablesScss], 'Breadcrumb'),
  },
} as Meta;

export const Default = () => {
  return (
    <Breadcrumb>
      <BreadcrumbItem aria-label="Home">
        <Icon name="fa-solid fa-house" />
      </BreadcrumbItem>
      <BreadcrumbItem>Organization</BreadcrumbItem>
      <BreadcrumbItem>Models</BreadcrumbItem>
      <BreadcrumbItem current>
        Detail
        <Icon name="fa-solid fa-magnifying-glass" />
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

/**
 * @storyDesc Use the `Breadcrumb` with a `Menu` to compose a condensed breadcrumb pattern.
 */
export const Condensed = () => {
  return (
    <Breadcrumb>
      <BreadcrumbItem aria-label="Home">
        <Icon name="fa-solid fa-house" />
      </BreadcrumbItem>
      <Menu
        dropdownProps={{
          placement: 'bottom-start',
        }}
        trigger={
          <BreadcrumbItem aria-label="more breadcrumbs">
            <Icon name="fa-solid fa-ellipsis" />
          </BreadcrumbItem>
        }
      >
        <MenuItem>Project 1</MenuItem>
        <MenuItem>Project 2</MenuItem>
        <MenuItem>Project 3</MenuItem>
        <MenuItem>Project 4</MenuItem>
        <MenuItem>Project 5</MenuItem>
      </Menu>
      <BreadcrumbItem current>Project 6</BreadcrumbItem>
    </Breadcrumb>
  );
};
