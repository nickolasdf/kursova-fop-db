import React, {useEffect, useState} from "react";
import requests from "../../requests";
import { Button, Dialog, withStyles } from "@material-ui/core";
import EditAccountAmountForm from "./EditAccountAmountForm";

const styles = {
    dialog: {
        minWidth: "720px",
        overflow: "unset"
    },
    editAmountButton: {
        fontSize: "14px",
        fontWeight: "bold",
        textTransform: "none"
    }
};

const EditAccountAmountModal = ({ classes, total, currency, id, updateOffice }) => {
    const [accounts, setAccounts] = useState([]);
    const [accountItems, setAccountItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        getAccounts();
    }, []);

    const getAccounts = () => {
        requests.Transaction.getNew().then(resp => {
            setAccounts(resp.data.accounts);
            setAccountItems(resp.data.accountItems);
        });
    };

    return (
        <>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} classes={{ paper: classes.dialog }}>
                <EditAccountAmountForm
                    closeForm={() => setIsOpen(false)}
                    updateAccounts={ getAccounts }
                    { ...{ accounts, accountItems, total, currency, id, updateOffice } }
                />
            </Dialog>
            <Button fullWidth={true} variant="outlined" className={classes.editAmountButton} onClick={() => setIsOpen(true)}>
                Редагувати суму
            </Button>
        </>
    )
};

export default withStyles(styles)(EditAccountAmountModal);
