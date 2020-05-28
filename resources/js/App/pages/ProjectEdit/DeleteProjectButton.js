import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '../../components/custom/Button';
import useModal from '../../config/hooks/useModal';
import ConfirmModal from '../../components/ConfirmModal';
import requests from '../../requests';
import { throwAlert } from '../../reducers/App/actions';
import { SUCCESS } from '../../config/alertVariants';

const DeleteProjectButton = ({ projectId }) => {
    const confirmModal = useModal();
    const dispatch = useDispatch();
    const history = useHistory();

    const deleteProject = () => {
        requests.Project.deleteProject(projectId).then(() => {
            dispatch(throwAlert(SUCCESS, 'Проект успешно удален'));
            history.push('/project');
        });
    };

    return (
        <>
            <Button variant="outlined" onClick={confirmModal.openModal}>Удалить</Button>
            <ConfirmModal
                isOpen={confirmModal.open}
                onClose={confirmModal.closeModal}
                onAccept={deleteProject}
            />
        </>
    );
};

export default DeleteProjectButton;
