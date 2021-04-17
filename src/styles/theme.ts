import { ThemeColors } from './colors';
import { Theme, createMuiTheme } from '@material-ui/core/styles';
import { Shadows } from '@material-ui/core/styles/shadows';

interface FullAppTheme extends Theme {
    activeRecipeColor: string; // TODO: where/how is this used?
    inactiveRecipeColor: string; // TODO: where/how is this used?
}

export type AppTheme = Partial<FullAppTheme>;

export const DefaultTheme: AppTheme = createMuiTheme({
    palette: {
        primary: {
            main: ThemeColors.DarkBlue,
            contrastText: ThemeColors.White,
            // Note: other options that can be set here are light and dark,
            // which are the colors used when in light or dark mode (light mode is default)
        },
        // Note: can also set secondary color palette
        background: {
            default: ThemeColors.White,
        },
        text: {
            primary: ThemeColors.Black,
            secondary: ThemeColors.LightGray,
        },
    },
    shadows: Array(25).fill('none') as Shadows,
    typography: {
        subtitle1: {
            color: ThemeColors.DarkestGrey,
            fontSize: '15px',
        },
        subtitle2: {
            color: ThemeColors.DarkGray,
            fontSize: '12px',
        },
        body1: {
            fontSize: '14px',
        },
    },
    shape: {
        borderRadius: 1,
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                body: {
                    margin: 0,
                    fontFamily: [
                        '-apple-system',
                        'BlinkMacSystemFont',
                        'Segoe UI',
                        'Roboto',
                        'Oxygen',
                        'Ubuntu',
                        'Cantarell',
                        'Fira Sans',
                        'Droid Sans',
                        'Helvetica Neue',
                        'sans-serif',
                    ].join('.'),
                    height: '100%',
                    backgroundColor: ThemeColors.White,
                },
                html: {
                    height: '100%',
                },
            },
        },
    },
});
