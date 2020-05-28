import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./index.scss";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    progress: {
        margin: theme.spacing(2),
    },
    progressWrapper: {
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"

    }
}));

const Spinner = () => {
    const classes = useStyles();

    return (
        <div className="spinner-component_container">
            <CircularProgress className={classes.progress} />
        </div>
    )
};

export default Spinner;
