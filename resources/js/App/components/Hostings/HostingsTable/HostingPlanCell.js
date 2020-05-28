import React from "react";
import "./HostingPlanCell.scss"
import { makeStyles, LinearProgress } from "@material-ui/core";
import { ErrorOutline } from "@material-ui/icons";

const useStyles = makeStyles({
    root: {
        height: 5,
        background: "#EAEAEA",
        borderRadius: 3
    },
    bar: {
        borderRadius: 3
    },
    warningIcon: {
          color: "#FFB342"
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

const HostingPlanCell = ({ indicatorValue = 0, date = "" }) => {
    const classes = useStyles();

    const calcColor = value => {
        if(value > 60) {
            return classes.greenIndicator
        }
        else if(value > 30 && value <= 60) {
            return classes.orangeIndicator
        }
        else if(value <= 30) {
            return classes.redIndicator
        }
    };

    return (
        <div className="hosting_plan_cell_wrapper">
            <div className="hosting_plan_cell_header">
                <span className="hosting_plan_cell_date">{date}</span>
                {
                    (indicatorValue > 30 && indicatorValue <= 60) &&
                        <ErrorOutline className={classes.warningIcon} />
                }
            </div>
            <div>
                <LinearProgress
                    classes={{
                        root: classes.root,
                        barColorPrimary: calcColor(indicatorValue),
                        bar: classes.bar
                    }}
                    variant="determinate"
                    value={100 - (indicatorValue * 100 / 365)}
                />
            </div>
        </div>
    )
};

export default HostingPlanCell;
