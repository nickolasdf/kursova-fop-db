import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
import { connect } from 'react-redux';

import requests from '../../requests';
import { SelectData } from '../../config/statuses';
import { throwAlert } from '../../reducers/App/actions';
import Button from '../custom/Button';
import './style.scss';
import FormSwitcher from './FormSwitcher';

const selectTheme = theme => ({
    ...theme,
    borderRadius: 0,
    colors: {
        ...theme.colors,
        primary25: '#FFD63C',
        primary: '#FFD63C'
    }
});

const selectStyles = {
    control: () => ({
        display: 'flex',
        alignItems: 'center',
        border: 'solid 1px #e0e0e0',
        width: '100%',
        height: '2.5rem',
        backgroundColor: 'white'
    })
};

const roundSelectBottom = {
    control: provided => ({
        ...provided,
        borderBottomLeftRadius: '5px',
        borderBottomRightRadius: '5px',
        height: '2.5rem',
        borderTopColor: 'transparent'
    })
};

class InviteForm extends Component {
    state = {
        form: {
            ...{
                email: '',
                role: '',
                first_name: '',
                last_name: '',
                department: '',
                office: '',
                projects: []
            },
            ...this.props.formData
        },
        projects: [],
        departments: '',
        offices: '',
        activeForm: 'crm'
    };

    componentDidMount() {
        let selects = new SelectData();
        selects.getEnums().then(() => {
            this.setState({ departments: selects.department });
        });
        selects.getOffices().then(() => {
            this.setState({ offices: selects.offices });
        });
        selects.getRoles().then(() => {
            this.setState({ roles: selects.roles });
        });
    }

    handleChange = name => event => {
        this.setState({
            form: { ...this.state.form, [name]: event.target.value }
        });
    };

    handleMultiSelectChange = name => items => {
        this.setState({ form: { ...this.state.form, [name]: items } });
    };

    handleSubmit = event => {
        event.preventDefault();
        const {
            email,
            role,
            first_name,
            last_name,
            projects,
            office,
            department
        } = this.state.form;
        const { getUsersData, closeForm, throwAlert } = this.props;
        const data = {
            email,
            role: role ? role.label : '',
            first_name,
            last_name,
            office: office ? office.value : '',
            department: department ? department.value : '',
            projects: projects ? projects.map(item => item.value) : []
        };
        requests.User.invite(data).then(resp => {
            getUsersData();
            throwAlert('success', 'Отправлено');
            closeForm();
        });
    };

    handleFormTypeChange = type => {
        this.setState({ activeForm: type });
    };

    render() {
        const { form, activeForm } = this.state;
        return (
            <Dialog
                open={this.props.isOpen}
                onClose={this.props.closeForm}
                maxWidth={false}
            >
                <div className="user_invite">
                    <div className="header">
                        Пригласить в аккаунт
                    </div>

                    <div className="body">
                        <FormSwitcher
                            currentType={activeForm}
                            typeHandler={this.handleFormTypeChange}
                        />

                        <form>
                            {/* Switch between CRM invite and EMAIL invite form */}
                            {(activeForm === 'crm') ?
                                <Grid
                                    className="form_container"
                                    alignItems="center"
                                    container
                                >
                                    <Grid item xs={2}>
                                        <label>Email</label>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <input
                                            name="email"
                                            value={form.email}
                                            onChange={this.handleChange('email')}
                                            className="input_item first-input-border-round"
                                            type="text"
                                            placeholder="name@rivoagency.com"
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <label>Имя</label>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <input
                                            name="first_name"
                                            value={form.first_name}
                                            onChange={this.handleChange('first_name')}
                                            className="input_item"
                                            type="text"
                                            placeholder="Не обязательно"
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <label>Фамилия</label>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <input
                                            name="last_name"
                                            value={form.last_name}
                                            onChange={this.handleChange('last_name')}
                                            className="input_item"
                                            type="text"
                                            placeholder="Не обязательно"
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <label>Офис</label>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Select
                                            defaultValue={form.office}
                                            onChange={this.handleMultiSelectChange('office')}
                                            styles={selectStyles}
                                            options={this.state.offices}
                                            theme={selectTheme}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <label>Позиция</label>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Select
                                            defaultValue={form.department}
                                            onChange={this.handleMultiSelectChange('department')}
                                            styles={selectStyles}
                                            options={this.state.departments}
                                            theme={selectTheme}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <label>Права доступа</label>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Select
                                            defaultValue={form.role}
                                            onChange={this.handleMultiSelectChange('role')}
                                            styles={roundSelectBottom}
                                            options={this.state.roles}
                                            theme={selectTheme}
                                        />
                                    </Grid>
                                </Grid>
                                :

                                // Switched form
                                <Grid
                                    className="form_container"
                                    alignItems="center"
                                    container
                                >
                                    <Grid item xs={2}>
                                        <label>Email</label>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <input
                                            name="email"
                                            value={form.email}
                                            onChange={this.handleChange('email')}
                                            className="input_item first-input-border-round"
                                            type="text"
                                            placeholder="name@rivoagency.com"
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <label>Имя</label>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <input
                                            name="first_name"
                                            value={form.first_name}
                                            onChange={this.handleChange('first_name')}
                                            className="input_item"
                                            type="text"
                                            placeholder="Не обязательно"
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <label>Фамилия</label>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <input
                                            name="last_name"
                                            value={form.last_name}
                                            onChange={this.handleChange('last_name')}
                                            className="input_item last-input-border-round"
                                            type="text"
                                            placeholder="Не обязательно"
                                        />
                                    </Grid>
                                </Grid>}

                            <div className="form_actions">
                                <Button
                                    onClick={this.handleSubmit}
                                    variant="regular"
                                >
                                    Отправить
                                </Button>
                                <Button
                                    marginHorizontal
                                    onClick={this.props.closeForm}
                                    variant="passive"
                                >
                                    Закрыть
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </Dialog>
        );
    }
}

const mapDispatchToProps = {
    throwAlert
};

export default connect(null, mapDispatchToProps)(InviteForm);
