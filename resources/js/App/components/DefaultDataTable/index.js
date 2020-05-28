import React from "react";
import Table from "@material-ui/core/Table";
import TableHead from '@material-ui/core/TableHead';
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from "@material-ui/core/Paper/Paper";
import TablePagination from "@material-ui/core/TablePagination/TablePagination";
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose'
import "./index.scss";

const styles = theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing(3),
        boxShadow: "rgba(0, 0, 0, 0.07) 0px 4px 4px 0px",
        backgroundColor: "white",
        borderRadius: 2
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2)
    },
    table: {
        minWidth: 400
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
    tableRow: {
        '&:hover': {
            cursor: "pointer",
        },
    }
});


class DefaultDataTable extends React.Component {

    constructor(props) {
        super(props);

        this.headCells = this.props.headCells ? this.props.headCells : [];

        this.state = {
            orderBy: this.headCells.length ? this.headCells[0].id : null,
            order: "ASC",
            page: 1,
            per_page: 20,
            rowsPerPageOptions: [10, 20, 50, "Все"],
        };

        this.fetchData = this.props.fetchFunction;
        this.createSortHandler = this.createSortHandler.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    }


    componentDidMount() {
        this.fetchDataWrapper();
        this.props.listeners.forEach( (listener) => {
            document.addEventListener(listener, () => {
                this.fetchDataWrapper();
            });
        });
    }

    async createSortHandler(e, headCell) {

        if (headCell.sortable !== false) {

            if (this.state.orderBy === headCell.id) {
                await this.setState({
                    order: (this.state.order === "DESC" ? "ASC" : "DESC")
                })
            } else {
                await this.setState({
                    order: "DESC"
                })
            }

            await this.setState({
                orderBy: headCell.id
            });

            this.fetchDataWrapper();
        }
    }

    fetchDataWrapper () {

        const params = {
            orderBy: this.state.orderBy ? this.state.orderBy : this.headCells[0].id,
            order: this.state.order,
            page: this.state.page,
            per_page: this.state.per_page,
        };

        this.props.fetchData(params);
    }

     handleChangePage = async (event, newPage) => {
        await this.setState({
            page: (newPage + 1)
        });
        this.fetchDataWrapper();
    };

    handleChangeRowsPerPage = async (event) => {
        const { dataList: { data = [] , meta : { total = 0 } = {} } = {} } = this.props;

        if (event.target.value === "Все") {
            await this.setState({
                page: 1,
                per_page: total,
                rowsPerPageOptions: [10, 20, 50, total ,"Все"]
            });
            this.fetchDataWrapper();
        } else {
            await this.setState({
                page: 1,
                per_page: parseInt(event.target.value, 10),
                rowsPerPageOptions: [10, 20, 50, "Все"]
            });
            this.fetchDataWrapper();
        }
    };

    render() {

        const { dataList: { data = [] , meta : { total = 0 } = {} } = {} } = this.props;
        const { tableBody = false } = this.props;

        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table
                        aria-labelledby="tableTitle"
                        size={"medium"}
                        className={classes.table}
                    >
                        <TableHead>
                            <TableRow>
                                {this.headCells.map(headCell => (
                                    <TableCell
                                        key={headCell.id}
                                    >
                                        <TableSortLabel
                                            active={this.state.orderBy === headCell.id}
                                            direction={this.state.order === "DESC" ? "desc" : "asc"}
                                            onClick={(e) => {
                                                this.createSortHandler(e, headCell)
                                            }}
                                            hideSortIcon={headCell.sortable === false}
                                        >
                                            {headCell.label}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {tableBody ||
                                data.map((candidate, key) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={key}
                                            className={classes.tableRow}
                                        >
                                            {this.headCells.map(cell => (
                                                <TableCell align="left">
                                                    {candidate[cell.id]}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={this.state.rowsPerPageOptions}
                        labelRowsPerPage="Строк на страницу"
                        component="div"
                        count={total}
                        rowsPerPage={this.state.per_page}
                        page={this.state.page - 1}
                        backIconButtonProps={{
                            'aria-label': 'previous page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'next page',
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </div>
            </div>
        )
    }
}

export default compose(
    withStyles(styles, {
        name: 'DefaultDataTable',
    }),
)(DefaultDataTable);
