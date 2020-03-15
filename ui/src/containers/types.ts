import { makeStyles } from '@material-ui/core';

export interface Props {}

export const useStyles = makeStyles(theme => ({
    GoofyTitle: {
        flex: 1,
        'font-size': '1.25rem',
        'font-family': 'Lato, sans-serif',
        'font-weight': 600,
        'line-height': '1.6',
        'padding-left': '10px',
    },
    propellerIcon: {
        width: '35px',
    },
    root: {
        flexGrow: 1,
    },
}));