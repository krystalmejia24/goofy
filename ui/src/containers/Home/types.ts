import { makeStyles } from '@material-ui/core';

export interface Props {}

export const useStyles = makeStyles(theme => ({
    container: {
        'padding-top': '30px',
        'margin-left': 'auto',
        'margin-right': 'auto',
        'max-width': '1400px',
    },
    tableHeader: {
        'font-size': '1.25rem',
        'font-family': 'Lato, sans-serif',
        'font-weight': 500,
        'line-height': 3,
        'padding-left': '20px',
    }
}));