import React, { useState, useEffect } from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';

import { extractThemeVariables } from '../../../.storybook/utils/Theming';

import moduleCss from '!!raw-loader!./Sidebar.module.scss?raw';
import themeVariablesScss from '!!raw-loader!../../theme/jar/variables/Sidebar.scss?raw';

import Typography from '../Typography';

import { SidebarContainer } from '.';

export default {
  title: 'Components/Layout/Sidebar',
  component: SidebarContainer,
  tags: ['autodocs'],
  parameters: {
    theming: extractThemeVariables([moduleCss, themeVariablesScss], 'Sidebar'),
    layout: 'fullscreen',
  },
} as Meta;

const content =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ';

const bigContent = new Array(100).fill(undefined).reduce((acc) => (acc += content), '');

export const Default: StoryObj<typeof SidebarContainer> = {
  render: ({ open: originalOpen, placement, ...otherProps }) => {
    const [open, setOpen] = useState(originalOpen);

    useEffect(() => {
      setOpen(originalOpen);
    }, [originalOpen]);

    return (
      <SidebarContainer
        open={open}
        placement={placement}
        size="md"
        sidebar={<Typography>SIDEBAR CONTENT</Typography>}
        style={{ height: '100vh' }}
        {...otherProps}
      >
        {content}
      </SidebarContainer>
    );
  },
  args: {
    open: true,
    placement: 'left',
  },
};

export const LongContent: StoryObj<typeof SidebarContainer> = {
  render: ({ open: originalOpen, placement, ...otherProps }) => {
    const [open, setOpen] = useState(originalOpen);

    useEffect(() => {
      setOpen(originalOpen);
    }, [originalOpen]);

    return (
      <SidebarContainer
        open={open}
        placement={placement}
        style={{ background: 'yellow' }}
        size="md"
        sidebar={<Typography>In the Sidebar</Typography>}
        sidebarProps={{ style: { backgroundColor: 'red' }, as: 'footer' }}
        contentProps={{ style: { backgroundColor: 'blue' }, as: 'main' }}
        {...otherProps}
      >
        {bigContent}
      </SidebarContainer>
    );
  },
  args: {
    open: true,
    placement: 'left',
  },
};

// export const Interactive = () => {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       <Button onClick={() => setOpen(true)}>Open left</Button>
//       <Sidebar aria-label="test Sidebar" open={open} onClose={() => setOpen(false)}>
//         <Typography>In the Sidebar</Typography>
//       </Sidebar>
//     </>
//   );
// };

// /**
//  * @storyDesc The `placement` props allow you to define where to attach the Sidebar.
//  */
// export const Placement = () => {
//   const [placement, setPlacement] = useState<SidebarPlacement>('left');
//   const [open, setOpen] = useState(false);

//   const handleOpen = (p: SidebarPlacement) => () => {
//     setPlacement(p);
//     setOpen(true);
//   };

//   return (
//     <>
//       <div style={{ display: 'flex', gap: 8 }}>
//         <Button onClick={handleOpen('left')}>Open left</Button>
//         <Button onClick={handleOpen('right')}>Open right</Button>
//         <Button onClick={handleOpen('top')}>Open top</Button>
//         <Button onClick={handleOpen('bottom')}>Open bottom</Button>
//       </div>
//       <Sidebar
//         aria-label="test Sidebar"
//         size="sm"
//         placement={placement}
//         open={open}
//         onClose={() => setOpen(false)}
//       >
//         <Typography>In the Sidebar</Typography>
//       </Sidebar>
//     </>
//   );
// };
