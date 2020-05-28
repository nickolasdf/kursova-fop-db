import React, { useState, useEffect } from "react";

import Tabs from "../../../custom/Tabs";
import { multiChangeHostingTabs } from "../utils";
import ChangeServerForm from "./ChangeServerForm";
import ChangeTariffForm from "./ChangeTariffForm";
import requests from "../../../../requests";
import "./MultiChangeHostingTabs.scss";

const MultiChangeHostingTabs = ({ tabValue, selectedHostings, onClose }) => {
    const [currentTab, setCurrentTab] = useState(0);

    const [servers, setServers] = useState([]);

    useEffect(() => {
        requests.Servers.getAll().then(resp => {
            setServers(resp.data);
        })
    }, []);

    useEffect(() => {
        setCurrentTab(tabValue)
    }, [tabValue]);

    const handleChangeTab = (event, tab) => {
        setCurrentTab(tab);
    };

    return (
        <>
            <Tabs
                tabs={multiChangeHostingTabs}
                onChange={handleChangeTab}
                value={currentTab}
            />
            <div className="multi-change-hosting-form-wrapper">
                {(currentTab === 0) && <ChangeServerForm serversList={servers} selectedHostings={selectedHostings} onClose={onClose}/>}
                {(currentTab === 1) && <ChangeTariffForm selectedHostings={selectedHostings} onClose={onClose} />}
            </div>
        </>
    )
};

export default MultiChangeHostingTabs;
