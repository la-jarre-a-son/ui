import React, { useState } from 'react';
import { Meta } from '@storybook/react-webpack5';

import {
  Button,
  ButtonGroup,
  Icon,
  Stack,
  StackSeparator,
  ToggleButton,
  Toolbar,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Container,
  TabList,
  Tab,
  Typography,
  SidebarContainer,
  FormFieldset,
  FormControlLabel,
  Switch,
  Box,
} from '..';

import styles from './ElectronApp.module.scss';

export default {
  title: 'Showcase/ElectronApp',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': { hidden: true },
    },
    layout: 'fullscreen',
    viewMode: 'canvas',
    autodocs: false,
  },
} as Meta;

/**
 * @storyDisabled
 */
export const DefaultStory = () => {
  const [isAlwaysOnTop, setAlwaysOnTop] = useState(false);
  const [switches, setSwitches] = useState<Record<string, boolean>>({});

  const handleSwitchChange = (name: string) => (v: boolean) => {
    setSwitches((p) => ({
      ...p,
      [name]: v,
    }));
  };

  const toggleAlwaysOnTop = () => setAlwaysOnTop((previous) => !previous);

  return (
    <main className={styles.layout}>
      <Toolbar
        as={Stack}
        elevation={3}
        className={styles.header}
        block
        align="center"
        gap="md"
        direction="horizontal"
      >
        <Breadcrumb>
          <BreadcrumbItem aria-label="Home">
            <Icon name="fi fi-rr-home" />
            My App
          </BreadcrumbItem>
          <BreadcrumbItem current>Settings</BreadcrumbItem>
        </Breadcrumb>
        <StackSeparator />
        <ButtonGroup>
          <Tooltip title="Settings">
            <Button variant="filled" intent="primary" icon hoverIntent aria-label="Settings">
              <Icon name="fi fi-rr-settings" />
            </Button>
          </Tooltip>
          <Tooltip title="Always on Top">
            <ToggleButton
              selected={isAlwaysOnTop}
              intent="neutral"
              variant="filled"
              selectedIntent="warning"
              selectedVariant="filled"
              icon
              aria-label="Always on Top"
              onClick={toggleAlwaysOnTop}
            >
              <Icon name="fi fi-rr-thumbtack" />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Quit">
            <Button variant="filled" intent="danger" icon hoverIntent aria-label="Close">
              <Icon name="fi fi-rr-power" />
            </Button>
          </Tooltip>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="filled" intent="warning" icon hoverIntent aria-label="Minimize">
            <Icon name="fi fi-rr-window-minimize" />
          </Button>
          <Button variant="filled" intent="success" icon hoverIntent aria-label="Maximize">
            <Icon name="fi fi-rr-arrow-up-right-and-arrow-down-left-from-center" />
          </Button>
          <Button variant="filled" intent="danger" icon hoverIntent aria-label="Close">
            <Icon name="fi fi-rr-cross" />
          </Button>
        </ButtonGroup>
      </Toolbar>
      <SidebarContainer
        className={styles.main}
        placement="left"
        sidebarProps={{ className: styles.sidebar }}
        contentProps={{ className: styles.content }}
        sidebar={
          <>
            <TabList
              className={styles.sidebarNav}
              direction="vertical"
              aria-label="Navigation"
              variant="ghost"
            >
              <Tab left={<Icon name="fi fi-rr-settings-sliders" />} selected>
                General
              </Tab>
              <Tab left={<Icon name="fi fi-rr-music-alt" />}>Music Notation</Tab>
              <Tab left={<Icon name="fi fi-rr-globe" />}>Server</Tab>
              <Tab left={<Icon name="fi fi-rr-heart" />}>Credits</Tab>
              <Tab left={<Icon name="fi fi-rr-gavel" />}>Licenses</Tab>
            </TabList>
            <Toolbar
              as={Stack}
              elevation={2}
              className={styles.sidebarFooter}
              block
              align="center"
              justify="center"
              gap="md"
              direction="horizontal"
              placement="bottom"
              position="sticky"
            >
              <Typography size="sm" weight="light" intent="subtle" align="center">
                v1.0.0
              </Typography>
            </Toolbar>
          </>
        }
        size="sm"
        inset
        open
      >
        <Toolbar elevation={2}>
          <TabList
            aria-label="Settings scope"
            variant="ghost"
            block
            align="center"
            justify="center"
            selected="overlay"
          >
            <Tab id="internal">Internal</Tab>
            <Tab id="overlay">Overlay</Tab>
          </TabList>
        </Toolbar>
        <Box className={styles.settingsContent}>
          <Container size="md">
            <FormFieldset label="Chords">
              <FormControlLabel label={'Display chord'} reverse>
                <Switch
                  checked={switches['displayChord']}
                  onChange={handleSwitchChange('displayChord')}
                />
              </FormControlLabel>
              <FormControlLabel label={'Display alternative chord'} reverse>
                <Switch
                  checked={switches['displayAltChord']}
                  onChange={handleSwitchChange('displayAltChord')}
                />
              </FormControlLabel>
            </FormFieldset>
            <FormFieldset label="Notation">
              <FormControlLabel label={'Display notation'} reverse>
                <Switch
                  checked={switches['displayNotation']}
                  onChange={handleSwitchChange('displayNotation')}
                />
              </FormControlLabel>
              <FormControlLabel label={'Display notes'} reverse>
                <Switch
                  checked={switches['displayNotes']}
                  onChange={handleSwitchChange('displayNotes')}
                />
              </FormControlLabel>
              <FormControlLabel label={'Display intervals'} reverse>
                <Switch
                  checked={switches['displayIntervals']}
                  onChange={handleSwitchChange('displayIntervals')}
                />
              </FormControlLabel>
            </FormFieldset>
            <FormFieldset label="Keyboard">
              <FormControlLabel label={'Display keyboard'} reverse>
                <Switch
                  checked={switches['displayKeyboard']}
                  onChange={handleSwitchChange('displayKeyboard')}
                />
              </FormControlLabel>
              <FormControlLabel label={'Display key names'} reverse>
                <Switch
                  checked={switches['displayKeyNames']}
                  onChange={handleSwitchChange('displayKeyNames')}
                />
              </FormControlLabel>
              <FormControlLabel label={'Display tonic dot'} reverse>
                <Switch
                  checked={switches['displayTonic']}
                  onChange={handleSwitchChange('displayTonic')}
                />
              </FormControlLabel>
            </FormFieldset>
          </Container>
        </Box>
        <Toolbar elevation={3}>
          <Button left={<Icon name="fi fi-rr-trash" />} intent="neutral">
            Reset to defaults
          </Button>
        </Toolbar>
      </SidebarContainer>
    </main>
  );
};
