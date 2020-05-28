import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";

import Input from "../../custom/Input";
import requests from "../../../requests";
import FormActionGroup from "../../FormActionGroup";
import {getHostings} from "../../../reducers/Hostings/actions";
import "./HostingEditAccessesForm.scss";
import {throwAlert} from "../../../reducers/App/actions";
import {SUCCESS} from "../../../config/alertVariants";

const HostingEditAccessesForm = ({ onSave, hostingId, defaultData, cancelEdit }) => {
    const initialValues = {
        accessToHosting: "",
        accessToDomain: ""
    };

    const [form, setForm] = useState(initialValues);
    const dispatch = useDispatch();

    useEffect(() => {
        setForm(defaultData)
    }, [defaultData]);

    const handleChange = name => event => {
        setForm({
            ...form,
            [name]: event.target.value
        })
    };

    const submitForm = event => {
        event.preventDefault();
        requests.Hostings.updateAccesses(hostingId, {
            access_hosting: form.accessToHosting,
            access_domain: form.accessToDomain
        }).then(() => {
            dispatch(throwAlert(SUCCESS, "Доступы изменены"))
        }).then(() => {
            onSave();
        }).then(() => {
            dispatch(getHostings())
        });
    };

    return (
        <form className="hosting_edit_accesses__form" onSubmit={submitForm}>
            <div className="form_wrapper hosting_edit_accesses__form-wrapper">
                <div className="hosting_edit_accesses__form__content-wrapper">
                    <div className="hosting_edit_accesses__form-row">
                        <div className="hosting_edit_accesses__form-label">Доступ к хостингу</div>
                        <Input className="hosting_edit_accesses__form__input" type="textarea" value={form.accessToHosting}  onChange={handleChange("accessToHosting")} />
                    </div>
                    <div className="hosting_edit_accesses__form-row">
                        <div className="hosting_edit_accesses__form-label">Доступ к домену</div>
                        <Input className="hosting_edit_accesses__form__input" type="textarea" value={form.accessToDomain}  onChange={handleChange("accessToDomain")} />
                    </div>
                </div>
            </div>
            <FormActionGroup onClose={cancelEdit}/>
        </form>
    )
};

export default HostingEditAccessesForm;
