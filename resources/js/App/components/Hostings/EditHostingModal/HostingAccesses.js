import React, { useState } from "react";
import _ from "lodash";

import HostingEditAccessesForm from "./HostingEditAccessesForm";
import FormActionGroup from "../../FormActionGroup";
import "./HostingAccesses.scss";

const HostingAccesses = ({ hostingData, onSave, onClose }) => {
    const [isEdit, setIsEdit] = useState(false);

    const handleClickEdit = () => {
        setIsEdit(true)
    };

    const handleSave = () => {
        onSave();
        setIsEdit(false);
    };

    const renderAccess = (text = "") => {
        if(text && text.length > 0) {
            return text;
        }
        else {
            return "Нет данных"
        }
    };

    return (
        <div className="hosting_edit_accesses">
            {
                isEdit ?
                    <HostingEditAccessesForm
                        onSave={handleSave}
                        hostingId={hostingData.id}
                        defaultData={{
                            accessToHosting: _.isString(hostingData.access_hosting) ? hostingData.access_hosting : "" ,
                            accessToDomain: _.isString(hostingData.access_domain) ? hostingData.access_domain : ""
                        }}
                    /> :
                    <>
                        <div className="hosting_edit_accesses__wrapper">
                            <div className="hosting_edit_accesses__info-block">
                                <div>
                                    <h3 className="hosting_edit_accesses__title">Доступ к хостингу</h3>
                                    <pre className="hosting_edit_accesses__access">{renderAccess(hostingData.access_hosting)}</pre>
                                </div>
                                <div>
                                    <h3 className="hosting_edit_accesses__title">Доступ к домену</h3>
                                    <pre className="hosting_edit_accesses__access">{renderAccess(hostingData.access_domain)}</pre>
                                </div>
                            </div>
                        </div>
                        <FormActionGroup acceptTitle="Редактировать" onAcceptClick={handleClickEdit} onClose={onClose}/>
                    </>
            }
        </div>
    )
};

export default HostingAccesses;
