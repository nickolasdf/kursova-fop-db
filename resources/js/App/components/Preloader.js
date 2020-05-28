import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    progressWrapper: {
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    progressColor: {
        color: 'currentColor'
    }
}));

const Preloader = ({ size, currentColor = false }) => {
    const classes = useStyles();

    return (
        <div className={classes.progressWrapper}>
            <CircularProgress
                classes={currentColor ? { colorPrimary: classes.progressColor } : null}
                className={classes.progress}
                size={size}
            />
        </div>
    );
};

export default Preloader;
