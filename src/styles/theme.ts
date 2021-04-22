import { Theme, createMuiTheme } from '@material-ui/core/styles';

export const DefaultTheme: Theme = createMuiTheme({
    palette: {
        type: 'dark',
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
                },
                html: {
                    height: '100%',
                },
            },
        },
    },
});
