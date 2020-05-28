import React from "react";
import MainTitle from "../../components/MainTitle";
import MainLayout from "../../components/MainLayout";
import "./style.scss";
import {Link} from "react-router-dom";
import DefaultDataTable from "../../components/DefaultDataTable";
import {fetchCandidateList, deleteCandidate} from "../../reducers/CandidateList/actions";
import DefaultConfirmModal from "../../components/DefaultConfirmModal";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import connect from "react-redux/es/connect/connect";
import { throwAlert } from "../../reducers/App/actions";
import {ERROR, SUCCESS} from "../../config/alertVariants";
import history from '../../history';
import {compose} from "recompose";
import {withStyles} from "@material-ui/core/styles";
import Spinner from "../../components/Spinner";

const headCells = [
    { id: 'name', sortable: true, label: 'Имя' },
    { id: 'email', sortable: true, label: 'Email' },
    { id: 'city', sortable: true, label: 'Город' },
    { id: 'education', sortable: true, label: 'Образование' },
    { id: 'desired_salary', sortable: true, label: 'Зарплата' },
    { id: 'platform', sortable: true, label: 'Платформа' },
];

const styles = theme => ({
    tableRow: {
        '&:hover': {
            cursor: "pointer",
        },
    }
});

class CandidateList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isConfirmDeleteModalOpen: false,
            isConfirmDeleteModalId: null
        };
    }

    fetchCandidateList = (params) => {

        this.props.dispatch( fetchCandidateList(params) );
    };

    handleClickEditCandidate = (id) => {

        history.push(`/candidates/edit/${id}`);

    };

    handleClickShowConfirmDelete = (index) => {

        this.setState({
            isConfirmDeleteModalOpen: true,
            isConfirmDeleteModalId: this.props.candidatesList.data[index].id
        });

    };

    handleDeleteModalClose = () => {
        this.setState({
            isConfirmDeleteModalOpen: false,
            isConfirmDeleteModalId: null
        });
    };

    handleDeleteProject = () => {

        const data = {
            id: this.state.isConfirmDeleteModalId
        };

        this.props.dispatch( deleteCandidate(data) );
        this.handleDeleteModalClose();
    };

    render() {

        const { candidatesList = {} } = this.props;
        const { data = [] , meta : { total = 0 } = {} } = candidatesList;
        const { classes } = this.props;

        const tableBody = (
            <>
                {
                    data.map((candidate, key) => {
                        return (
                            <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={key}
                                className={classes.tableRow}
                                onClick={(e) => {this.handleClickEditCandidate(candidate.user.id)}}
                            >
                                <TableCell align="left">
                                    {candidate.user.name}
                                </TableCell>
                                <TableCell align="left">
                                    {candidate.user.email}
                                </TableCell>
                                <TableCell align="left">
                                    {candidate.user.city}
                                </TableCell>
                                <TableCell align="left">
                                    {candidate.user.education}
                                </TableCell>
                                <TableCell align="left">
                                    {candidate.user.desired_salary}
                                </TableCell>
                                <TableCell align="left">
                                    {candidate.user.platform}
                                </TableCell>
                            </TableRow>
                        )
                    })
                }
            </>
        );

        return (
            <MainLayout>
                {!this.props.pending || (<Spinner/>) }
                <MainTitle title="Кандидаты" />
                <div className='candidate-page__container'>
                    <div className="candidate-page__nav-block">
                        <div>
                            <Link to={`/candidates/add`}>
                                <button className="candidate-page__candidate-add-btn" onClick={this.handleClickOpen}>Новый кандидат</button>
                            </Link>
                        </div>
                        {/*<div>*/}
                            {/*<button className="candidate-page__export_btn">ЕКСПОРТ</button>*/}
                        {/*</div>*/}
                    </div>
                    <DefaultDataTable
                        headCells={headCells}
                        dataList={candidatesList}
                        fetchData={(params) => this.fetchCandidateList(params)}
                        tableBody={tableBody}
                        listeners={["candidateAdded","candidateEdited","candidateDeleted"]}
                    />
                    <DefaultConfirmModal
                        isOpen={this.state.isConfirmDeleteModalOpen}
                        confirnCallback={this.handleDeleteProject}
                        closeModalCallback={this.handleDeleteModalClose}
                        title="Удалить кандидата"
                        confirmBtnText="Удалить"
                        canselBtnText="Отменить"
                        confirmInfoText="Вы действительно хотите удалить кандидата?"
                    />
                </div>
            </MainLayout>
        );
    }
}

const mapStateToProps = state => ({
    candidatesList: state.CandidateList.candidatesList,
    pending: state.CandidateList.pending,
});

export default compose(
    withStyles(styles, {
        name: 'CandidateList',
    }),
    connect(mapStateToProps)
)(CandidateList);

