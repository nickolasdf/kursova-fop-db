import React from "react";
import "./OfficeCreateForm.scss";
import Grid from "@material-ui/core/Grid";
import { officeFromStructure } from "./utils";
import { Formik } from "formik";
import * as Yup from "yup";
import requests from "../../requests";
import {SUCCESS} from "../../config/alertVariants";
import { throwAlert } from "../../reducers/App/actions";
import { useDispatch } from "react-redux";
import { officeFormValues } from "./utils";
import Input from "../../components/custom/Input";

const OfficeCreateForm = props => {
    const { onClose, onSubmit, defaultData = {} } = props;

    const dispatch = useDispatch();

    const initialValues = {
        ...officeFormValues,
        ...defaultData
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Имя обязательное")
    });

    const submitData = (values) => {
        if(defaultData.id) {
            requests.Office.update(defaultData.id, values).then(() => {
                onClose();
                dispatch(throwAlert(SUCCESS, "Офис обновлен"));
                onSubmit();
            })
        }
        else {
            requests.Office.create(values).then(() => {
                onClose();
                dispatch(throwAlert(SUCCESS, "Офис создан"));
                onSubmit();
            })
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submitData}
        >
            {
                ({
                     errors,
                     touched,
                     handleChange,
                     handleBlur,
                     handleSubmit,
                     values,
                }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <div className="form_wrapper">
                                <div className="form_title">
                                    {defaultData.id ? "Редактировать офис" : "Добавить офис"}
                                </div>
                                {
                                    officeFromStructure.map(item => {
                                        return (
                                            <div key={item.id}>
                                                {item.title &&
                                                <div className="office_form_section_title">{item.title}</div>}
                                                {
                                                    item.sectionInputs.map(inputItem => {
                                                        return (
                                                            <div key={inputItem.id} className="form_row">
                                                                <Grid container alignItems="center">
                                                                    <Grid item xs={4}>
                                                                        <span>{inputItem.label}</span>
                                                                    </Grid>
                                                                    <Grid item xs={8}>
                                                                        <div className="office_form_input_wrapper">
                                                                            <Input
                                                                                defaultValue={values[inputItem.field]}
                                                                                placeholder={inputItem.placeholder}
                                                                                onChange={handleChange(inputItem.field)}
                                                                                onBlur={handleBlur(inputItem.field)}
                                                                                isError={Boolean(errors[inputItem.field] && touched[inputItem.field])}
                                                                                errorMessage={errors[inputItem.field]}
                                                                            />
                                                                        </div>
                                                                    </Grid>
                                                                </Grid>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="form_actions_wrapper">
                                <div>
                                    <button type="submit" className="form_action_btn form_submit_action_btn">
                                        Сохранить
                                    </button>
                                    <button type="button" className="form_action_btn form_cancel_action_btn" onClick={onClose}>
                                        Отменить
                                    </button>
                                </div>
                            </div>
                        </form>
                    )
                }
            }
        </Formik>
    );
};

export default OfficeCreateForm;
