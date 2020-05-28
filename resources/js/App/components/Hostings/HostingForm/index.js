import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Dialog, Grid } from '@material-ui/core';
import moment from 'moment';

import Input from '../../custom/Input';
import FormActionGroup from '../../FormActionGroup';
import SitesListInputs from './SitesListInputs';
import Select from '../../custom/Select';
import requests from '../../../requests';
import { createCustomersData, createSelectData } from '../../../config/selectOptions';
import useModal from '../../../config/hooks/useModal';
import CustomerForm from '../../Customers/CustomerForm';
import CustomDatePicker from '../../custom/CustomDatePicker';
import { throwAlert } from '../../../reducers/App/actions';
import { getHostings } from '../../../reducers/Hostings/actions';
import { getHostingStatistics } from '../../../reducers/HostingStatistics/actions';
import { SUCCESS } from '../../../config/alertVariants';
import ActionsButtons from './ActionsButtons';
import { hostingFormData } from './utils';
import './index.scss';
import CustomerSelect from '../../CustomerSelect';

const HostingForm = ({ onClose, isEdit = false, defaultData, updateData }) => {
    const [date, setDate] = useState(new Date());
    const [customersList, setCustomersList] = useState([]);
    const [serversList, setServersList] = useState([]);

    const [submitting, setSubmitting] = useState(false);
    const dispatch = useDispatch();

    const customerModal = useModal();

    const getCustomers = () => {
        requests.Customer.getAll().then(resp => {
            setCustomersList(createCustomersData(resp.data));
        });
    };

    const getServers = () => {
        requests.Servers.getAll().then(resp => {
            setServersList(createSelectData(resp.data));
        });
    };

    useEffect(() => {
        getCustomers();
        getServers();
    }, []);

    const initialValues = {
        customer: '',
        server: '',
        comment: '',
        expense: '',
        sites: [{ id: null, name: '' }]
    };

    const validationSchema = Yup.object().shape({
        customer: Yup.mixed().required('Контрагент обязателбный'),
        server: Yup.mixed().required('Сервер обязательный'),
        expense: Yup.number().typeError('Значение должно быть числом').required('Тариф обязательный'),
        sites: Yup.array().of(Yup.object().shape({
            name: Yup.string().required('Сайт обязательный')
        }))
    });

    const handleSelect = (field, setValue) => value => {
        setValue(field, value);
    };

    const handlePickDate = date => {
        setDate(date);
    };

    const submitForm = values => {
        setSubmitting(true);
        const formData = {
            customer_id: values.customer.value,
            server_id: values.server.value,
            comment: values.comment,
            expense: values.expense,
            sites: values.sites,
            expired_at: new Date(date)
        };
        if (!isEdit) {
            requests.Hostings.create(formData).then(() => {
                dispatch(throwAlert(SUCCESS, 'Хостинг успешно создан'));
                dispatch(getHostings());
                dispatch(getHostingStatistics());
                onClose();
            }).catch(() => setSubmitting(false));
        } else {
            requests.Hostings.update(defaultData.id, formData).then(() => {
                dispatch(throwAlert(SUCCESS, 'Хостинг успешно обновлен'));
                dispatch(getHostings());
                dispatch(getHostingStatistics());
                onClose();
            }).catch(() => setSubmitting(false));
        }
    };
    console.log(defaultData);
    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={submitForm}
                validationSchema={validationSchema}
            >
                {
                    ({
                        values,
                        handleSubmit,
                        setFieldValue,
                        setValues,
                        handleChange,
                        handleBlur,
                        errors,
                        touched
                    }) => {
                        useEffect(() => {
                            if (isEdit) {
                                const unitedFormData = {
                                    ...hostingFormData,
                                    ...defaultData
                                };
                                setValues({
                                    customer: {
                                        value: unitedFormData.customer_id,
                                        label: unitedFormData.customerName,
                                        phone: unitedFormData.customerPhone
                                    },
                                    server: {
                                        value: unitedFormData.server_id,
                                        label: unitedFormData.serverName
                                    },
                                    expense: unitedFormData.expense,
                                    sites: unitedFormData.sites
                                });
                                setDate(moment(unitedFormData.expired_at).format());
                            }
                        }, [defaultData]);

                        return (
                            <>
                                <form className="hosting_form" onSubmit={handleSubmit}>
                                    <div className="form_wrapper hosting_form__inner-wrapper">
                                        {
                                            !isEdit && <div className="form_title">Добавить хостинг</div>
                                        }
                                        <Grid container alignItems="center">
                                            <Grid item xs={4}>Контрагент</Grid>
                                            <Grid item xs={8}>
                                                <CustomerSelect
                                                    value={values.customer}
                                                    placeholder={'Выбрать...'}
                                                    options={customersList}
                                                    onAddClick={customerModal.openModal}
                                                    onChange={handleSelect('customer', setFieldValue)}
                                                    isError={errors.customer && touched.customer}
                                                    errorMessage={errors.customer}
                                                />
                                            </Grid>
                                        </Grid>
                                        <SitesListInputs
                                            sitesList={values.sites}
                                            onChange={newSites => setFieldValue('sites', newSites)}
                                            errors={errors.sites}
                                            touched={touched.sites}
                                        />
                                        <Grid container alignItems="center">
                                            <Grid item xs={4}>Сервера</Grid>
                                            <Grid item xs={8}>
                                                <Select
                                                    value={values.server}
                                                    placeholder={'Выбрать...'}
                                                    options={serversList}
                                                    onChange={handleSelect('server', setFieldValue)}
                                                    isError={errors.server && touched.server}
                                                    errorMessage={errors.server}
                                                />
                                            </Grid>
                                        </Grid>
                                        <div className="form_row">
                                            <Grid container alignItems="center">
                                                <Grid item xs={4}>Тариф хостинга</Grid>
                                                <Grid item xs={8}>
                                                    <Input
                                                        value={values.expense}
                                                        onChange={handleChange('expense')}
                                                        onBlur={handleBlur('expense')}
                                                        isError={errors.expense && touched.expense}
                                                        errorMessage={errors.expense}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className="form_row">
                                            <Grid container alignItems="center">
                                                <Grid item xs={4}>Дата</Grid>
                                                <Grid item xs={8}>
                                                    <CustomDatePicker value={date} onChange={handlePickDate}/>
                                                </Grid>
                                            </Grid>
                                        </div>
                                        {
                                            !isEdit &&
                                            <div className="form_row">
                                                <Grid container alignItems="center">
                                                    <Grid item xs={4}>Комментарий</Grid>
                                                    <Grid item xs={8}>
                                                        <Input
                                                            value={values.comment}
                                                            placeholder={'Не обязательно'}
                                                            onChange={handleChange('comment')}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        }
                                        {
                                            isEdit &&
                                            <div className="hosting-form__actions_wrapper">
                                                <ActionsButtons hostingId={defaultData.id} updateFormData={updateData}/>
                                            </div>
                                        }
                                    </div>
                                    <FormActionGroup
                                        onClose={onClose}
                                        isSubmitting={submitting}
                                        buttonDisabled={submitting}
                                    />
                                </form>
                                <Dialog
                                    open={customerModal.open}
                                    onClose={customerModal.closeModal}
                                    fullWidth={true}
                                    maxWidth="md"
                                >
                                    <CustomerForm
                                        onClose={customerModal.closeModal}
                                        handleSubmit={data => {
                                            getCustomers();
                                            setFieldValue('customer', {
                                                value: data.id,
                                                label: data.name,
                                                phone: data.phone
                                            });
                                        }}
                                    />
                                </Dialog>
                            </>
                        );
                    }
                }
            </Formik>
        </>
    );
};

export default HostingForm;
