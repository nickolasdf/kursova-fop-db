import React from "react";
import {Tab, makeStyles} from "@material-ui/core";
import MuiTabs from "@material-ui/core/Tabs";

const useStyles =  makeStyles({
    tab: {
        borderRight: "1px solid #e7eaed",
        height: "60px"
    },
    currentTab: {
        backgroundColor: "#FAFAFA",
        borderBottom: "none"
    },
    tabIndicator: {
        display: "none"
    },
    tabs: {
        backgroundColor: "#ffffff",
    },
    tabPanel: {
        width: "720px"
    },
    tabText: {
        fontWeight: "bold",
        fontSize: "1rem",
        textTransform: "none"
    }
});

const Tabs = ({ tabs, ...rest }) => {
    const classes = useStyles();

    return (
        <MuiTabs
            className={classes.tabs}
            variant="fullWidth"
            scrollButtons="auto"
            classes={{ indicator: classes.tabIndicator }}
            {...rest}
        >
            {
                tabs.map((item, index) => (
                    <Tab
                        key={item.id}
                        label={item.label}
                        classes={{
                            root: index !== tabs.length - 1 ? classes.tab : null,
                            selected: item.id === rest.value ? classes.currentTab : null,
                            wrapper: classes.tabText
                        }}
                    />
                ))
            }
        </MuiTabs>
    )
};

export default Tabs;
