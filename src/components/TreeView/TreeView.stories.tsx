import React, { useState } from 'react';
import { Meta } from '@storybook/react';

import { extractThemeVariables } from '../../../.storybook/utils/Theming';

import moduleCss from '!!raw-loader!./TreeView.module.scss?raw';

import Icon from '../Icon';

import { TreeView, TreeViewItem } from '.';

export default {
  title: 'Components/Navigation/TreeView',
  component: TreeView,
  tags: ['autodocs'],
  subcomponents: {
    TreeViewItem,
  },
  parameters: {
    theming: extractThemeVariables(moduleCss, 'TreeView'),
  },
} as Meta;

const projects = ['A', 'B', 'C', 'D'];
const levels = ['1', '2', '3', '4'];

export const Default = () => {
  return (
    <TreeView aria-label="tree example" style={{ width: 300 }}>
      {projects.map((p) => (
        <TreeViewItem
          left={<Icon name="fa-solid fa-box" />}
          key={p}
          title={`Project ${p}`}
          defaultOpen={p === 'A'}
        >
          {levels.map((l1) => (
            <TreeViewItem
              key={l1}
              title={`Folder ${l1}`}
              left={<Icon name="fa-solid fa-folder" />}
              selected={l1 === '1'}
            >
              {levels.map((l2) => (
                <TreeViewItem
                  key={l2}
                  title={`Sub folder ${l2}`}
                  left={<Icon name="fa-solid fa-folder" />}
                />
              ))}
            </TreeViewItem>
          ))}
        </TreeViewItem>
      ))}
      <TreeViewItem title="Disabled item" disabled left={<Icon name="fa-solid fa-box" />} />
    </TreeView>
  );
};

/**
 * @storyDesc The `TreeView` state can be controlled externally by manually setting the `open` prop on item, and handling events with `onOpen` and `onClose`callbacks.
 */
export const Controlled = () => {
  const [openSection, setOpenSection] = useState<Set<string>>(new Set());
  const [selectedSections, setSelectedSection] = useState<Set<string>>(new Set());

  const handleOpen = (id: string) => () => {
    setOpenSection((sections) => {
      const newSections = new Set(sections);
      newSections.add(id);
      return newSections;
    });
  };

  const handleClose = (id: string) => () => {
    setOpenSection((sections) => {
      const newSections = new Set(sections);
      newSections.delete(id);
      return newSections;
    });
  };

  const handleClick = (id: string) => () => {
    setSelectedSection((sections) => {
      const newSections = new Set(sections);
      newSections.has(id) ? newSections.delete(id) : newSections.add(id);
      return newSections;
    });
  };

  return (
    <TreeView aria-label="tree example" style={{ width: 300 }}>
      {projects.map((p) => (
        <TreeViewItem
          left={<Icon name="fa-solid fa-box" />}
          key={p}
          title={`Project ${p}`}
          onOpen={handleOpen(p)}
          onClose={handleClose(p)}
          open={openSection.has(p)}
        >
          {levels.map((l1) => (
            <TreeViewItem
              key={l1}
              title={`Folder ${l1}`}
              left={<Icon name="fa-solid fa-folder" />}
              onOpen={handleOpen(p + l1)}
              onClose={handleClose(p + l1)}
              open={openSection.has(p + l1)}
            >
              {levels.map((l2) => (
                <TreeViewItem
                  key={l2}
                  title={`Sub folder ${l2}`}
                  left={<Icon name="fa-solid fa-folder" />}
                  onClick={handleClick(p + l1 + l2)}
                  selected={selectedSections.has(p + l1 + l2)}
                />
              ))}
              <TreeViewItem
                title="Disabled item"
                onClick={handleClick('disabled')}
                selected={selectedSections.has('disabled')}
                disabled
                left={<Icon name="fa-solid fa-box" />}
              />
            </TreeViewItem>
          ))}
        </TreeViewItem>
      ))}
      <TreeViewItem title="Disabled item" disabled left={<Icon name="fa-solid fa-box" />} />
    </TreeView>
  );
};
