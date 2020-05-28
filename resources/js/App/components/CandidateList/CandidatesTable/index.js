import React from "react";
import { connect } from 'react-redux';
import Table from "@material-ui/core/Table";
import TableHead from '@material-ui/core/TableHead';
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from "@material-ui/core/Paper/Paper";
import TablePagination from "@material-ui/core/TablePagination/TablePagination";
import {makeStyles} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import {fetchCandidateList} from "../../../reducers/CandidateList/actions";
import Spinner from "../../Spinner";
import { compose } from 'recompose'
import "./index.scss";

const headCells = [
    { id: 'name', label: 'Имя' },
    { id: 'email', label: 'Email' },
    { id: 'city', label: 'Город' },
    { id: 'education', label: 'Образование' },
    { id: 'desired_salary', label: 'Зарплата' },
    { id: 'platform', label: 'Платформа' },
];

const styles = theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing(3),
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
});


class CandidatesTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orderBy: headCells[0].id,
            order: "ASC",
            page: 1,
            per_page: 5,
        };

        this.fetchCandidate = this.fetchCandidate.bind(this);
        this.createSortHandler = this.createSortHandler.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    }

    componentDidMount() {
        this.fetchCandidate();
        console.log(this.props);
    }

    async createSortHandler(e, headCellId) {

        if (this.state.orderBy === headCellId) {
            await this.setState({
                order: ( this.state.order === "DESC" ? "ASC" : "DESC")
            })
        } else {
            await this.setState({
                order: "DESC"
            })
        }

        await this.setState({
            orderBy: headCellId
        })

        this.fetchCandidate();
    }

    fetchCandidate () {

        const params = {
            orderBy: this.state.orderBy ? this.state.orderBy : headCells[0].id,
            order: this.state.order,
            page: this.state.page,
            per_page: this.state.per_page,
        }

        this.props.dispatch( fetchCandidateList(params) );
    }

     handleChangePage = async (event, newPage) => {
        await this.setState({
            page: (newPage + 1)
        });
        this.fetchCandidate();
    }

    handleChangeRowsPerPage = async (event) => {
        await this.setState({
            page: 1,
            per_page: parseInt(event.target.value, 10)
        });
        this.fetchCandidate();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.props);
    }

    render() {

        const { candidatesList: { data = [] , meta : { total = 0 } = {} } = {} } = this.props;

        const { classes } = this.props;

        return (
            <div className={classes.root}>
                {!this.props.pending || (<Spinner/>) }

                <Paper className={classes.paper}>
                    <div className={classes.tableWrapper}>
                        <Table
                            aria-labelledby="tableTitle"
                            size={"medium"}
                            className={classes.table}
                        >
                            <TableHead>
                                <TableRow>
                                    {headCells.map(headCell => (
                                        <TableCell
                                            key={headCell.id}
                                        >
                                            <TableSortLabel
                                                active={this.state.orderBy === headCell.id}
                                                direction={this.state.order === "DESC" ? "desc" : "asc"}
                                                onClick={(e) => {
                                                    this.createSortHandler(e, headCell.id)
                                                }}
                                            >
                                                {headCell.label}
                                            </TableSortLabel>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    data.map((candidate, key) => {
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={key}
                                            >
                                                <TableCell align="left">
                                                    {candidate.name}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {candidate.email}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {candidate.city}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {candidate.education}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {candidate.desired_salary}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {candidate.platform}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </div>
                    < TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
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
                </Paper>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    candidatesList: state.CandidateList.candidatesList,
    pending: state.CandidateList.pending,
});

export default compose(
    withStyles(styles, {
        name: 'CandidatesTable',
    }),
    connect(mapStateToProps),
)(CandidatesTable);

// export default connect(mapStateToProps)(CandidatesTable);
