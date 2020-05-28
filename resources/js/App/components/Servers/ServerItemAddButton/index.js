import React from "react";
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import {Dialog} from "@material-ui/core";

import useModal from "../../../config/hooks/useModal";
import ServerForm from "../ServerForm";
import "./index.scss";

const ServerItemAddButton = () => {
    const serverModal = useModal();

    return (
        <>
            <div className="server_item_add_btn_wrapper card_wrapper">
                <button className="server_item_add_btn" onClick={serverModal.openModal}>
                    <ControlPointIcon style={{ fontSize: "8em" }} className="server_item_add_icon"/>
                    <div>Добавить новый сервер</div>
                </button>
            </div>
            <Dialog open={serverModal.open} onClose={serverModal.closeModal} fullWidth={true} maxWidth="sm">
                <ServerForm onClose={serverModal.closeModal} />
            </Dialog>
        </>
    )
};

export default ServerItemAddButton;
