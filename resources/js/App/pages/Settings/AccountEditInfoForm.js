import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Grid } from "@material-ui/core";
import Input from "../../components/custom/Input";
import requests from "../../requests";
import {SUCCESS} from "../../config/alertVariants";
import {throwAlert} from "../../reducers/App/actions";
import { useDispatch } from "react-redux";
import FormActionGroup from "../../components/FormActionGroup";

const AccountEditInfoForm = props => {
    const dispatch = useDispatch();

    const {
        onClose,
        accountId,
        onSubmit,
        defaultData = {
            name: "",
            description: ""
        }
    } = props;

    const initialValues = defaultData;

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Имя обязательное")
    });

    const submitForm = values => {
        requests.Account.update(accountId, values).then(resp => {
            if(resp) {
                dispatch(throwAlert(SUCCESS, "Счет обновлен"));
                onSubmit();
                onClose();
            }
        })
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={submitForm}
            validationSchema={validationSchema}
        >
            {
                ({
                    handleChange,
                    touched,
                    errors,
                    handleBlur,
                    handleSubmit,
                    values
                 }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="form_wrapper">
                            <div className="form_title">
                                Редактировать описание счета
                            </div>
                            <div className="form_row">
                                <Grid container alignItems="center">
                                    <Grid item xs={4}>
                                        <span>Имя</span>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Input
                                            placeholder="Введите имя счета"
                                            onChange={handleChange("name")}
                                            onBlur={handleBlur("name")}
                                            isError={errors.name && touched.name}
                                            errorMessage={errors.name}
                                            defaultValue={values.name}
                                        />
                                    </Grid>
                                </Grid>
                            </div>
                            <div className="form_row">
                                <Grid container alignItems="center">
                                    <Grid item xs={4}>
                                        <span>Описание</span>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Input
                                            placeholder="Описание счета"
                                            onChange={handleChange("description")}
                                            defaultValue={values.description}
                                        />
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                        <FormActionGroup onClose={onClose}/>
                    </form>
                )
            }
        </Formik>
    )
};

export default AccountEditInfoForm;
