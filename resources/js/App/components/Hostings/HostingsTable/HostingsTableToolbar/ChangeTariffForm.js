import React, { useState } from "react";
import FormActionGroup from "../../../FormActionGroup";
import {useDispatch} from "react-redux";
import requests from "../../../../requests";
import {throwAlert} from "../../../../reducers/App/actions";
import {SUCCESS} from "../../../../config/alertVariants";
import {getHostings} from "../../../../reducers/Hostings/actions";
import Input from "../../../custom/Input";

const ChangeTariffForm = ({ onClose, selectedHostings }) => {
    const [tariff, setTariff] = useState("");
    const dispatch = useDispatch();

    const handleChangeTariff = event => {
        setTariff(event.target.value);
    };

    const submitForm = event => {
        event.preventDefault();
        requests.Hostings.changeTariff({ ids: selectedHostings, expense: tariff })
            .then(() => onClose())
            .then(() => dispatch(throwAlert(SUCCESS, "Сервер успешно изменен")))
            .then(() => dispatch(getHostings()))
    };

    return (
        <form className="multi-change-hosting-form" onSubmit={submitForm}>
            <div className="form_wrapper">
                <Input placeholder="Новый тариф хостинга" onChange={handleChangeTariff} />
            </div>
            <FormActionGroup onClose={onClose} />
        </form>
    )
};

export default ChangeTariffForm;
