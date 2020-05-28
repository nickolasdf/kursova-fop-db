import React, {useState} from "react";
import SmallTitle from "../../components/SmallTitle";
import requests from "../../requests";
import {Button} from "@material-ui/core";
import { connect } from "react-redux";
import { throwAlert } from "../../reducers/App/actions";
import { SUCCESS } from "../../config/alertVariants";

const OfficeEditForm = ({ officeName, officeId, throwAlert, updateOffice }) => {
    const [name, setName] = useState("");

    const handleChange = event => {
        setName(event.target.value);
    };

    const submitForm = event => {
        event.preventDefault();
        const formData = {
            name
        };
        requests.Office.update(officeId, formData).then(resp => {
            if(resp) {
                updateOffice();
                setName("");
                throwAlert(SUCCESS, "Назва оновлена")
            }
        });
    };
    return(
        <form onSubmit={submitForm}>
            <div className="office_input_label">
                <SmallTitle title="Назва офісу" />
            </div>
            <div>
                <input className="office_input" onChange={handleChange} placeholder={ officeName } value={name}/>
                <Button type="submit">Зберегти</Button>
            </div>
        </form>
    )
};

const mapDispatchToProps = {
    throwAlert
};

export default connect(null, mapDispatchToProps)(OfficeEditForm);
