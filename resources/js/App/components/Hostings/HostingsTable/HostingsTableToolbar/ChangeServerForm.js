import React, { useState } from "react";

import FormActionGroup from "../../../FormActionGroup";
import Select from "../../../custom/Select";
import { useDispatch } from "react-redux";
import { getHostings } from "../../../../reducers/Hostings/actions";
import { throwAlert } from "../../../../reducers/App/actions";
import { SUCCESS } from "../../../../config/alertVariants";
import { createSelectData } from "../../../../config/selectOptions";
import requests from "../../../../requests";

const ChangeServerForm = ({ onClose, serversList, selectedHostings }) => {
    const [selectedServer, setSelectedServer] = useState({});
    const dispatch = useDispatch();

    const handleSelectChange = value => {
        setSelectedServer(value);
    };

    const submitForm = event => {
        event.preventDefault();
        requests.Hostings.changeServer({ ids: selectedHostings, server_id: selectedServer.value })
            .then(() => onClose())
            .then(() => dispatch(throwAlert(SUCCESS, "Сервер успешно изменен")))
            .then(() => dispatch(getHostings()))
    };

    const selectServers = createSelectData(serversList);

    return (
        <form className="multi-change-hosting-form" onSubmit={submitForm}>
            <div className="form_wrapper">
                <Select
                    options={selectServers}
                    onChange={handleSelectChange}
                    placeholder="Выбрать сервер"
                />
            </div>
            <FormActionGroup onClose={onClose} />
        </form>
    )
};

export default ChangeServerForm;
