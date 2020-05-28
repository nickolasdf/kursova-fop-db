import React from "react";
import {Button, Dialog, DialogActions, DialogTitle} from "@material-ui/core";
import requests from "../../requests";
import { connect } from "react-redux";
import { throwAlert } from "../../reducers/App/actions";
import { SUCCESS } from "../../config/alertVariants";

const DeleteAccountModal = ({ id, throwAlert, updateOffice }) => {
    const [open, setOpen] = React.useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function deleteAccount() {
        requests.Account.delete(id).then(resp => {
            if(resp) {
                setOpen(false);
                updateOffice();
                throwAlert(SUCCESS, "Рахунок видалений")
            }
        })
    }
    return (
        <>
            <Button onClick={handleClickOpen} className="delete_account_button">Видалити</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Ви дійсно хочете видалити рахунок?</DialogTitle>
                <DialogActions>
                    <Button onClick={deleteAccount} color="inherit">
                        Прийняти
                    </Button>
                    <Button onClick={handleClose} color="inherit" autoFocus>
                        Скасувати
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
};

const mapDispatchToProps = {
    throwAlert
};

export default connect(null, mapDispatchToProps)(DeleteAccountModal);
