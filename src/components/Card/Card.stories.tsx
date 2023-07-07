import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';

import { extractThemeVariables } from '../../../.storybook/utils/Theming';

import moduleCss from '!!raw-loader!./Card.module.scss?raw';
import themeVariablesScss from '!!raw-loader!../../theme/jar/variables/Card.scss?raw';

import useMouseEventRedirect from '../../utils/useMouseEventRedirect';
import Grid from '../Grid';
import Button from '../Button';
import Checkbox from '../Checkbox';
import Divider from '../Divider';
import Icon from '../Icon';
import Menu, { MenuItem } from '../Menu';
import Stack from '../Stack';
import Typography from '../Typography';

import {
  Card,
  CardHeader,
  CardThumbnail,
  CardThumbnailGrid,
  CardThumbnailItem,
  CardContent,
  CardThumbnailOverlay,
} from '.';

export default {
  title: 'Components/Layout/Card',
  component: Card,
  tags: ['autodocs'],
  subcomponents: {
    CardHeader,
    CardContent,
    CardThumbnail,
    CardThumbnailItem,
    CardThumbnailGrid,
  },
  parameters: {
    theming: extractThemeVariables([moduleCss, themeVariablesScss], 'Card'),
  },
} as Meta;

const src = 'https://loremflickr.com/640/480/music,gear/all';

const cardStyle: React.CSSProperties = {
  height: 160,
  width: 160,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  justifySelf: 'center',
};

type StoryProps = React.ComponentProps<typeof Card>;

const Template: Story<StoryProps> = ({ elevation, ...rest }) => (
  <Card elevation={elevation} {...rest} style={cardStyle}>
    Elevation {elevation}
  </Card>
);

export const Default = Template.bind({});
Default.args = {
  elevation: 1,
  outlined: false,
  hideOverflow: false,
};

/**
 * @storyDesc The `CardContent` allow to add some content with a gutter.
 */
export const Content = () => {
  return (
    <Card elevation={1}>
      <CardContent>Card content</CardContent>
    </Card>
  );
};

/**
 * @storyDesc You can add an header by using the `CardHeader` component as a children of the `Card`.
 *
 * The `CardHeader` accept a `left` and `right` element as well as some `children`.
 */
export const Header = () => {
  return (
    <Grid size="md" gap="xl">
      <Card elevation={1} outlined>
        <CardHeader>With Header</CardHeader>
        <Divider />
        <CardContent as={Typography}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam
        </CardContent>
      </Card>

      <Card elevation={1} outlined>
        <CardHeader
          right={
            <Button aria-label="edit" icon variant="ghost" intent="neutral">
              <Icon name="fa-solid fa-ellipsis" />
            </Button>
          }
        >
          With Header
          <Typography intent="subtle" size="sm">
            And sub-title
          </Typography>
        </CardHeader>
        <Divider />
        <CardContent as={Typography}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam
        </CardContent>
      </Card>
      <Card elevation={1} outlined>
        <CardHeader right={<Button intent="primary">See more</Button>}>
          <Typography>With a looooooooooooooooooooooooooong long long text</Typography>
        </CardHeader>
      </Card>
    </Grid>
  );
};

/**
 * @storyDesc Use the `Thumbnail` component to display an image.
 *
 * Use the `as` prop to override the root element to use.
 */
export const Thumbnail = () => {
  return (
    <Grid size="md" gap="xl">
      <Card elevation={1}>
        <CardThumbnail alt="img" src={src} />
        <CardHeader>Basic thumbnail image</CardHeader>
      </Card>
      <Card elevation={1}>
        <CardThumbnail alt="img" />
        <CardHeader>Placeholder image</CardHeader>
      </Card>
      <Card elevation={1}>
        <CardThumbnail alt="img" src="oups" />
        <CardHeader>Broken image</CardHeader>
      </Card>
      <Card elevation={1}>
        <CardThumbnail as="a" href="https://ljas.fr/" target="_blank" alt="img" src="oups" />
        <CardHeader>Thumbnail as a link</CardHeader>
      </Card>
    </Grid>
  );
};

/**
 * @storyDesc Passing the `ThumbnailItem` component as child of the `Thumbnail` component allow to position some elements on the thumbnail image.
 * Use the `position` props to define the item position (default to center) on the image.
 */
