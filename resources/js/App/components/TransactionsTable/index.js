import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import { Dialog, DialogTitle, IconButton } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import ClearIcon from '@material-ui/icons/Clear';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import './index.scss';
import { connect } from 'react-redux';
import { throwAlert } from '../../reducers/App/actions';
import requests from '../../requests';
import { SUCCESS } from '../../config/alertVariants';
import TransactionForm from '../TransactionForm';
import PlanIcon from '../Icons/PlanIcon';
import Grid from '@material-ui/core/Grid';

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
    table: {
        minWidth: 1000
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
        color: '#131313'
    },
    tableRow: {
        cursor: 'pointer',
        height: '70px',
        whiteSpace: 'nowrap'
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

function TransactionsTable(props) {
    const initialParams = {
        order_field: 'date',
        order_type: 'ASC',
        per_page: 20,
        page: 1
    };

    const classes = useStyles();
    const [selected, setSelected] = React.useState([]);
    const [isEditFormOpen, setIsEditFormOpen] = React.useState(false);
    const [isStatusFormOpen, setIsStatusFormOpen] = React.useState(false);
    const [currentRowData, setCurrentRowData] = React.useState({});
    const [params, setParams] = React.useState(initialParams);

    const {
        throwAlert,
        data = [],
        title,
        pagination = true,
        updateData,
        onMount,
        onChangeRowsPerPage,
        onChangePage,
        onChangeSort,
        total = 0
    } = props;

    React.useEffect(() => {
        onMount(params);
    }, []);

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
        onChangeSort(newParams);
    };

    function handleChangePage(event, newPage) {
        const newParams = {
            page: newPage + 1
        };
        setNewParams(newParams);
        onChangePage(newParams);
    }

    async function handleChangeRowsPerPage(event) {
        const { value } = event.target;
        const perPage = value === 'Все' ? total : value;
        const newParams = {
            per_page: perPage
        };
        setNewParams(newParams);
        onChangeRowsPerPage(newParams);
    }

    const deleteSelectedTransactions = () => {
        requests.Transaction.delete({ params: { ids: selected } }).then(resp => {
            if (resp) {
                setSelected([]);
                throwAlert(SUCCESS, 'Транзакция удалена');
                if (props.updateData) {
                    props.updateData();
                }
            }
        });
    };

    function handleSelectAllClick(event) {
        if (event.target.checked && selected.length === 0) {
            const newClickSelected = data.map(n => n.id);
            setSelected(newClickSelected);
            return;
        }
        setSelected([]);
    }

    function handleClick(event, name) {
        event.stopPropagation();
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
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
        setSelected(newSelected);
    }

    const updateStatus = id => event => {
        event.stopPropagation();
        requests.Transaction.updateStatus(id, { status_id: 3 }).then(() => {
            throwAlert(SUCCESS, 'Статус відмінено');

        });
    };
    const acceptStatus = id => event => {
        event.stopPropagation();
        requests.Transaction.updateStatus(id, { status_id: 1 }).then(() => {
            throwAlert(SUCCESS, 'Статус принят');
        });
    };

    const isSelected = name => selected.indexOf(name) !== -1;

    return (
        <div className="transactions_table">
            <div className={classes.root}>
                {
                    title ? <div className="table_title">{title}</div> : null
                }
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    rowCount={total}
                    onSelectAllClick={handleSelectAllClick}
                    deleteSelected={deleteSelectedTransactions}
                />
                <div className={classes.tableWrapper}>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                    >
                        {
                            selected.length > 0 ? null :
                                <EnhancedTableHead
                                    classes={classes}
                                    numSelected={selected.length}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    tableConfig={params}
                                />
                        }
                        <TableBody>
                            {
                                data.map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow
                                            className={classes.tableRow}
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                            onClick={() => {
                                                setCurrentRowData(row);
                                                setIsEditFormOpen(true);
                                            }}
                                        >
                                            <TableCell align="left" padding="none">
                                                <Checkbox
                                                    padding="none"
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                    onClick={event => handleClick(event, row.id)}
                                                />
                                            </TableCell>
                                            <TableCell
                                                align="left" component="th" id={labelId} scope="row"
                                                padding="none"
                                            >{row.date}</TableCell>
                                            <TableCell align="left">
                                                <span
                                                    style={{
                                                        color: row.symbol === '+' ? '#2CBD14' : row.symbol === '-' ? '#FF2B2B' : 'inherit',
                                                        fontWeight: 'bold'
                                                    }}
                                                >
                                                    {`${row.symbol} ${row.amount} ${row.currencySymbol}`}
                                                </span>
                                            </TableCell>
                                            <TableCell align="left">
                                                <div>{row.description}</div>
                                                <span className="transaction_table_account_item">
                                                    <span>{row.accountItemName}</span>
                                                    {
                                                        row.projectTitle ?
                                                            <>
                                                                <span> | </span>
                                                                <span>{row.projectTitle}</span>
                                                            </> : null
                                                    }
                                                </span>
                                            </TableCell>
                                            <TableCell align="left">
                                                <div className="table_actions_wrapper">
                                                    {
                                                        row.actions.includes('planned') ?
                                                            <Tooltip title="Плановая">
                                                                <div className="table_actions table_action_planned">Плановая</div>
                                                            </Tooltip> : null
                                                    }
                                                    {
                                                        row.actions.includes('repeated') ?
                                                            <Tooltip title="Повторяющейся">
                                                                <div className="table_actions table_action_repeated">
                                                                    <PlanIcon/></div>
                                                            </Tooltip> : null
                                                    }
                                                    {
                                                        row.actions.includes('approved') ?
                                                            <button
                                                                className="table_actions table_action_approved"
                                                                onClick={acceptStatus(row.id)}
                                                            >
                                                                Принять
                                                            </button> : null
                                                    }
                                                </div>
                                            </TableCell>
                                            <TableCell align="left">
                                                {
                                                    row.actions.includes('planned') && row.actions.includes('repeated') ?
                                                        <Tooltip title="Отменить повторение">
                                                            <IconButton
                                                                onClick={updateStatus(row.id)}
                                                                size="small"
                                                                variant="round"
                                                            >
                                                                <ClearIcon/>
                                                            </IconButton>
                                                        </Tooltip> : null
                                                }
                                            </TableCell>
                                            <TableCell align="left">{row.contractorName}</TableCell>
                                            <TableCell align="left">{row.accountName}</TableCell>
                                            <TableCell align="left">
                                                <span>
                                                    <img className="table_owner_avatar" src={row.ownerImage}/>
                                                </span>
                                                <span>{row.ownerName}</span>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                </div>
                <div className="table_footer_wrapper">
                    <Grid container>
                        <Grid item xs={6}>
                            {
                                props.financeInfo ?
                                    <div className="finance_future_wrapper">
                                        <Grid className={classes.financeInfoItem} container justify="center">
                                            <Grid item xs={4}>
                                                <div>Приход</div>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <span>{props.financeInfo.income.fact}</span>
                                                <span className="finance_symbol">₴</span>
                                                <span className="future_amount">
                                                    (
                                                    <span>{props.financeInfo.income.future}</span>
                                                    <span className="finance_symbol">₴</span>
                                                    )
                                                </span>
                                            </Grid>
                                        </Grid>
                                        <Grid className={classes.financeInfoItem} container justify="center">
                                            <Grid item xs={4}>Расход</Grid>
                                            <Grid item xs={4}>
                                                <span>{props.financeInfo.expense.fact}</span>
                                                <span className="finance_symbol">₴</span>
                                                <span className="future_amount">
                                                    (
                                                        <span>{props.financeInfo.expense.future}</span>
                                                        <span className="finance_symbol">₴</span>
                                                    )
                                                </span>
                                            </Grid>
                                        </Grid>
                                        <Grid className={classes.financeInfoItem} container justify="center">
                                            <Grid item xs={4}>Сальдо</Grid>
                                            <Grid item xs={4}>
                                                <span>{props.financeInfo.balance.fact}</span>
                                                <span className="finance_symbol">₴</span>
                                                <span className="future_amount">
                                                    (
                                                        <span>{props.financeInfo.balance.future}</span>
                                                        <span className="finance_symbol">₴</span>
                                                    )
                                                </span>
                                            </Grid>
                                        </Grid>
                                    </div> : null
                            }
                        </Grid>
                        <Grid className={classes.pagination} item xs={6}>
                            {
                                pagination ?
                                    <TablePagination
                                        rowsPerPageOptions={[10, 20, 'Все']}
                                        SelectProps={{ renderValue: value => (value === total ? 'Все' : value) }}
                                        labelRowsPerPage="Строк на страницу"
                                        labelDisplayedRows={() => ''}
                                        component="div"
                                        count={total}
                                        rowsPerPage={parseInt(params.per_page)}
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
                        </Grid>
                    </Grid>
                </div>
                <Dialog
                    fullWidth={true}
                    maxWidth="md"
                    open={isEditFormOpen}
                    onClose={() => setIsEditFormOpen(false)}
                >
                    <TransactionForm
                        transactionType={currentRowData.typeName}
                        transactionId={currentRowData.id}
                        onClose={() => setIsEditFormOpen(false)}
                        onSubmit={updateData}
                    />
                </Dialog>
                <Dialog open={isStatusFormOpen} onClose={() => setIsStatusFormOpen(false)}>
                    <DialogTitle>Встановити статус</DialogTitle>
                </Dialog>
            </div>
        </div>
    );
}

const mapDispatchToProps = {
    throwAlert
};

export default connect(null, mapDispatchToProps)(TransactionsTable);
