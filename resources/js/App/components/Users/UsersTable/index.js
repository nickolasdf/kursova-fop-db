import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import Table from '../../custom/Table';
import UsersTableRow from './UsersTableRow';
import { usersTableColumns } from './utils';
import { getUsers } from '../../../reducers/Users/actions';
import './index.scss';
import UsersTableToolbar from './UsersTableToolbar';
import queryString from 'query-string';

const UsersTable = () => {
    const users = useSelector(state => state.Users);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const urlParams = queryString.parse(location.search);

    const getUsersWithParams = newParams => {
        dispatch(getUsers({ ...urlParams, ...newParams }));
    };

    const handleRowClick = row => {
        history.push(`/edit-user/${row.id}`);
    };

    useEffect(() => {
        history.push(`/users`);
    }, []);

    return (
        <Table
            columns={usersTableColumns}
            data={users.data}
            total={users.total}
            onChange={getUsersWithParams}
            onFilter={getUsersWithParams}
            onRowClick={handleRowClick}
            components={{
                Row: ({ rowData }) => <UsersTableRow rowData={rowData}/>,
                Toolbar: ({ selected, clearSelected }) => <UsersTableToolbar
                    selected={selected}
                    clearSelected={clearSelected}
                />
            }}
        />
    );
};

export default UsersTable;
