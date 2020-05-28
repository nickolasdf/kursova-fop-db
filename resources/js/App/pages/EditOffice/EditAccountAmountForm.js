import React, {useState} from "react";
import "./EditAccountAmountForm.scss";
import {Checkbox, Grid, IconButton} from "@material-ui/core";
import Select from "../../components/Select";
import { components } from "react-select";
import {
    createAccountsData,
    createAccountItemsData
} from "../../config/selectOptions";
import FormButtonGroup from "../../components/FormButtonGroup";
import FormTitle from "../../components/FormTitle";
import requests from "../../requests";
import { connect } from "react-redux";
import { throwAlert } from "../../reducers/App/actions";
import { SUCCESS } from "../../config/alertVariants";
import PlusIcon from "../../components/Icons/PlusIcon";
import Tooltip from "@material-ui/core/Tooltip";

const EditAccountAmountForm = props => {
    const {
        accounts,
        accountItems,
        total,
        id,
        currency,
        closeForm,
        updateOffice,
        updateAccounts,
        throwAlert
    } = props;

    const [showRate, setShowRate] = useState(false);
    const [form, setForm] = useState({
        amount: total,
        account: "",
        accountItem: "",
        description: null,
        convertationRate: null,
        correction: false
    });

    const handleChange = name => event => {
        setForm({
            ...form,
            [name]: event.target.value
        })
    };
    const handleCheckboxChange = event => {
        setForm({
            ...form,
            correction: event.target.checked,
            account: "",
            accountItem: ""
        })
    };

    const handleSelectChange = name => value => {
        if(name === "account") {
            setShowRate(currency !== value.currency);
            if(currency === value.currency) {
                setForm({
                    ...form,
                    convertationRate: null,
                    account: value
                })
            }
            else {
                setForm({
                    ...form,
                    [name]: value
                })
            }
        } else {
            setForm({
                ...form,
                [name]: value
            })
        }
    };

    const handleSubmit = event => {
        event.preventDefault();
        const formData = {
            account_id: id,
            amount: total - form.amount,
            account_transfer_id: form.account.value,
            account_item_id: form.accountItem.value,
            description: form.description,
            convertationRate: form.convertationRate,
            correction: form.correction
        };
        requests.Account.updateAmount(id, formData).then(resp => {
            if(resp) {
                closeForm();
                updateOffice();
                updateAccounts();
                throwAlert(SUCCESS, "Сума рахунку оновлена");
            }
        })
    };

    const accountsList = createAccountsData(accounts);
    const accountItemsList = createAccountItemsData(accountItems);

    return(
        <form onSubmit={handleSubmit}>
            <FormTitle size="24px">
                Редагувати суму
            </FormTitle>
            <div className="edit_account_amount_form">
                <div className="form_input_row form_amount_row">
                    <Grid container alignItems="center">
                        <Grid item xs={4}>
                            <span>Сума</span>
                        </Grid>
                        <Grid item xs={8}>
                            <div>
                                <input type="number" onChange={handleChange("amount")} placeholder="Введіть суму" defaultValue={total} />
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div className="form_input_row">
                    <Grid container alignItems="center">
                        <Grid item xs={4}>
                            <span>Корректировка остатка</span>
                        </Grid>
                        <Grid item xs={8}>
                            <div>
                                <Checkbox checked={form.correction} onChange={handleCheckboxChange} />
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div className="form_input_row">
                    <Grid container alignItems="center">
                        <Grid item xs={4}>
                            <span>Рахунок</span>
                        </Grid>
                        <Grid item xs={8}>
                            <div>
                               <Select
                                   options={accountsList}
                                   onChange={handleSelectChange("account")}
                                   placeholder="Виберіть рахунок..."
                                   isDisabled={form.correction}
                                   value={form.account}
                               />
                            </div>
                        </Grid>
                    </Grid>
                </div>
                {
                    showRate && !form.correction ?
                    <div className="form_input_row">
                        <Grid container alignItems="center">
                            <Grid item xs={4}>
                                <span>Конвертація валюти</span>
                            </Grid>
                            <Grid item xs={8}>
                                <div>
                                    <input type="number" onChange={handleChange("convertationRate")} placeholder="Введіть суму..." />
                                </div>
                            </Grid>
                        </Grid>
                    </div> : null
                }
                <div className="form_input_row">
                    <Grid container alignItems="center">
                        <Grid item xs={4}>
                            <span>Стаття</span>
                        </Grid>
                        <Grid item xs={8}>
                            <div>
                                <Select
                                    options={accountItemsList}
                                    onChange={handleSelectChange("accountItem")}
                                    placeholder="Виберіть статтю..."
                                    isDisabled={form.correction}
                                    value={form.accountItem}
                                    components={{
                                        Menu: props => {
                                            return (
                                                <components.Menu {...props}>
                                                    {
                                                        props.children
                                                    }
                                                    <div className="select_add_item_icon_wrapper">
                                                        <Tooltip title="Добавить статью">
                                                            <IconButton className="select_add_item_icon">
                                                                <PlusIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </div>
                                                </components.Menu>
                                            )
                                        }
                                    }}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div className="form_input_row">
                    <Grid container alignItems="center">
                        <Grid item xs={4}>
                            <span>Опис</span>
                        </Grid>
                        <Grid item xs={8}>
                            <div>
                                <input onChange={handleChange("description")} />
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <FormButtonGroup onClose={closeForm} />
        </form>
    )
};

const mapDispatchToProps = {
    throwAlert
};

export default connect(null, mapDispatchToProps)(EditAccountAmountForm);
