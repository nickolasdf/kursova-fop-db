import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { Formik } from 'formik';

import FormActionGroup from '../../FormActionGroup';
import Input from '../../custom/Input';
import RadioButton from '../../custom/RadioButton';
import requests from '../../../requests';
import { useDispatch } from 'react-redux';
import { throwAlert } from '../../../reducers/App/actions';
import { getServers } from '../../../reducers/Servers/actions';
import { SUCCESS } from '../../../config/alertVariants';
import useModal from '../../../config/hooks/useModal';
import ConfirmDeleteServerModal from './ConfirmDeleteServerModal';
import Button from '../../custom/Button';
import * as Yup from 'yup';
import './index.scss';

const ServerForm = ({ onClose, serverId }) => {
    const [selectedPlan, setSelectedPlan] = useState({ value: 'month', label: 'в месяц' });
    const [submitting, setSubmitting] = useState(false);
    const confirmModal = useModal();
    const dispatch = useDispatch();

    const initialValues = {
        name: '',
        description: '',
        plan: ''
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Название обязателбное'),
        description: Yup.string().required('Описание обязательное'),
        plan: Yup.number().typeError('Некоректный формат').required('Сума обязательна')
    });

    const handlePlanChange = event => {
        setSelectedPlan({
            value: event.target.value,
            label: event.target.value === 'month' ? 'в месяц' : 'в год'
        });
    };

    const submitForm = values => {
        setSubmitting(true);
        const formData = {
            name: values.name,
            description: values.description
        };
        if (selectedPlan.value === 'month') {
            formData.month_expense = values.plan;
        } else {
            formData.year_expense = values.plan;
        }

        if (serverId) {
            requests.Servers.edit(serverId, formData)
                .then(() => onClose())
                .then(() => {
                    dispatch(throwAlert(SUCCESS, 'Сервер усешно обновлен'));
                })
                .then(() => dispatch(getServers()))
                .catch(() => setSubmitting(false));
        } else {
            requests.Servers.create(formData)
                .then(() => onClose())
                .then(() => {
                    dispatch(throwAlert(SUCCESS, 'Сервер усешно создан'));
                })
                .then(() => dispatch(getServers()))
                .catch(() => setSubmitting(false));
        }
    };
    return (
        <>
            <Formik
                initialValues={initialValues} onSubmit={submitForm} validationSchema={validationSchema}
            >
                {
                    ({
                        handleChange,
                        handleSubmit,
                        handleBlur,
                        values,
                        setValues,
                        errors,
                        touched
                    }) => {
                        useEffect(() => {
                            if (serverId) {
                                requests.Servers.getOne(serverId).then(resp => {
                                    setValues({
                                        name: resp.data.name,
                                        description: resp.data.description,
                                        plan: resp.data.year_expense
                                    });
                                    setSelectedPlan({ value: 'year', label: 'в год' });
                                });
                            }
                        }, []);

                        return (
                            <form onSubmit={handleSubmit}>
                                <div className="form_wrapper">
                                    <div className="form_title">{serverId ? 'Редактировать сервер' : 'Добавить сервер'}</div>
                                    <div className="form_row">
                                        <Grid container alignItems="center">
                                            <Grid item xs={4}>Название</Grid>
                                            <Grid item xs={8}><Input
                                                value={values.name}
                                                onChange={handleChange('name')}
                                                onBlur={handleBlur('name')}
                                                isError={errors.name && touched.name}
                                                errorMessage={errors.name}
                                            /></Grid>
                                        </Grid>
                                    </div>
                                    <div className="form_row">
                                        <Grid container alignItems="center">
                                            <Grid item xs={4}>Описание</Grid>
                                            <Grid item xs={8}><Input
                                                value={values.description}
                                                onChange={handleChange('description')}
                                                onBlur={handleBlur('description')}
                                                isError={errors.description && touched.description}
                                                errorMessage={errors.description}
                                            /></Grid>
                                        </Grid>
                                    </div>
                                    <div className="form_row server_form__plan_row">
                                        <Grid container alignItems="center">
                                            <Grid item xs={4}>Затраты на сервер</Grid>
                                            <Grid item xs={8}>
                                                <Grid container>
                                                    <Grid item xs={6}>
                                                        <div className="server_form__radio_group_wrapper">
                                                            <div>
                                                                <RadioButton
                                                                    checked={selectedPlan.value === 'month'}
                                                                    value="month"
                                                                    onChange={handlePlanChange}
                                                                    size={20}
                                                                />
                                                                <span>в месяц</span>
                                                            </div>
                                                            <div>
                                                                <RadioButton
                                                                    checked={selectedPlan.value === 'year'}
                                                                    value="year"
                                                                    onChange={handlePlanChange}
                                                                    size={20}
                                                                />
                                                                <span>в год</span>
                                                            </div>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={6}><Input
                                                        value={values.plan}
                                                        placeholder={selectedPlan.label}
                                                        onChange={handleChange('plan')}
                                                        onBlur={handleBlur('plan')}
                                                        isError={errors.plan && touched.plan}
                                                        errorMessage={errors.plan}
                                                    /></Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </div>
                                <FormActionGroup
                                    onClose={onClose}
                                    isDelete={Boolean(serverId)}
                                    isSubmitting={submitting}
                                    deleteButton={
                                        <Button variant="outlined" onClick={confirmModal.openModal}>
                                            Удалить
                                        </Button>
                                    }
                                />
                            </form>
                        );
                    }
                }
            </Formik>
            <ConfirmDeleteServerModal
                isOpen={confirmModal.open}
                onClose={confirmModal.closeModal}
                onSubmit={onClose}
                serverId={serverId}
            />
        </>
    );
};

export default ServerForm;
