import React, { useRef, useState } from 'react';
import { Meta, Story } from '@storybook/react-webpack5';

import { extractThemeVariables } from '../../../.storybook/utils/Theming';

import moduleCss from '!!raw-loader!./Dropdown.module.scss?raw';
import themeVariablesScss from '!!raw-loader!../../theme/jar/variables/Dropdown.scss?raw';

import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import Icon from '../Icon';
import { Modal, ModalContent } from '../Modal';
import Box from '../Box';

import { Dropdown } from '.';

export default {
  title: 'components/Layout/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    theming: extractThemeVariables([moduleCss, themeVariablesScss], 'Dropdown'),
  },
} as Meta;

const content =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

type StoryProps = React.ComponentProps<typeof Dropdown>;

const Template: Story<StoryProps> = ({ children, ...otherProps }) => {
  return (
    <Dropdown trigger={<Button>click</Button>} {...otherProps}>
      {children}
    </Dropdown>
  );
};

export const Default = Template.bind({});
Default.args = {
  children: content,
  open: undefined,
  disablePortal: false,
  disableStacking: false,
  disableFocusTrap: false,
  closeOnTab: false,
};

/**
 * @storyDesc Pass any component to the `trigger` prop. This element will be used as a trigger to the `Dropdown` opening as well as an anchor.
 */
export const TriggerProps: Story<StoryProps> = () => {
  return (
    <Dropdown
      trigger={
        <Button icon aria-label="Open dropdown">
          <Icon name="fi fi-rr-menu-burger" />
        </Button>
      }
    >
      {content}
    </Dropdown>
  );
};

/**
 * @storyDesc By default, the `Dropdown` is uncontrolled, its opening state is handled internally.
 * You can however directly control it with the `open` and `onClose` props.
 */
export const ControlledDropdown = () => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <Button ref={buttonRef} onClick={() => setOpen(true)}>
        controlled dropdown
      </Button>
      <Dropdown anchorEl={buttonRef.current} open={open} onClose={() => setOpen(false)}>
        {content}
      </Dropdown>
    </>
  );
};

/**
 * @storyDesc It is possible to define the element to use as a trigger and the anchor element by passing them as the `triggerEl` and `anchorEl` props.
 */
export const UsingTriggerElProp = () => {
  const [triggerEl, setTriggerEl] = useState<HTMLElement | null>(null);
  return (
    <>
      <Button ref={setTriggerEl}>click</Button>
      <Dropdown anchorEl={triggerEl} triggerEl={triggerEl}>
        {content}
      </Dropdown>
    </>
  );
};

/**
 * @storyDesc This allow you to use different element for both rtigger and anchor if needed.
 */
export const UsingDifferentAnchorAndTrigger = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropdown anchorEl={anchorEl} trigger={<Button>this is the trigger</Button>}>
        <div style={{ width: 200 }}>{content}</div>
      </Dropdown>
      <div ref={setAnchorEl}>this is the anchor</div>
    </div>
  );
};

/**
 * @storyDesc Tou can pass render function as children or as the `trigger` prop.
 * This allow to customize the rendering of the content or trigger depending on the `Dropdown` internal state without having to make it a controlled component.
 */
export const RenderPropsDropdown = () => {
  return (
    <Dropdown
      trigger={({ open, triggerRef }) => (
        <Button
          ref={triggerRef as React.Ref<HTMLButtonElement>}
          right={open ? <Icon name="fi fi-rr-angle-up" /> : <Icon name="fi fi-rr-angle-down" />}
        >
          Log in
        </Button>
      )}
    >
      {({ handleClose }) => (
        <Box
          elevation={3}
          outlined
          style={{
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <input type="text" aria-label="login" placeholder="login" />
          <input type="password" aria-label="password" placeholder="password" />
          <Button onClick={handleClose}>ok</Button>
        </Box>
      )}
    </Dropdown>
  );
};

/**
 * @storyDesc The `matchWidth` props make the content have the same width than his anchor element.
 */
export const MatchingTriggerWidth = () => {
  return (
    <Dropdown matchWidth trigger={<textarea defaultValue="click" />}>
      <div style={{ border: 'solid 1px red' }}>
        dropdown content
        <Button>click</Button>
        <Button>click</Button>
      </div>
    </Dropdown>
  );
};

/**
 * @storyDesc The `Dropdown` component fully support stacking (but not a reason to do it...)
 */
export const StackedDropdown = () => {
  const [openModal, setOpenModal] = React.useState(false);
  return (
    <ButtonGroup>
      <Button>button</Button>
      <Dropdown trigger={<Button>open dropdown</Button>}>
        <div>dropdown content</div>
        <ButtonGroup>
          <Button>button</Button>
          <Dropdown trigger={<Button>open nested dropdown</Button>}>
            Nested dropdown content !
          </Dropdown>
          <Button>button</Button>
          <Button onClick={() => setOpenModal(true)}>open nested modal</Button>
        </ButtonGroup>
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <ModalContent>a modal nested in a dropdown :o</ModalContent>
        </Modal>
      </Dropdown>
      <Button>button</Button>
    </ButtonGroup>
  );
};

/**
 * @storyDesc Sometime, (for example, when having fahing a custom arrow navigation on the dropdown, or when displaying a static non-focusable content)
 * you may wan't to not trap the focus, but simply close the dropdown instead when the user tab.
 * For this behaviour, you can just set the `closeOnTab` prop.
 */
export const CloseOnTab = () => {
  return (
    <Dropdown closeOnTab trigger={<Button>click then tab</Button>}>
      Dropdown content
    </Dropdown>
  );
};

/**
 * @storyDesc You can override the keyboard keys used to trigger an opening on the provided `triggerEl` by using the `triggerKeys` props.
 * This prop accept an array of string keys.
 *
 * > For example, the following dropdown will trigger by pressing the `Space`, `o`, `1`, `ArrowLeft` or `ArrowRight` keys
 */
export const CustomTriggerKeys = () => {
  return (
    <Dropdown
      triggerKeys={['o', '1', 'ArrowLeft', 'ArrowRight']}
      trigger={<Button>use keyboard to open</Button>}
    >
      Dropdown content
    </Dropdown>
  );
};

/**
 * @storyDesc Under the hood, the `Dropdown` component manage the features below:
 * - portal: by default, the dropdown content is displayed with a React [Portal](https://reactjs.org/docs/portals.html)
 * - focus trapping: by default, the user focus is trapped inside the content for accessibility reason.
 * - staking: by default, the `Dropdown` is managed in a stack of popover elements
 *
 * Each of those feature can be disabled with the `disablePortal`, `disableFocusTrap` and `disableStacking` prop.
 */
export const DisablingFeatures = () => {
  return (
    <>
      <Dropdown disablePortal disableFocusTrap trigger={<Button>click</Button>}>
        <Box elevation={3}>
          dropdown content not rendered in a portal, without focus trap
          <Dropdown
            trigger={<Button>nested dropdown</Button>}
            disablePortal
            disableFocusTrap
            disableStacking
          >
            <Box elevation={3}>
              dropdown content not rendered in a portal, without focus trap and not managing
              dropdown stacking. If you press Escape, both the dropdown will closed !
            </Box>
          </Dropdown>
        </Box>
      </Dropdown>
    </>
  );
};
