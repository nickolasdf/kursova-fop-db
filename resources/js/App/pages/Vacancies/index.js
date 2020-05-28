import React from 'react';
import VacanciesTable from '../../components/Vacancies/VacanciesTable';
import MainLayout from '../../components/MainLayout';
import './style.scss';
import VacanciesHeader from '../../components/Vacancies/VacanciesHeader';

const Vacancies = () => {
    return (
        <MainLayout>
            <div className="vacancies_page">
                <section className="section_item">
                    <VacanciesHeader/>
                </section>
                <section className="section_item">
                    <VacanciesTable/>
                </section>
            </div>
        </MainLayout>
    );
};

export default Vacancies;
