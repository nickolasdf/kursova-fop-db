import React from 'react';
import { makeStyles } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import * as PropTypes from 'prop-types';

const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        borderBottom: '1px solid #e0e0e0'
    },
    spacer: {
        flex: '1 1 100%'
    },
    actions: {
        color: theme.palette.text.secondary
    },
    title: {
        flex: '0 0 auto',
        marginRight: '16px'
    },
    actionBtn: {
        margin: '0 16px',
        textTransform: 'capitalize',
        fontWeight: 'bold',
        fontSize: 14
    }
}));

const EnhancedTableToolbar = props => {
    const classes = useToolbarStyles();
    const {
        numSelected,
        title,
        components,
        selected,
        clearSelected
    } = props;

    return (
        <React.Fragment>
            {
                <Toolbar
                    className={classes.root}
                >
                    {
                        numSelected > 0 &&
                        <>
                            <div className={classes.title}>
                                <Typography variant="subtitle1">
                                    {numSelected}
                                </Typography>
                            </div>
                            {
                                components.Toolbar ?
                                    <components.Toolbar
                                        selected={selected}
                                        clearSelected={clearSelected}
                                    /> :
                                    <Typography variant="subtitle1">
                                        {title}
                                    </Typography>
                            }
                        </>
                    }
                </Toolbar>
            }
        </React.Fragment>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired
};

export default EnhancedTableToolbar;
