import React from 'react';
import { throwAlert } from '../../reducers/App/actions';
import { SUCCESS } from '../../config/alertVariants';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import connect from 'react-redux/es/connect/connect';
import requests from '../../requests';
import { createCustomersData, createUsersData } from '../../config/selectOptions';
import Input from '../custom/Input';
import Select from '../custom/Select';
import './index.scss';
import FormActionGroup from '../FormActionGroup';
import DeleteProjectButton from '../../pages/ProjectEdit/DeleteProjectButton';

class ProjectForm extends React.Component {
    state = {
        customers: [],
        users: [],
        isConfirmModalOpen: false,
        isSubmitting: false
    };

    componentDidMount() {
        this.fetchUsers();
        this.fetchCustomers();
    }

    fetchCustomers = () => {
        requests.Customer.getAll().then(resp => {
            this.setState({ customers: createCustomersData(resp.data) });
        });
    };
    fetchUsers = () => {
        requests.User.getAll().then(resp => {
            this.setState({ users: createUsersData(resp.data) });
        });
    };
    handleSubmit = (values) => {
        const title = values.title;
        const { projectId, closeForm, throwAlert, updateData } = this.props;
        let customer_ids = null;
        let user_ids = null;

        if (values.customers) {
            customer_ids = values.customers.map((item) => {
                return {
                    model_id: item.value
                };
            });
        }
        if (values.users) {
            user_ids = values.users.map((item) => {
                return {
                    model_id: item.value
                };
            });
        }

        const formData = {
            title,
            customer_ids,
            user_ids
        };

        this.setState({ isSubmitting: true });

        if (projectId) {
            requests.Project.editProject(projectId, formData).then(() => {
                throwAlert(SUCCESS, 'Проект успешно обновлен');
                closeForm();
                updateData();
            }).catch(() => this.setState({ isSubmitting: false }));
        } else {
            requests.Project.addProject(formData).then(resp => {
                throwAlert(SUCCESS, 'Проект успешно создан');
                closeForm();
                updateData(resp.data.data);
            }).catch(() => this.setState({ isSubmitting: false }));
        }
    };

    render() {
        const {
            defaultData = {
                title: '',
                users: [],
                customers: this.props.customer !== undefined ? [this.props.customer] : []
            },
            projectId
        } = this.props;

        return (
            <>
                <Formik
                    initialValues={defaultData}
                    onSubmit={(values) => {
                        this.handleSubmit(values);
                    }}
                    validationSchema={Yup.object().shape({
                        title: Yup.string().required('Обязательное поле название проекта')
                    })}
                >
                    {props => {
                        const {
                            errors,
                            touched,
                            setFieldTouched,
                            setFieldValue,
                            handleSubmit,
                            handleChange,
                            handleBlur,
                            values
                        } = props;

                        return (
                            <form className="project-form__container" onSubmit={handleSubmit}>
                                <div className="form_wrapper">
                                    <div className="form_title">{projectId ? 'Редактировать проект' : 'Создать проект'}</div>
                                    <Grid alignItems="center" container>
                                        <Grid item xs={4}>
                                            <label className="input_label">Проект</label>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <div className="input-wrapper">
                                                <Input
                                                    placeholder="Название проекта"
                                                    autoComplete="off"
                                                    name="title"
                                                    onChange={handleChange}
                                                    value={values.title}
                                                    onBlur={handleBlur('title')}
                                                    isError={errors.title && touched.title}
                                                    errorMessage={errors.title}
                                                />
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Grid alignItems="center" container>
                                        <Grid item xs={4}>
                                            <label className="input_label">Пользователи</label>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <div className="input-wrapper">
                                                <Select
                                                    isMulti
                                                    onChange={(item) => setFieldValue('users', item)}
                                                    onBlur={() => {
                                                        setFieldTouched('users', true);
                                                    }}
                                                    onFocus={() => {
                                                        setFieldTouched('users', false);
                                                    }}
                                                    options={this.state.users}
                                                    placeholder={'Пользователи'}
                                                    maxMenuHeight={180}
                                                    value={values.users}
                                                />
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Grid alignItems="center" container>
                                        <Grid item xs={4}>
                                            <label className="input_label">Клиенты</label>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <div className="input-wrapper">
                                                <Select
                                                    isMulti
                                                    onChange={(item) => setFieldValue('customers', item)}
                                                    onBlur={() => {
                                                        setFieldTouched('customers', true);
                                                    }}
                                                    onFocus={() => {
                                                        setFieldTouched('customers', false);
                                                    }}
                                                    options={this.state.customers}
                                                    placeholder={'Клиенты'}
                                                    maxMenuHeight={180}
                                                    value={values.customers}
                                                />
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                                <FormActionGroup
                                    onClose={this.props.closeForm}
                                    deleteButton={this.props.projectId ?
                                        <DeleteProjectButton projectId={this.props.projectId}/> : null}
                                    isSubmitting={this.state.isSubmitting}
                                />
                            </form>
                        );
                    }}
                </Formik>
            </>
        );
    }
}

const mapDispatchToProps = {
    throwAlert
};

export default connect(null, mapDispatchToProps)(ProjectForm);
