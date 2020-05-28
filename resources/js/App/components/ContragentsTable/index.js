import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import requests from "../../requests";
import { connect } from "react-redux";
import { throwAlert } from "../../reducers/App/actions";
import { SUCCESS, WARNING } from "../../config/alertVariants";
import Preloader from "../Preloader";
import EditButton from "./EditButton";
import "./index.scss";
import { DialogActions, DialogTitle, Dialog } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing(3)
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2)
    },
    table: {
        minWidth: 750
    },
    tableWrapper: {
        overflowX: "auto"
    },
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1
    },
    sortIcon: {
        display: "none"
    },
    headerTable: {
        backgroundColor: "#fafbfd"
    },
    headerLabel: {
        fontSize: "14px",
        fontWeight: "bold",
        fontStyle: "normal",
        color: "#131313"
    }
}));

function ContragentsTable(props) {
    const classes = useStyles();
    const [selected, setSelected] = React.useState([]);
    const [columnDynamic, setColumnDynamic] = React.useState(false);
    const [selectedParent, setSelectedParent] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isOpenWarn, setIsOpenWarn] = React.useState(false);

    const { tableConfig, setTableConfig, contragents, roles } = props;

    const openWarnModal = () => {
        setIsOpenWarn(true);
    };
    const closeWarnModal = () => {
        setIsOpenWarn(false);
    };
    async function handleRequestSort(event, property) {
        const isDesc =
            tableConfig.orderBy === property && tableConfig.order === "desc";
        const orderSort = isDesc ? "asc" : "desc";
        await setTableConfig({
            order: orderSort,
            orderBy: property
        });
        await props.getCustomersData();
    }

    function handleSelectAllClick(event) {
        if (event.target.checked && selected.length === 0) {
            setColumnDynamic(true);
            const newClickSelected = contragents.map(n => n.id);
            setSelected(newClickSelected);
            return;
        }
        setSelected([]);
        setColumnDynamic(false);
        setSelectedParent(null);
    }

    function handleRadioClick(event) {
        setSelectedParent(event.target.value);
    }

    function deleteSelected() {
        requests.Customer.delete({ params: selected })
            .then(() => {
                props.getCustomersData();
                props.throwAlert("success", "Видалено");
            })
            .then(() => {
                setSelected([]);
                setColumnDynamic(false);
            });
    }
    function combineSelected() {
        if (selectedParent) {
            const combinedItems = {
                merge_to: selectedParent,
                customers: selected.filter(item => item !== +selectedParent)
            };
            requests.Customer.merge(combinedItems).then(resp => {
                setSelected([]);
                setColumnDynamic(false);
                props.getCustomersData();
                props.throwAlert(SUCCESS, "Об'єднано");
            });
        } else props.throwAlert(WARNING, "Виберіть в кого об'єднувати");
    }

    function handleClick(event, name) {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        setColumnDynamic(true);
        if (name === +selectedParent) {
            setSelectedParent(null);
        }
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
        if (newSelected.length < 1) {
            setColumnDynamic(false);
        }
        setSelected(newSelected);
    }

    async function handleChangePage(event, newPage) {
        await setTableConfig({ page: newPage });
        await props.getCustomersData();
    }

    async function handleChangeRowsPerPage(event) {
        await setTableConfig({
            rowsPerPage: event.target.value,
            page: 0
        });
        await props.getCustomersData();
    }

    const isSelected = name => selected.indexOf(name) !== -1;
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                {selected.length > 0 ? (
                    <EnhancedTableToolbar
                        openWarnModal={openWarnModal}
                        numSelected={selected.length}
                        rowCount={tableConfig.total}
                        onSelectAllClick={handleSelectAllClick}
                        onCombineSelected={combineSelected}
                    />
                ) : null}

                <div className={classes.tableWrapper}>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={"medium"}
                    >
                        {selected.length > 0 ? null : (
                            <EnhancedTableHead
                                classes={classes}
                                numSelected={selected.length}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                            />
                        )}
                        <TableBody>
                            {isLoading ? (
                                <TableRow
                                    style={{
                                        height: 48 * tableConfig.rowsPerPage
                                    }}
                                >
                                    <TableCell>
                                        <Preloader />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                contragents.map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="none">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        "aria-labelledby": labelId
                                                    }}
                                                    onClick={event =>
                                                        handleClick(
                                                            event,
                                                            row.id
                                                        )
                                                    }
                                                />
                                            </TableCell>
                                            {columnDynamic ? (
                                                <TableCell>
                                                    {isItemSelected ? (
                                                        <label className="radio_input_container">
                                                            <input
                                                                className="select_parent_input"
                                                                onClick={
                                                                    handleRadioClick
                                                                }
                                                                name="name"
                                                                type="radio"
                                                                value={row.id}
                                                            />
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    ) : null}
                                                </TableCell>
                                            ) : null}
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.contact}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.email}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.phone}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.balance}
                                            </TableCell>
                                            {roles[0] === "admin" ? (
                                                <TableCell align="center">
                                                    <EditButton
                                                        getCustomersData={
                                                            props.getCustomersData
                                                        }
                                                        contragent={row}
                                                    />
                                                </TableCell>
                                            ) : null}
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    labelRowsPerPage="Рядків на сторінку"
                    labelDisplayedRows={() => ""}
                    component="div"
                    count={tableConfig.total}
                    rowsPerPage={parseInt(tableConfig.rowsPerPage)}
                    page={tableConfig.page}
                    backIconButtonProps={{
                        "aria-label": "previous page"
                    }}
                    nextIconButtonProps={{
                        "aria-label": "next page"
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <Dialog open={isOpenWarn} onClose={closeWarnModal}>
                <DialogTitle>Ви дійсно хочете здійснити видалення?</DialogTitle>
                <DialogActions>
                    <Button
                        onClick={() => {
                            deleteSelected();
                            closeWarnModal();
                        }}
                    >
                        Так
                    </Button>
                    <Button
                        onClick={() => {
                            closeWarnModal();
                        }}
                    >
                        Ні
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapStateToProps = ({ Contragents, Auth }) => ({
    tableConfig: Contragents.tableConfig,
    contragents: Contragents.contragents,
    roles: Auth.user.roles
});

const mapDispatchToProps = {
    throwAlert,
    setTableConfig
};

export default connect(mapStateToProps, mapDispatchToProps)(ContragentsTable);
