import React, {useState} from "react";
import MainTitle from "../../MainTitle";
import { useDispatch } from "react-redux";
import "./index.scss";
import {Dialog} from "@material-ui/core";
import HostingForm from "../HostingForm";
import HostingInfoBlock from "../HostingInfoBlock";
import requests from "../../../requests";
import {throwAlert} from "../../../reducers/App/actions";
import {SUCCESS} from "../../../config/alertVariants";

const HostingsHeader = () => {
    const [createHostingModalOpen, setCreateHostingModalOpen] = useState(false);
    const dispatch = useDispatch();

    const openHostingModal = () => {
        setCreateHostingModalOpen(true)
    };

    const closeHostingModal = () => {
        setCreateHostingModalOpen(false)
    };

    const sendNotifyDebtor = () => {
        requests.Hostings.sendNotifyDebtor().then(() => {
            dispatch(throwAlert(SUCCESS, "Отправлено"))
        })
    };

    return (
        <>
            <div className="hostings_header_wrapper">
                <MainTitle title="Хостинг" />
                <HostingInfoBlock />
                <button className="styled_button add_hosting_btn" onClick={openHostingModal}>добавить клиента</button>
                <button className="styled_button add_hosting_btn" onClick={sendNotifyDebtor}>відправити нагадування боржникам</button>
            </div>
            <Dialog open={createHostingModalOpen} onClose={closeHostingModal} fullWidth={true} maxWidth="sm">
                <HostingForm onClose={closeHostingModal} />
            </Dialog>
        </>
    )
};

export default HostingsHeader;
