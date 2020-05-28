import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../components/custom/Button';
import ConfirmModal from '../../components/ConfirmModal';
import { throwAlert } from '../../reducers/App/actions';
import { SUCCESS } from '../../config/alertVariants';
import history from '../../history';
import requests from '../../requests';

const DeleteContragentButton = props => {
    const { id } = props;

    const [confModalOpen, setConfModalOpen] = useState(false);
    const dispatch = useDispatch();

    const openConfModal = () => {
        setConfModalOpen(true);
    };

    const closeConfModal = () => {
        setConfModalOpen(false);
    };

    const handleDeleteContragent = () => {
        requests.Customer.delete(id).then(() => {
            closeConfModal();
            dispatch(throwAlert(SUCCESS, 'Контрагент успешно удален'));
            history.push('/customers');
        });
    };

    return (
        <>
            <Button variant="outlined" onClick={openConfModal} type="button">Удалить</Button>
            <ConfirmModal
                title="Вы действительно хотите удалить этого контрагента?"
                isOpen={confModalOpen}
                onClose={closeConfModal}
                onAccept={handleDeleteContragent}
            />
        </>
    );
};

export default DeleteContragentButton;
