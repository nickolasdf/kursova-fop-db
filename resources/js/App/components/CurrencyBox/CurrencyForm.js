import React, {useEffect, useState} from "react";
import { TextField } from "@material-ui/core";
import requests from "../../requests";
import { connect } from "react-redux";
import { throwAlert } from "../../reducers/App/actions";
import { getDashboardData } from "../../reducers/Dashboard/actions";
import { getChartData } from "../../reducers/Chart/actions";
import { SUCCESS } from "../../config/alertVariants";
import { withStyles } from "@material-ui/core/styles";

const styles = {
    input: {
        padding: 0,
        maxWidth: "100px"
    }
};

const CurrencyForm = props => {
    const {
        id,
        updateCurrency,
        throwAlert,
        classes,
        rate,
        closeEdit,
        getDashboardData,
        getChartData,
    } = props;

    const [currency, setCurrency] = useState("");

    let currencyInputRef = null;

    useEffect(() => {
        currencyInputRef && currencyInputRef.focus();
        rate && setCurrency(rate);
    }, []);

    const handleChange = event => {
        setCurrency(event.target.value)
    };

    const updateDashboardPage = () => {
        getDashboardData();
        getChartData();
    };

    const submitForm = (event) => {
        event.preventDefault();
        const formData = {
            rate: currency
        };
        if(parseFloat(currency) !== parseFloat(rate)) {
            requests.Currency.update(id, formData).then(resp => {
                if(resp) {
                    closeEdit();
                    updateCurrency();
                    updateDashboardPage();
                    throwAlert(SUCCESS, "Валюта оновлена")
                }
            })
        }
        else
            closeEdit();
    };

    return(
        <form onSubmit={submitForm}>
            <TextField
                defaultValue={rate}
                fullWidth={true}
                onChange={handleChange}
                inputProps={{
                    className: classes.input
                }}
                onBlur={closeEdit}
                inputRef={input => currencyInputRef = input}
            />
        </form>
    )
};

const mapDispatchToProps = {
    throwAlert,
    getDashboardData,
    getChartData
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(CurrencyForm));
