import { teal, red, orange } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const primaryColor = teal;

export default createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            dark: primaryColor[700],
            light: red.A200,
            main: primaryColor[800],
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
