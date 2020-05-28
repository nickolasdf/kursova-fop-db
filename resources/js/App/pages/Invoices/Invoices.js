import React from 'react';
import { TableCell } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import './style.scss';
import MainLayout from '../../components/MainLayout';
import Table from '../../components/custom/Table';
import { invoicesTableColumns } from './utils';

const INVOICES_MOCK = [
    {
        id: 1,
        invoice: '#123 СПД-000021 от 2 января 2020 р.',
        contragent: 'ТОВ Асвывы',
        amount: '2 123.00 грн.',
        status: 'Оплачено',
        date: '20/03',
        commentary: 'Hello world'
    },
    {
        id: 3,
        invoice: '#123 СПД-000021 от 2 января 2020 р.',
        contragent: 'ТОВ Асвывы',
        amount: '2 123.00 грн.',
        status: 'Не оплачено',
        date: '20/03',
        commentary: 'Hello world'
    }
];

/**
 * Page that represents Invoices table
 */
const Invoices = () => {
    const getInvoicesWithParams = params => {
        console.log('Placeholder function', params);
    };

    // Function to customize table cells styles
    const tableRow = ({ rowData }) => {
        const status = (rowData.status === 'Оплачено') ? 'completed' : 'error';

        return (
            <>
                <TableCell style={{ verticalAlign: 'top' }}>
                    <span onClick={null}>{rowData.invoice}</span>
                </TableCell>
                <TableCell style={{ verticalAlign: 'top' }}>
                    <span onClick={null}>{rowData.contragent}</span>
                </TableCell>
                <TableCell style={{ verticalAlign: 'top' }}>
                    <span onClick={null}>{rowData.amount}</span>
                </TableCell>
                <TableCell style={{ verticalAlign: 'top' }}>
                    <div className={`status-${status}`}>
                        <CheckCircleOutlineIcon style={{ fontSize: '18px' }} className="status-icon"/>
                        {rowData.status}
                    </div>
                </TableCell>
                <TableCell style={{ verticalAlign: 'top' }}>
                    {rowData.date}
                </TableCell>
                <TableCell style={{ verticalAlign: 'top' }}>
                    {rowData.commentary}
                </TableCell>
            </>
        );
    };

    return (
        <MainLayout>
            <div className="invoices-header">
                <h2>Все инвойсы</h2>
            </div>

            <Table
                data={INVOICES_MOCK}
                columns={invoicesTableColumns}
                onChange={getInvoicesWithParams}
                onFilter={getInvoicesWithParams}
                components={{
                    Row: tableRow
                }}
            />
        </MainLayout>
    );
};

export default Invoices;
