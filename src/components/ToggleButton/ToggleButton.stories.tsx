import React, { useEffect, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import ButtonGroup from '../ButtonGroup';
import Icon from '../Icon';

import { ToggleButton } from '.';

export default {
  title: 'Components/Button/ToggleButton',
  component: ToggleButton,
  tags: ['autodocs'],
} as Meta;

export const Default: StoryObj<typeof ToggleButton> = {
  render: ({ selected: originalSelected, onClick, children, ...props }) => {
    const [selected, setSelected] = useState(false);

    useEffect(() => setSelected(originalSelected ?? false), [originalSelected]);

    const handleClick = () => {
      setSelected((p) => !p);
      if (onClick) onClick();
    };

    return (
      <ToggleButton selected={selected} onClick={handleClick} {...props}>
        {children}
      </ToggleButton>
    );
  },
  args: {
    children: 'Activate',
    selected: false,
    variant: 'outlined',
    intent: 'neutral',
    selectedIntent: 'primary',
    selectedVariant: 'filled',
    size: 'md',
    disabled: false,
  },
};

/**
 * @storyDesc Use the `ToggleButton` with a `ButtonGroup` to make a group of toggleable buttons.
 */
export const ToggleGroup = () => {
  const [selected, setSelected] = useState(false);

  const handleClick = (v: boolean) => () => setSelected(v);

  return (
    <ButtonGroup>
      <ToggleButton selected={selected} onClick={handleClick(true)} icon aria-label="grid view">
        <Icon name="fa-solid fa-grid-2" />
      </ToggleButton>
      <ToggleButton selected={!selected} onClick={handleClick(false)} icon aria-label="list view">
        <Icon name="fa-solid fa-list" />
      </ToggleButton>
    </ButtonGroup>
  );
};

/**
 * @storyDesc Use the `selectedIntent` and `selectedVariant` to customize the selected state style of the `ToggleButton`.
 */
export const CustomSelectedStyles = () => {
  const [selected, setSelected] = useState(false);
  return (
    <ToggleButton
      selected={selected}
      intent="primary"
      variant="ghost"
      selectedVariant="outlined"
      selectedIntent="danger"
      onClick={() => setSelected((p) => !p)}
    >
      Activate
    </ToggleButton>
  );
};