export const ThumbnailItem = () => {
  return (
    <Grid size="md" gap="xl">
      <CardThumbnail alt="img">
        <CardThumbnailItem position="center">
          <Stack direction="vertical" align="center">
            <Typography weight="bold" size="md">
              No module in your project
            </Typography>
            <Button>Add new module</Button>
          </Stack>
        </CardThumbnailItem>
      </CardThumbnail>
      <CardThumbnail src={src} alt="img">
        <CardThumbnailOverlay></CardThumbnailOverlay>
        <CardThumbnailItem position="top-left">
          <Icon name="fa-solid fa-heart" />
        </CardThumbnailItem>
        <CardThumbnailItem position="center">
          <Button>show more</Button>
        </CardThumbnailItem>
        <CardThumbnailItem position="bottom-right">
          <Button icon aria-label="add">
            <Icon name="fa-solid fa-plus" />
          </Button>
        </CardThumbnailItem>
      </CardThumbnail>
    </Grid>
  );
};

/**
 * @storyDesc Passing the `CardThumbnailOverlay` as a child of the `CardThumbnail` component allow you to add some global interactivity to it, without taking the risk to nest interactive elements when composing with other items inside of it.
 * You can set some interactive style to this overlay by setting the `interactive` prop.
 * Use the `as` to custom the root element to use.
 */
export const ThumbnailOverlay = () => {
  return (
    <Grid size="md" gap="xl">
      <Card elevation={1}>
        <CardThumbnail alt="img" src={`${src}?random=1`}>
          <CardThumbnailOverlay as="a" href="https://ljas.fr/" target="_blank">
            La Jarre à Son
          </CardThumbnailOverlay>
        </CardThumbnail>
        <CardHeader>Link overlay</CardHeader>
      </Card>

      <Card elevation={1}>
        <CardThumbnail alt="img" src={`${src}?random=2`}>
          <CardThumbnailOverlay as="a" href="https://ljas.fr/" target="_blank">
            La Jarre à Son
          </CardThumbnailOverlay>
          <CardThumbnailItem position="top-right">
            <Button aria-label="delete" icon intent="danger" hoverIntent>
              <Icon name="fa-solid fa-trash" />
            </Button>
          </CardThumbnailItem>
        </CardThumbnail>
        <CardHeader>Link overlay with a button</CardHeader>
      </Card>

      <Card elevation={1}>
        <CardThumbnail alt="img" src={`${src}?random=3`}>
          <CardThumbnailOverlay as="a" href="https://ljas.fr/" target="_blank" interactive>
            La Jarre à Son
          </CardThumbnailOverlay>
        </CardThumbnail>
        <CardHeader>Interactive link overlay</CardHeader>
      </Card>

      <Card elevation={1}>
        <CardThumbnail alt="img" src={`${src}?random=4`}>
          <CardThumbnailOverlay as="a" href="https://ljas.fr/" target="_blank" interactive>
            La Jarre à Son
          </CardThumbnailOverlay>
          <CardThumbnailItem position="top-right">
            <Button aria-label="delete" icon intent="danger" hoverIntent>
              <Icon name="fa-solid fa-trash" />
            </Button>
          </CardThumbnailItem>
        </CardThumbnail>
        <CardHeader>Interactive link overlay with a button</CardHeader>
      </Card>
    </Grid>
  );
};

/**
 * @storyDesc The `ThumbnailGrid` component is used to display multiple `Thumbnail` components.
 * It can display up to 3 children thumbnail.
 */
export const ThumbnailGrid = () => {
  return (
    <Grid size="sm" gap="xl">
      <Card>
        <CardThumbnailGrid>
          <CardThumbnail alt="img" src={`${src}?random=1`} />
          <CardThumbnail alt="img" src={`${src}?random=2`} />
          <CardThumbnail alt="img" src={`${src}?random=3`} />
        </CardThumbnailGrid>
      </Card>
      <Card>
        <CardThumbnailGrid>
          <CardThumbnail alt="img" />
          <CardThumbnail alt="img" />
          <CardThumbnail alt="img" />
          <CardThumbnail alt="img" />
          <CardThumbnail alt="img" />
        </CardThumbnailGrid>
      </Card>
      <Card>
        <CardThumbnailGrid>
          <CardThumbnail alt="img">
            <CardThumbnailItem position="center">
              <Stack direction="vertical" align="center">
                <Typography weight="bold" size="md">
                  No module in your project
                </Typography>
                <Button size="md">Add new module</Button>
              </Stack>
            </CardThumbnailItem>
          </CardThumbnail>
        </CardThumbnailGrid>
      </Card>
    </Grid>
  );
};

