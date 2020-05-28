import React from "react";
import {Tooltip, withStyles} from "@material-ui/core";

const LightTooltip = withStyles(theme => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 14,
        fontWeight: "bold"
    },
}))(Tooltip);

export default LightTooltip;
