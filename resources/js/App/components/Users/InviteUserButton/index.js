import React from 'react';
import { useDispatch } from 'react-redux';
import { Dialog } from '@material-ui/core';
import Button from '../../custom/Button';
import useModal from '../../../config/hooks/useModal';
import InviteForm from '../InviteForm';

const InviteUserButton = () => {
    const inviteModal = useModal();
    const dispatch = useDispatch();

    const getUsers = () => {
        dispatch(getUsers());
    };

    return (
        <>
            <Button onClick={inviteModal.openModal} variant="regular">Отправить приглашение</Button>
            <Dialog open={inviteModal.open} onClose={inviteModal.closeModal} fullWidth={true} maxWidth="md">
                <InviteForm onClose={inviteModal.closeModal} onSubmit={getUsers}/>
            </Dialog>
        </>
    );
};

export default InviteUserButton;
