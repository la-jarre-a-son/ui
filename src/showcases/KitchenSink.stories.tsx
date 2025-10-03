import React from 'react';
import { Meta } from '@storybook/react-webpack5';

import { Container } from '../components';
import { All as AllBadges } from '../components/Badge/Badge.stories';
import { All as AllButtons } from '../components/Button/Button.stories';
import { Default as AllButtonGroups } from '../components/ButtonGroup/ButtonGroup.stories';
import { All as AllIcons } from '../components/Icon/Icon.stories';
import { Elevations as AllBoxes } from '../components/Box/Box.stories';
import { HorizontalTabs, VerticalTabs } from '../components/Tabs/Tabs.stories';
import { FormExample } from '../components/Form/FormField.stories';
import { Example as ModalExample } from '../components/Modal/Modal.stories';

import './KitchenSink.module.scss';

export default {
  title: 'Showcase/KitchenSink',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': { hidden: true },
    },
    layout: 'fullscreen',
    viewMode: 'canvas',
  },
} as Meta;

/**
 * @storyDisabled
 */
export const Default = () => {
  return (
    <Container size="xl">
      <h2>Badges</h2>
      <AllBadges />
      <h2>Buttons</h2>
      <AllButtons />
      <h2>Button Groups</h2>
      <AllButtonGroups />
      <h2>Icons</h2>
      <AllIcons />
      <h2>Box</h2>
      <AllBoxes />
      <h2>Tabs</h2>
      <HorizontalTabs />
      <VerticalTabs />
      <h2>Forms</h2>
      <FormExample />
      <h2>Modals</h2>
      <ModalExample />
    </Container>
  );
};
