import React from 'react';
import MainLayout from '../../components/MainLayout';
import requests from '../../requests';
import Comments from '../../components/Comments';
import ProjectFinanceInfo from './ProjectFinanceInfo';
import './index.scss';
import MainTitle from '../../components/MainTitle';
import Grid from '@material-ui/core/Grid';
import { FINANCE_ITEM_HEIGHT } from './constants';
import { Dialog, withStyles } from '@material-ui/core';
import Button from '../../components/custom/Button';
import ProjectForm from '../../components/ProjectForm';
import { createCustomersData, createUsersData } from '../../config/selectOptions';
import TransactionsTable from '../../components/TransactionsTable';
import { getNotCurrentTransactionsData, resetNotCurrentTransactions } from '../../reducers/Transactions/actions';
import { connect } from 'react-redux';
import DeleteProjectButton from './DeleteProjectButton';

const styles = {
    button: {
        fontWeight: 'bold',
        fontSize: '14px',
        borderRadius: '2px',
        textTransform: 'uppercase',
        marginRight: '12px'
    },
    editBtn: {
        backgroundColor: 'black',
        color: 'white',
        '&:hover': {
            backgroundColor: '#FFD63C',
            color: 'black'
        }
    },
    deleteBtn: {
        color: '#C24537'
    }
};

class ProjectEdit extends React.Component {
    state = {
        projectData: {
            project: {
                title: null,
                comments: [],
                id: null,
                customers: [],
                users: []
            },
            expense: {
                plan: null,
                fact: null,
                future: null,
                diff: null
            },
            income: {
                plan: null,
                fact: null,
                future: null,
                diff: null
            },
            balance: {
                fact: null,
                future: null
            }
        },
        isEditModalOpen: false,
        isConfirmModalOpen: false
    };

    componentDidMount() {
        this.getProjectData();
    }

    componentWillUnmount() {
        this.props.resetNotCurrentTransactions();
    }

    getProjectData = () => {
        const { match } = this.props;

        requests.Project.getDetail(match.params.projectId).then(resp => {
            this.setState({ projectData: resp.data });
        }).catch(() => {
            this.props.history.push('/project');
        });
    };
    getNotCurrentTransactionsWithParams = (newParams) => {
        const { match } = this.props;
        this.props.getNotCurrentTransactionsData({
            ...newParams,
            project_id: match.params.projectId
        });
    };
    openEditForm = () => {
        this.setState({ isEditModalOpen: true });
    };
    closeEditForm = () => {
        this.setState({ isEditModalOpen: false });
    };
    addProjectComment = (commentData) => {
        const { projectData } = this.state;

        return requests.Project.addComment(projectData.project.id, commentData).then(resp => {
            this.setState({
                projectData: {
                    ...projectData,
                    project: {
                        ...projectData.project,
                        comments: resp.data.comments
                    }
                }
            });
        });
    };

    onCommentsChange = newComments => {
        const { projectData } = this.state;
        this.setState({
            projectData: {
                ...projectData,
                project: {
                    ...projectData.project,
                    comments: newComments
                }
            }
        });
    };

    render() {
        const { projectData, isEditModalOpen } = this.state;
        const { match } = this.props;

        return (
            <MainLayout>
                <div className="project_edit_page">
                    <div className="main_title_wrapper">
                        <MainTitle title={projectData.project.title}/>
                    </div>
                    <div className="finance_info_wrapper">
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <div className="project-nav-buttons">
                                    <div className="project-nav-buttons__item">
                                        <Button variant="secondary" onClick={this.openEditForm}>Редактировать</Button>
                                    </div>
                                    <div className="project-nav-buttons__item">
                                        <Button>Завершить</Button>
                                    </div>
                                    <div className="project-nav-buttons__item">
                                        <DeleteProjectButton projectId={match.params.projectId}/>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className="finance_info_item">
                                    <ProjectFinanceInfo style={{ height: FINANCE_ITEM_HEIGHT }} data={projectData}/>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className="finance_info_item card_wrapper">
                                    <Comments
                                        comments={projectData.project.comments}
                                        onSendComment={this.addProjectComment}
                                        onChange={this.onCommentsChange}
                                        style={{ height: FINANCE_ITEM_HEIGHT }}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <TransactionsTable
                                    data={this.props.notCurrentTransactions.data}
                                    total={this.props.notCurrentTransactions.meta.total}
                                    onMount={this.getNotCurrentTransactionsWithParams}
                                    onChangePage={this.getNotCurrentTransactionsWithParams}
                                    onChangeRowsPerPage={this.getNotCurrentTransactionsWithParams}
                                    onChangeSort={this.getNotCurrentTransactionsWithParams}
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <Dialog open={isEditModalOpen} onClose={this.closeEditForm} fullWidth={true} maxWidth="md">
                        <ProjectForm
                            closeForm={this.closeEditForm}
                            projectId={projectData.project.id}
                            defaultData={{
                                title: projectData.project.title,
                                customers: createCustomersData(projectData.project.customers),
                                users: createUsersData(projectData.project.users)
                            }}
                            updateData={this.getProjectData}
                            history={this.props.history}
                        />
                    </Dialog>
                </div>
            </MainLayout>
        );
    }
}

const mapDispatchToProps = {
    getNotCurrentTransactionsData,
    resetNotCurrentTransactions
};
const mapStateToProps = ({ Transactions }) => ({
    notCurrentTransactions: Transactions.notCurrentTransactions
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProjectEdit));
