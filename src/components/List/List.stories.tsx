import React from 'react';
import { Meta } from '@storybook/react';

import { extractThemeVariables } from '../../../.storybook/utils/Theming';

import moduleCss from '!!raw-loader!./List.module.scss?raw';
import themeVariablesScss from '!!raw-loader!../../theme/jar/variables/List.scss?raw';

import Divider from '../Divider';
import Card from '../Card';

import { List, ListItem, ListGroup } from '.';

export default {
  title: 'components/Data/List',
  component: List,
  tags: ['autodocs'],
  subcomponents: {
    ListItem,
  },
  parameters: {
    theming: extractThemeVariables([moduleCss, themeVariablesScss], 'List'),
  },
} as Meta;

export const Default = () => {
  return (
    <List>
      <ListItem>View profile</ListItem>
      <ListItem>Switch to personnal account</ListItem>
      <ListItem>Account settings</ListItem>
      <Divider />
      <ListItem>Company profile</ListItem>
      <ListItem>Organization #A</ListItem>
      <ListItem>Organization #B</ListItem>
      <ListItem>Organization #C</ListItem>
      <Divider />
      <ListItem>Switch theme</ListItem>
      <ListItem>Help center</ListItem>
      <ListItem disabled>Contact support</ListItem>
      <Divider />
      <ListItem>Log out</ListItem>
    </List>
  );
};

/**
 * @storyDesc By default, `ListItem` are uninteractive.
 * Adding the `interactive` boolean prop to them will add some interactive styles to them.
 */
export const InteractiveItems = () => {
  return (
    <List>
      <ListItem interactive>Interactive item</ListItem>
      <ListItem interactive selected>
        Selected interactive item
      </ListItem>
      <ListItem interactive disabled>
        Disabled interactive item
      </ListItem>
      <ListItem interactive selected disabled>
        Disabled selected interactive item
      </ListItem>
    </List>
  );
};

/**
 * @storyDesc You can group items into sections with an header
 */
export const ListGroups = () => {
  return (
    <List>
      <ListItem>View profile</ListItem>
      <ListItem>Switch to personnal account</ListItem>
      <ListItem>Account settings</ListItem>
      <Divider />
      <ListGroup header="Organizations">
        <ListItem>Company profile</ListItem>
        <ListItem>Organization #A</ListItem>
        <ListItem>Organization #B</ListItem>
        <ListItem>Organization #C</ListItem>
      </ListGroup>
      <Divider />
      <ListGroup header="Settings">
        <ListItem>Switch theme</ListItem>
        <ListItem>Help center</ListItem>
        <ListItem disabled>Contact support</ListItem>
      </ListGroup>
      <Divider />
      <ListItem>Log out</ListItem>
    </List>
  );
};

/**
 * @storyDesc Use the `as` prop to override the root elements to use.
 * The `as` prop value can be an HTML element or a React component.
 */
export const WithAsProps = () => {
  return (
    <List as={Card} hideOverflow outlined>
      <ListItem interactive role="menuitem" as="a" href="https://reactjs.org/" target="_blank">
        React
      </ListItem>
      <ListItem
        interactive
        role="menuitem"
        as="a"
        href="https://www.typescriptlang.org/"
        target="_blank"
      >
        Typescript
      </ListItem>
      <ListItem
        interactive
        role="menuitem"
        as="a"
        href="https://www.w3.org/WAI/ARIA/apg/"
        target="_blank"
      >
        W3C
      </ListItem>
      <ListItem interactive role="menuitem" as="a" target="_blank" disabled>
        Some disabled link
      </ListItem>
    </List>
  );
};
