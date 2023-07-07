import React from 'react';
import { MergeProps } from '../../utils/typeUtils';

import { ToggleButtonProps } from '../ToggleButton';
import { ButtonSize, ButtonVariant } from '../Button';
import { ButtonGroupProps } from '../ButtonGroup';
import { StackDirection } from '../Stack';

export type TabsVariant = ButtonVariant;

export type TabsSize = ButtonSize;

export type TabListProps = MergeProps<
  {
    /**
     * The currently selected tab id
     */
    selected?: string;
    /**
     * Callback fired when the selected tab changes
     */
    onChange?: (id: string) => void;
    /**
     * The stylistic variant of the list and nested tabs
     */
    variant?: TabsVariant;
    /**
     * The size of the list and nested tabs
     */
    size?: TabsSize;
    /**
     * Adds a border to the bottom/left depending on direction
     */
    bordered?: boolean;
    /**
     * Mandatory aria label for accesibility
     */
    'aria-label': string;
    /**
     * The items in the list - should be Tab elements
     */
    children?: React.ReactNode;
  },
  ButtonGroupProps
>;

export type TabProps = ToggleButtonProps;

export type TabPanelProps = {
  /**
   * Specifies that the panel is selected
   */
  selected?: boolean;
  /**
   * Content of the panel - rendered only when corresponding tab is selected
   */
  children?: React.ReactNode;
};

export type TabListContextState = {
  selected?: string;
  variant?: TabsVariant;
  direction?: StackDirection;
  size?: TabsSize;
  onChange?: (id: string) => void;
};

export type TabsProviderState = {
  selectedTab?: string;
  selectedPanel?: string;
  setActive: (id: string) => void;
  bindIds: () => void;
};

export type TabsProviderProps = {
  /**
   * Specifies the index of the tab selected by default
   */
  defaultSelected?: number;
  /**
   * Content that will use the TabProvider context,
   * or a render function that receives the state of the provided context
   */
  children: React.ReactNode | ((providerState: TabsProviderState) => React.ReactNode);
};
