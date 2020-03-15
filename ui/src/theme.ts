import { green, red, orange } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const primaryColor = green;

export default createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            dark: primaryColor[700],
            light: red.A200,
            main: primaryColor[900],
        },
        secondary: {
            dark: red.A700,
            light: '#ffffff',
            main: '#ffffff',
        },
        warning: {
            dark:  orange[500],
            light: orange[100],
            main: orange[500]
        }
    },
    typography: {
        fontFamily: 'Lato, sans-serif',
    },
});
