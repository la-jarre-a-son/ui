import React from 'react';
import {
    Title,
    Subtitle,
    Description,
    Primary,
    Controls,
    Stories,
} from '@storybook/addon-docs';
import darkTheme from './darkTheme';

import { Theming } from './utils/Theming';

const docs = {
    theme: darkTheme,
    page: () => (
        <>
            <Title />
            <Subtitle />
            <Description />
            <Primary />
            <Controls />
            <Theming />
            <Stories />
        </>
    ),
};

export default docs;