/**
 * @storyDesc Setting the `interactive` prop to `true` will add some interactive style to the whole card elevation={1} component.
 * It is also possible to manage a `selected` state with the corresponding prop.
 *
 * > ⚠️ You may need to think about accessibility when composing your card.
 * - Beware to not nest interactive elements.
 * - Beware that if the whole card elevation={1} is a link, all the content will be read by the screenreader as the link description.
 */
export const Interactive = () => {
  const [selected, setSelected] = useState(false);

  const handleSelect = () => setSelected((p) => !p);

  return (
    <Grid size="sm" gap="xl">
      <Card elevation={1} as="button" interactive outlined onClick={() => alert('clicked')}>
        <CardThumbnail alt="img" src={src} />
        <CardHeader>Button card</CardHeader>
      </Card>

      <Card
        as="a"
        interactive
        outlined
        onClick={() => alert('clicked')}
        elevation={1}
        href="https://github.com/"
        target="_blank"
      >
        <CardThumbnail alt="img" src={src} />
        <CardHeader>Link card</CardHeader>
      </Card>

      <Card
        interactive
        outlined
        selected={selected}
        onClick={handleSelect}
        as="button"
        aria-pressed={selected}
      >
        <CardHeader
          left={selected ? <Checkbox as="span" checked /> : <Icon name="fa-solid fa-folder" />}
        >
          Selectable card
        </CardHeader>
      </Card>
    </Grid>
  );
};

/**
 * @storyDesc If you need have both the card elevation={1} clickable as well as some nested interactive elements, use the `useMouseEventRedirect` utility hook
 * to redirect the click from the card elevation={1} to the right element.
 * This way, you don't need to properly nest interactive elements, and you keep your DOM clean 👌.
 *
 * > ⚠️ Beware of the possible side effects of using this pattern.
 * > Use it sparingly and only if necessary, the best beeing to not have the need to nest interactivity.
 */
export const GlobalClickHandler = () => {
  const [selected, setSelected] = useState(false);

  const handleSelect = () => setSelected((p) => !p);

  const [cardRef, triggerRef] = useMouseEventRedirect<HTMLDivElement, HTMLButtonElement>({
    nonInteractiveOnly: true,
  });

  const menuButton = (
    <Menu
      trigger={
        <Button aria-label="action" icon variant="ghost" intent="neutral">
          <Icon name="fa-solid fa-ellipsis" />
        </Button>
      }
    >
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
      <MenuItem>Item 3</MenuItem>
      <MenuItem>Item 4</MenuItem>
    </Menu>
  );

  return (
    <Card
      elevation={1}
      style={{ maxWidth: 400 }}
      ref={cardRef}
      interactive
      selected={selected}
      outlined
    >
      <CardHeader
        left={
          selected ? (
            <Checkbox as="span" checked />
          ) : (
            <Typography intent="placeholder">
              <Icon name="fa-solid fa-folder" />
            </Typography>
          )
        }
        right={menuButton}
      >
        <Typography ref={triggerRef} as="button" onClick={handleSelect}>
          FileName.txt
        </Typography>
      </CardHeader>
    </Card>
  );
};

/**
 * @storyDesc By default, some sub components of the `Card` will come with side gutters.
 * You can disable all of these side gutters by using the `disableGutter` prop on the `Card`.
 */
export const CardPadding = () => {
  return (
    <Grid size="md" gap="xl">
      <Card>
        <CardThumbnail alt="img" />
        <CardHeader>Card elevation={1} with normal gutter side</CardHeader>
        <CardContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam
        </CardContent>
      </Card>
      <Card elevation={1} disableGutter>
        <CardThumbnail alt="img" />
        <CardHeader>Card elevation={1} with disabled gutter side</CardHeader>
        <CardContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam
        </CardContent>
      </Card>
    </Grid>
  );
};

/**
 * @storyDesc The `Card` component as well as all of the `Card` sub-components accept an `as` prop to ovverride the root element to use.
 */
export const AsProps = () => {
  return (
    <Card elevation={1} as="section" style={{ maxWidth: 400 }}>
      <CardThumbnailGrid as="nav">
        <CardThumbnail alt="img" as="a" href="/" />
        <CardThumbnail alt="img" as="a" href="/" />
        <CardThumbnail alt="img" as="a" href="/" />
      </CardThumbnailGrid>
      <CardHeader as="span">Title</CardHeader>
      <CardContent as="p">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam
      </CardContent>
    </Card>
  );
};
