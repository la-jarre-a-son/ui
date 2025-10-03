import React from 'react';
import { Meta, Story } from '@storybook/react-webpack5';

import { extractThemeVariables } from '../../../.storybook/utils/Theming';

import moduleCss from '!!raw-loader!./Link.module.scss?raw';
import themeVariablesScss from '!!raw-loader!../../theme/jar/variables/Link.scss?raw';

import { Link } from '.';

export default {
  title: 'Components/Navigation/Link',
  component: Link,
  tags: ['autodocs'],
  parameters: {
    theming: extractThemeVariables([moduleCss, themeVariablesScss], 'Link'),
  },
} as Meta;

type StoryProps = React.ComponentProps<typeof Link>;

const Template: Story<StoryProps> = ({ children, ...rest }) => <Link {...rest}>{children}</Link>;

export const Default = Template.bind({});
Default.args = {
  href: 'https://ljas.fr',
  target: '_blank',
  children: 'My Link',
  intent: 'primary',
  underlined: false,
  disabled: false,
};

/**
 * @storyDesc Use the `as` prop to override the root element to use.
 * It is specially usefull to interface the `Link` component with another third party link.
 */
export const AsProp = () => {
  const CustomLink: React.FC<{ route: string; disabled: boolean } & React.ComponentProps<'a'>> = ({
    route,
    disabled,
    onClick,
    ...props
  }) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!disabled) {
        window.alert(`Going to route ${route}`);
      }

      if (onClick) {
        onClick(e);
      }
    };

    return (
      <a
        {...props}
        href={`https://ljas.fr/${route}`}
        rel="noreferrer"
        target="_blank"
        onClick={handleClick}
      ></a>
    );
  };

  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <Link as={CustomLink} route="feed">
        My custom link
      </Link>
      <Link as={CustomLink} route="feed" disabled>
        My custom link disabled
      </Link>
    </div>
  );
};
