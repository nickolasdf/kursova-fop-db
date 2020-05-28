import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { customersTableColumns } from './utils';
import { getCustomers } from '../../../reducers/Customers/actions';
import Table from '../../custom/Table';
import './index.scss';
import CustomersTableToolbar from './CustomersTableToolbar';

const CustomersTable = () => {
    const customers = useSelector(state => state.Customers);
    const dispatch = useDispatch();
    const history = useHistory();

    const getCustomersWithParams = newParams => {
        dispatch(getCustomers(newParams));
    };

    const handleRowClick = row => {
        history.push(`/customers/${row.id}`);
    };

    return (
        <Table
            columns={customersTableColumns}
            total={customers.meta.total}
            data={customers.data}
            onChange={getCustomersWithParams}
            onRowClick={handleRowClick}
            onFilter={getCustomersWithParams}
            components={{
                Toolbar: props => <CustomersTableToolbar {...props} />
            }}
        />
    );
};

export default CustomersTable;
