import React from "react";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";

import ServerItem from "../ServerItem";
import "./index.scss";
import ServerItemAddButton from "../ServerItemAddButton";
import Preloader from "../../Preloader";

const ServersList = () => {
    const servers = useSelector(state => state.Servers);

    return (
        <>
            {
                !servers.isLoading ?
                    <Grid container spacing={2}>
                        {
                            servers.data.map(item => (
                                <Grid key={item.id} item xs={12} sm={12} md={6} lg={4} xl={3}>
                                    <ServerItem server={item} />
                                </Grid>
                            ))
                        }
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                            <ServerItemAddButton />
                        </Grid>
                    </Grid> :
                    <Preloader />
            }
        </>
    )
};

export default ServersList;
