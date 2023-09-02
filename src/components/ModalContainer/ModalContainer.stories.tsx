import React from 'react';
import { Meta } from '@storybook/react';

import Button from '../Button';

import { Modal, ModalHeader, ModalContent, ModalActions } from '../Modal';
import Drawer from '../Drawer';

import ModalContainer from './ModalContainer';

export default {
  title: 'components/Layout/Modal Container',
  component: ModalContainer,
  tags: ['autodocs'],
} as Meta;

const content =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ';

/**
 * @storyDesc You can have Modal in a custom container if needed
 */
export const Modals = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div>
        this is outside of the modal container
        <Button onClick={() => setOpen((p) => !p)}>toggle modal</Button>
      </div>
      <div style={{ width: '400px', height: '400px', background: 'red', position: 'relative' }}>
        this is inside the modal container
        <ModalContainer>
          <Modal open={open} onClose={() => setOpen(false)} size="md">
            <ModalHeader title={'Contained modal'}></ModalHeader>
            <ModalContent>{content}</ModalContent>
            <ModalActions>
              <Button intent="success">Accept</Button>
            </ModalActions>
          </Modal>
        </ModalContainer>
      </div>
    </>
  );
};

/**
 * @storyDesc You can have Modal in a custom container if needed
 */
export const Drawers = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div>
        this is outside of the modal container
        <Button onClick={() => setOpen((p) => !p)}>toggle Drawer</Button>
      </div>
      <div style={{ width: '400px', height: '400px', background: 'red', position: 'relative' }}>
        this is inside the modal container
        <ModalContainer>
          <Drawer aria-label="test drawer" size="md" open={open} onClose={() => setOpen(false)}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas scelerisque enim quis.
          </Drawer>
        </ModalContainer>
      </div>
    </>
  );
};
