import React from "react";
import "./style.scss";
import { Grid } from "@material-ui/core";

const InfoBox = ({ office }) => (
    <div className="info-box">
        <div className="info-box__office-title">{office.name}</div>
        {
            office.accounts.length > 0 ?
                <div className="info-box__money-info">
                    <Grid container spacing={1}>
                        {office.accounts.map(acc => (
                            <Grid key={acc.id} item xs={6}>
                                <div className="info-box__row">
                                    <span>{acc.typeName}</span>
                                    <span className="info-box__total">
                                    {acc.total} {acc.currencyValue}
                                </span>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </div> :
                <span>Нет счетов</span>
        }

    </div>
);

export default InfoBox;
