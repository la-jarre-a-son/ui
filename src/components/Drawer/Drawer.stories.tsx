import React, { useState, useEffect } from 'react';
import { Meta, Story } from '@storybook/react';

import { extractThemeVariables } from '../../../.storybook/utils/Theming';

import moduleCss from '!!raw-loader!./Drawer.module.scss?raw';
import themeVariablesScss from '!!raw-loader!../../theme/jar/variables/Drawer.scss?raw';

import Button from '../Button';
import Typography from '../Typography';

import { Drawer, DrawerPlacement } from '.';

export default {
  title: 'Components/Layout/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    theming: extractThemeVariables([moduleCss, themeVariablesScss], 'Drawer'),
  },
} as Meta;

type StoryProps = React.ComponentProps<typeof Drawer>;

const Template: Story<StoryProps> = ({
  open: originalOpen,
  'aria-label': ariaLabel,
  onClose,
  ...otherProps
}) => {
  const [open, setOpen] = useState(originalOpen);

  useEffect(() => {
    setOpen(originalOpen);
  }, [originalOpen]);

  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };
  return (
    <Drawer aria-label={ariaLabel} open={open} onClose={handleClose} {...otherProps}>
      <Typography>In the drawer</Typography>
    </Drawer>
  );
};

export const Default = Template.bind({});
Default.args = {
  open: false,
  noOverlay: false,
  position: 'left',
  'aria-label': 'test drawer',
};

export const Interactive = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open left</Button>
      <Drawer aria-label="test drawer" open={open} onClose={() => setOpen(false)}>
        <Typography>In the drawer</Typography>
      </Drawer>
    </>
  );
};

/**
 * @storyDesc The `placement` props allow you to define where to attach the drawer.
 */
export const Placement = () => {
  const [placement, setPlacement] = useState<DrawerPlacement>('left');
  const [open, setOpen] = useState(false);

  const handleOpen = (p: DrawerPlacement) => () => {
    setPlacement(p);
    setOpen(true);
  };

  return (
    <>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button onClick={handleOpen('left')}>Open left</Button>
        <Button onClick={handleOpen('right')}>Open right</Button>
        <Button onClick={handleOpen('top')}>Open top</Button>
        <Button onClick={handleOpen('bottom')}>Open bottom</Button>
      </div>
      <Drawer
        aria-label="test drawer"
        size="sm"
        placement={placement}
        open={open}
        onClose={() => setOpen(false)}
      >
        <Typography>In the drawer</Typography>
      </Drawer>
    </>
  );
};

/**
 * @storyDesc It is possible to pass some props to the overlay element with the `overlayProps` prop.
 *
 * You can also complety hide the overlay with the `noOverlay` prop.
 */
export const CustomOverlay = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open left</Button>
      <Drawer
        aria-label="test drawer"
        open={open}
        onClose={() => setOpen(false)}
        overlayProps={{
          style: {
            backgroundColor: 'white',
          },
        }}
      >
        <Typography>In the drawer</Typography>
      </Drawer>
    </>
  );
};
