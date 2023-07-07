import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Container, ContainerSize, ContainerSizes } from '../Container';
import { Grid, GridSize, GridSizes, GridGap, GridGaps } from '.';

export default {
  title: 'Components/Layout/Grid/Sizes',
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Item = () => {
  return (
    <div
      style={{
        backgroundColor: 'rgba(127,127,255, 0.5)',
        border: '1px solid blue',
        width: '100%',
        paddingTop: '33%',
      }}
    />
  );
};

type StoryProps = {
  containerSize: ContainerSize;
  gridSize: GridSize;
  gridGap: GridGap;
};

export const Default: StoryObj<StoryProps> = {
  render: ({ containerSize, gridSize, gridGap }) => {
    return (
      <Container size={containerSize} style={{ background: 'lightgrey' }}>
        <Grid size={gridSize} gap={gridGap} style={{ background: 'pink' }}>
          {new Array(24).fill(undefined).map((_, i) => (
            <Item key={i} />
          ))}
        </Grid>
      </Container>
    );
  },
  argTypes: {
    containerSize: {
      options: ContainerSizes,
      control: 'radio',
    },
    gridSize: {
      options: GridSizes,
      control: 'radio',
    },
    gridGap: {
      options: GridGaps,
      control: 'radio',
    },
  },
  args: {
    containerSize: 'sm',
    gridSize: 'lg',
    gridGap: 'sm',
  },
};
