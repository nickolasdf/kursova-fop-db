import React from 'react';
import MainTitle from '../../components/MainTitle';
import MainLayout from '../../components/MainLayout';
import './style.scss';
import DefaultDataTable from '../../components/DefaultDataTable';
import connect from 'react-redux/es/connect/connect';
import { fetchProjectsList } from '../../reducers/ProjectList/actions';
import Spinner from '../../components/Spinner';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import ProjectForm from '../../components/ProjectForm';
import { Dialog } from '@material-ui/core';

const headCells = [
    {
        id: 'title',
        sortable: true,
        label: 'Проект'
    },
    {
        id: 'created',
        sortable: true,
        label: 'Создан'
    }
];

const styles = theme => ({
    tableRow: {
        '&:hover': {
            cursor: 'pointer'
        }
    }
});

class ProjectList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            model: {},
            title: '',
            isEdit: false,
            isModalOpen: false,
            isConfirmDeleteModalOpen: false,
            isConfirmDeleteModalId: null,
            customers: [],
            users: []
        };
    }

    openForm = () => {
        this.setState({ isModalOpen: true });
    };
    closeForm = () => {
        this.setState({ isModalOpen: false });
    };
    fetchProjects = (params) => {
        this.props.fetchProjectsList(params);
    };
    handleClickRow = rowData => () => {
        const { history } = this.props;
        history.push(`/project/${rowData.id}`);
    };

    render() {

        const { projectsList = {} } = this.props;
        const { data = [], meta: { total = 0 } = {} } = projectsList;
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
                                onClick={this.handleClickRow(candidate)}
                            >
                                <TableCell align="left">
                                    {candidate.title}
                                </TableCell>
                                <TableCell align="left">
                                    {candidate.created}
                                </TableCell>
                            </TableRow>
                        );
                    })
                }
            </>
        );

        return (
            <MainLayout>
                {!this.props.pending || (<Spinner/>)}
                <MainTitle title="Проекты"/>
                <div className="project-page__container">
                    <div className="project-page__nav-block">
                        <div>
                            <button className="project-page__project-add-btn" onClick={this.openForm}>Новый проект
                            </button>
                        </div>
                    </div>
                    <DefaultDataTable
                        headCells={headCells}
                        dataList={projectsList}
                        fetchData={(params) => this.fetchProjects(params)}
                        tableBody={tableBody}
                        listeners={['projectAdded', 'projectEdited', 'projectDeleted']}
                    />
                </div>
                <Dialog open={this.state.isModalOpen} onClose={this.closeForm} fullWidth={true} maxWidth="md">
                    <ProjectForm closeForm={this.closeForm}/>
                </Dialog>
            </MainLayout>
        );
    }
}

const mapStateToProps = state => ({
    projectsList: state.ProjectList.projectsList,
    pending: state.ProjectList.pending
});

const mapDispatchToProps = {
    fetchProjectsList
};

export default compose(
    withStyles(styles, {
        name: 'ProjectList'
    }),
    connect(mapStateToProps, mapDispatchToProps)
)(ProjectList);
