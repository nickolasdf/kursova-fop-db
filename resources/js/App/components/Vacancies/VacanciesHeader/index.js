import React from 'react';
import { Dialog } from '@material-ui/core';

import MainTitle from '../../MainTitle';
import Button from '../../custom/Button';
import VacanciesForm from '../VacanciesForm';
import useModal from '../../../config/hooks/useModal';
import './index.scss';

const VacanciesHeader = () => {
    const vacancyModal = useModal();

    return (
        <div className="vacancies_page__header">
            <MainTitle title="Вакансии"/>
            <Button onClick={vacancyModal.openModal}>Создать вакансию</Button>
            <Dialog open={vacancyModal.open} onClose={vacancyModal.closeModal} fullWidth={true} maxWidth="sm">
                <VacanciesForm onClose={vacancyModal.closeModal}/>
            </Dialog>
        </div>
    );
};

export default VacanciesHeader;
