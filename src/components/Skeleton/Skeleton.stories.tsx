import React, { useEffect, useState } from 'react';
import { Meta, Story } from '@storybook/react-webpack5';

import { extractThemeVariables } from '../../../.storybook/utils/Theming';

import moduleCss from '!!raw-loader!./Skeleton.module.scss?raw';
import themeVariablesScss from '!!raw-loader!../../theme/jar/variables/Skeleton.scss?raw';

import Badge from '../Badge';
import Button from '../Button';
import StateButton from '../StateButton';
import { Card, CardThumbnail, CardHeader, CardThumbnailGrid } from '../Card';
import Stack from '../Stack';
import Icon from '../Icon';
import Typography from '../Typography';

import { Skeleton } from '.';

const src = '/placeholderBackground.svg';

export default {
  title: 'Components/Data/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    theming: extractThemeVariables([moduleCss, themeVariablesScss], 'Skeleton'),
  },
} as Meta;

type StoryProps = React.ComponentProps<typeof Skeleton>;

const Template: Story<StoryProps> = (props) => {
  return <Skeleton {...props} />;
};

export const Default = Template.bind({});
Default.args = {
  width: 200,
  height: 50,
  shape: 'square',
  transparent: false,
};

/**
 * @storyDesc The shape of the skeleton can be changed with the `shape` prop.
 */
export const Shape = () => {
  return (
    <Stack direction="vertical">
      <Skeleton shape="square" width={200} height={50} />
      <Skeleton shape="rounded" width={200} height={50} />
      <Skeleton shape="circle" width={200} height={50} />
    </Stack>
  );
};

/**
 * @storyDesc Use the `Skeleton` with a `Typography` to compose a text skeleton component.
 */
export const Text = () => {
  return (
    <Stack direction="vertical">
      <Skeleton as={Typography} size="lg" height="fit-content" width="fit-content">
        A text
      </Skeleton>
      <Skeleton as={Typography} height="fit-content" width="fit-content">
        Another text
      </Skeleton>
      <Typography size="lg">A text</Typography>
      <Typography>Another text</Typography>
    </Stack>
  );
};

/**
 * @storyDesc Using the `transparent` prop allow you to have a transparent background skeleton.
 * This can be usefull to construct a skeleton by passing an svg as a child of the `Skeleton` component.
 */
export const Transparent = () => {
  return (
    <Skeleton transparent>
      <svg viewBox="0 0 400 160" width={400} height={160}>
        <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
        <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
        <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
        <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
        <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
        <circle cx="20" cy="20" r="20" />
      </svg>
    </Skeleton>
  );
};

const fetchThings = () => new Promise((r) => setTimeout(r, 2000));

/**
 * @storyDesc Just a more real-world example
 */
export const Demo = () => {
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    if (load) {
      setLoading(true);
      fetchThings().then(() => {
        setLoading(false);
        setLoad(false);
      });
    }
  }, [load]);

  return (
    <>
      {loading ? (
        <Card elevation={1} outlined style={{ width: 400 }}>
          <CardThumbnailGrid>
            <Skeleton shape="rounded" style={{ aspectRatio: '16/9' }} />
            <Skeleton shape="rounded" style={{ aspectRatio: '16/9' }} />
            <Skeleton shape="rounded" style={{ aspectRatio: '16/9' }} />
          </CardThumbnailGrid>
          <CardHeader left={<Skeleton shape="circle" height={20} width={20} />}>
            <Skeleton shape="rounded" width="12ch" height={16} />
          </CardHeader>
        </Card>
      ) : (
        <Card elevation={1} outlined style={{ width: 400 }}>
          <CardThumbnailGrid>
            <CardThumbnail alt="thumbnail" src={src} />
            <CardThumbnail alt="thumbnail" src={src} />
            <CardThumbnail alt="thumbnail" src={src} />
          </CardThumbnailGrid>
          <CardHeader left={<Icon name="fi fi-rr-camera" />}>My card</CardHeader>
        </Card>
      )}

      <br />
      <StateButton onClick={() => setLoad(true)} loading={loading}>
        reload
      </StateButton>
    </>
  );
};

/**
 * @storyDesc You can use Skeleton as any component
 */
export const AsProps = () => {
  return (
    <div>
      <Skeleton as={Button}>Button</Skeleton>
      <Skeleton as={Badge} width={128}>
        Badge
      </Skeleton>
    </div>
  );
};
