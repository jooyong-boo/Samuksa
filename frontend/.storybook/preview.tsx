import React from 'react';
import { Preview } from '@storybook/react';
import { styledTheme } from '../src/styles/styledTheme';
import { muiTheme } from '../src/styles/muiTheme';
import { StyledEngineProvider } from '@mui/styled-engine';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
    decorators: [
        (Story) => {
            return (
                <StyledEngineProvider injectFirst>
                    <StyledThemeProvider theme={styledTheme}>
                        <MuiThemeProvider theme={muiTheme}>
                            <Story />
                        </MuiThemeProvider>
                    </StyledThemeProvider>
                </StyledEngineProvider>
            );
        },
    ],
};

export default preview;
