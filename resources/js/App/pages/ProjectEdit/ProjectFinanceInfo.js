import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, withStyles } from '@material-ui/core';
import './ProjectFinanceInfo.scss';
import clsx from 'clsx';

const styles = {
    tableHead: {
        fontWeight: 'bold',
        fontSize: '14px',
        color: 'black'
    },
    tableCell: {
        border: 'none'
    },
    income: {
        color: '#16C200'
    },
    expense: {
        color: '#A300E3'
    }
};

const ProjectFinanceInfo = props => {
    const { classes, style, data } = props;

    return (
        <div className="project_finance_info_block" style={style}>
            <Table>
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        <TableCell align="right" className={clsx(classes.tableCell, classes.tableHead)}></TableCell>
                        <TableCell align="right" className={clsx(classes.tableCell, classes.tableHead)}>План</TableCell>
                        <TableCell align="right" className={clsx(classes.tableCell, classes.tableHead)}>Факт</TableCell>
                        <TableCell
                            align="right"
                            className={clsx(classes.tableCell, classes.tableHead)}
                        >Разница</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow className={classes.tableRow}>
                        <TableCell align="left" className={classes.tableCell}>Приход</TableCell>
                        <TableCell
                            align="right"
                            className={clsx(classes.tableCell, classes.income)}
                        >{data.income.plan}</TableCell>
                        <TableCell
                            align="right"
                            className={clsx(classes.tableCell, classes.income)}
                        >{data.income.fact}</TableCell>
                        <TableCell align="right" className={classes.tableCell}>{data.income.diff}</TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                        <TableCell align="left" className={classes.tableCell}>Расход</TableCell>
                        <TableCell
                            align="right"
                            className={clsx(classes.tableCell, classes.expense)}
                        >{data.expense.plan}</TableCell>
                        <TableCell
                            align="right"
                            className={clsx(classes.tableCell, classes.expense)}
                        >{data.expense.fact}</TableCell>
                        <TableCell align="right" className={classes.tableCell}>{data.expense.diff}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default withStyles(styles)(ProjectFinanceInfo);
