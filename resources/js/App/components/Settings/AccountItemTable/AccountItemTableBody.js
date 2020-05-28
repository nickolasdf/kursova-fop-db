import React, { Fragment } from 'react';
import { TableBody, TableCell, TableRow } from '@material-ui/core';
import clsx from 'clsx';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import './AccountItemTableBody.scss';
import ArticleIcon from '../../Icons/ArticleIcon';

const useStyles = makeStyles({
    tableRow: {
        height: 70,
        '&:hover': {
            backgroundColor: '#DCDCDC',
            cursor: 'pointer'
        }
    },
    tableSubRow: {
        backgroundColor: '#FAFAFA'
    },
    articleCell: {
        paddingLeft: 60
    }
});

const AccountItemTableBody = ({ tableData, events, onRowClick, openCreateAccountItem }) => {
    const classes = useStyles();

    const tableRow = (row, parent) => {
        const isSubRow = Boolean(row.parent_id);

        return (
            <TableRow
                key={row.id}
                className={clsx(classes.tableRow, {
                    [classes.tableSubRow]: isSubRow
                })}
                onClick={onRowClick(row)}
            >
                <TableCell align="left" padding="checkbox">
                    <Checkbox
                        checked={events.isItemSelected(row.id)}
                        onClick={events.onSelect(row, parent)}
                    />
                </TableCell>
                <TableCell
                    className={clsx({
                        [classes.articleCell]: isSubRow
                    })}
                >
                    {row.name}
                </TableCell>
                <TableCell>
                    {
                        !row.parent_id &&
                        <button className="add_sub_account_item_btn" onClick={openCreateAccountItem(row.id)}>
                            + Подстатья
                        </button>
                    }
                </TableCell>
                <TableCell>
                    <ArticleIcon
                        color={row.color} iconId={row.icon} wrapperStyles={{
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: '100%'
                    }}
                    />
                </TableCell>
            </TableRow>
        );
    };

    return (
        <TableBody>
            {
                tableData.map(row => {
                    return (
                        <Fragment key={row.id}>
                            {tableRow(row)}
                            {
                                (row.childes && row.childes.length > 0) &&
                                row.childes.map(child => {
                                    return (
                                        tableRow(child, row)
                                    );
                                })
                            }
                        </Fragment>
                    );
                })
            }
        </TableBody>
    );
};

export default AccountItemTableBody;
