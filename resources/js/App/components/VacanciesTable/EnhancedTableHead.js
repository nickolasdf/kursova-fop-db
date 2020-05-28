import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import requests from "../../requests";
import Select from "react-select";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

const headCells = [
    {
        id: "title",
        numeric: false,
        disablePadding: true,
        label: "Вакансии"
    },
    {
        id: "city",
        numeric: false,
        disablePadding: false,
        label: "Регион"
    },
    {
        id: "salary_from",
        numeric: true,
        disablePadding: false,
        label: "От"
    },
    {
        id: "salary_to",
        numeric: true,
        disablePadding: false,
        label: "До"
    },
    {
        id: "owner",
        numeric: true,
        disablePadding: false,
        label: "Ответственный"
    }
];

const types = ["rank", "department", "available"];

const selectTheme = theme => ({
    ...theme,
    borderRadius: 0,
    colors: {
        ...theme.colors,
        primary25: "#ffd63c",
        primary: "#ffd63c"
    }
});

function EnhancedTableHead(props) {
    const {
        classes,
        onSelectAllClick,
        numSelected,
        onRequestSort,
        onFilter,
        tableConfig,
        roles,
        cities
    } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead className={classes.headerTable}>
            <TableRow>
                {/* <TableCell align="center" padding="none">
                    <Checkbox
                        indeterminate={
                            numSelected > 0 &&
                            numSelected < tableConfig.rowsPerPage
                        }
                        checked={numSelected === tableConfig.rowsPerPage}
                        onChange={onSelectAllClick}
                        inputProps={{ "aria-label": "select all desserts" }}
                    />
                </TableCell> */}
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align="center"
                        padding={headCell.disablePadding ? "none" : "default"}
                        sortDirection={
                            tableConfig.orderBy === headCell.id
                                ? tableConfig.order
                                : false
                        }
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
                                    {tableConfig.order === "desc"
                                        ? "sorted descending"
                                        : "sorted ascending"}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const mapStateToProps = ({ Users, Auth }) => ({
    tableConfig: Users.tableParams,
    roles: Auth.user.roles
});

export default connect(mapStateToProps)(EnhancedTableHead);
