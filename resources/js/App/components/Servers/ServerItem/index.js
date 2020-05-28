import React from "react";
import {Dialog, IconButton} from "@material-ui/core";
import _ from "lodash";

import GearIcon from "../../Icons/GearIcon";
import ServerPlan from "./ServerPlan";
import ServerForm from "../ServerForm";
import useModal from "../../../config/hooks/useModal";
import "./index.scss";

const ServerItem = ({ server = {} }) => {
    const serverModal = useModal();

    const renderDescription = (description) => {
        if(_.isString(description) && description.length < 1) {
            return "Описание отсутствует";
        }
        else {
            return server.description;
        }
    };

    return (
        <>
            <div className="server_item_wrapper card_wrapper">
                <div className="server_item_header">
                        <h2 className="server_item_title">
                            {server.name}
                        </h2>
                    <div>
                        <IconButton onClick={serverModal.openModal}>
                            <GearIcon size={24} />
                        </IconButton>
                    </div>
                </div>
                <div className="server_item_description_block">{renderDescription(server.description)}</div>
                <div className="server_item_plan_wrapper">
                    <ServerPlan planText="ежемесячно" amount={server.month_expense} checked={server.type_expense === "month"}/>
                    <ServerPlan planText="раз в год" amount={server.year_expense} checked={server.type_expense === "year"}/>
                </div>

                <div>
                    <div className="server_item_statistics_title">Статистика</div>
                    <div className="server_item_info_row">
                        <span className="server_item_info_row_name">Количество клиентов на сервере</span>
                        <span className="server_item_info_row_value">{server.statistics.count}</span>
                    </div>
                    <div className="server_item_info_row">
                        <span className="server_item_info_row_name">Оборот сервера</span>
                        <span className="server_item_info_row_value">{server.statistics.income} ₴</span>
                    </div>
                    <div className="server_item_info_row">
                        <span className="server_item_info_row_name">Затраты на сервер в год</span>
                        <span className="server_item_info_row_value">{server.statistics.expense} ₴</span>
                    </div>
                    <div className="server_item_info_row">
                        <span className="server_item_info_row_name">Чистая прибыль</span>
                        <span className="server_item_info_row_value">{server.statistics.profit} ₴</span>
                    </div>
                    <div className="server_item_info_row">
                        <span className="server_item_info_row_name">Рентабельность</span>
                        <span className="server_item_info_row_value">{server.statistics.profitability}%</span>
                    </div>
                </div>
            </div>
            <Dialog
                open={serverModal.open}
                onClose={serverModal.closeModal}
                fullWidth={true}
                maxWidth="sm"
            >
                <ServerForm onClose={serverModal.closeModal} serverId={server.id} />
            </Dialog>
        </>
    )
};

export default ServerItem;
