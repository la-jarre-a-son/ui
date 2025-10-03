import React, { useEffect, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';

import { extractThemeVariables } from '../../../.storybook/utils/Theming';

import moduleCss from '!!raw-loader!./Modal.module.scss?raw';
import themeVariablesScss from '!!raw-loader!../../theme/jar/variables/Modal.scss?raw';

import Dropdown from '../Dropdown';
import Box from '../Box';
import Button from '../Button';
import Select from '../Select';
import Typography from '../Typography';
import ToggleButton from '../ToggleButton';
import Icon from '../Icon';
import Input from '../Input';

import { Modal, ModalHeader, ModalContent, ModalActions, ModalActionsSeparator } from '.';

export default {
  title: 'components/Layout/Modal',
  component: Modal,
  tags: ['autodocs'],
  subcomponents: {
    ModalActions,
    ModalContent,
    ModalHeader,
    ModalActionsSeparator,
  },
  parameters: {
    theming: extractThemeVariables([moduleCss, themeVariablesScss], 'Modal'),
  },
} as Meta;

const options = [
  {
    value: 'value1',
    label: 'label1',
  },
  {
    value: 'value2',
    label: 'label2',
  },
  {
    value: 'value3',
    label: 'label3',
  },
];

const content =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ';

const bigContent = new Array(100).fill(undefined).reduce((acc) => (acc += content), '');

export const Default: StoryObj<typeof Modal> = {
  render: ({ open: initialOpen, ...otherProps }) => {
    const [open, setOpen] = React.useState(initialOpen);

    useEffect(() => {
      setOpen(initialOpen);
    }, [initialOpen]);

    return (
      <>
        <Button onClick={() => setOpen((p) => !p)}>open</Button>
        <Modal {...otherProps} open={open} onClose={() => setOpen(false)}>
          <ModalHeader title="title" />
          <ModalContent>{content}</ModalContent>
          <ModalActions>
            <Button variant="ghost" intent="neutral" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <ModalActionsSeparator />
            <Button intent="neutral">Option 1</Button>
            <Button intent="primary">Option 1</Button>
          </ModalActions>
        </Modal>
      </>
    );
  },
  args: {},
};

/**
 * @storyDesc You can extends props of the header components by passing them to the `titleProps` and `subTitleProps`.
 */
export const CustomHeader = () => {
  const [open, setOpen] = React.useState(false);
  const [member, setMember] = useState<string | null>(null);

  return (
    <>
      <Button onClick={() => setOpen((p) => !p)}>open</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalHeader as={Box} elevation={2} title="Modal">
          <Select
            value={member}
            onChange={setMember}
            block
            aria-label="Select a member"
            placeholder="Select a member"
            options={options}
          />
        </ModalHeader>
        <ModalContent>{content}</ModalContent>
        <ModalActions direction="vertical">
          <Button variant="ghost" intent="neutral" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <ModalActionsSeparator />
          <Button intent="neutral">Option 1</Button>
          <Button intent="primary">Option 1</Button>
        </ModalActions>
      </Modal>
    </>
  );
};

/**
 * @storyDesc The Modal component manage the stacking of modals and popovers.
 */
export const ModalStacking = () => {
  const [open, setOpen] = React.useState(false);
  const [openNested, setOpenNested] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen((p) => !p)}>open</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalHeader title="First modal" />
        <ModalContent>In the Modal</ModalContent>
        <ModalActions>
          <Button onClick={() => setOpenNested(true)}>Open nested</Button>
        </ModalActions>
        <Modal size="sm" open={openNested} onClose={() => setOpenNested(false)}>
          <ModalHeader title="Nested modal" />
          <ModalContent>In the nested Modal</ModalContent>
          <ModalActions>
            <Button onClick={() => setOpenNested(false)}>Close nested modal</Button>
            <Dropdown trigger={<Button>dropdown in modal</Button>}>
              <Box elevation={3}>
                <Typography>a dropdown nested in a modal</Typography>
              </Box>
            </Dropdown>
          </ModalActions>
        </Modal>
      </Modal>
    </>
  );
};

/**
 * @storyDesc the `ModalContent` will automatically scroll with big content.
 */
export const ScrollingModal = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen((p) => !p)}>open</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalHeader title="Conditions" />
        <ModalContent>{bigContent}</ModalContent>
        <ModalActions>
          <Button variant="ghost" intent="neutral" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <ModalActionsSeparator />
          <Button intent="primary">Accept</Button>
        </ModalActions>
      </Modal>
    </>
  );
};

/**
 * @storyDesc The size can be set to fullscreen
 */
export const FullScreen = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen((p) => !p)}>open</Button>
      <Modal open={open} onClose={() => setOpen(false)} size="fullscreen">
        <ModalHeader title="Fullscreen modal" />
        <ModalContent>{content}</ModalContent>
      </Modal>
    </>
  );
};

/**
 * @storyDesc A Modal Example
 */
export const Example = () => {
  const [open, setOpen] = React.useState(false);
  const [fullscreen, setFullscreen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  const handleInputChange = (val: string) => setInputValue(val);

  const toggleFullscreen = () => setFullscreen((f) => !f);

  return (
    <>
      <Button onClick={() => setOpen((p) => !p)}>open modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        size={fullscreen ? 'fullscreen' : 'md'}
        disableAutoFocus
      >
        <ModalHeader title={fullscreen ? 'Fullscreen modal' : 'Medium modal'}>
          <ToggleButton
            variant="ghost"
            intent="neutral"
            selectedIntent="warning"
            selected={fullscreen}
            onClick={toggleFullscreen}
          >
            <Icon
              name={
                fullscreen
                  ? 'fi fi-rr-down-left-and-up-right-to-center'
                  : 'fi fi-rr-arrow-up-right-and-arrow-down-left-from-center'
              }
            />
          </ToggleButton>
        </ModalHeader>{' '}
        <ModalContent tabIndex={-1}>
          <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholder="First input"
            block
            autoFocus
          />
          <div>{content}</div>
        </ModalContent>
        <ModalActions>
          <Button variant="ghost" intent="neutral" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <ModalActionsSeparator />
          <Button intent="danger" hoverIntent>
            Deny
          </Button>
          <Button intent="success">Accept</Button>
        </ModalActions>
      </Modal>
    </>
  );
};
