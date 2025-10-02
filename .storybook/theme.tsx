import React from 'react';
import { DecoratorFn } from '@storybook/react';

import "@flaticon/flaticon-uicons/css/regular/rounded.css";
import "@flaticon/flaticon-uicons/css/brands/all.css";

import { ThemeProvider } from '../src/theme';

import './theme.scss';

export const themeGlobalTypes = {
    theme: {
        name: 'Switch theme',
        description: 'Global theme for components',
        defaultValue: 'dark',
        toolbar: {
            // The icon for the toolbar item
            icon: 'paintbrush',
            // Array of options
            items: [
                { value: 'dark', title: 'dark' },
                { value: null, title: 'none' },
            ],
            showName: false,
        },
    },
};

export const withTheme: DecoratorFn = (StoryFn, context) => {
    const theme = context.parameters.theme || context.globals.theme;
    return (
        <main>
            <ThemeProvider theme={'jar'} variant={theme}>
                <StoryFn />
            </ThemeProvider>
        </main>
    );
};
