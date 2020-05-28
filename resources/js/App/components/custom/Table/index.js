import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import EnhancedTableHead from './EnhancedTableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core';
import MaterialTable from '@material-ui/core/Table';
import TablePagination from '@material-ui/core/TablePagination';
import PropTypes from 'prop-types';
import './index.scss';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        boxShadow: 'rgba(0, 0, 0, 0.07) 0px 4px 4px 0px',
        backgroundColor: 'white',
        borderRadius: 2
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2)
    },
    tableWrapper: {
        overflowX: 'auto'
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1
    },
    sortIcon: {
        display: 'none'
    },
    headerTable: {
        backgroundColor: '#FAFAFA'
    },
    headerLabel: {
        fontSize: '14px',
        fontWeight: 'bold',
        fontStyle: 'normal',
        color: '#131313',
        whiteSpace: 'nowrap'
    },
    tableRow: {
        position: 'relative',
        cursor: 'pointer',
        height: '70px',
        whiteSpace: 'nowrap',
        '&:hover': {
            background: '#FFCC001C',
            boxShadow: 'inset 1px 0 0 0 #ffcc00'
        }
    },
    financeInfoItem: {
        padding: '6px 0'
    },
    pagination: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pageIconButton: {
        margin: '0 12px'
    }
}));

const Table = (
    {
        data = [],
        title,
        pagination = true,
        columns = [],
        actions = [],
        components = {
            Body: null,
            Row: null
        },
        onMount,
        onChange,
        onSelect,
        onFilter,
        onChangeRowsPerPage,
        onChangePage,
        onChangeSort,
        onRowClick,
        total = 20,
        parentChildData = false,
        initialTableParams,
        isToolbar = true,
        select = true,
        treeData
    }) => {

    const initialParams = {
        order_field: columns[0].field,
        order_type: 'ASC',
        per_page: 25,
        page: 1,
        ...initialTableParams
    };

    const classes = useStyles();
    const [selected, setSelected] = useState([]);
    const [params, setParams] = useState(initialParams);

    useEffect(() => {
        if (onMount && typeof onMount === 'function') {
            onMount(params);
        } else if (onChange && typeof onChange === 'function') {
            onChange(params);
        }
    }, []);

    useEffect(() => {
        if (onSelect) {
            onSelect(selected);
        }
    }, [selected]);

    const setNewParams = (newParams) => {
        setParams({
            ...params,
            ...newParams
        });
    };

    const handleRequestSort = (event, property) => {
        const isDesc = params.order_field === property && params.order_type === 'DESC';
        const orderSort = isDesc ? 'ASC' : 'DESC';
        const newParams = {
            order_type: orderSort,
            order_field: property
        };
        setNewParams(newParams);
        if (onChangeSort && typeof onChangeSort === 'function') {
            onChangeSort(newParams);
        } else if (onChange && typeof onChange === 'function') {
            onChange(newParams);
        }
    };

    function handleChangePage(event, newPage) {
        const newParams = {
            page: newPage + 1
        };
        setNewParams(newParams);
        if (onChangePage && typeof onChangePage === 'function') {
            onChangePage(newParams);
        } else if (onChange && typeof onChange === 'function') {
            onChange(newParams);
        }
    }

    function handleChangeRowsPerPage(event) {
        const { value } = event.target;

        const newParams = {
            per_page: value === -1 ? null : value
        };

        const tableParams = {
            per_page: value
        };

        setNewParams(tableParams);
        if (onChangeRowsPerPage && typeof onChangeRowsPerPage === 'function') {
            onChangeRowsPerPage(newParams);
        } else if (onChange && typeof onChange === 'function') {
            onChange(newParams);
        }
    }

    function handleSelectAllClick(event) {
        if (event.target.checked && selected.length === 0) {
            let newClickSelected = [];

            if (parentChildData) {
                data.forEach(parent => {
                    newClickSelected.push(parent);
                    if (parent.childes.length > 0) {
                        parent.childes.forEach(child => {
                            newClickSelected.push(child);
                        });
                    }
                });
            } else {
                newClickSelected = data.map(item => item);
            }
            setSelected(newClickSelected);
            return;
        }
        setSelected([]);
    }

    function handleClick(event, name, row, parent) {
        event.stopPropagation();
        const selectedIndex = selected.findIndex(item => item.id === row.id);

        let newSelected = [];
        let childes = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, row);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        if (treeData) {
            childes = treeData(row);
        }
        const unionData = _.union(newSelected, childes);
        if (isSelected(row.id) && parent) {
            const filteredData = unionData.filter(item => {
                return item.id !== parent.id;
            });
            return setSelected(filteredData);
        }
        setSelected(unionData);
    }

    const clearSelected = () => {
        setSelected([]);
    };

    const isSelected = id => selected.findIndex(item => item.id === id) !== -1;

    return (
        <div className="custom_table">
            <div className={classes.root}>
                {
                    (isToolbar && selected.length > 0) &&
                    <EnhancedTableToolbar
                        numSelected={selected.length}
                        rowCount={total}
                        onSelectAllClick={handleSelectAllClick}
                        title={title}
                        actions={actions}
                        selected={selected}
                        components={components}
                        clearSelected={clearSelected}
                    />
                }
                <div className={classes.tableWrapper}>
                    <MaterialTable
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            onFilter={onFilter}
                            tableConfig={params}
                            columns={columns}
                            rowsCount={data.length}
                            select={select}
                            tableParams={params}
                            total={total}
                        />
                        {
                            components.Body ?
                                <components.Body
                                    columns={columns}
                                    tableData={data}
                                    selected={selected}
                                    events={{
                                        onSelect: (row, parent) => event => handleClick(event, row.id, row, parent),
                                        isItemSelected: data => isSelected(data)
                                    }}
                                /> :
                                <TableBody>
                                    {
                                        data.map((row, index) => {
                                            const isItemSelected = isSelected(row.id);
                                            const labelId = `enhanced-table-checkbox-${index}`;
                                            return (
                                                <TableRow
                                                    className={classes.tableRow}
                                                    role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={row.id}
                                                    selected={isItemSelected}
                                                    onClick={() => onRowClick(row)}
                                                >
                                                    {
                                                        select &&
                                                        <TableCell align="center" padding="none">
                                                            <Checkbox
                                                                padding="none"
                                                                checked={isItemSelected}
                                                                inputProps={{ 'aria-labelledby': labelId }}
                                                                onClick={event => handleClick(event, row.id, row)}
                                                            />
                                                        </TableCell>
                                                    }
                                                    {
                                                        components.Row ?
                                                            <components.Row rowData={row}/> :
                                                            <>
                                                                {
                                                                    columns.map(item => {
                                                                        return (
                                                                            <TableCell
                                                                                align="left" id={labelId}
                                                                                key={item.field}
                                                                            >
                                                                                {
                                                                                    row[item.field]
                                                                                }
                                                                            </TableCell>
                                                                        );
                                                                    })
                                                                }
                                                            </>
                                                    }
                                                </TableRow>
                                            );
                                        })
                                    }
                                </TableBody>
                        }
                    </MaterialTable>
                </div>
                <div className="table_footer_wrapper">
                    {
                        pagination ?
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 50]}
                                labelRowsPerPage="Строк на страницу"
                                labelDisplayedRows={() => ''}
                                component="div"
                                count={total}
                                rowsPerPage={params.per_page}
                                page={params.page - 1}
                                backIconButtonProps={{
                                    'aria-label': 'previous page',
                                    className: classes.pageIconButton
                                }}
                                nextIconButtonProps={{
                                    'aria-label': 'next page',
                                    className: classes.pageIconButton
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            /> : null
                    }
                </div>
            </div>
        </div>
    );
};

Table.propTypes = {
    onMount: PropTypes.func,
    onChange: PropTypes.func,
    onChangeRowsPerPage: PropTypes.func,
    onChangePage: PropTypes.func,
    onChangeSort: PropTypes.func
};

export default Table;
