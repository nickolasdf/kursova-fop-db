import React from "react";
import MaterialLinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        height: 5,
        background: "#EAEAEA",
        borderRadius: 3
    },
    bar: {
        borderRadius: 3
    },
    redIndicator: {
        background: "#FB2E2E"
    },
    orangeIndicator: {
        background: "#FFB342"
    },
    greenIndicator: {
        background: "#4CD852"
    }
});

const LinearProgress = ({ value = 0 }) => {
    const classes = useStyles();

    const calcColor = value => {
        if(value <= 60) {
            return classes.greenIndicator
        }
        else if(value > 60 && value <= 90) {
            return classes.orangeIndicator
        }
        else if(value > 90) {
            return classes.redIndicator
        }
    };

    return <MaterialLinearProgress
        classes={{
            root: classes.root,
            barColorPrimary: calcColor(value),
            bar: classes.bar
        }}
        variant="determinate"
        value={value}
    />
};

export default LinearProgress;
