import React from "react";
import {Dialog, Grid, makeStyles} from "@material-ui/core";

import MultiChangeHostingTabs from "./MultiChangeHostingTabs";
import HostingCustomersList from "./HostingContragentsList";
import "./MultiChangeHostingModal.scss";

const useStyles = makeStyles({
    grid: {
        height: "100%"
    }
});

const MultiChangeHostingModal = ({ open, onClose, tab, selectedHostings }) => {
    const classes = useStyles();

    return (
        <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="md">
            <div className="multi-change-hosting-modal">
                <Grid className={classes.grid} container>
                    <Grid className={classes.grid} item xs={6}>
                        <MultiChangeHostingTabs tabValue={tab} selectedHostings={selectedHostings} onClose={onClose}/>
                    </Grid>
                    <Grid className={classes.grid} item xs={6}>
                        <HostingCustomersList selected={selectedHostings} />
                    </Grid>
                </Grid>
            </div>
        </Dialog>
    )
};

export default MultiChangeHostingModal;
