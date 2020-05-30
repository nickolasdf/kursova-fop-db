import React from "react";
import "./index.scss";
import { Grid } from "@material-ui/core";

const FopCard = ({ data }) => {
    return (
        <div className="fop-card">
            <h1>Дані платника податків</h1>
            <br/>
            <div className="fop-form__row">
                <Grid container alignItems="flex-end">
                    <Grid item xs={4}><label className="form-label">ПІБ</label></Grid>
                    <Grid item xs={8}>
                        {data.name}
                    </Grid>
                </Grid>
            </div>
            <div className="fop-form__row">
                <Grid container alignItems="flex-end">
                    <Grid item xs={4}><label className="form-label">Адреса</label></Grid>
                    <Grid item xs={8}>
                        {data.address}
                    </Grid>
                </Grid>
            </div>
            <div className="fop-form__row">
                <Grid container alignItems="flex-end">
                    <Grid item xs={4}><label className="form-label">КВЕДи</label></Grid>
                    <Grid item xs={8}>
                        {data.activities ? data.activities.map(item => item + "") : null}
                    </Grid>
                </Grid>
            </div>
            <div className="fop-form__row">
                <Grid container alignItems="flex-end">
                    <Grid item xs={4}><label className="form-label">Реєстраційний номер</label></Grid>
                    <Grid item xs={8}>
                        {data.registrationNumber}
                    </Grid>
                </Grid>
            </div>
            <div className="fop-form__row">
                <Grid container alignItems="flex-end">
                    <Grid item xs={4}><label className="form-label">Місце реєстрації</label></Grid>
                    <Grid item xs={8}>
                        {data.registerLocation}
                    </Grid>
                </Grid>
            </div>
            <div className="fop-form__row">
                <Grid container alignItems="flex-end">
                    <Grid item xs={4}><label className="form-label">Дата реєстрації</label></Grid>
                    <Grid item xs={8}>
                        {data.registrationDate}
                    </Grid>
                </Grid>
            </div>
            <div className="fop-form__row">
                <Grid container alignItems="flex-end">
                    <Grid item xs={4}><label className="form-label">Номер телефону</label></Grid>
                    <Grid item xs={8}>
                        {data.phone}
                    </Grid>
                </Grid>
            </div>
            <div className="fop-form__row">
                <Grid container alignItems="flex-end">
                    <Grid item xs={4}><label className="form-label">Електронна пошта</label></Grid>
                    <Grid item xs={8}>
                        {data.email}
                    </Grid>
                </Grid>
            </div>
            <div className="fop-form__row">
                <Grid container alignItems="flex-end">
                    <Grid item xs={4}><label className="form-label">Податковий номер</label></Grid>
                    <Grid item xs={8}>
                        {data.taxNumber}
                    </Grid>
                </Grid>
            </div>
        </div>
    )
};

export default FopCard;