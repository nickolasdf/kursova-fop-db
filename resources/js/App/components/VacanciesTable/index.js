import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import { connect } from "react-redux";
import { throwAlert } from "../../reducers/App/actions";
import Preloader from "../Preloader";
import "./index.scss";
import { Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { deleteVacancy } from "../../reducers/Vacancies/actions";
import VacancyEditModal from "../../pages/Vacancies/VacancyEditModal";
import { setSortVacancies } from "../../reducers/Vacancies/actions";

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
    },
    alignCenter: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}));

function VacanciesTable(props) {
    const classes = useStyles();
    const [selected, setSelected] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenWarn, setIsOpenWarn] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState({});

    const {
        tableConfig,
        roles,
        openForm,
        vacancies,
        cities,
        deleteVacancy,
        currencies,
        employmentTypes,
        user,
        getVacanciesData,
        setSortVacancies
    } = props;

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
        await setSortVacancies({
            order: orderSort,
            orderBy: property
        });
        await getVacanciesData({
            order_field: property,
            order_type: orderSort.toUpperCase(),
            per_page: tableConfig.rowsPerPage
        });
    }

    function handleSelectAllClick(event) {
        if (event.target.checked && selected.length === 0) {
            const newClickSelected = vacancies.map(n => n.id);
            setSelected(newClickSelected);
            return;
        }
        setSelected([]);
    }

    const handleModalState = (e, name) => {
        setModalData(name);
        setIsModalOpen(true);
    };

    async function handleChangePage(event, newPage) {
        await setSortVacancies({ page: newPage });
        await getVacanciesData();
    }

    async function handleFilter(event, value) {
        let data = tableConfig;
        if (event !== null) {
            setSortVacancies(
                Object.assign(tableConfig.filters, { [value]: event.value })
            );
        } else {
            setSortVacancies(
                Object.assign(tableConfig.filters, { [value]: "" })
            );
        }

        setSortVacancies(data);
        await getVacanciesData();
    }

    async function handleChangeRowsPerPage(event) {
        await setSortVacancies({
            rowsPerPage: event.target.value,
            page: 0
        });

        await getVacanciesData({
            order_field: tableConfig.orderBy,
            order_type: tableConfig.order.toUpperCase(),
            per_page: event.target.value
        });
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
                                onFilter={handleFilter}
                                cities={cities}
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
                                vacancies.map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={event =>
                                                handleModalState(event, row)
                                            }
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={`${row.id}`}
                                            selected={isItemSelected}
                                        >
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                                align="center"
                                            >
                                                {row.title}
                                            </TableCell>
                                            <TableCell align="center">
                                                {row.city}
                                            </TableCell>
                                            <TableCell align="center">
                                                {row.salary_from}
                                            </TableCell>
                                            <TableCell align="center">
                                                {row.salary_to}
                                            </TableCell>
                                            <TableCell align="center">
                                                {row.owner}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[10, 20, 50]}
                    labelRowsPerPage="Строк на страницу"
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
                <VacancyEditModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    user={user}
                    data={modalData}
                    cities={cities}
                    currencies={currencies}
                    employmentTypes={employmentTypes}
                />
            </Paper>
            <Dialog open={isOpenWarn} onClose={closeWarnModal}>
                <DialogTitle>Вы действительно хотите удалить?</DialogTitle>
                <DialogActions>
                    <Button
                        onClick={() => {
                            deleteVacancy(selected);
                            props.throwAlert("success", "Вакансия удалена");
                            setSelected([]);
                            closeWarnModal();
                        }}
                    >
                        Да
                    </Button>
                    <Button
                        onClick={() => {
                            closeWarnModal();
                        }}
                    >
                        Нет
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapStateToProps = ({ Auth, Vacancies }) => ({
    tableConfig: Vacancies.tableConfig,
    roles: Auth.user.roles,
    vacancies: Vacancies.data
});

const mapDispatchToProps = {
    throwAlert,
    deleteVacancy,
    setSortVacancies
};

export default connect(mapStateToProps, mapDispatchToProps)(VacanciesTable);
