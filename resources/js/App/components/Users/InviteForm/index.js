import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './index.scss';
import { SelectData } from '../../../config/statuses';
import requests from '../../../requests';
import FormSwitcher from './FormSwitcher';
import Grid from '@material-ui/core/Grid';
import { throwAlert } from '../../../reducers/App/actions';
import FormActionGroup from '../../FormActionGroup';
import Input from '../../custom/Input';
import Select from '../../custom/Select';

const InviteForm = ({ onClose, onSubmit }) => {
    const [roles, setRoles] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [offices, setOffices] = useState([]);

    const [activeForm, setActiveForm] = useState('crm');

    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Некоректная почта').required('Почта обязательна')
    });

    const initialValues = {
        email: '',
        role: '',
        first_name: '',
        last_name: '',
        department: '',
        office: ''
    };

    useEffect(() => {
        let selects = new SelectData();
        selects.getEnums().then(() => {
            setDepartments(selects.department);
        });
        selects.getOffices().then(() => {
            setOffices(selects.offices);
        });
        selects.getRoles().then(() => {
            setRoles(selects.roles);
        });
    }, []);

    const submitForm = values => {
        const {
            email,
            role,
            first_name,
            last_name,
            office,
            department
        } = values;

        const formData = {
            email,
            role: role ? role.label : '',
            first_name,
            last_name,
            office: office ? office.value : '',
            department: department ? department.value : ''
        };
        requests.User.invite(formData).then(() => {
            dispatch(throwAlert('success', 'Отправлено'));
            onClose();
            if (onSubmit && typeof onSubmit === 'function') {
                onSubmit();
            }
        });
    };

    const handleFormTypeChange = type => {
        setActiveForm(type);
    };

    return (
        <Formik initialValues={initialValues} onSubmit={submitForm} validationSchema={validationSchema}>
            {
                ({
                    values,
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    handleReset,
                    errors,
                    touched,
                    setFieldValue
                }) => {
                    useEffect(() => {
                        handleReset();
                    }, [activeForm]);

                    const handleMultiSelectChange = name => items => {
                        setFieldValue(name, items);
                    };

                    return (
                        <form onSubmit={handleSubmit}>
                            <div className="form_wrapper">
                                <div className="form_title">Пригласить в аккаунт</div>
                                <div className="form_item">
                                    <FormSwitcher
                                        currentType={activeForm}
                                        typeHandler={handleFormTypeChange}
                                    />
                                </div>
                                <div className="form_row">
                                    <Grid container alignItems="center">
                                        <Grid item xs={2}>
                                            <label>Email</label>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <Input
                                                className="first-input-border-round"
                                                value={values.email}
                                                onChange={handleChange('email')}
                                                onBlur={handleBlur('email')}
                                                placeholder="name@rivoagency.com"
                                                isError={errors.email && touched.email}
                                                errorMessage={errors.email}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className="form_row">
                                    <Grid container alignItems="center">
                                        <Grid item xs={2}>
                                            <label>Имя</label>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <Input
                                                value={values.first_name}
                                                onChange={handleChange('first_name')}
                                                placeholder="Не обязательно"
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className="form_row">
                                    <Grid container alignItems="center">
                                        <Grid item xs={2}>
                                            <label>Фамилия</label>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <Input
                                                className={activeForm === 'email' ? 'last-input-border-round' : null}
                                                value={values.last_name}
                                                onChange={handleChange('last_name')}
                                                placeholder="Не обязательно"
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                {
                                    activeForm === 'crm' &&
                                    <>
                                        <div className="form_row">
                                            <Grid container alignItems="center">
                                                <Grid item xs={2}>
                                                    <label>Офис</label>
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <Select
                                                        defaultValue={values.office}
                                                        onChange={handleMultiSelectChange('office')}
                                                        options={offices}
                                                        placeholder="Выберите офис..."
                                                    />
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className="form_row">
                                            <Grid container alignItems="center">
                                                <Grid item xs={2}>
                                                    <label>Позиция</label>
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <Select
                                                        defaultValue={values.department}
                                                        onChange={handleMultiSelectChange('department')}
                                                        options={departments}
                                                        placeholder="Выберите позицию..."
                                                    />
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className="form_row">
                                            <Grid container alignItems="center">
                                                <Grid item xs={2}>
                                                    <label>Права доступа</label>
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <Select
                                                        className="last-input-border-round"
                                                        classNamePrefix="invite-form__rounded-select"
                                                        defaultValue={values.role}
                                                        onChange={handleMultiSelectChange('role')}
                                                        options={roles}
                                                        placeholder="Выберите права доступа..."
                                                    />
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </>
                                }
                            </div>
                            <FormActionGroup onClose={onClose}/>
                        </form>
                    );
                }
            }
        </Formik>
    );
};

export default InviteForm;
