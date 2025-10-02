import React, { Fragment } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { extractThemeVariables } from '../../../.storybook/utils/Theming';

import moduleCss from '!!raw-loader!./Button.module.scss?raw';
import themeVariablesScss from '!!raw-loader!../../theme/jar/variables/Button.scss?raw';

import Icon from '../Icon';

import { Button, ButtonSizes, ButtonVariants, ButtonIntents } from '.';

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    theming: extractThemeVariables([moduleCss, themeVariablesScss], 'Button'),
  },
} as Meta;

export const Default: StoryObj<typeof Button> = {
  render: ({ children, ...rest }) => <Button {...rest}>{children}</Button>,
  args: {
    children: 'Button CTA',
    variant: 'filled',
    intent: 'primary',
    size: 'md',
    disabled: false,
    left: <Icon name="fi fi-rr-circle" />,
    right: <Icon name="fi fi-rr-check" />,
  },
};

/**
 * @storyDesc The `Button` component comes in variety of `size`, `variant` and `intent`.
 *
 * It also can display an element on his left and right with the `left` and `right` props.
 */
export const All = () => (
  <>
    {ButtonIntents.map((intent) => (
      <div key={intent}>
        <h3>{intent}</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${ButtonSizes.length}, 1fr)`,
            alignItems: 'center',
            gridGap: '8px',
          }}
        >
          {ButtonVariants.map((variant) => (
            <Fragment key={variant}>
              {ButtonSizes.map((size) => (
                <div
                  style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}
                  key={`${size}--${variant}`}
                >
                  <Button
                    aria-label="label"
                    {...Default.args}
                    size={size}
                    variant={variant}
                    intent={intent}
                  />
                  <Button
                    aria-label="label"
                    {...Default.args}
                    size={size}
                    variant={variant}
                    intent={intent}
                    rounded
                  />
                </div>
              ))}
              {ButtonSizes.map((size) => (
                <div
                  style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}
                  key={`${size}--${variant}--disabled`}
                >
                  <Button
                    aria-label="label"
                    {...Default.args}
                    size={size}
                    variant={variant}
                    intent={intent}
                    disabled
                  />
                  <Button
                    aria-label="label"
                    {...Default.args}
                    size={size}
                    variant={variant}
                    intent={intent}
                    rounded
                    disabled
                  />
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    ))}
  </>
);

/**
 * @storyDesc The `Button` component can also be neutral, but displays its intent on hover / focus
 */
export const AllHoverIntent = () =>
  ButtonIntents.map((intent) => (
    <div key={intent}>
      <h3>{intent}</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${ButtonSizes.length}, 1fr)`,
          alignItems: 'center',
          gridGap: '8px',
        }}
      >
        {ButtonVariants.map((variant) => (
          <Fragment key={variant}>
            {ButtonSizes.map((size) => (
              <div
                style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}
                key={`${size}--${variant}`}
              >
                <Button
                  aria-label="label"
                  {...Default.args}
                  size={size}
                  variant={variant}
                  intent={intent}
                  hoverIntent
                />
                <Button
                  aria-label="label"
                  {...Default.args}
                  size={size}
                  variant={variant}
                  intent={intent}
                  hoverIntent
                  rounded
                />
              </div>
            ))}
            {ButtonSizes.map((size) => (
              <div
                style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}
                key={`${size}--${variant}--disabled`}
              >
                <Button
                  aria-label="label"
                  {...Default.args}
                  size={size}
                  variant={variant}
                  intent={intent}
                  disabled
                  hoverIntent
                />
                <Button
                  aria-label="label"
                  {...Default.args}
                  size={size}
                  variant={variant}
                  intent={intent}
                  rounded
                  disabled
                  hoverIntent
                />
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  ));

/**
 * @storyDesc Setting the boolean `icon` props will set the button to an equal width/height ratio, so you can simply pass an icon as its child.
 * Doing so, the `aria-label` prop become mandatory for accessibility reason.
 *
 */
export const IconButton = () => {
  return ButtonIntents.map((intent) => (
    <div key={intent}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${2 * ButtonSizes.length}, 1fr)`,
          alignItems: 'center',
          gridGap: '8px',
        }}
      >
        {ButtonVariants.map((variant) =>
          ButtonSizes.map((size) => (
            <Fragment key={size}>
              <div key={`${size}--${variant}--${intent}`}>
                <Button
                  icon
                  aria-label={`${size}--${variant}`}
                  size={size}
                  variant={variant}
                  intent={intent}
                >
                  <Icon name="fi fi-rr-check" />
                </Button>
              </div>
              <div key={`${size}--${variant}--${intent}--rounded`}>
                <Button
                  icon
                  aria-label={`${size}--${variant}`}
                  size={size}
                  variant={variant}
                  intent={intent}
                  rounded
                >
                  <Icon name="fi fi-rr-check" />
                </Button>
              </div>
            </Fragment>
          ))
        )}
      </div>
    </div>
  ));
};

/**
 * @storyDesc use the `block` prop to make the `Button` full width.
 */
export const Block = () => {
  return <Button block>Block button</Button>;
};

/**
 * @storyDesc Use the `as` prop to override the root element to use.
 * The `as` prop value can be an HTML element or a React component.
 */
export const AsProps = () => {
  return (
    <>
      <Button as="span">Button as span ??</Button>
      <Button as="a" href="https://reactjs.org/" target="_blank">
        Button as anchor
      </Button>
      <Button as="button" onClick={() => alert('clicked')}>
        Button as button
      </Button>
    </>
  );
};
