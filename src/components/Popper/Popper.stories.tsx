import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react-webpack5';

import { Popper, usePopper } from '.';

export default {
  title: 'Components/Utils/Popper',
  component: Popper,
  tags: ['autodocs'],
} as Meta;

const popperStyle: React.CSSProperties = {
  border: 'solid 1px red',
};

type StoryProps = React.ComponentProps<typeof Popper>;

export const Default: Story<StoryProps> = ({ children, ...props }) => {
  const [el, setEl] = useState<HTMLElement | null>(null);

  return (
    <div
      style={{
        height: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ border: 'solid 1px blue', width: 80 }} ref={setEl}>
        reference element
      </div>
      <Popper {...props} style={popperStyle} anchorEl={el}>
        {children}
      </Popper>
    </div>
  );
};
Default.args = {
  children: 'Content',
};

/**
 * @storyDesc You can define the placement floating to the anchor with the `placement` prop.
 */
export const SimplePlacement = () => {
  const [el, setEl] = useState<HTMLElement | null>(null);
  return (
    <div
      style={{
        height: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ border: 'solid 1px blue', width: 80 }} ref={setEl}>
        reference element
      </div>
      <Popper style={popperStyle} anchorEl={el}>
        Bottom
      </Popper>
      <Popper style={popperStyle} anchorEl={el} placement="top">
        Top
      </Popper>
      <Popper style={popperStyle} anchorEl={el} placement="left">
        Left
      </Popper>
      <Popper style={popperStyle} anchorEl={el} placement="right">
        Right
      </Popper>
    </div>
  );
};

/**
 * @storyDesc You can have the floating element dynamicaly match the width of the anchor element by setting the `matchWidth` boolean prop.
 */
export const MatchSize = () => {
  const [el, setEl] = useState<HTMLElement | null>(null);
  return (
    <>
      <textarea ref={setEl} defaultValue="reference element" />
      <Popper anchorEl={el} matchWidth style={{ border: 'solid 1px red' }}>
        floating element
      </Popper>
    </>
  );
};

/**
 * @storyDesc The `limitHeight` boolean prop allow to limit the height of the floating element
 * to the maximum space available.
 */
export const LimitHeight = () => {
  const [el, setEl] = useState<HTMLElement | null>(null);

  return (
    <>
      <div
        style={{
          height: 200,
          maxHeight: 200,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div style={{ border: 'solid 1px blue', width: 80, height: 80 }} ref={setEl}>
          reference element
        </div>
        <Popper style={popperStyle} anchorEl={el} limitHeight>
          <div style={{ height: 400 }}>content with height limit</div>
        </Popper>
      </div>
    </>
  );
};

/**
 * @storyDesc By default, the `Popper` will automatically re-run his computation on resize/scroll update.
 * This garantee that the reference element his always well positionned. However, this come with a non-negligible performance
 * cost. To mitigate that, always use the `Popper` conditionnaly if possible.
 * Don't render a `Popper` component or execute a `usePopper` hook when the floating element is not visible.
 *
 * Alternativly, if the auto update behaviour is not needed, you can simply turn it of with the `autoUpdate` prop.
 */
export const AutoUpdate = () => {
  const [el, setEl] = useState<HTMLElement | null>(null);
  return (
    <div style={{ minHeight: 150 }}>
      <textarea ref={setEl} defaultValue="reference element" />
      <Popper
        anchorEl={el}
        placement="bottom-start"
        autoUpdate={false}
        style={{ border: 'solid 1px red', width: 50 }}
      >
        floating element without auto-update
      </Popper>
      <Popper
        anchorEl={el}
        placement="bottom-end"
        autoUpdate
        style={{ border: 'solid 1px red', width: 50 }}
      >
        floating element with auto-update
      </Popper>
    </div>
  );
};

/**
 * @storyDesc You can directly use the `usePopper` hook if needed.
 * This hook take the same option as the `Popper` props as argument and return the refs and style to attach to the
 * reference and floating element.
 */
export const UsePopperHook = () => {
  const { reference, floating, x, y } = usePopper({
    placement: 'bottom-end',
  });

  return (
    <>
      <div ref={reference} style={{ width: 'fit-content', border: 'solid 1px blue' }}>
        reference element
      </div>
      <div
        ref={floating}
        style={{
          position: 'absolute',
          top: y ?? -9999,
          left: x ?? -9999,
          border: 'solid 1px red',
        }}
      >
        floating element
      </div>
    </>
  );
};

/**
 * @storyDesc Use the `as` prop to customize the floating root element to use.
 */
export const AsProp = () => {
  const [el, setEl] = useState<HTMLElement | null>(null);

  return (
    <>
      <div style={{ border: 'solid 1px blue', width: 80, height: 'fit-content' }} ref={setEl}>
        reference element
      </div>
      <Popper as="span" style={popperStyle} anchorEl={el} limitHeight>
        Floating span
      </Popper>
    </>
  );
};
