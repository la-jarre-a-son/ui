import React, { forwardRef } from 'react';
import { Meta } from '@storybook/react-webpack5';

import SharedObserver from '../SharedObserver';

import { RenderWhenVisible } from '.';

export default {
  title: 'Components/Utils/RenderWhenVisible',
  component: RenderWhenVisible,
  tags: ['autodocs'],
} as Meta;

const ITEM_SIZE = 200;
const items = new Array(1000).fill(undefined).map((_, i) => i);

const Fallback = forwardRef((_, ref: React.ForwardedRef<HTMLDivElement>) => {
  return <div ref={ref} style={{ height: ITEM_SIZE }} />;
});

Fallback.displayName = 'Fallback';

const Item = forwardRef(
  (
    { children, style, ...other }: { children?: React.ReactNode; style?: React.CSSProperties },
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        {...other}
        ref={ref}
        style={{
          padding: '8px 16px',
          backgroundColor: 'lightblue',
          height: ITEM_SIZE,
          border: 'solid 2px white',
          overflow: 'hidden',
          ...style,
        }}
      >
        {children}
      </div>
    );
  }
);
Item.displayName = 'Item';

const Container = forwardRef(
  (
    { children, style }: { children?: React.ReactNode; style?: React.CSSProperties },
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fill, minmax(${ITEM_SIZE}px, 1fr))`,
          maxWidth: 1400,
          margin: 'auto',
          ...style,
        }}
      >
        {children}
      </div>
    );
  }
);
Container.displayName = 'Container';

/**  @storyDisabled */
export const RenderWhenVisibleAlone = () => {
  return (
    <Container>
      {items.map((id) => (
        <RenderWhenVisible key={id} placeholder={<Fallback />}>
          <Item>{`n°${id} rendered`}</Item>
        </RenderWhenVisible>
      ))}
    </Container>
  );
};

/**  @storyDisabled */
export const RenderWhenVisibleSharedObserver = () => {
  return (
    <SharedObserver>
      <Container>
        {items.map((id) => (
          <RenderWhenVisible key={id} placeholder={<Fallback />}>
            <Item>{`n°${id} rendered`}</Item>
          </RenderWhenVisible>
        ))}
      </Container>
    </SharedObserver>
  );
};
