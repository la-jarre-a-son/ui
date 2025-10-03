
import { Preview } from '@storybook/react-webpack5';
import { SyntaxHighlighter } from 'storybook/internal/components'
/* @ts-ignore */
import scss from 'react-syntax-highlighter/dist/esm/languages/prism/scss';

import { withTheme, themeGlobalTypes } from './theme';
import docs from './docs';

SyntaxHighlighter.registerLanguage('scss', scss)

export const globalTypes = {
    ...themeGlobalTypes,
};

export const decorators = [withTheme];

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        backgrounds: { disabled: true },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        options: {
            storySort: {
                order: [
                    'Documentation',
                    ['Introduction'],
                    'Components',
                    ['Default'],
                    'Hooks',
                    'Utilities',
                    'Showcase',
                    '*',
                ],
            },
        },
        docs,
    }
};

export default preview;
