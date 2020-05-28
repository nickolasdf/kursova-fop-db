import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import * as PropTypes from 'prop-types';
import React from "react";
import { connect } from "react-redux";

const headCells = [
    {
        id: "name",
        numeric: false,
        disablePadding: true,
        label: "Організація"
    },
    { id: "contact", numeric: true, disablePadding: false, label: "Контакт" },
    { id: "email", numeric: true, disablePadding: false, label: "Пошта" },
    { id: "phone", numeric: true, disablePadding: false, label: "Телефон" },
    { id: "balance", numeric: true, disablePadding: false, label: "Баланс" }
];

function EnhancedTableHead(props) {
    const {
        classes,
        onSelectAllClick,
        numSelected,
        onRequestSort,
        tableConfig,
        roles
    } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };
    return (
        <TableHead className={classes.headerTable}>
            <TableRow>
                <TableCell padding="none">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < tableConfig.rowsPerPage}
                        checked={numSelected === tableConfig.rowsPerPage}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? "right" : "left"}
                        padding={headCell.disablePadding ? "none" : "default"}
                        sortDirection={tableConfig.orderBy === headCell.id ? tableConfig.order : false}
                        className={classes.headerLabel}
                    >
                        <TableSortLabel
                            active={tableConfig.orderBy === headCell.id}
                            direction={tableConfig.order}
                            onClick={createSortHandler(headCell.id)}
                            classes={{ icon: classes.sortIcon }}
                        >
                            {headCell.label}
                            {tableConfig.orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {tableConfig.order === "desc" ? "sorted descending" : "sorted ascending"}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                {
                    roles[0] === "admin" ?
                        <TableCell /> :
                        null
                }

            </TableRow>
        </TableHead>
    );
}

const mapStateToProps = ({Contragents, Auth}) => ({
    tableConfig: Contragents.tableConfig,
    roles: Auth.user.roles
});

export default connect(mapStateToProps)(EnhancedTableHead);
