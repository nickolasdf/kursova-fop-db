import React from "react";
import requests from "../../requests";
import Button from "@material-ui/core/Button";

const UpdateStatusForm = props => {
    const [amount, setAmount] = React.useState("");
    const [description, setDescription] = React.useState("");
    const { transaction, onClose } = props;

    const handleChangeAmount = event => {
        setAmount(event.target.value);
    };

    const handleChangeDescription = event => {
        setDescription(event.target.value);
    };

    const submitForm = event => {
        event.preventDefault();
        const formData = {
            status_id: 1,
            description,
            amount
        };
        requests.Transaction.updateStatus(transaction.id, formData);
    };

    return(
        <div className="approved_status_form">
            <form onSubmit={submitForm}>
                <input className="approved_form_input" onChange={handleChangeAmount} type="number" placeholder="Сума" />
                <input className="approved_form_input" onChange={handleChangeDescription} type="text" placeholder="Опис" />
                <div className="button-group">
                    <Button type="submit">зберегти</Button>
                    <Button onClick={onClose}>відмінити</Button>
                </div>
            </form>
        </div>

    )
};

export default UpdateStatusForm;
