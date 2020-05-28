import React, { useState, useEffect } from "react";
import requests from "../../requests";
import { Grid } from "@material-ui/core";
import "./CreateAccountForm.scss";
import { createCurrencySelectData } from "./utils";
import { useDispatch } from "react-redux";
import { throwAlert } from "../../reducers/App/actions";
import { SUCCESS } from "../../config/alertVariants";
import Input from "../../components/custom/Input";
import Select from "../../components/custom/Select";
import { Formik } from "formik";
import { accountFormValues } from "./utils";
import * as Yup from "yup";
import FormActionGroup from "../../components/FormActionGroup";

const CreateAccountForm = ({ onClose, officeId, onSubmit }) => {
    const [currencyList, setCurrencyList] = useState([]);
    const [currency, setCurrency] = useState({});

    const dispatch = useDispatch();

    const initialValues = accountFormValues;

    const validationSchema = Yup.object().shape({
        amount: Yup.string().required("Сума обязательна"),
        name: Yup.string().required("Название обязательное")
    });

    useEffect(() => {
        getCurrencyList();
    }, []);

    const getCurrencyList = () => {
        requests.Enum.get({ types: ["currency"]})
            .then(resp => {
                const data = createCurrencySelectData(resp.data.data.currency);
                setCurrencyList(data);
                return data;
            })
            .then(data => {
                setCurrency(data[0])
            })
    };

    const handleSelect = value => {
        setCurrency(value)
    };

    const submitForm = values => {
        const formData = {
            currency_id: currency.value,
            total: values.amount,
            name: values.name,
            description: values.description
        };
        requests.Account.createAccount(officeId, formData).then(() => {
            onClose();
            dispatch(throwAlert(SUCCESS, "Рахунок створений"));
            onSubmit();
        })
    };

    return(
        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={submitForm}
                validationSchema={validationSchema}
            >
                {
                    ({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        errors,
                        touched
                     }) => (
                        <form onSubmit={handleSubmit} className="create_account_form">
                            <div className="account_form_wrapper">
                                <div className="account_form_title">Добавить счет</div>
                                <Grid container alignItems="center">
                                    <Grid item xs={4}>
                                        <div className="input_label_wrapper">
                                            <span>Сума</span>
                                        </div>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <div className="amount_with_currency_wrapper">
                                            <Grid container>
                                                <Grid item xs={8}>
                                                    <div className="input_wrapper">
                                                        <Input
                                                            className="amount_input"
                                                            onChange={handleChange("amount")}
                                                            placeholder="0.00"
                                                            type="number"
                                                            isError={Boolean(touched.amount && errors.amount)}
                                                            errorMessage={errors.amount}
                                                            onBlur={handleBlur("amount")}
                                                        />
                                                    </div>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Select
                                                        className="account_select_currency"
                                                        value={currencyList[0]}
                                                        onChange={handleSelect}
                                                        options={currencyList}
                                                        placeholder="Валюта"
                                                        styles={{
                                                            control: {
                                                                height: "50px",
                                                                borderLeft: "none"
                                                            }
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid container alignItems="center">
                                    <Grid item xs={4}>
                                        <div className="input_label_wrapper">
                                            <span>Название счета</span>
                                        </div>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <div className="input_wrapper">
                                            <Input
                                                onChange={handleChange("name")}
                                                placeholder="Приват-банк"
                                                isError={Boolean(touched.name && errors.name)}
                                                errorMessage={errors.name}
                                                onBlur={handleBlur("name")}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid container alignItems="center">
                                    <Grid item xs={4}>
                                        <div className="input_label_wrapper">
                                            <span>Описание</span>
                                        </div>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <div className="input_wrapper">
                                            <Input
                                                onChange={handleChange("description")}
                                                placeholder="не обязательно"
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                            <FormActionGroup onClose={onClose} />
                        </form>
                        )
                }
            </Formik>
        </div>
    )
};

export default CreateAccountForm;
