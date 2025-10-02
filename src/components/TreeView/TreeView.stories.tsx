import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { extractThemeVariables } from '../../../.storybook/utils/Theming';

import moduleCss from '!!raw-loader!./TreeView.module.scss?raw';

import Icon from '../Icon';

import { TreeView, TreeViewItem } from '.';
import Badge from '../Badge';

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
const levels = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

export const Default: StoryObj<typeof TreeView> = {
  render: ({ sticky }) => {
    const [current, setCurrent] = useState<string>('C21');

    return (
      <TreeView aria-label="tree example" style={{ width: 300, height: 500 }} sticky={sticky}>
        {projects.map((p) => (
          <TreeViewItem
            left={<Icon name="fi fi-rr-box" />}
            key={'P' + p}
            title={`Project ${p}`}
            defaultOpen={p === 'A'}
          >
            {levels.map((l1) => (
              <TreeViewItem
                key={'L1' + l1}
                title={`Folder ${l1}`}
                left={<Icon name="fi fi-rr-folder" />}
              >
                {levels.map((l2) => (
                  <TreeViewItem
                    key={'L2' + l2}
                    title={`Sub folder ${l2}`}
                    left={<Icon name="fi fi-rr-folder" />}
                    onClick={() => setCurrent(p + l1 + l2)}
                    current={current === p + l1 + l2}
                  />
                ))}
              </TreeViewItem>
            ))}
          </TreeViewItem>
        ))}
        <TreeViewItem
          title="Go To P A, F 1, SF 2"
          left={<Icon name="fi fi-rr-angle-up" />}
          onClick={() => setCurrent('A12')}
        ></TreeViewItem>
        <TreeViewItem title="Disabled item" disabled left={<Icon name="fi fi-rr-box" />} />
      </TreeView>
    );
  },
  args: {
    sticky: false,
  },
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

  const getItemBadge = (id: string) => {
    let count = 0;
    selectedSections.forEach((s) => {
      if (s.startsWith(id)) count += 1;
    });
    if (count) return <Badge intent="primary">{count}</Badge>;

    return null;
  };

  return (
    <TreeView aria-label="tree example" style={{ width: 300 }}>
      {projects.map((p) => (
        <TreeViewItem
          left={<Icon name="fi fi-rr-box" />}
          key={p}
          title={`Project ${p}`}
          right={getItemBadge(p)}
          onOpen={handleOpen(p)}
          onClose={handleClose(p)}
          open={openSection.has(p)}
        >
          {levels.map((l1) => (
            <TreeViewItem
              key={l1}
              title={`Folder ${l1}`}
              left={<Icon name="fi fi-rr-folder" />}
              right={getItemBadge(p + l1)}
              onOpen={handleOpen(p + l1)}
              onClose={handleClose(p + l1)}
              open={openSection.has(p + l1)}
            >
              {levels.map((l2) => (
                <TreeViewItem
                  key={l2}
                  title={`Sub folder ${l2}`}
                  left={<Icon name="fi fi-rr-folder" />}
                  onClick={handleClick(p + l1 + l2)}
                  selected={selectedSections.has(p + l1 + l2)}
                />
              ))}
              <TreeViewItem
                title="Disabled item"
                onClick={handleClick('disabled')}
                selected={selectedSections.has('disabled')}
                disabled
                left={<Icon name="fi fi-rr-box" />}
              />
            </TreeViewItem>
          ))}
        </TreeViewItem>
      ))}
      <TreeViewItem title="Disabled item" disabled left={<Icon name="fi fi-rr-box" />} />
    </TreeView>
  );
};

export const DeeplyNested: StoryObj<typeof TreeView> = {
  render: () => {
    const [current, setCurrent] = useState<string>('Not Nested');

    return (
      <TreeView aria-label="tree example" style={{ width: 300, height: 500 }} sticky>
        <TreeViewItem left={<Icon name="fi fi-rr-box" />} title="A">
          <TreeViewItem title="B" left={<Icon name="fi fi-rr-folder" />}>
            <TreeViewItem title="C" left={<Icon name="fi fi-rr-folder" />}>
              <TreeViewItem title="D" left={<Icon name="fi fi-rr-folder" />}>
                <TreeViewItem title="E" left={<Icon name="fi fi-rr-folder" />}>
                  <TreeViewItem title="F" left={<Icon name="fi fi-rr-folder" />}>
                    <TreeViewItem title="G" left={<Icon name="fi fi-rr-folder" />}>
                      <TreeViewItem
                        title="H"
                        left={<Icon name="fi fi-rr-file" />}
                        onClick={() => setCurrent('ABCDEFGH')}
                        current={current === 'ABCDEFGH'}
                      />
                    </TreeViewItem>
                  </TreeViewItem>
                </TreeViewItem>
              </TreeViewItem>
            </TreeViewItem>
          </TreeViewItem>
        </TreeViewItem>
        <TreeViewItem
          title="Not Nested"
          left={<Icon name="fi fi-rr-file" />}
          onClick={() => setCurrent('Not Nested')}
          current={current === 'Not Nested'}
        ></TreeViewItem>
        <TreeViewItem
          title="Go to ABCDEFGH"
          left={<Icon name="fi fi-rr-angle-up" />}
          onClick={() => setCurrent('ABCDEFGH')}
        ></TreeViewItem>
      </TreeView>
    );
  },
  args: {
    sticky: false,
  },
};
