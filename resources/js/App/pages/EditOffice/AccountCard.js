import React, {useState} from "react";
import EditIcon from "@material-ui/icons/Create";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close"
import DoneIcon from "@material-ui/icons/Done";
import TextField from "@material-ui/core/TextField";
import requests from "../../requests";
import { connect } from "react-redux";
import { SUCCESS } from "../../config/alertVariants";
import { throwAlert } from "../../reducers/App/actions";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { Tooltip } from "@material-ui/core";
import DeleteAccountModal from "./DeleteAccountModal";
import EditAccountAmountModal from "./EditAccountAmountModal";


const checkDescription = (description) => {
    if(description.length > 24) {
        return description.slice(0, 24) + "..."
    }
    else
        return description;
};

const AccountCard = (props) => {
    const [isInfoEditable, setIsInfoEditable] = useState(false);

    const {
        accountName,
        accountDescription,
        total,
        currency,
        id,
        updateOffice,
        throwAlert
    } = props;

    const [form, setForm] = useState({
        name: accountName,
        description: accountDescription
    });
    const handleChange = name => event => {
        setForm({
            ...form,
            [name]: event.target.value
        });
    };

    const submitForm = event => {
        event.preventDefault();
        const formData = {
            name: form.name,
            description: form.description
        };
        requests.Account.update(id, formData).then(resp => {
            if(resp) {
                throwAlert(SUCCESS, "Рахунок оновлений");
                updateOffice();
                setIsInfoEditable(false);
            }
        })
    };

    return (
        <div className="account_box">
            <ClickAwayListener onClickAway={() => setIsInfoEditable(false)}>
            {
                isInfoEditable ?
                    <div>
                        <form onSubmit={submitForm}>
                            <div className="account_box_title">
                                <TextField defaultValue={accountName} onChange={handleChange("name")} />
                                <div>
                                    <IconButton type="submit">
                                        <DoneIcon />
                                    </IconButton>
                                    <IconButton>
                                        <CloseIcon onClick={() => setIsInfoEditable(false)} />
                                    </IconButton>
                                </div>
                            </div>
                            <TextField
                                className="account_description"
                                placeholder="Опис"
                                defaultValue={accountDescription}
                                onChange={handleChange("description")}
                                fullWidth={true}
                                multiline={true}
                                rows={2}
                                rowsMax={4}
                            />
                        </form>
                    </div> :
                    <>
                        <div className="account_box_title">
                            <h3>{accountName}</h3>
                            <IconButton onClick={() => setIsInfoEditable(true)}>
                                <EditIcon />
                            </IconButton>
                        </div>
                        <Tooltip title={accountDescription ? accountDescription.length < 24 ? "" : accountDescription : ""}>
                            <div className="account_description">{accountDescription ? checkDescription(accountDescription) : "Немає опису"}</div>
                        </Tooltip>
                    </>
            }
            </ClickAwayListener>
            <div className="account_amount_block">
                <div className="account_amount_label item">
                    <span className="account_total">{total}</span>
                    <span>{currency}</span>
                </div>
                <div className="item">
                    <EditAccountAmountModal {...{ total, currency, id, updateOffice }} />
                </div>
            </div>
            <div className="account_actions_block">
                <DeleteAccountModal { ...{ updateOffice, id } } />
            </div>
        </div>
    )
};

const mapDispatchToProps = {
    throwAlert
};

export default connect(null, mapDispatchToProps)(AccountCard);
