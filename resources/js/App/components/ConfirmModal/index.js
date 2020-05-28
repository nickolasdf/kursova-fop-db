import React from "react";
import "./index.scss";
import {Dialog} from "@material-ui/core";

const ConfirmModal = (
    {
        isOpen,
        title = "Вы действительно хотите это сделать?",
        acceptLabel = "Принять",
        confirmLabel = "Отменить",
        onAccept,
        onClose,
        body
    }) => {

    const renderBody = () => {
        if(body) {
            return (
                <div className="form_wrapper">
                    {body}
                </div>
            );
        }
    };

    return(
        <div className="confirm_modal">
            <Dialog open={isOpen} onClose={onClose}>
                <div className="confirm_modal_body">
                    <div className="confirm_modal_title">{title}</div>
                </div>
                {
                    renderBody()
                }
                <div className="confirm_actions_wrapper">
                    <button type="button" className="form_action_btn form_submit_action_btn" onClick={onAccept}>{acceptLabel}</button>
                    <button type="button" className="form_action_btn form_cancel_action_btn" onClick={onClose}>{confirmLabel}</button>
                </div>
            </Dialog>
        </div>
    )
};

export default ConfirmModal;
