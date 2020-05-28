import React from 'react';
import { useDispatch } from 'react-redux';

import requests from '../../../../requests';
import useModal from '../../../../config/hooks/useModal';
import ConfirmModal from '../../../ConfirmModal';
import { throwAlert } from '../../../../reducers/App/actions';
import { SUCCESS } from '../../../../config/alertVariants';
import { getVacancies } from '../../../../reducers/Vacancies/actions';
import { getIds } from '../../../../config/constants';

const VacanciesTableToolbar = ({ selected = [], clearSelected }) => {
    const confirmModal = useModal();
    const dispatch = useDispatch();

    const deleteVacancies = () => {
        requests.Vacancies.deleteMany({ params: { ids: getIds(selected) } }).then(() => {
            dispatch(throwAlert(SUCCESS, 'Выбранные вакансии успешно удалены'));
            dispatch(getVacancies());
            clearSelected();
        });
    };

    return (
        <div>
            <button className="styled_button" onClick={confirmModal.openModal}>
                Удалить
            </button>
            <ConfirmModal
                isOpen={confirmModal.open}
                onClose={confirmModal.closeModal}
                onAccept={deleteVacancies}
                title="Вы действительно хотите удалить выбранные вакансии?"
            />
        </div>
    );
};

export default VacanciesTableToolbar;
