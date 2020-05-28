import React from "react";
import { Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { throwAlert } from "../../../reducers/App/actions";
import { SUCCESS } from "../../../config/alertVariants";

import requests from "../../../requests";
import "./ActionsButtons.scss";
import useModal from "../../../config/hooks/useModal";
import ConfirmModal from "../../ConfirmModal";

const ActionsButtons = ({ hostingId, updateFormData }) => {
    const dispatch = useDispatch();
    const confirmModal = useModal();

    const extendHosting = () => {
        requests.Hostings.extendTariff(hostingId)
            .then(() => {
                dispatch(throwAlert(SUCCESS, "Тариф продлен"));
            })
            .then(() => {
                confirmModal.closeModal();
            })
            .then(() => {
                updateFormData()
            })
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <button type="button" className="hosting-form__action-btn hosting-form__remind-btn">
                        <span className="hosting-form__action-btn__title">Напоминание</span>
                        <span className="hosting-form__action-btn__description">об оплате хостинга</span>
                    </button>
                </Grid>
                <Grid item xs={6}>
                    <button type="button" className="hosting-form__action-btn hosting-form__extend-btn" onClick={confirmModal.openModal}>
                        <span className="hosting-form__action-btn__title">Продлить</span>
                        <span className="hosting-form__action-btn__description">на следующий период (1 год)</span>
                    </button>
                </Grid>
            </Grid>
            <ConfirmModal
                isOpen={confirmModal.open}
                onClose={confirmModal.closeModal}
                onAccept={extendHosting}
                title="Вы действительно хотите продлить тариф?"
            />
        </>
    )
};

export default ActionsButtons;
