import React, {useState} from "react";
import {Dialog, IconButton, Tooltip} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CreateAccountForm from "./CreateAccountForm";

const CreateAccountModal = ({ currencyList, officeId, updateOffice }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="create_account_modal">
            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                <CreateAccountForm officeId={officeId} currencyList={currencyList} closeForm={() => setIsOpen(false)} updateOffice={updateOffice} />
            </Dialog>
            <Tooltip title="Створити рахунок">
                <IconButton onClick={() => setIsOpen(true)}>
                    <AddIcon />
                </IconButton>
            </Tooltip>
        </div>
    )
};

export default CreateAccountModal;
