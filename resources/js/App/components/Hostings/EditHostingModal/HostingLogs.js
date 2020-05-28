import React from "react";

import moment from "moment";
import "./HostingLogs.scss";

const HostingLogs = ({ logs = [] }) => {
    return (
        <div className="hosting-logs-wrapper">
            <div className="hosting-logs">
                {
                    logs.map(item => {
                        return (
                            <div key={item.id} className="hosting-logs__item">
                                <span>{item.description}</span>
                                <span className="hosting-logs__created-at-date">Создано {moment(item.created_at).format("DD.MM.YYYY")}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default HostingLogs;
