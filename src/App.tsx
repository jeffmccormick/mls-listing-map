import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React, { FC } from 'react';
import { ErrorHandler } from './components/general/errorHandler';
import { Main } from './components/main';
import { ListingProvider } from './store/listingStore';
import { DefaultTheme } from './styles/theme';

export const App: FC = () => {
    return (
        // Highest level applies the default Material UI theme to everything
        <ThemeProvider theme={DefaultTheme}>
            {/* MUI helper to standardize the CSS for the application */}
            <CssBaseline />
            <ErrorHandler>
                <ListingProvider>
                    <Main />
                </ListingProvider>
            </ErrorHandler>
        </ThemeProvider>
    );
};

export default App;
