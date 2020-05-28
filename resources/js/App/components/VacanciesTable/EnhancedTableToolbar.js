import React from "react";
import { makeStyles } from "@material-ui/core";
import { lighten } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import * as PropTypes from "prop-types";
import Checkbox from "@material-ui/core/Checkbox";

const useToolbarStyles = makeStyles(theme => ({
    root: {
        padding: 0,
        minHeight: "48px"
    },
    highlight: {
        backgroundColor: "#fafbfd"
    },
    spacer: {
        flex: "1 1 100%"
    },
    actions: {
        color: theme.palette.text.secondary
    },
    title: {
        flex: "0 0 auto"
    }
}));

const EnhancedTableToolbar = props => {
    const classes = useToolbarStyles();
    const {
        numSelected,
        rowCount,
        onSelectAllClick,
        onCombineSelected,
        openWarnModal
    } = props;
    return (
        <React.Fragment>
            {numSelected > 0 ? (
                <Toolbar
                    className={clsx(classes.root, {
                        [classes.highlight]: numSelected > 0
                    })}
                >
                    <Checkbox
                        indeterminate={
                            numSelected > 0 && numSelected < rowCount
                        }
                        checked={numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ "aria-label": "select all desserts" }}
                    />
                    <div className={classes.title}>
                        <Typography variant="subtitle1">
                            {numSelected}
                        </Typography>
                    </div>
                    <div>
                        <button
                            onClick={openWarnModal}
                            className="toolbar_buttons delete_button"
                        >
                            УДАЛИТЬ
                        </button>
                    </div>
                </Toolbar>
            ) : null}
        </React.Fragment>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired
};

export default EnhancedTableToolbar;
