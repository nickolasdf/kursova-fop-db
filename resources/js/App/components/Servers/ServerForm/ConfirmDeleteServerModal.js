import React, { useEffect, useState } from 'react';
import { Dialog } from '@material-ui/core';
import FormActionGroup from '../../FormActionGroup';
import { createSelectData } from '../../../config/selectOptions';
import requests from '../../../requests';
import { throwAlert } from '../../../reducers/App/actions';
import { getServers } from '../../../reducers/Servers/actions';
import { SUCCESS } from '../../../config/alertVariants';
import { useDispatch } from 'react-redux';
import Select from '../../custom/Select';

const ConfirmDeleteServerModal = ({ onSubmit, onClose, isOpen, serverId }) => {
    const [servers, setServers] = useState([]);
    const [selectedServer, setSelectedServer] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        requests.Servers.getAll().then(resp => {
            setServers(createSelectData(resp.data));
        });
    }, []);

    const handleChangeServer = value => {
        setSelectedServer(value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        requests.Servers.delete(serverId, { params: { server_id: selectedServer.value } }).then(() => {
            onClose();
            onSubmit();
            dispatch(getServers());
            dispatch(throwAlert(SUCCESS, 'Сервер успешно удален'));
        });
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <div className="form_wrapper">
                    <div className="form_title">Выберите куда перенести хостинги</div>
                    <Select options={servers} onChange={handleChangeServer}/>
                </div>
                <FormActionGroup onClose={onClose}/>
            </form>
        </Dialog>
    );
};

export default ConfirmDeleteServerModal;
