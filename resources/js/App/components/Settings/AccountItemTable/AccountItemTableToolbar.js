import React from 'react';
import { useDispatch } from 'react-redux';

import requests from '../../../requests';
import useModal from '../../../config/hooks/useModal';
import ConfirmModal from '../../ConfirmModal';
import { throwAlert } from '../../../reducers/App/actions';
import { SUCCESS } from '../../../config/alertVariants';
import { getAccountItems } from '../../../reducers/AccountItems/actions';
import './AccountItemTableToolbar.scss';
import { getIds } from '../../../config/constants';

const AccountItemTableToolbar = ({ selected = [], clearSelected }) => {
    const confirmModal = useModal();
    const dispatch = useDispatch();

    const alertTitle = selected.length > 0 ? 'Статьи удалены успешно' : 'Статья удалена усешно';
    const confirmTitle = 'Вы действительно хотите удалить выбранные статьи?';

    const deleteAccountItems = () => {
        requests.AccountItem.delete({ params: { ids: getIds(selected) } })
            .then(() => {
                confirmModal.closeModal();
            })
            .then(() => {
                clearSelected();
                dispatch(throwAlert(SUCCESS, alertTitle));
            })
            .then(() => {
                dispatch(getAccountItems());
            });
    };

    return (
        <div className="account-item-table__toolbar">
            <button className="styled_button" onClick={confirmModal.openModal}>Удалить</button>
            <ConfirmModal
                isOpen={confirmModal.open}
                title={confirmTitle}
                onAccept={deleteAccountItems}
                onClose={confirmModal.closeModal}
            />
        </div>
    );
};

export default AccountItemTableToolbar;
