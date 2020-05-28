import React, { useState } from "react";
import {Dialog, Grid, IconButton, Tooltip} from "@material-ui/core";
import "./OfficeAccountsList.scss";
import clsx from "clsx";

import GearIcon from "../../components/Icons/GearIcon";
import EditIcon from "../../components/Icons/EditIcon";
import DeleteIcon from "../../components/Icons/DeleteIcon";
import requests from "../../requests";
import ConfirmModal from "../../components/ConfirmModal";
import { useDispatch } from "react-redux";
import { throwAlert } from "../../reducers/App/actions";
import { SUCCESS } from "../../config/alertVariants";
import {shortenString} from "../../config/constants";
import AccountEditInfoForm from "./AccountEditInfoForm";
import AccountEditAmountForm from "./AccountEditAmountForm";

const OfficeAccountsList = ({ accounts, updateOffices }) => {

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [editInfoOpen, setEditInfoOpen] = useState(false);
    const [editAmountOpen, setEditAmountOpen] = useState(false);
    const [currentAccount, setCurrentAccount] = useState({});

    const dispatch = useDispatch();

    const openConfirm = account => async () => {
        setCurrentAccount(account);
        await setConfirmOpen(true)
    };

    const closeConfirm = () => {
        setConfirmOpen(false)
    };

    const deleteAccount = id => () => {
        requests.Account.delete(id).then(() => {
            closeConfirm();
            updateOffices();
            dispatch(throwAlert(SUCCESS, "Счет удален"));
        })
    };

    return (
        <>
            {
                accounts.length > 0 ?
                    <div className="office_accounts_wrapper">
                        {
                            accounts.map((item, index) => {
                                return (
                                    <div
                                        className={clsx({
                                            ["office_accounts_item"]: true,
                                            ["office_accounts_last_item"]: accounts.length - 1 === index
                                        })}
                                        key={item.id}
                                    >
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <div className="office_account_wrapper office_account_item">
                                                    <div>
                                                        <span className="office_account_name">{item.typeName}</span>
                                                        <Tooltip title={item.description ? item.description : ""}>
                                                        <span className="office_account_description">
                                                            {item.description ? shortenString(item.description, 20) : "Нет описания"}
                                                        </span>
                                                        </Tooltip>
                                                    </div>
                                                    <div className="office_icon_wrapper">
                                                        <Tooltip title="Редактировать описание">
                                                            <IconButton onClick={async () => {
                                                                setCurrentAccount(item);
                                                                await setEditInfoOpen(true);
                                                            }}>
                                                                <EditIcon/>
                                                            </IconButton>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <div className="office_account_total_wrapper office_account_item">
                                                    <span className="office_account_symbol">{item.currencySymbol}</span>
                                                    <span className="office_account_total">{item.total}</span>
                                                    <div className="office_icon_wrapper">
                                                        <Tooltip title="Редкатировать сумму">
                                                            <IconButton onClick={async () => {
                                                                setCurrentAccount(item);
                                                                await setEditAmountOpen(true)
                                                            }}>
                                                                <GearIcon/>
                                                            </IconButton>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <div className="office_icon_wrapper">
                                                    <Tooltip title="Удалить счет">
                                                        <IconButton onClick={openConfirm(item)}>
                                                            <DeleteIcon/>
                                                        </IconButton>
                                                    </Tooltip>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                )
                            })
                        }
                    </div> : <div className="accounts_none_title">Нет счетов</div>
            }
            <ConfirmModal
                isOpen={confirmOpen}
                onClose={closeConfirm}
                onAccept={deleteAccount(currentAccount.id)}
                title="Вы действительно хотите удалить счет?"
            />
            <Dialog
                open={editInfoOpen}
                onClose={() => setEditInfoOpen(false)}
                fullWidth={true}
                maxWidth="sm"
            >
                <AccountEditInfoForm
                    onClose={() => setEditInfoOpen(false)}
                    accountId={currentAccount.id}
                    onSubmit={updateOffices}
                    defaultData={{
                        name: currentAccount.typeName,
                        description: currentAccount.description
                    }}
                />
            </Dialog>
            <Dialog
                open={editAmountOpen}
                onClose={() => setEditAmountOpen(false)}
                fullWidth={true}
                maxWidth="sm"
            >
                <AccountEditAmountForm
                    onClose={() => setEditAmountOpen(false)}
                    accountData={currentAccount}
                    onSubmit={updateOffices}
                />
            </Dialog>
        </>
    )
};

export default OfficeAccountsList;
