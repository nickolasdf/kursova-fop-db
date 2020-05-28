import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccountItems } from '../../../reducers/AccountItems/actions';
import { Dialog } from '@material-ui/core';
import Table from '../../custom/Table';
import { accountItemsTableColumns } from '../../../pages/Settings/utils';
import CreateAccountItemForm from '../CreateAccountItemForm';
import AccountItemTableToolbar from './AccountItemTableToolbar';
import AccountItemTableBody from './AccountItemTableBody';
import { calcTotal } from './utils';
import './index.scss';

const useStyles = makeStyles({
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    }
});

const AccountItemTable = () => {
    const classes = useStyles();
    const [accountItemModalOpen, setAccountItemModalOpen] = useState(false);
    const [currentRowData, setCurrentRowData] = useState({});
    const [total, setTotal] = useState(0);

    const accountItemsData = useSelector(state => state.AccountItems);
    const dispatch = useDispatch();

    useEffect(() => {
        setTotal(calcTotal(accountItemsData.data));
    }, [accountItemsData.data]);

    const getAccountItemsWithParams = (tableParams) => {
        dispatch(getAccountItems(tableParams));
    };

    const onRowClick = rowData => () => {
        setCurrentRowData(rowData);
        setAccountItemModalOpen(true);
    };

    const openCreateAccountItem = (parentId = null) => (event) => {
        event.stopPropagation();
        setCurrentRowData({
            parentId
        });
        openAccountItemModal();
    };

    const openAccountItemModal = () => {
        setAccountItemModalOpen(true);
    };

    const closeAccountItemModal = () => {
        setAccountItemModalOpen(false);
    };

    return (
        <>
            <div className="account-item-table__header">
                <span className={classes.title}>Статьи операций</span>
                <button className="styled_button" onClick={openCreateAccountItem()}>новая статья</button>
            </div>
            <Table
                data={accountItemsData.data}
                total={total}
                columns={accountItemsTableColumns}
                parentChildData={true}
                components={{
                    Body: ({ tableData, events }) => <AccountItemTableBody
                        onRowClick={onRowClick}
                        tableData={tableData}
                        events={events}
                        openCreateAccountItem={openCreateAccountItem}
                    />,
                    Toolbar: ({ selected, clearSelected }) => <AccountItemTableToolbar
                        selected={selected}
                        clearSelected={clearSelected}
                    />
                }}
                onMount={getAccountItemsWithParams}
                onChangePage={getAccountItemsWithParams}
                onChangeRowsPerPage={getAccountItemsWithParams}
                onChangeSort={getAccountItemsWithParams}
                treeData={row => {
                    if (!row.parent_id) {
                        return row.childes;
                    } else {
                        return [];
                    }
                }}
            />
            <Dialog open={accountItemModalOpen} onClose={closeAccountItemModal} fullWidth={true} maxWidth="md">
                <CreateAccountItemForm
                    onClose={closeAccountItemModal}
                    accountItemId={currentRowData.id}
                    parentId={currentRowData.parentId}
                />
            </Dialog>
        </>
    );
};

export default AccountItemTable;
