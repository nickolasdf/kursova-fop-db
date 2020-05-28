import React from 'react';
import { useDispatch } from 'react-redux';

import useModal from '../../../../config/hooks/useModal';
import ConfirmModal from '../../../ConfirmModal';
import { throwAlert } from '../../../../reducers/App/actions';
import requests from '../../../../requests';
import { SUCCESS } from '../../../../config/alertVariants';
import { getUsers } from '../../../../reducers/Users/actions';
import { getIds } from '../../../../config/constants';

const UsersTableToolbar = ({ selected, clearSelected }) => {
    const confirmModal = useModal();
    const dispatch = useDispatch();

    const deleteUser = () => {
        requests.User.delete({ params: { ids: getIds(selected) } })
            .then(() => {
                confirmModal.closeModal();
                clearSelected();
            })
            .then(() => {
                dispatch(throwAlert(SUCCESS, 'Выбранные сотрудники успешно удалены'));
            })
            .then(() => {
                dispatch(getUsers());
            });
    };

    return (
        <div>
            <button className="styled_button" onClick={confirmModal.openModal}>Удалить</button>
            <ConfirmModal
                title="Вы действительно хотите удалить выбранных сотрудников?"
                isOpen={confirmModal.open}
                onClose={confirmModal.closeModal}
                onAccept={deleteUser}
            />
        </div>
    );
};

export default UsersTableToolbar;
