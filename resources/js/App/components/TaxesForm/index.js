import React, {useEffect, useState} from "react";
import "./index.scss";
import FormWrapper from "../FormWrapper";
import {Grid, MenuItem, Select, TextField} from "@material-ui/core";
import requests from "../../requests";
import { useDispatch } from "react-redux";
import {throwAlert} from "../../reducers/App/actions";
import {SUCCESS} from "../../config/alertVariants";

const TaxesForm = ({ onClose, updateTaxes, taxes }) => {
    const [tax, setTax] = useState("");
    const [percent, setPercent] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        if(taxes && taxes.length > 0) {
            setTax(taxes[1].id);
            setPercent(taxes[1].percent);
        }
    }, [taxes])

    const handleSelect = event => {
        setTax(event.target.value)
    };

    const handleChange = event => {
        setPercent(event.target.value)
    };

    const submitForm = event => {
        event.preventDefault();
        requests.Tax.edit(tax, { percent }).then(resp => {
            onClose();
            dispatch(throwAlert(SUCCESS, "Податки успішно змінено"))
            updateTaxes();
        })
    };

    return (
        <form onSubmit={submitForm}>
            <FormWrapper title="Редагувати податки" onClose={onClose}>
                <div className="fop-form__row">
                    <Grid container alignItems="flex-end">
                        <Grid item xs={4}><label className="form-label">Податок</label></Grid>
                        <Grid item xs={8}>
                            <Select
                                style={{ width: '100%' }}
                                onChange={handleSelect}
                                value={tax}
                            >
                                {
                                    taxes.map(item => {
                                        return (
                                            <MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </Grid>
                    </Grid>
                </div>
                <div className="fop-form__row">
                    <Grid container alignItems="flex-end">
                        <Grid item xs={4}><label className="form-label">Нарахування %</label></Grid>
                        <Grid item xs={8}>
                            <TextField value={percent} type="number" fullWidth={true} onChange={handleChange} min="1" max="100"/>
                        </Grid>
                    </Grid>
                </div>
            </FormWrapper>
        </form>
    )
};

export default TaxesForm;