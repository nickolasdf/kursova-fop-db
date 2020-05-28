import React from 'react';
import { Dialog } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getCustomers } from '../../reducers/Customers/actions';
import PlusIcon from '../../components/Icons/PlusIcon';
import MainLayout from '../../components/MainLayout';
import MainTitle from '../../components/MainTitle';
import useModal from '../../config/hooks/useModal';
import CustomersTable from '../../components/Customers/CustomersTable';
import CustomerForm from '../../components/Customers/CustomerForm';
import '../Vacancies/style.scss';
import './index.scss';

const Customers = () => {
    const customerModal = useModal();
    const dispatch = useDispatch();
    const updateCustomers = () => {
        dispatch(getCustomers());
    };

    return (
        <MainLayout>
            <div className="customer_page">
                <section className="section_item customers_nav_block">
                    <MainTitle title="Контрагенты"/>
                    <button className="add_customer_btn" onClick={customerModal.openModal}>
                        <span className="add_customer_icon"><PlusIcon/></span>
                        <span>Добавить Контрагента</span>
                    </button>
                </section>
                <section className="section_item">
                    <CustomersTable/>
                </section>
                <Dialog
                    open={customerModal.open}
                    onClose={customerModal.closeModal}
                    fullWidth={true}
                    maxWidth="md"
                >
                    <CustomerForm onClose={customerModal.closeModal} handleSubmit={updateCustomers}/>
                </Dialog>
            </div>
        </MainLayout>
    );
};

export default Customers;
