import React, { useState, useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import OfficesCardList from "./OfficesCardList";
import requests from "../../requests";
import "./style.scss";
import AccountItemTable from "../../components/Settings/AccountItemTable";
import { Dialog, Grid } from "@material-ui/core";
import OfficeCreateForm from "./OfficeCreateForm";
import {SUCCESS} from "../../config/alertVariants";
import {throwAlert} from "../../reducers/App/actions";
import { useDispatch } from "react-redux";

const Settings = () => {
    const [officesList, setOfficesList] = useState([]);
    const [createOfficeOpen, setCreateOfficeOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        getOffices();
    }, []);

    const onOpenOfficeModal = () => {
        setCreateOfficeOpen(true)
    };

    const onCloseOfficeModal = () => {
        setCreateOfficeOpen(false)
    };

    const getOffices = () => {
        requests.Office.get().then(resp => {
            setOfficesList(resp.data)
        })
    };

    const deleteOffice = (id) => {
        return requests.Office.delete(id).then(() => {
            getOffices();
            dispatch(throwAlert(SUCCESS, "Офіс видалений"))
        })
    };

    return (
        <MainLayout>
            <div className="settings_page">
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <OfficesCardList
                            updateOffices={getOffices}
                            offices={officesList}
                            deleteOffice={deleteOffice}
                        />
                        <button className="add_office_btn" onClick={onOpenOfficeModal}>
                            добавить офис
                        </button>
                    </Grid>
                    <Grid item xs={6}>
                        <AccountItemTable title="Статьи операций"/>
                    </Grid>
                </Grid>
                <Dialog open={createOfficeOpen} onClose={onCloseOfficeModal} maxWidth="sm" fullWidth={true}>
                    <OfficeCreateForm onClose={onCloseOfficeModal} onSubmit={getOffices} />
                </Dialog>
            </div>
        </MainLayout>
    )
};

export default Settings;
