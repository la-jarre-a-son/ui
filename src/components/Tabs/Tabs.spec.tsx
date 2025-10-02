import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Tab from './Tab';
import TabList from './TabList';
import TabPanel from './TabPanel';
import TabProvider from './TabProvider';
import { axe } from 'jest-axe';

describe('Tabs', () => {
  beforeAll(() => {
    Element.prototype.scrollTo = () => {};
  });
  describe('Tab', () => {
    it('render without crashing', () => {
      render(<Tab>content</Tab>);

      const content = screen.getByText('content');
      const tab = screen.getByRole('tab');

      expect(content).toBeInTheDocument();
      expect(tab).toBeInTheDocument();
    });

    it('make use of the as prop', () => {
      render(<Tab as="div">content</Tab>);

      const buttonTab = screen.getByRole('tab');

      expect(buttonTab.tagName).toEqual('DIV');
    });
  });

  describe('TabPanel', () => {
    it('render without crashing', () => {
      render(<TabPanel selected>content</TabPanel>);

      const panel = screen.getByRole('tabpanel');

      expect(panel).toBeInTheDocument();
    });

    it('make use of the as prop', () => {
      render(
        <TabPanel as="span" selected>
          content
        </TabPanel>
      );

      const panel = screen.getByRole('tabpanel');

      expect(panel.tagName).toEqual('SPAN');
    });

    it('conditionnaly render his content', () => {
      const { rerender } = render(<TabPanel>content</TabPanel>);

      let content = screen.queryByText('content');
      expect(content).not.toBeInTheDocument();

      rerender(<TabPanel selected>content</TabPanel>);

      content = screen.queryByText('content');
      expect(content).toBeInTheDocument();
    });
  });

  describe('TabList', () => {
    it('render without crashing', async () => {
      const { container } = render(
        <TabList aria-label="tab list">
          <Tab>Tab</Tab>
          <Tab>Tab</Tab>
          <Tab>Tab</Tab>
        </TabList>
      );

      const tabs = screen.getAllByRole('tab');
      const tab = screen.getByRole('tablist');

      expect(tabs.length).toEqual(3);
      expect(tab).toBeInTheDocument();
      expect(await axe(container)).toHaveNoViolations();
    });

    it('make use of the as prop', () => {
      render(
        <TabList as="button" aria-label="tab list">
          content
        </TabList>
      );

      const buttonTab = screen.getByText('content');

      expect(buttonTab.tagName).toEqual('BUTTON');
    });
  });

  describe('TabProvider', () => {
    it('bind ids', async () => {
      const { container } = render(
        <TabProvider>
          <TabList aria-label="tab list">
            <Tab id="0">Tab 1</Tab>
            <Tab>Tab 2</Tab>
          </TabList>
          <TabPanel>Panel 1</TabPanel>
          <TabPanel>Panel 2</TabPanel>
        </TabProvider>
      );

      expect(await axe(container)).toHaveNoViolations();
    });

    it('manage selection state', async () => {
      const user = userEvent.setup();

      const { container } = render(
        <TabProvider>
          <TabList aria-label="tab list">
            <Tab id="0">Tab 1</Tab>
            <Tab>Tab 2</Tab>
          </TabList>
          <TabPanel>Panel 1</TabPanel>
          <TabPanel>Panel 2</TabPanel>
        </TabProvider>
      );

      expect(screen.queryByText('Panel 2')).not.toBeInTheDocument();
      expect(screen.queryByText('Panel 1')).toBeInTheDocument();

      const tab2 = screen.getByText('Tab 2');
      await user.click(tab2);

      expect(await axe(container)).toHaveNoViolations();
      expect(screen.getByText('Panel 2')).toBeInTheDocument();
      expect(screen.queryByText('Panel 1')).not.toBeInTheDocument();
    });
  });
});
