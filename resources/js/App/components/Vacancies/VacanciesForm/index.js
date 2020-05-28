import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Grid } from '@material-ui/core';

import FormActionGroup from '../../FormActionGroup';
import Input from '../../custom/Input';
import Select from '../../custom/Select';
import { createEnumData, createSelectData } from '../../../config/selectOptions';
import { throwAlert } from '../../../reducers/App/actions';
import { SUCCESS } from '../../../config/alertVariants';
import requests from '../../../requests';
import './index.scss';
import { getVacancies } from '../../../reducers/Vacancies/actions';
import useModal from '../../../config/hooks/useModal';
import ConfirmModal from '../../ConfirmModal';

const styles = {
    inputBorderNone: {
        borderRight: 'none'
    }
};

const VacanciesForm = ({
    isEdit = false,
    vacancyData = {},
    onClose
}) => {
    const dispatch = useDispatch();
    const [enums, setEnums] = useState({
        employmentList: [],
        currencyList: []
    });

    const [cities, setCities] = useState([]);
    const [initialValues, setInitialValues] = useState({
        title: '',
        description: '',
        salary_from: '',
        salary_to: '',
        currency: '',
        city: '',
        employment: '',
        number: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const confirmModal = useModal();

    useEffect(() => {
        if (isEdit) {
            requests.Vacancies.getOne(vacancyData.id).then(resp => {
                setInitialValues({
                    title: resp.data.title,
                    description: resp.data.description,
                    salary_from: resp.data.salary_from,
                    salary_to: resp.data.salary_to,
                    currency: {
                        value: resp.data.currency_id,
                        label: resp.data.currency
                    },
                    city: {
                        value: resp.data.city_id,
                        label: resp.data.city
                    },
                    employment: {
                        value: resp.data.employment_id,
                        label: resp.data.employment
                    },
                    number: resp.data.number
                });
            });
        }
    }, [vacancyData]);

    useEffect(() => {
        getEnums();
        getCities();
    }, []);

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Поле обязательно'),
        salary_from: Yup.number().typeError('Поле должно быть числом').required('Поле обязательно'),
        salary_to: Yup.number().typeError('Поле должно быть числом').required('Поле обязательно'),
        currency: Yup.mixed().required('Поле обязательно'),
        city: Yup.mixed().required('Поле обязательно'),
        employment: Yup.mixed().required('Поле обязательно'),
        number: Yup.number().typeError('Поле должно быть числом').required('Поле обязательно')
    });

    const getCities = () => {
        requests.Cities.getAll().then(resp => {
            setCities(createSelectData(resp.data));
        });
    };

    const getEnums = () => {
        requests.Enum.get({ types: ['type_of_employment', 'currency'] }).then(resp => {
            setEnums({
                employmentList: createEnumData(resp.data.data.type_of_employment),
                currencyList: createEnumData(resp.data.data.currency)
            });
        });
    };

    const handleClickDelete = () => {
        confirmModal.openModal();
    };

    const deleteVacancy = () => {
        requests.Vacancies.delete(vacancyData.id).then(() => {
            dispatch(throwAlert(SUCCESS, 'Вакансия умпешно удалена'));
            dispatch(getVacancies());
            onClose();
        });
    };

    const submitForm = values => {
        const formData = {
            title: values.title,
            description: values.description,
            salary_from: values.salary_from,
            salary_to: values.salary_to,
            currency_id: values.currency.value,
            city_id: values.city.value,
            employment_id: values.employment.value,
            number: values.number
        };
        if (isEdit && vacancyData.id) {
            setIsSubmitting(true);
            requests.Vacancies.edit(vacancyData.id, formData)
                .then(() => {
                    setIsSubmitting(false);
                    dispatch(throwAlert(SUCCESS, 'Вакансия успешно обновлена'));
                    onClose();
                })
                .then(() => dispatch(getVacancies()))
                .catch(() => setIsSubmitting(false));
        } else {
            requests.Vacancies.add(formData)
                .then(() => {
                    setIsSubmitting(false);
                    dispatch(throwAlert(SUCCESS, 'Вакансия успешно создана'));
                    onClose();
                })
                .then(() => dispatch(getVacancies()))
                .catch(() => setIsSubmitting(false));
        }
    };

    const title = isEdit ? 'Редактировать вакансию' : 'Создать вакансию';

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={submitForm}
            validationSchema={validationSchema}
            enableReinitialize={true}
        >
            {
                ({
                    values,
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    setFieldValue,
                    errors,
                    touched
                }) => {
                    const handleSelect = name => value => {
                        setFieldValue(name, value);
                    };
                    return (
                        <form onSubmit={handleSubmit} className="vacancies-form">
                            <div className="form_wrapper">
                                <div className="form_title">{title}</div>

                                <div className="form_row">
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <span>Вакансия</span>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Input
                                                onChange={handleChange('title')}
                                                onBlur={handleBlur('title')}
                                                value={values.title}
                                                isError={errors.title && touched.title}
                                                errorMessage={errors.title}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>

                                <div className="form_row vacancies-form__description-wrapper">
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <span>Описание</span>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Input
                                                type="textarea"
                                                onChange={handleChange('description')}
                                                value={values.description}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>

                                <div className="form_row">
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <span>Зарплата</span>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Grid container>
                                                <Grid item xs={4}>
                                                    <Input
                                                        style={styles.inputBorderNone}
                                                        placeholder="От"
                                                        onChange={handleChange('salary_from')}
                                                        onBlur={handleBlur('salary_from')}
                                                        value={values.salary_from}
                                                        isError={errors.salary_from && touched.salary_from}
                                                        errorMessage={errors.salary_from}
                                                    />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Input
                                                        style={styles.inputBorderNone}
                                                        placeholder="До"
                                                        onChange={handleChange('salary_to')}
                                                        onBlur={handleBlur('salary_to')}
                                                        value={values.salary_to}
                                                        isError={errors.salary_to && touched.salary_to}
                                                        errorMessage={errors.salary_to}
                                                    />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Select
                                                        placeholder="Валюта"
                                                        options={enums.currencyList}
                                                        onChange={handleSelect('currency')}
                                                        onBlur={handleBlur('currency')}
                                                        value={values.currency}
                                                        isError={errors.currency && touched.currency}
                                                        errorMessage={errors.currency}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </div>

                                <div className="form_row">
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <span>Город</span>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Select
                                                placeholder="Укажите город"
                                                options={cities}
                                                onChange={handleSelect('city')}
                                                onBlur={handleBlur('city')}
                                                value={values.city}
                                                isError={errors.city && touched.city}
                                                errorMessage={errors.city}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>

                                <div className="form_row">
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <span>Вид занят.</span>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Select
                                                placeholder="Вид"
                                                options={enums.employmentList}
                                                onChange={handleSelect('employment')}
                                                onBlur={handleBlur('employment')}
                                                value={values.employment}
                                                isError={errors.employment && touched.employment}
                                                errorMessage={errors.employment}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>

                                <div className="form_row">
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <span>К-тво позиций</span>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Input
                                                onChange={handleChange('number')}
                                                onBlur={handleBlur('number')}
                                                value={values.number}
                                                isError={errors.number && touched.number}
                                                errorMessage={errors.number}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                            <FormActionGroup
                                onClose={onClose}
                                onDelete={isEdit ? handleClickDelete : null}
                                isSubmitting={isSubmitting}
                            />
                            <ConfirmModal
                                isOpen={confirmModal.open}
                                onClose={confirmModal.closeModal}
                                title="Вы действительно хотите удалить вакансию?"
                                onAccept={deleteVacancy}
                            />
                        </form>
                    );
                }
            }
        </Formik>
    );
};

export default VacanciesForm;
