import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog } from '@material-ui/core';

import Table from '../../custom/Table';
import { getVacancies } from '../../../reducers/Vacancies/actions';
import { vacanciesTableColumns } from './utils';
import useModal from '../../../config/hooks/useModal';
import VacanciesTableRow from './VacanciesTableRow';
import VacanciesForm from '../VacanciesForm';
import VacanciesTableToolbar from './VacanciesTableToolbar';

const VacanciesTable = () => {
    const dispatch = useDispatch();
    const vacancies = useSelector(state => state.Vacancies);
    const [currentVacancy, setCurrentVacancy] = useState({});
    const vacancyModal = useModal();

    const getVacanciesWithParams = newParams => {
        dispatch(getVacancies(newParams));
    };

    const handleClickRow = row => {
        setCurrentVacancy(row);
        vacancyModal.openModal();
    };

    return (
        <>
            <Table
                data={vacancies.data}
                onChange={getVacanciesWithParams}
                onFilter={getVacanciesWithParams}
                total={vacancies.total}
                columns={vacanciesTableColumns}
                onRowClick={handleClickRow}
                components={{
                    Row: ({ rowData }) => <VacanciesTableRow row={rowData}/>,
                    Toolbar: ({ selected, clearSelected }) => <VacanciesTableToolbar
                        selected={selected}
                        clearSelected={clearSelected}
                    />
                }}
            />
            <Dialog open={vacancyModal.open} onClose={vacancyModal.closeModal} fullWidth={true} maxWidth="sm">
                <VacanciesForm isEdit={true} vacancyData={currentVacancy} onClose={vacancyModal.closeModal}/>
            </Dialog>
        </>
    );
};

export default VacanciesTable;
