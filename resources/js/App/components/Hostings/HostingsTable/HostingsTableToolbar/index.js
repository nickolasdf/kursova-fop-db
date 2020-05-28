import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from '../../../custom/Button';
import ServerIcon from '../../../Icons/ServerIcon';
import CircleDollarIcon from '../../../Icons/CircleDollarIcon';
import useModal from '../../../../config/hooks/useModal';
import requests from '../../../../requests';
import ConfirmModal from '../../../ConfirmModal';
import { throwAlert } from '../../../../reducers/App/actions';
import { getHostings } from '../../../../reducers/Hostings/actions';
import { SUCCESS } from '../../../../config/alertVariants';
import MultiChangeHostingModal from './MultiChangeHostingModal';
import './index.scss';
import { getIds } from '../../../../config/constants';

const HostingsTableToolbar = ({ selectedHostings = [], clearSelectedHostings }) => {
    const confirmModal = useModal();
    const multiChangeHostingModal = useModal();

    const [currentTab, setCurrentTab] = useState(0);

    const dispatch = useDispatch();

    const deleteHosting = () => {
        requests.Hostings.delete({ params: { ids: getIds(selectedHostings) } })
            .then(() => confirmModal.closeModal())
            .then(() => clearSelectedHostings())
            .then(() => dispatch(throwAlert(SUCCESS, 'Выбранные хостинги успешно удалены')))
            .then(() => dispatch(getHostings()));
    };

    const handleChangeServerClick = tab => () => {
        setCurrentTab(tab);
        multiChangeHostingModal.openModal();
    };

    const handleChangeTariffClick = tab => () => {
        setCurrentTab(tab);
        multiChangeHostingModal.openModal();
    };

    return (
        <div className="hostings-table-toolbar">
            <Button
                className="hostings-table-toolbar__delete-button"
                onClick={confirmModal.openModal}
            >
                Удалить
            </Button>
            <Button
                className="hostings-table-toolbar__change-server-button"
                icon={<ServerIcon className="hostings-table-toolbar__change-server-button__icon"/>}
                onClick={handleChangeServerClick(0)}
            >
                Сменить сервер
            </Button>
            <Button
                className="hostings-table-toolbar__change-plan-button"
                icon={<CircleDollarIcon/>}
                onClick={handleChangeTariffClick(1)}
            >
                Сменить тариф
            </Button>

            <ConfirmModal
                isOpen={confirmModal.open}
                onClose={confirmModal.closeModal}
                onAccept={deleteHosting}
                title="Вы действительно хотите удалить выбранные хостинги?"
            />

            <MultiChangeHostingModal
                open={multiChangeHostingModal.open}
                onClose={multiChangeHostingModal.closeModal}
                tab={currentTab}
                selectedHostings={getIds(selectedHostings)}
            />
        </div>
    );
};

export default HostingsTableToolbar;
