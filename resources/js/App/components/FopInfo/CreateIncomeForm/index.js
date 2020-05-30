import React, {useState} from "react";
import "./index.scss";
import { Grid, TextField } from "@material-ui/core";
import FormWrapper from "../../FormWrapper";
import requests from "../../../requests";
import { useDispatch } from "react-redux"
import {throwAlert} from "../../../reducers/App/actions";
import {SUCCESS} from "../../../config/alertVariants";
import {DatePicker} from "@material-ui/pickers";

const CreateIncomeForm = ({ id, updateFopData, onClose }) => {
    const [total, setTotal] = useState("");
    const [date, setDate] = useState(new Date());

    const dispatch = useDispatch();

    const submitForm = event => {
        event.preventDefault();

        requests.Fop.addIncome(id, { total, date }).then(resp => {
            dispatch(throwAlert(SUCCESS, "Дохід успішно створений"));
            onClose();
            updateFopData();
        })
    };

    const handleChange = event => {
        setTotal(event.target.value);
    };

    const handleDateChange = value => {
        setDate(value.format())
    };

    return (
        <form onSubmit={submitForm}>
            <FormWrapper title="Додати дохід" onClose={onClose}>
                <Grid container alignItems="flex-end">
                    <Grid item xs={4}>
                        <label className="form-label">Сума</label>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField onChange={handleChange} fullWidth={true}/>
                    </Grid>
                </Grid>
                <br />
                <Grid container alignItems="flex-end">
                    <Grid item xs={4}>
                        <label className="form-label">Дата</label>
                    </Grid>
                    <Grid item xs={8}>
                        <DatePicker
                            style={{ width: '100%' }}
                            variant="inline"
                            autoOk
                            onChange={handleDateChange}
                            value={date}
                        />
                    </Grid>
                </Grid>
            </FormWrapper>
        </form>
    )
};

export default CreateIncomeForm;