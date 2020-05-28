import React, { useState } from 'react';
import './index.scss';
import pluralRu from 'plural-ru';
import { Dialog } from '@material-ui/core';
import OfficeInfo from '../OfficeInfo';
import OfficeAccountsList from '../OfficeAccountsList';
import NavBlockWrapper from '../../../components/NavBlockWrapper';
import CreateAccountForm from '../CreateAccountForm';
import ConfirmModal from '../../../components/ConfirmModal';
import useModal from '../../../config/hooks/useModal';
import OfficeTitle from './OfficeTitle';

const menuList = [
    {
        label: 'Редактировать',
        value: 'edit'
    },
    {
        label: 'Удалить',
        value: 'delete'
    }
];

const OfficeItem = ({ office, updateOffices, deleteOffice }) => {
    const [isEdit, setIsEdit] = useState(false);
    const accountModal = useModal();
    const confirmModal = useModal();

    const cancelEdit = () => {
        setIsEdit(false);
    };

    const onMenuItemClick = menuItem => {
        switch (menuItem.value) {
            case 'edit':
                setIsEdit(true);
                break;
            case 'delete':
                confirmModal.openModal();
                break;
            default:
                throw new Error('Incorrect value in menu list');
        }
    };

    return (
        <>
            <NavBlockWrapper
                title={<OfficeTitle value={office.name} id={office.id} onSubmit={updateOffices}/>}
                isHide={true}
                initialValue={false}
                component={
                    <a href={`/users?office=${office.name}`} className="employees_amount_title" target="_blank">
                        {pluralRu(office.users_count, '%d сотрудник', '%d сотрудника', '%d сотрудников')}
                    </a>
                }
                spacing={16}
                menuList={menuList}
                onItemClick={onMenuItemClick}
            >
                <div className="office_block">
                    <div className="office_block_item">
                        <OfficeInfo
                            office={office}
                            isEdit={isEdit}
                            cancelEdit={cancelEdit}
                            onSubmit={updateOffices}
                        />
                    </div>

                    <div className="office_block_item">
                        <div className="office_accounts_title">Счета</div>
                        <OfficeAccountsList accounts={office.accounts} updateOffices={updateOffices}/>
                        <div className="office_add_account_wrapper">
                            <button
                                className="styled_button office_add_account_btn"
                                onClick={accountModal.openModal}
                            >добавить счет
                            </button>
                        </div>
                    </div>
                </div>
            </NavBlockWrapper>
            <Dialog open={accountModal.open} onClose={accountModal.closeModal} fullWidth={true} maxWidth="sm">
                <CreateAccountForm
                    onClose={accountModal.closeModal}
                    officeId={office.id}
                    onSubmit={updateOffices}
                />
            </Dialog>
            <ConfirmModal
                title="Вы действительно хотите удалить офис?"
                isOpen={confirmModal.open}
                onClose={confirmModal.closeModal}
                onAccept={() => {
                    deleteOffice(office.id).then(() => {
                        confirmModal.closeModal();
                    });
                }}
            />
        </>
    );
};

export default OfficeItem;
