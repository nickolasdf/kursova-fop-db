import React, { memo } from "react";
import Grid from "@material-ui/core/Grid";

const PaymentsInfo = props => {
    return (
        <>
            <Grid item lg={4} md={6} xs={12}>
                <div className={"profile-edit-page__payments-data-item"}>1</div>
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
                <div className={"profile-edit-page__payments-data-item"}>2</div>
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
                <div className={"profile-edit-page__payments-data-add"}>
                    Добавить карту
                </div>
            </Grid>
        </>
    );
};

export default memo(PaymentsInfo);
