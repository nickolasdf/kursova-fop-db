import React from "react";
import ConfirmModal from "../../components/ConfirmModal";
import requests from "../../requests";
import {throwAlert} from "../../reducers/App/actions";
import {SUCCESS} from "../../config/alertVariants";
import { connect } from "react-redux";

const DeleteProjectConfirmModal = ({ isOpen, onClose, projectId, throwAlert, history }) => {
    const deleteProject = () => {
        requests.Project.deleteProject(projectId).then(resp => {
            throwAlert(SUCCESS, "Проект успешно удален");
            history.push("/project");
        })
    };

    return (
        <ConfirmModal
            isOpen={isOpen}
            onClose={onClose}
            onAccept={deleteProject}
            title="Вы действительно хотите удалить проект?"
        />
    )
};

const mapDispatchToProps = {
    throwAlert
};

export default connect(null, mapDispatchToProps)(DeleteProjectConfirmModal);
