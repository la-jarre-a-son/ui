import React from 'react';
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
