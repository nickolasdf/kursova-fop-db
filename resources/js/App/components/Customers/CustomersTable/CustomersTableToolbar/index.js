import React from 'react';
import { useDispatch } from 'react-redux';
import { Dialog } from '@material-ui/core';
import Button from '../../../custom/Button';
import useModal from '../../../../config/hooks/useModal';
import './index.scss';
import requests from '../../../../requests';
import ConfirmModal from '../../../ConfirmModal';
import { throwAlert } from '../../../../reducers/App/actions';
import { SUCCESS } from '../../../../config/alertVariants';
import { getCustomers } from '../../../../reducers/Customers/actions';
import CombineCustomersForm from './CombineCustomersForm';
import { getIds } from '../../../../config/constants';

const CustomersTableToolbar = ({ selected, clearSelected, selectedRows }) => {
    const dispatch = useDispatch();
    const deleteConfirmModal = useModal();
    const combineConfirmModal = useModal();

    const deleteSelected = () => {
        requests.Customer.deleteMany({ params: { ids: getIds(selected) } })
            .then(() => {
                deleteConfirmModal.closeModal();
                dispatch(throwAlert(SUCCESS, 'Выбранные контрагенты удалены успешно'));
                dispatch(getCustomers());
            })
            .then(() => clearSelected());
    };

    return (
        <div>
            <Button
                className="customers-table__toolbar__button"
                title="Удалить"
                onClick={deleteConfirmModal.openModal}
            />
            <Button
                className="customers-table__toolbar__button"
                title="Объединить"
                type="outlined"
                onClick={combineConfirmModal.openModal}
            />
            <ConfirmModal
                isOpen={deleteConfirmModal.open}
                onClose={deleteConfirmModal.closeModal}
                onAccept={deleteSelected}
                title="Вы действительно хотите удалить выбранных контрагентов?"
            />
            <Dialog open={combineConfirmModal.open} onClose={combineConfirmModal.closeModal}>
                <CombineCustomersForm
                    onClose={combineConfirmModal.closeModal}
                    selected={selected}
                    selectedData={selectedRows}
                    clearSelected={clearSelected}
                />
            </Dialog>
        </div>
    );
};

export default CustomersTableToolbar;
