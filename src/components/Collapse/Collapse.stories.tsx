import React, { Fragment, useEffect, useState } from 'react';
import { Meta, Story } from '@storybook/react';

import { extractThemeVariables } from '../../../.storybook/utils/Theming';

import moduleCss from '!!raw-loader!./Collapse.module.scss?raw';
import themeVariablesScss from '!!raw-loader!../../theme/jar/variables/Collapse.scss?raw';

import Button from '../Button';
import Divider from '../Divider';
import Icon from '../Icon';
import { List, ListItem } from '../List';
import Box from '../Box';

import { Collapse } from '.';

export default {
  title: 'Components/Layout/Collapse',
  component: Collapse,
  tags: ['autodocs'],
  parameters: {
    theming: extractThemeVariables([moduleCss, themeVariablesScss], 'Collapse'),
  },
} as Meta;

type StoryProps = React.ComponentProps<typeof Collapse>;

const Template: Story<StoryProps> = ({ open: initialOpen, ...props }) => {
  const [open, setOpen] = useState(initialOpen);

  useEffect(() => {
    setOpen(initialOpen);
  }, [initialOpen]);

  return (
    <>
      <Button onClick={() => setOpen((d) => !d)}>{open ? 'hide' : 'show'}</Button>
      <Collapse {...props} open={open} style={{ marginTop: 8 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Collapse>
    </>
  );
};
export const Default = Template.bind({});
Default.args = {
  open: false,
  collapsedHeight: 0,
  keepMounted: false,
};

/**
 * @storyDesc use the `collapsedHeight` and `keepMounted` props to partially releave the collapse content.
 */
export const CollapseHeight = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Collapse
        open={open}
        keepMounted
        collapsedHeight={40}
        style={{
          WebkitMaskImage: open
            ? undefined
            : 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))',
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Collapse>
      <br />
      <Button variant="ghost" onClick={() => setOpen((p) => !p)}>
        {open ? 'Show less' : 'Show more'}
      </Button>
    </>
  );
};

/**
 * @storyDesc The `Collapse` can serve à se base component to compose some commons ui patterns.
 */
export const CollapseMenu = () => {
  const [open, setOpen] = useState<string | null>(null);

  const handleClick = (id: string) => () => {
    setOpen((p) => (p === id ? null : id));
  };

  return (
    <Box as={List} hideOverflow>
      {['1', '2', '3', '4'].map((id, i) => (
        <Fragment key={id}>
          {i > 0 && <Divider />}
          <ListItem
            interactive
            as="button"
            onClick={handleClick(id)}
            right={
              open === id ? <Icon name="fi fi-rr-angle-up" /> : <Icon name="fi fi-rr-angle-down" />
            }
          >
            <strong>{`Menu ${id}`}</strong>
          </ListItem>
          <Collapse open={open === id}>
            <List>
              {['A', 'B', 'C'].map((subId) => (
                <ListItem key={subId} interactive as="a" href="https://ljas.fr">
                  {`Menu ${id}${subId}`}
                </ListItem>
              ))}
            </List>
          </Collapse>
        </Fragment>
      ))}
    </Box>
  );
};
