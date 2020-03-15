import React from 'react';

import { withConfig } from '../withConfig';
import { useStyles, Props } from './types';

import GoofyIcon from '../images/goofy-hat.svg';
import {
    AppBar, Toolbar,
    Typography
}  from '@material-ui/core';

import Home from './Home';

const App = (props: Props): JSX.Element => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <img 
                        className={classes.propellerIcon}
                        src={GoofyIcon} alt="Goofy Icon"
                    />
                    <Typography
                        component="div"
                        color="inherit"
                        className={classes.GoofyTitle}
                    >
                        Scheduling & Rundown System
                    </Typography>
                </Toolbar>
            </AppBar>
            <Home />
        </div>
    );

};

export default withConfig(App);