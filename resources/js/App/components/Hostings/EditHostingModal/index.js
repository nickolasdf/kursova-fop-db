import React, { useEffect, useState } from 'react';
import { Dialog } from '@material-ui/core';

import HostingForm from '../HostingForm';
import HostingComments from '../HostingComments';
import Tabs from '../../custom/Tabs';
import { hostingModalTabs } from '../HostingsTable/utils';
import './index.scss';
import HostingAccesses from './HostingAccesses';
import HostingLogs from './HostingLogs';
import requests from '../../../requests';

const EditHostingModal = ({ open, onClose, hostingData }) => {
    const [currentTab, setCurrentTab] = useState(0);
    const [hosting, setHosting] = useState({});

    useEffect(() => {
        getHosting();
    }, [hostingData]);

    const getHosting = () => {
        if (hostingData.id) {
            requests.Hostings.getOne(hostingData.id).then(resp => {
                setHosting(resp.data);
            });
        }
    };

    const handleChangeTab = (event, tab) => {
        setCurrentTab(tab);
    };

    const handleClose = () => {
        onClose();
        setCurrentTab(0);
    };

    const renderTab = tab => {
        switch (tab) {
            case 0:
                return <HostingForm onClose={handleClose} isEdit={true} defaultData={hosting} updateData={getHosting}/>;
            case 1:
                return <HostingAccesses hostingData={hosting} onSave={getHosting} onClose={onClose}/>;
            case 2:
                return <HostingLogs logs={hosting.statistics}/>;
            default:
                return 'Incorrect tab index!';
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="lg">
            <div className="hosting_edit_modal_wrapper">
                <div className="hosting_edit_form_wrapper">
                    <Tabs
                        onChange={handleChangeTab}
                        tabs={hostingModalTabs}
                        value={currentTab}
                    />
                    <div className="hosting-modal__tab-wrapper">
                        {
                            renderTab(currentTab)
                        }
                    </div>
                </div>
                <div className="hosting_comments_modal_wrapper">
                    <HostingComments hostingData={hostingData}/>
                </div>
            </div>
        </Dialog>
    );
};

export default EditHostingModal;
