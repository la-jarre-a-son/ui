import React from 'react';
import { Meta, Story } from '@storybook/react';

import { extractThemeVariables } from '../../../.storybook/utils/Theming';

import moduleCss from '!!raw-loader!./Tooltip.module.scss?raw';
import themeVariablesScss from '!!raw-loader!../../theme/jar/variables/Tooltip.scss?raw';

import Button from '../Button';
import Icon from '../Icon';
import { Menu, MenuItem } from '../Menu';

import { Tooltip, TooltipPopper } from '.';

export default {
  title: 'Components/Data/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    theming: extractThemeVariables([moduleCss, themeVariablesScss], 'Tooltip'),
  },
  subcomponents: {
    TooltipPopper,
  },
} as Meta;

const TITLE = 'Tooltip title';
const CONTENT = 'tooltip content';

type StoryProps = React.ComponentProps<typeof Tooltip>;

export const Default: Story<StoryProps> = (props) => (
  <>
    <Tooltip {...props}>
      <Button>Hover Me</Button>
    </Tooltip>
    <br />
    <Tooltip {...props}>
      <Button icon aria-label="with tooltip" variant="ghost">
        <Icon name="fa-solid fa-star" />
      </Button>
    </Tooltip>
  </>
);
Default.args = {
  title: TITLE,
  content: CONTENT,
  placement: 'top',
};

/**
 * @storyDesc The `Tooltip` placement can be controlled with the `placement` props.
 */
export const Placement = () => {
  return (
    <div style={{ width: '100%', display: 'flex', gap: 8, justifyContent: 'center' }}>
      <Tooltip title={TITLE} content={CONTENT} placement="top">
        <Button>top</Button>
      </Tooltip>
      <Tooltip title={TITLE} content={CONTENT} placement="right">
        <Button>right</Button>
      </Tooltip>
      <Tooltip title={TITLE} content={CONTENT} placement="bottom">
        <Button>bottom</Button>
      </Tooltip>
      <Tooltip title={TITLE} content={CONTENT} placement="left">
        <Button>left</Button>
      </Tooltip>
    </div>
  );
};

/**
 * @storyDesc You can describe a non interactive element (like for example an icon) with the tooltip.
 * If you do so, you may wan't to make this element focusable.
 */
export const OnIcon = () => {
  return (
    <Tooltip content="46 favorites">
      <Icon name="fa-solid fa-star" aria-label="favorites" tabIndex={0} />
    </Tooltip>
  );
};

/**
 * @storyDesc The role of a tooltip is to enhance the wrapped element by adding descriptive information.
 * This can be done with the following strategies, defined by the `describeAs` prop:
 * - `description`: (default) define the tooltip content as the description of the child element
 * - `label`: define the tooltip content as the label of the child element
 * - `none`: don't define any aria attribute on the child element
 */
export const Description = () => {
  return (
    <>
      <Tooltip content="tooltip content" describeAs="description">
        <Button>as description</Button>
      </Tooltip>
      <Tooltip content="tooltip content" describeAs="label">
        <Button>as label</Button>
      </Tooltip>
      <Tooltip content="tooltip content" describeAs="none">
        <Button>as none</Button>
      </Tooltip>
    </>
  );
};

export const OnMenuTrigger = () => {
  return (
    <Menu
      trigger={
        <Tooltip title={TITLE} content={CONTENT}>
          <Button>My Menu</Button>
        </Tooltip>
      }
    >
      <MenuItem>Menu Item</MenuItem>
      <MenuItem>Menu Item</MenuItem>
      <MenuItem>Menu Item</MenuItem>
      <MenuItem>Menu Item</MenuItem>
      <MenuItem>Menu Item</MenuItem>
      <MenuItem>Menu Item</MenuItem>
    </Menu>
  );
};
