import TableHead from '@material-ui/core/TableHead';
import Checkbox from '@material-ui/core/Checkbox';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import React from 'react';
import TableSortNav from '../TableSortNav';

const headCells = [
    { id: 'date', numeric: false, disablePadding: true, label: 'Дата' },
    { id: 'amount', numeric: true, disablePadding: false, label: 'Сума' },
    { id: 'details', numeric: false, disablePadding: false, label: 'Детали платежа' },
    { id: 'actions' },
    { id: 'cancel' },
    { id: 'contractor', numeric: false, disablePadding: false, label: 'Контрагенты' },
    { id: 'account_name', numeric: false, disablePadding: false, label: 'Реквизиты' },
    { id: 'owner', numeric: false, disablePadding: false, label: 'Владелец' }
];

const EnhancedTableHead = (props) => {
    const {
        classes,
        onRequestSort,
        tableConfig,
        onSelectAllClick,
        numSelected
    } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead className={classes.headerTable}>
            <TableRow>
                <TableCell align="left" padding="none">
                    <Checkbox
                        padding="none"
                        indeterminate={numSelected > 0 && numSelected < tableConfig.per_page}
                        checked={numSelected === tableConfig.per_page}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align="left"
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={tableConfig.order_field === headCell.id ? tableConfig.order_type.toLowerCase() : false}
                        className={classes.headerLabel}
                    >
                        <TableSortLabel
                            active={tableConfig.order_field === headCell.id}
                            direction={tableConfig.order_type.toLowerCase()}
                            onClick={createSortHandler(headCell.id)}
                            classes={{ icon: classes.sortIcon }}
                        >
                            {headCell.label}
                            <span
                                style={{
                                    opacity: tableConfig.order_field === headCell.id ? 1 : 0,
                                    marginLeft: 4
                                }}
                            >
                                    <TableSortNav orderBy={tableConfig.order_type}/>
                                </span>
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

export default EnhancedTableHead;
