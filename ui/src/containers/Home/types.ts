import { makeStyles } from '@material-ui/core';

export interface Props {}

export const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: '30px',
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '1400px',
    },
    tableHeader: {
        fontSize: '1.25rem',
        fontFamily: 'Lato, sans-serif',
        fontWeight: 500,
        lineHeight: 3,
        paddingLeft: '20x',
    }
}));